/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserAccount, AccessLog } from "../types";

const USERS_KEY = "shotcraft_users_data";
const LOGS_KEY = "shotcraft_access_logs";
const CURRENT_USER_KEY = "shotcraft_current_user";

// Dados simulados iniciais para demonstrar o painel administrativo imediatamente
const INITIAL_USERS: UserAccount[] = [
  { email: "admin@shotcraft.com", isAdmin: true, createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000, credits: 9999, trialStartDate: Date.now() - 10 * 24 * 60 * 60 * 1000 },
  { email: "lucas.manga@art.com", isAdmin: false, createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000, credits: 15, trialStartDate: Date.now() - 6 * 24 * 60 * 60 * 1000 },
  { email: "carla.storyboard@film.io", isAdmin: false, createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000, credits: 120, trialStartDate: Date.now() - 4 * 24 * 60 * 60 * 1000 },
  { email: "pedro.diretor@cinema.com.br", isAdmin: false, createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, credits: 0, trialStartDate: Date.now() - 9 * 24 * 60 * 60 * 1000 }, // Trial Expirado e créditos 0
  { email: "mariana.ilustra@design.net", isAdmin: false, createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, credits: 45, trialStartDate: Date.now() - 1 * 24 * 60 * 60 * 1000 },
];

const INITIAL_LOGS: AccessLog[] = [
  { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 12 },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 18 },
  { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 25 },
  { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 20 },
  { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 32 },
  { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 45 },
  { date: new Date().toISOString().split('T')[0], count: 58 },
];

export const dataService = {
  // Inicializa o banco de dados simulado no LocalStorage
  init() {
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(LOGS_KEY)) {
      localStorage.setItem(LOGS_KEY, JSON.stringify(INITIAL_LOGS));
    }
  },

  // Obtém lista de todos os usuários (apenas para Admin)
  getUsers(): UserAccount[] {
    this.init();
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  },

  // Registra ou incrementa o log de acessos diários
  logAccess() {
    this.init();
    const logs: AccessLog[] = JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
    const today = new Date().toISOString().split('T')[0];
    const logIndex = logs.findIndex(l => l.date === today);

    if (logIndex >= 0) {
      logs[logIndex].count++;
    } else {
      logs.push({ date: today, count: 1 });
    }

    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  },

  // Obtém logs de acessos
  getAccessLogs(): AccessLog[] {
    this.init();
    return JSON.parse(localStorage.getItem(LOGS_KEY) || "[]").sort((a: AccessLog, b: AccessLog) => a.date.localeCompare(b.date));
  },

  // Registro de novo usuário
  register(email: string): UserAccount {
    this.init();
    const users = this.getUsers();
    
    // Se o e-mail já existe, simula login
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      this.setCurrentUser(existing);
      this.logAccess();
      return existing;
    }

    const newUser: UserAccount = {
      email,
      isAdmin: email.toLowerCase() === "admin@shotcraft.com",
      createdAt: Date.now(),
      credits: 30, // 30 créditos grátis no trial
      trialStartDate: Date.now(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    this.setCurrentUser(newUser);
    this.logAccess();
    return newUser;
  },

  // Login de usuário
  login(email: string): UserAccount | null {
    this.init();
    const users = this.getUsers();
    
    // Se for e-mail de admin e não existir, cria automaticamente para demonstração
    if (email.toLowerCase() === "admin@shotcraft.com" && !users.find(u => u.email === "admin@shotcraft.com")) {
      return this.register(email);
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      this.setCurrentUser(user);
      this.logAccess();
      return user;
    }
    return null;
  },

  // Define usuário atual na sessão
  setCurrentUser(user: UserAccount | null) {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  // Obtém usuário atual
  getCurrentUser(): UserAccount | null {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    const sessionUser = JSON.parse(raw);
    
    // Atualiza com dados mais recentes do LocalStorage
    const users = this.getUsers();
    const freshData = users.find(u => u.email === sessionUser.email);
    if (freshData) {
      this.setCurrentUser(freshData);
      return freshData;
    }
    return sessionUser;
  },

  // Consome 1 crédito do usuário atual
  consumeCredit(): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    // Se admin, créditos são infinitos
    if (user.isAdmin) return true;

    // Verifica validade do trial (7 dias = 7 * 24 * 60 * 60 * 1000 ms)
    const isTrialExpired = Date.now() - user.trialStartDate > 7 * 24 * 60 * 60 * 1000;
    
    if (user.credits <= 0 || isTrialExpired) {
      return false;
    }

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex >= 0) {
      users[userIndex].credits--;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      this.setCurrentUser(users[userIndex]);
      return true;
    }
    return false;
  },

  // Adiciona créditos manualmente (por exemplo, via Admin ou pós-Pix)
  addCredits(email: string, amount: number) {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex >= 0) {
      users[userIndex].credits += amount;
      
      // Se o trial estava expirado, renova para permitir uso
      const isTrialExpired = Date.now() - users[userIndex].trialStartDate > 7 * 24 * 60 * 60 * 1000;
      if (isTrialExpired) {
        users[userIndex].trialStartDate = Date.now();
      }

      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Se for o próprio usuário ativo, atualiza a sessão
      const current = this.getCurrentUser();
      if (current && current.email.toLowerCase() === email.toLowerCase()) {
        this.setCurrentUser(users[userIndex]);
      }
    }
  },

  // Gera e-mails cadastrados em formato CSV
  exportEmailsToCSV(): string {
    const users = this.getUsers();
    const headers = "Email,Data Cadastro,Creditos,Admin?\n";
    const rows = users.map(u => {
      const date = new Date(u.createdAt).toLocaleDateString("pt-BR");
      return `"${u.email}","${date}",${u.credits},${u.isAdmin ? "Sim" : "Nao"}`;
    }).join("\n");
    return headers + rows;
  }
};
