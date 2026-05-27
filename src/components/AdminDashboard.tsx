/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, Download, ArrowLeft, PlusCircle, Settings, Check, UserCheck } from 'lucide-react';
import { Theme, UserAccount, AccessLog } from '../types';
import { dataService } from '../services/dataService';

interface AdminDashboardProps {
  onBack: () => void;
  theme: Theme;
  themeClasses: any;
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export function AdminDashboard({ onBack, theme, themeClasses, addToast }: AdminDashboardProps) {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [creditEmail, setCreditEmail] = useState('');
  const [creditAmount, setCreditAmount] = useState(100);

  useEffect(() => {
    // Carrega dados iniciais do dataService
    setUsers(dataService.getUsers());
    setLogs(dataService.getAccessLogs());
  }, []);

  const handleExportCSV = () => {
    const csvContent = dataService.exportEmailsToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `shotcraft_emails_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Lista de e-mails exportada em CSV com sucesso!', 'success');
  };

  const handleAddCredits = (email: string, amount: number) => {
    dataService.addCredits(email, amount);
    setUsers(dataService.getUsers()); // Recarrega
    addToast(`Adicionados ${amount} créditos para ${email}!`, 'success');
  };

  const handleManualAddCreditsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditEmail.trim()) {
      addToast('Digite o e-mail do usuário.', 'error');
      return;
    }
    const userExists = users.some(u => u.email.toLowerCase() === creditEmail.toLowerCase());
    if (!userExists) {
      addToast('Usuário não cadastrado no sistema.', 'error');
      return;
    }

    handleAddCredits(creditEmail.trim(), creditAmount);
    setCreditEmail('');
  };

  // Cálculos rápidos
  const totalUsers = users.length;
  const todayDate = new Date().toISOString().split('T')[0];
  const todayAccess = logs.find(l => l.date === todayDate)?.count || 0;
  
  // Receita estimada: R$19,90 para cada usuário com mais de 30 créditos (que seriam os pacotes extras comprados)
  const estimatedRevenue = users.reduce((acc, curr) => {
    if (curr.credits > 30 && !curr.isAdmin) {
      // Diferença de créditos dividida por lotes médios de 300
      const extraCredits = curr.credits - 30;
      const purchases = Math.ceil(extraCredits / 300);
      return acc + (purchases * 19.90);
    }
    return acc;
  }, 0);

  const totalCreditsInSystem = users.reduce((acc, curr) => acc + (curr.isAdmin ? 0 : curr.credits), 0);

  // Encontra o dia com maior acesso
  const maxAccess = logs.reduce((max, curr) => curr.count > max ? curr.count : max, 1);

  return (
    <div className={`min-h-screen p-6 sm:p-10 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-[#f4efe1] text-[#433422]'
    }`}>
      {/* Topo do Dashboard */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button 
            onClick={onBack}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 transition-colors ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-[#8b7e6a] hover:text-[#433422]'
            }`}
          >
            <ArrowLeft size={14} /> Voltar ao simulador
          </button>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Settings className="text-indigo-500 animate-spin-slow" /> Painel do Administrador
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider px-5 py-3.5 rounded-2xl shadow-lg transition-all active:scale-95"
        >
          <Download size={15} /> Exportar E-mails (CSV)
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Metadados Rápidos (Grid de Indicadores) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
          
          {/* Total de Usuários */}
          <div className={`p-6 rounded-3xl border flex items-center gap-4 ${themeClasses.card}`}>
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl">
              <Users size={22} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider opacity-50 block">Usuários Cadastrados</span>
              <span className="text-2xl font-black">{totalUsers}</span>
            </div>
          </div>

          {/* Acessos Hoje */}
          <div className={`p-6 rounded-3xl border flex items-center gap-4 ${themeClasses.card}`}>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
              <TrendingUp size={22} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider opacity-50 block">Acessos Diários</span>
              <span className="text-2xl font-black">{todayAccess}</span>
            </div>
          </div>

          {/* Faturamento Estimado */}
          <div className={`p-6 rounded-3xl border flex items-center gap-4 ${themeClasses.card}`}>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl">
              <DollarSign size={22} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider opacity-50 block">Faturamento Pix</span>
              <span className="text-2xl font-black">R$ {estimatedRevenue.toFixed(2)}</span>
            </div>
          </div>

          {/* Créditos no Sistema */}
          <div className={`p-6 rounded-3xl border flex items-center gap-4 ${themeClasses.card}`}>
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl">
              <UserCheck size={22} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider opacity-50 block">Créditos Ativos</span>
              <span className="text-2xl font-black">{totalCreditsInSystem}</span>
            </div>
          </div>

          {/* Gráfico Estilizado de Acessos Diários */}
          <div className={`col-span-full p-6 rounded-3xl border flex flex-col gap-6 ${themeClasses.card}`}>
            <div>
              <h3 className="font-bold text-sm">Tráfego de Acessos Diários (Últimos 7 dias)</h3>
              <p className={`text-[10px] ${themeClasses.textMuted}`}>Visualização de engajamento diário de usuários.</p>
            </div>

            {/* Barras do Gráfico */}
            <div className="flex items-end justify-between gap-3 h-48 pt-6 border-b border-black/5 dark:border-white/5">
              {logs.slice(-7).map((log, idx) => {
                const heightPercent = Math.max(10, (log.count / maxAccess) * 100);
                const isToday = log.date === todayDate;
                const formattedDate = new Date(log.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip */}
                    <span className="absolute bottom-full mb-2 bg-indigo-600 text-white font-mono text-[10px] font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      {log.count} acessos
                    </span>
                    
                    {/* Barra */}
                    <div 
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        isToday 
                          ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/10' 
                          : 'bg-zinc-700/50 hover:bg-zinc-600/70'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    
                    {/* Rótulo */}
                    <span className="text-[9px] font-bold opacity-60 text-center truncate w-full">
                      {formattedDate}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabela de Usuários Cadastrados */}
          <div className={`col-span-full p-6 rounded-3xl border ${themeClasses.card} overflow-x-auto`}>
            <div className="mb-6">
              <h3 className="font-bold text-sm">Usuários Ativos</h3>
              <p className={`text-[10px] ${themeClasses.textMuted}`}>Lista completa de e-mails para marketing e fomento.</p>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/5 opacity-55">
                  <th className="pb-3 pr-4 font-bold uppercase tracking-wider text-[9px]">E-mail do Usuário</th>
                  <th className="pb-3 pr-4 font-bold uppercase tracking-wider text-[9px]">Data de Cadastro</th>
                  <th className="pb-3 pr-4 font-bold uppercase tracking-wider text-[9px]">Trial Válido?</th>
                  <th className="pb-3 pr-4 font-bold uppercase tracking-wider text-[9px]">Créditos</th>
                  <th className="pb-3 text-right font-bold uppercase tracking-wider text-[9px]">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {users.map((u) => {
                  const regDate = new Date(u.createdAt).toLocaleDateString('pt-BR');
                  const daysSinceTrial = Math.floor((Date.now() - u.trialStartDate) / (24 * 60 * 60 * 1000));
                  const isTrialActive = daysSinceTrial <= 7;
                  const trialRemainingText = isTrialActive ? `${7 - daysSinceTrial} dias` : "Expirado";

                  return (
                    <tr key={u.email} className="group">
                      <td className="py-3.5 pr-4 font-medium flex items-center gap-2">
                        {u.email}
                        {u.isAdmin && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                            Admin
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 pr-4 opacity-75">{regDate}</td>
                      <td className="py-3.5 pr-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isTrialActive 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {trialRemainingText}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 font-mono font-bold text-sm">
                        {u.isAdmin ? '∞' : u.credits}
                      </td>
                      <td className="py-3.5 text-right space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!u.isAdmin && (
                          <>
                            <button
                              onClick={() => handleAddCredits(u.email, 50)}
                              className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition-all"
                            >
                              +50 Créd.
                            </button>
                            <button
                              onClick={() => handleAddCredits(u.email, 100)}
                              className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 text-[10px] font-bold transition-all"
                            >
                              +100 Créd.
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lado Direito: Ações Manuais do Administrador */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Adicionar Créditos Manualmente */}
          <div className={`p-6 rounded-3xl border flex flex-col gap-4 ${themeClasses.card}`}>
            <div>
              <h3 className="font-bold text-sm flex items-center gap-2">
                <PlusCircle className="text-indigo-400" size={16} /> Creditar Conta
              </h3>
              <p className={`text-[10px] ${themeClasses.textMuted}`}>Adicione créditos manualmente na conta de um usuário cadastrado.</p>
            </div>

            <form onSubmit={handleManualAddCreditsSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-[9px] font-black uppercase tracking-wider opacity-60">E-mail do Usuário</label>
                <input 
                  type="email"
                  value={creditEmail}
                  onChange={(e) => setCreditEmail(e.target.value)}
                  placeholder="usuario@exemplo.com"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none text-xs ${themeClasses.input}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-black uppercase tracking-wider opacity-60">Quantidade de Créditos</label>
                <select 
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(Number(e.target.value))}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none text-xs ${themeClasses.input}`}
                >
                  <option value={30}>30 créditos</option>
                  <option value={100}>100 créditos</option>
                  <option value={300}>300 créditos</option>
                  <option value={500}>500 créditos</option>
                </select>
              </div>

              <button 
                type="submit"
                className={`w-full py-3.5 text-xs font-black uppercase tracking-wider text-white rounded-xl shadow-md transition-all active:scale-[0.98] ${themeClasses.accent}`}
              >
                Confirmar Recarga
              </button>
            </form>
          </div>

          {/* Dicas de Marketing / Lembretes */}
          <div className={`p-6 rounded-3xl border flex flex-col gap-4 ${themeClasses.card}`}>
            <h3 className="font-bold text-sm">💡 Campanhas de E-mail</h3>
            <p className={`text-xs leading-relaxed ${themeClasses.textMuted}`}>
              Você pode importar o arquivo CSV de usuários gerado neste painel diretamente para plataformas de marketing de e-mail como **Mailchimp**, **MailerLite** ou **Brevo (Sendinblue)**.
            </p>
            <div className="h-px bg-black/5 dark:bg-white/5" />
            <p className={`text-xs leading-relaxed ${themeClasses.textMuted}`}>
              Recomendamos enviar uma oferta especial de compra de créditos Pix para usuários cujos 7 dias de trial gratuitos estão próximos de expirar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
