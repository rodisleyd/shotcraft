# Roadmap Estratégico - ShotCraft

Este documento reúne o planejamento de evolução técnica e as diretrizes e boas práticas de arquitetura para o **Desenvolvimento Futuro** da plataforma ShotCraft, assegurando escalabilidade e manutenibilidade a longo prazo.

---

## 🛠️ Desenvolvimento Futuro (Boas Práticas de Engenharia)

Para garantir que o código continue limpo e extensível à medida que novos desenvolvedores e agentes adicionem recursos, devem ser seguidos os padrões abaixo:

### 1. Criação de Novas Abas
- As abas principais do aplicativo são gerenciadas no cabeçalho pelo estado `currentTab` (ex: `'builder'`, `'library'`, `'gallery'`).
- **Boa Prática**: Ao criar uma nova aba (ex: `'projects'`), adicione a nova chave ao tipo correspondente no [types.ts](file:///c:/Users/admin/Desktop/shotcraft/src/types.ts). Isole toda a lógica visual da aba em um arquivo de componente dedicado sob a pasta `src/components/` (ex: `src/components/ProjectsTab.tsx`) e renderize-o condicionalmente no `App.tsx` para evitar arquivos gigantes.

### 2. Criação de Novos Módulos e Serviços
- Nunca misture lógica de comunicação de rede ou persistência diretamente nos componentes React.
- **Boa Prática**: Crie arquivos de serviço específicos dentro de `src/services/` (ex: `src/services/supabaseClient.ts` ou `src/services/billingService.ts`). Isole a lógica assíncrona com tratamento de erros `try/catch` e exporte um objeto de serviço limpo para os componentes consumirem.

### 3. Inclusão de Novos Estilos e Categorias
- Evite criar arrays de estilos alternativos espalhados pela aplicação.
- **Boa Prática**: Centralize tudo no array `STYLES` do arquivo [constants.ts](file:///c:/Users/admin/Desktop/shotcraft/src/data/constants.ts). Ao criar uma nova categoria técnica (ex: "Profundidade de Cor"), declare-a como um novo passo no array `steps` no `App.tsx`, e adicione o array de constantes correspondente à função `getCurrentOptions` no `StepContent.tsx`.

### 4. Novos Sistemas e Mecanismos de Prompts
- Se for integrar suporte a novos geradores de imagens (ex: Midjourney v6, Stable Diffusion XL ou Flux) que requerem estruturas de sintaxes ou parâmetros especiais (como `--cref` para referências de personagem, ou pesos numéricos como `(style:1.2)`):
- **Boa Prática**: Crie uma função adaptadora separada (ex: `src/utils/promptFormatter.ts`) contendo conversores dedicados para cada modelo de IA de imagem suportado. Evite inflar o `useMemo` de `finalPrompt` no [App.tsx](file:///c:/Users/admin/Desktop/shotcraft/src/App.tsx) com condicionais longas.

### 5. Melhorias de Interface (UI)
- Mantenha estrita obediência às chaves do objeto `themeClasses` do componente [App.tsx](file:///c:/Users/admin/Desktop/shotcraft/src/App.tsx) para preservar a funcionalidade de alternância de temas (Escuro e Sépia).
- Use a biblioteca `Motion` para animar qualquer novo elemento dinâmico inserido na interface, mantendo a experiência fluida e moderna.

### 6. Escalabilidade Técnica
- Reduza a renderização desnecessária do React. Use referências `useRef` para inputs que não precisam alterar a interface a cada pressionamento de tecla (como caixas de assunto antes de submeter ao tradutor/IA).
- Separe componentes muito extensos em arquivos menores e use `React.memo` para otimizar a renderização das grades de opções que possuem muitos cards.

---

## 📈 Cronograma de Evolução do Projeto (Roadmap)

A evolução comercial do ShotCraft de um simulador local para um SaaS real de produção é dividida em 4 fases estratégicas:

### Fase 1: Backend Centralizado (Supabase)
- **Objetivo**: Substituição do `LocalStorage` por um banco de dados real PostgreSQL.
- **Implementação**: Implementação de autenticação real de e-mails e provedores sociais (Supabase Auth) e sincronização do histórico e presets de usuários na nuvem.

### Fase 2: Integração Direct-to-API de Geração de Imagem
- **Objetivo**: Renderizar as imagens direto no ShotCraft.
- **Implementação**: Conexão com a API do Imagen 3 (Google Vertex AI) ou Stable Diffusion para carregar as fotos geradas diretamente no painel de revisão, descontando os créditos do usuário.

### Fase 3: Faturamento Real via Pix e Webhooks
- **Objetivo**: Automatizar o fluxo financeiro.
- **Implementação**: Integração com gateways de pagamentos reais (Mercado Pago ou Efí) para gerar QRCodes Pix de cobrança e escutar a notificação de transação concluída via Webhooks para reabastecer créditos automaticamente.

### Fase 4: Sequenciador e Colaboração Avançada
- **Objetivo**: Projetos de múltiplos storyboards e equipes.
- **Implementação**: Permitir a criação de projetos contendo dezenas de frames de storyboards com exportação em PDF e compartilhamento em tempo real entre agências e equipes criativas.
