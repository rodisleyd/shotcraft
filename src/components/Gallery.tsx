import React, { useState, useRef } from 'react';
import { GalleryItem, UserAccount, Theme } from '../types';
import { Plus, X, Copy, Check, Trash2, Image as ImageIcon, Cpu, Sparkles, AlertCircle, Upload, Edit } from 'lucide-react';

interface GalleryProps {
  items: GalleryItem[];
  user: UserAccount | null;
  theme: Theme;
  themeClasses: any;
  onAddItem: (item: Omit<GalleryItem, 'id' | 'createdAt'>) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (item: GalleryItem) => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function Gallery({
  items,
  user,
  theme,
  themeClasses,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
  addToast
}: GalleryProps) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatorIA, setGeneratorIA] = useState('');
  const [postProcessing, setPostProcessing] = useState('');
  const [author, setAuthor] = useState(user?.email || '');

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxWidth = 1024;
        const maxHeight = 1024;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setUrl(compressedBase64);
          addToast('Imagem carregada e comprimida com sucesso!', 'success');
        } else {
          setUrl(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast('Prompt copiado com sucesso!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setUrl(item.url);
    setPrompt(item.prompt === 'Processo iterativo de geração (Prompt não especificado pelo autor)' ? '' : item.prompt);
    setGeneratorIA(item.generatorIA || '');
    setPostProcessing(item.postProcessing || '');
    setAuthor(item.author);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setTitle('');
    setUrl('');
    setPrompt('');
    setGeneratorIA('');
    setPostProcessing('');
    setAuthor(user?.email || '');
    setShowAddModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      addToast('Preencha os campos obrigatórios (Título e URL/Imagem)!', 'error');
      return;
    }

    const itemPrompt = prompt.trim() || 'Processo iterativo de geração (Prompt não especificado pelo autor)';

    if (editingItem) {
      const updated: GalleryItem = {
        ...editingItem,
        title: title.trim(),
        url: url.trim(),
        prompt: itemPrompt,
        generatorIA: generatorIA.trim() || undefined,
        postProcessing: postProcessing.trim() || undefined,
        author: author.trim()
      };
      onUpdateItem(updated);
      setActiveItem(updated); // Atualiza os dados no lightbox aberto
    } else {
      onAddItem({
        title: title.trim(),
        url: url.trim(),
        prompt: itemPrompt,
        generatorIA: generatorIA.trim() || undefined,
        postProcessing: postProcessing.trim() || undefined,
        author: author.trim() || 'Admin'
      });
    }

    handleCloseModal();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir esta arte da galeria?')) {
      onDeleteItem(id);
      if (activeItem?.id === id) {
        setActiveItem(null);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header da Galeria */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/5 dark:border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-2">
            <span>🎬</span> Galeria ShotCraft
          </h2>
          <p className={`${themeClasses.textMuted} text-sm mt-1`}>
            Exposição de artes conceituais e prompts. Inspire-se com as criações da comunidade.
          </p>
        </div>
        {user?.isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className={`text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg active:scale-95 ${themeClasses.accent}`}
          >
            <Plus size={16} /> Postar Nova Arte
          </button>
        )}
      </div>

      {/* Grid Masonry Estilo Flickr */}
      {items.length === 0 ? (
        <div className={`p-12 rounded-3xl border text-center flex flex-col items-center justify-center gap-4 ${themeClasses.card}`}>
          <div className="w-16 h-16 rounded-2xl bg-zinc-500/10 flex items-center justify-center text-zinc-400">
            <ImageIcon size={28} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Nenhuma arte na galeria</h3>
            <p className={`text-sm ${themeClasses.textMuted} mt-1`}>
              {user?.isAdmin ? 'Clique no botão acima para adicionar a primeira arte!' : 'O administrador ainda não postou nenhuma arte.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 [column-fill:_balance] w-full">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`break-inside-avoid mb-6 overflow-hidden rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer group shadow-sm relative ${
                theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-white/60 border-[#d3cbb3]'
              }`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-auto object-cover max-h-[600px] transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/styles/default.png';
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-white">
                <h4 className="font-black text-sm tracking-tight leading-tight">{item.title}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] opacity-80 font-medium">Por {item.author}</span>
                  {item.generatorIA && (
                    <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm font-semibold uppercase tracking-wider">
                      {item.generatorIA}
                    </span>
                  )}
                </div>
              </div>

              {/* Botão de Excluir rápido para Admin */}
              {user?.isAdmin && (
                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  className="absolute top-3 right-3 p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title="Excluir arte"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Visualização Ampliada */}
      {activeItem && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveItem(null)}
          />
          <div
            className={`relative z-10 max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl border flex flex-col lg:flex-row h-full max-h-[85vh] lg:h-auto lg:max-h-[80vh] ${
              theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-[#d3cbb3] text-[#433422]'
            }`}
          >
            {/* Imagem (Coluna Esquerda) */}
            <div className="flex-1 bg-black/40 flex items-center justify-center p-4 overflow-hidden relative min-h-[40vh] lg:min-h-0">
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="max-w-full max-h-full object-contain rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/styles/default.png';
                }}
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 left-4 p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-full lg:hidden transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Metadados e Detalhes (Coluna Direita) */}
            <div className="w-full lg:w-[420px] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01]">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black tracking-tight leading-snug">{activeItem.title}</h3>
                    <p className={`text-[11px] ${themeClasses.textMuted} mt-1 font-medium`}>
                      Criado por <span className="underline">{activeItem.author}</span> &bull; {new Date(activeItem.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveItem(null)}
                    className={`p-2 rounded-xl border transition-all hidden lg:block ${themeClasses.card} ${themeClasses.textMuted} hover:text-red-500`}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Info Técnica (IA e Pós-processamento) */}
                {(activeItem.generatorIA || activeItem.postProcessing) && (
                  <div className="space-y-2.5 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                    {activeItem.generatorIA && (
                      <div className="flex items-center gap-2 text-xs">
                        <Cpu size={14} className="text-indigo-400 shrink-0" />
                        <span className="opacity-80">IA Geradora:</span>
                        <strong className="font-bold">{activeItem.generatorIA}</strong>
                      </div>
                    )}
                    {activeItem.postProcessing && (
                      <div className="flex items-center gap-2 text-xs">
                        <Sparkles size={14} className="text-amber-500 shrink-0" />
                        <span className="opacity-80">Edição/Pós-produção:</span>
                        <strong className="font-bold">{activeItem.postProcessing}</strong>
                      </div>
                    )}
                  </div>
                )}

                {/* Prompt */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-wider opacity-60">Prompt Utilizado</label>
                    <button
                      onClick={() => handleCopyPrompt(activeItem.prompt)}
                      className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                        theme === 'dark'
                          ? 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-indigo-400'
                          : 'border-zinc-200 bg-white hover:bg-zinc-50 text-[#8b5a2b]'
                      }`}
                    >
                      {copied ? <Check size={11} /> : <Copy size={11} />}
                      {copied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <div className={`p-4 rounded-2xl border text-xs font-mono leading-relaxed max-h-48 overflow-y-auto select-all ${themeClasses.input}`}>
                    {activeItem.prompt}
                  </div>
                </div>
              </div>

              {/* Rodapé do Lightbox: Nota de IA + Excluir para Admin */}
              <div className="pt-6 border-t border-black/5 dark:border-white/5 space-y-4 mt-6 lg:mt-0">
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/25 text-amber-500 dark:text-amber-400 text-[10px] leading-relaxed">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <p>
                    <strong>Nota:</strong> O resultado final da imagem depende diretamente do modelo de IA geradora utilizado e das técnicas adicionais aplicadas em softwares de edição.
                  </p>
                </div>

                {user?.isAdmin && (
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => handleStartEdit(activeItem)}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <Edit size={14} /> Editar Arte
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(activeItem.id, e);
                      }}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shrink-0"
                    >
                      <Trash2 size={14} /> Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Administrativo para Adicionar Nova Arte */}
      {showAddModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleCloseModal} />
          <div
            className={`relative z-10 max-w-lg w-full rounded-3xl p-8 border shadow-2xl overflow-y-auto max-h-[90vh] ${
              theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-[#d3cbb3] text-[#433422]'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-black flex items-center gap-2">
                <span>{editingItem ? '📝' : '➕'}</span> {editingItem ? 'Editar Arte' : 'Postar Nova Arte'}
              </h3>
              <button
                onClick={handleCloseModal}
                className={`p-2 rounded-xl border transition-all ${themeClasses.card} ${themeClasses.textMuted} hover:text-red-500`}
              >
                <X size={16} />
              </button>
            </div>
            <p className={`text-xs ${themeClasses.textMuted} mb-6`}>
              {editingItem ? 'Ajuste os dados da arte cadastrada abaixo.' : 'Alimente a galeria com as melhores artes e seus prompts. Como as artes são hospedadas fora, utilize URLs públicas de imagem.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Título */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-wider opacity-60">Título da Arte *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Monge no Templo Gelado"
                  className={`w-full px-4 py-3 rounded-xl border outline-none text-sm focus:ring-2 focus:ring-indigo-500/20 ${themeClasses.input}`}
                />
              </div>

              {/* URL ou Arquivo Local */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-wider opacity-60">URL da Imagem ou Arquivo local *</label>
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <input
                      type="text"
                      required
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Cole a URL da imagem ou selecione um arquivo..."
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm focus:ring-2 focus:ring-indigo-500/20 ${themeClasses.input}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 h-[46px] ${themeClasses.card} hover:bg-black/5 dark:hover:bg-white/5`}
                  >
                    <Upload size={14} /> Upload
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <span className="text-[9px] opacity-60 block">Utilize URLs públicas (Imgur, etc.) ou faça upload do computador (comprimido automaticamente).</span>
              </div>

              {/* IA Geradora */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider opacity-60">IA Geradora (Opcional)</label>
                  <input
                    type="text"
                    value={generatorIA}
                    onChange={(e) => setGeneratorIA(e.target.value)}
                    placeholder="Ex: Midjourney v6"
                    className={`w-full px-4 py-3 rounded-xl border outline-none text-sm focus:ring-2 focus:ring-indigo-500/20 ${themeClasses.input}`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider opacity-60">Autor da Arte</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Ex: admin@shotcraft.com"
                    className={`w-full px-4 py-3 rounded-xl border outline-none text-sm focus:ring-2 focus:ring-indigo-500/20 ${themeClasses.input}`}
                  />
                </div>
              </div>

              {/* Edição / Pós-processamento */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-wider opacity-60">Softwares de Edição / Pós-Processamento (Opcional)</label>
                <input
                  type="text"
                  value={postProcessing}
                  onChange={(e) => setPostProcessing(e.target.value)}
                  placeholder="Ex: Photoshop (Filtros de cor), Lightroom"
                  className={`w-full px-4 py-3 rounded-xl border outline-none text-sm focus:ring-2 focus:ring-indigo-500/20 ${themeClasses.input}`}
                />
              </div>

              {/* Prompt */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-wider opacity-60">Prompt Utilizado (Opcional)</label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Cole o prompt aqui. Se a arte usou múltiplos prompts ou sessões, você pode descrever o processo ou deixar vazio."
                  className={`w-full px-4 py-3 rounded-xl border outline-none text-sm focus:ring-2 focus:ring-indigo-500/20 resize-none ${themeClasses.input}`}
                />
              </div>

              {/* Ações */}
              <div className="flex gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                    theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-[#d3cbb3] hover:bg-black/5'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-wider text-white rounded-xl shadow-lg transition-all active:scale-[0.98] ${themeClasses.accent}`}
                >
                  {editingItem ? 'Salvar Alterações' : 'Postar Arte'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
