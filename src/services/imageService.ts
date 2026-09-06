/**
 * Utilitário para download e manipulação de imagens externas.
 * Resolve problemas de CORS (Cross-Origin Resource Sharing) e Canvas Tainting
 * convertendo URLs remotas em Base64 Data URLs locais através de fallbacks com proxies de imagem.
 */

export async function fetchImageAsDataUrl(inputUrl: string): Promise<string> {
  let url = inputUrl.trim();
  if (!url) {
    throw new Error('Por favor, informe uma URL válida.');
  }

  // Se já for data URL ou blob URL, retorna diretamente
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  // Se o usuário colou sem protocolo (ex: "site.com/foto.jpg"), adiciona https://
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  // Estratégias ordenadas:
  // 1. Fetch direto (se o servidor tiver CORS aberto)
  // 2. images.weserv.nl (proxy de cache/redimensionamento com cabeçalhos CORS liberados)
  // 3. corsproxy.io (proxy CORS transparente)
  // 4. allorigins.win (proxy CORS alternativo)
  const fetchStrategies: { name: string; getUrl: () => string }[] = [
    { name: 'direct', getUrl: () => url },
    { name: 'weserv', getUrl: () => `https://images.weserv.nl/?url=${encodeURIComponent(url)}&output=jpg&q=85` },
    { name: 'corsproxy', getUrl: () => `https://corsproxy.io/?url=${encodeURIComponent(url)}` },
    { name: 'allorigins', getUrl: () => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}` },
  ];

  let blob: Blob | null = null;
  let lastError: any = null;

  for (const strategy of fetchStrategies) {
    try {
      const targetUrl = strategy.getUrl();
      const res = await fetch(targetUrl);
      if (res.ok) {
        const candidateBlob = await res.blob();
        if (candidateBlob && candidateBlob.size > 0) {
          // Verifica se não retornou uma página HTML de erro
          if (
            candidateBlob.type.startsWith('image/') ||
            candidateBlob.type === 'application/octet-stream' ||
            (!candidateBlob.type.includes('html') && !candidateBlob.type.includes('text/plain'))
          ) {
            blob = candidateBlob;
            break;
          }
        }
      }
    } catch (err) {
      lastError = err;
    }
  }

  if (!blob) {
    throw new Error(
      'Não foi possível carregar a imagem desta URL. O site de origem pode estar bloqueando acessos externos ou o link não aponta diretamente para um arquivo de imagem.'
    );
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Erro ao converter os dados da imagem.'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao processar a imagem baixada.'));
    reader.readAsDataURL(blob);
  });
}
