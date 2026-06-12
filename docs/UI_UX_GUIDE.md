# Guia de UI/UX - ShotCraft

Este documento reúne a filosofia de design de interface de usuário (UI) e experiência do usuário (UX) adotada no desenvolvimento do **ShotCraft**, servindo como referência para modificações visuais futuras.

---

## 💡 Princípios de Design e Usabilidade

A interface do ShotCraft foi projetada sob três premissas fundamentais de usabilidade:

1.  **Estética Funcional Premium**: Uso de superfícies translúcidas com efeito vidro-morfismo (mistura de opacidades em branco/preto e filtros de desfoque `backdrop-blur-md`), cantos arredondados generosos (`rounded-3xl`) e transições suaves de 500ms de cor de tema para criar uma sensação de app nativo moderno.
2.  **Redução de Carga Mental**: Em vez de exigir que o usuário digite parâmetros complicados do Midjourney ou Stable Diffusion, o ShotCraft organiza opções em grades visuais autoexplicativas.
3.  **Sincronização em Tempo Real (WYSIWYG)**: Todas as seleções feitas no Stepper atualizam instantaneamente o bloco lateral de pré-visualização do prompt, garantindo que o usuário veja a construção sem precisar clicar em processadores intermediários.

---

## 🎛️ Fluxo Guiado (Stepper de Passes)

A interface decompõe uma tarefa complexa (configurar 10+ variáveis de câmera e arte) em um **fluxo linear de 12 etapas simples**:

*   **Foco Compartimentado**: Cada passo exibe apenas as opções daquela propriedade específica (ex: apenas iluminações no Passo 6). Isso evita a paralisia por excesso de escolhas.
*   **Avanço Flexível**: O usuário pode avançar clicando nos botões "Próximo Passo", ou saltar diretamente para qualquer passo clicando no ícone correspondente na barra superior do Stepper.

---

## 🔍 Previews Técnicos e Visualização (Zoom de Imagens)

Para auxiliar usuários que desconhecem termos técnicos cinematográficos (ex: *Luz Rembrandt* ou *Perspectiva Isométrica*), a plataforma utiliza recursos visuais interativos:

1.  **Visualização Flutuante (Hover Card)**: Ao passar o mouse sobre opções de enquadramento (passo 2) ou estilos (passo 9), um painel flutuante renderiza uma imagem de demonstração real do efeito técnico. O painel utiliza animações de entrada e saída suaves com a biblioteca `Motion`.
2.  **Modal de Zoom Dedicado**: Se o usuário precisar ver a imagem em detalhes, os cards exibem um botão de zoom (`ZoomIn`). Ao clicar, um modal focado é renderizado contendo a imagem em tamanho expandido, o rótulo da técnica e a string exata em inglês que será injetada no prompt.

---

## 🔔 Notificações e Toasts

O sistema emprega um componente reativo de toasts ([Toast.tsx](file:///c:/Users/admin/Desktop/shotcraft/src/components/Toast.tsx)) para feedbacks efêmeros:

*   **Tipos de Feedback**:
    *   `success` (Verde): Confirmações de cópias de prompts com consumo de crédito, salvamento de presets ou postagem de artes na galeria.
    *   `info` (Azul): Notificações de carregamento de presets ou redefinição de dados.
    *   `error` (Vermelho): Avisos de falhas de rede, erros de análise de imagem ou alertas de saldo de créditos esgotado.
*   **Comportamento**: Os pop-ups surgem de forma animada no topo direito da interface e somem automaticamente após 5 segundos, podendo ser dispensados manualmente.

---

## ♿ Navegação e Acessibilidade

*   **Teclado**: Os cards clicáveis das grades de opções utilizam a marcação `role="button"` e capturam cliques de acessibilidade via tecla `Enter` ou `Espaço`, permitindo navegar pelo construtor inteiramente via tabulação de teclado.
*   **Chaveamento de Abas**: As abas principais do cabeçalho (Builder, Library, Gallery) possuem marcações de estados ativos com cores vibrantes e alternam o contexto de renderização de forma instantânea sem recarregar a página.
*   **Contraste de Temas**: O tema **Dark** utiliza tons de cinza escuro (`zinc-950`) contrastando com texto claro (`zinc-100`), e o tema **Sepia** utiliza fundos quentes amarelados (`#f4efe1`) com textos marrons (`#433422`), oferecendo excelente taxa de contraste e legibilidade sob diferentes iluminações de monitor.
