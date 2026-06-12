# Guia de Funcionalidades - ShotCraft

Este documento detalha de ponta a ponta todas as funcionalidades disponíveis na plataforma **ShotCraft**, explicando seu comportamento de interface e regras de negócio internas.

---

## 🎛️ 1. O Simulador (Construtor de Prompts)

O simulador é a funcionalidade principal da plataforma, acessível na aba **Builder**. Ele consiste em um Stepper guiado composto por 12 etapas principais que cobrem todas as especificações técnicas da fotografia e direção de arte. O usuário avança selecionando cartões visuais que representam os parâmetros desejados. À medida que as escolhas são feitas, a string do prompt final é recalculada instantaneamente e exibida em destaque em um painel fixo lateral.

---

## 📚 2. A Biblioteca

A Biblioteca (aba **Library**) atua como um repositório rápido de consulta estética. Ela organiza todas as opções de estilos e enquadramentos presentes no banco de dados da aplicação em abas de fácil acesso.

*   **Aplicação Direta**: Cada card na biblioteca exibe um botão de atalho rápido. Clicar nesse botão aplica a configuração técnica diretamente às seleções ativas do simulador e transfere o usuário de volta à aba do Builder, simplificando o fluxo de criação.

---

## 🖼️ 3. A Galeria

A Galeria (aba **Gallery**) é a área social e de compartilhamento da comunidade do ShotCraft.

*   **Visualização**: Os usuários publicam suas artes contendo uma URL de imagem externa, título descritivo, autor, qual gerador de IA foi utilizado e as técnicas aplicadas.
*   **Ações**: Qualquer usuário pode clonar uma arte da galeria clicando em "Usar Configurações", o que carrega instantaneamente todo o prompt e seleções daquela arte na aba ativa do construtor.
*   **Filtros**: Permite pesquisar criações por busca textual ou filtrar pelo modo estético em que a arte foi concebida.

---

## 🎬 4. Modos Storyboard, Cinematic e Illustration

O aplicativo expõe três modos estéticos globais no cabeçalho. Ao selecionar um deles, o ShotCraft injeta comandos de renderização fortes no prompt final para guiar o motor de geração externo:

*   **Storyboard (`'storyboard'`)**: Injeta a string `"professional storyboard sketch, black and white pencil lines, compositional notes, rough sketches"`. Força o motor de IA a renderizar rabiscos conceituais em P&B para planejamento físico de cenas.
*   **Cinematic (`'cinematic'`)**: Injeta a string `"cinematic color grading, professional cinematography, technical realism"`. Direciona o motor a produzir renders realistas que simulam câmeras e tonalizações de filmes de Hollywood.
*   **Illustration (`'illustration'`)**: Injeta a string `"artistic hand-crafted illustration, distinct aesthetic"`. Instrui a IA a fugir do fotorrealismo, produzindo artes estilizadas de desenho à mão livre.

---

## 🎨 5. Sistema de Estilos

Permite ao usuário aplicar uma ou mais linguagens de pintura ou desenho ao prompt.
*   **Seleção Cumulativa**: Diferente de categorias como enquadramentos ou lentes (onde apenas uma opção pode estar ativa por vez), o passo de estilos permite que o usuário marque múltiplas opções.
*   **Concatenação**: O motor concatena os prompts de cada estilo marcado separados por vírgula antes de injetar as diretrizes do modo.

---

## 💾 6. Sistema de Presets

Permite que o usuário salve todo o estado do simulador sob um rótulo identificador (ex: "Iluminação Vintage").
*   **Gravação**: Ao digitar um nome no campo lateral e clicar em "Salvar Preset", o sistema grava o assunto e o objeto `SelectionState` no LocalStorage do navegador.
*   **Recuperação**: O painel de Presets lista todas as configurações salvas. Clicar em um preset carrega de volta todas as variáveis de câmera ao builder.
*   **Saneamento**: A recuperação de presets utiliza a função `sanitizeSelections` para garantir que campos opcionais ou novos adicionados à plataforma em futuras versões não causem quebras ou valores nulos.

---

## 🕰️ 7. Sistema de Histórico

O sistema mantém um rastreamento automático dos prompts que o usuário copiou com sucesso.
*   **Capacidade**: Armazena as últimas **20 cópias** de forma ordenada cronologicamente.
*   **Funcionalidade**: O histórico exibe o prompt final completo, a data e hora do processamento e o assunto original. O usuário pode clicar em qualquer item do histórico para reinseri-lo na área de trabalho ativa.

---

## 🪙 8. Sistema de Créditos e Modal Pix

Controla o acesso comercial aos serviços da plataforma.
*   **Créditos Iniciais**: Ao se cadastrar com qualquer e-mail válido, o usuário recebe **30 créditos gratuitos**.
*   **Período de Trial**: O sistema valida a validade da conta através de uma data de início de testes. A conta expira automaticamente após **7 dias** do registro inicial.
*   **Consumo**: Cada clique em "Copiar Prompt" valida se o trial é vigente e se o saldo de créditos é maior que zero. Se válido, consome 1 crédito e prossegue.
*   **Modal Pix (Faturamento Simulativo)**: Caso os créditos zerem ou o período de 7 dias se encerre, um modal de recarga bloqueia a tela. Ele permite ao usuário escolher planos simulativos (R$ 9,90 por 100 créditos, R$ 19,90 por 300 créditos, R$ 29,90 por 500 créditos), copiar uma chave Pix payload fictícia e clicar em "Confirmar Pix" para simular a validação do recebimento e recarregar os créditos.

---

## 👑 9. Administração

Um painel restrito (acessível caso o e-mail logado seja `admin@shotcraft.com` ou possua a flag `isAdmin: true` no banco local).
*   **Métricas Financeiras e de Engajamento**: Exibe o total de usuários, acessos diários de hoje, faturamento Pix estimado e total de créditos ativos no sistema.
*   **Gráfico de Tráfego**: Gráfico de barras interativo construído em CSS puro que exibe o volume de acessos diários dos últimos 7 dias.
*   **Lista de Usuários**: Tabela listando todos os e-mails registrados no sistema, com a data de cadastro, status do período de testes (trial ativo/expirado) e saldo de créditos.
*   **Recarga Manual**: Botões de ação rápida para conceder +50 ou +100 créditos a qualquer usuário, além de um formulário de recarga manual informando e-mail do destinatário.
*   **Exportação CSV**: Permite baixar a lista de e-mails em formato CSV para campanhas de marketing externas.

---

## 📋 10. Exportação de Prompts

Lógica de exportação e compatibilidade externa do ShotCraft.
*   **Cópia Física**: Utiliza a API de área de transferência nativa dos navegadores (`navigator.clipboard.writeText`) para transferir a string processada diretamente para a área de transferência do sistema operacional.
*   **Validação de Créditos**: O botão de cópia possui prioridade de validação. A cópia física e a persistência de histórico só ocorrem após o consumo correto de créditos no `dataService`.

---

## 🤖 11. Inteligência Artificial e Modo Mestre

O ShotCraft integra chamadas de IA generativa (modelo Gemini) para acelerar e automatizar tarefas complexas do usuário:

*   **Modo Mestre (Análise de Imagem)**: Localizado no passo 0, permite fazer upload de uma imagem técnica. O SDK do Gemini analisa o arquivo e retorna os IDs das opções de lentes, luzes e enquadramentos correspondentes que melhor definem a imagem enviada, preenchendo o construtor automaticamente.
*   **Refinar Assunto**: Melhora descrições curtas e informais em inglês/português, transformando-as em frases cinematográficas enriquecidas com detalhes estéticos.
*   **Traduzir Assunto**: Traduz descrições em português para inglês automaticamente, mantendo a semântica voltada para geração de prompts.
