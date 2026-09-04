import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-4">
            <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
              !
            </div>
            <h2 className="text-lg font-black tracking-tight text-white">Ops! Algo inesperado aconteceu.</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ocorreu uma instabilidade na interface. Caso esteja utilizando o Google Tradutor no navegador, recomendamos desativá-lo nesta página para evitar interferências no React.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-indigo-600/20"
            >
              Recarregar Aplicação
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
