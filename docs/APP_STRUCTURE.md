# Estrutura do Aplicativo - ShotCraft

Este documento fornece um mapeamento detalhado da arquitetura de software da plataforma **ShotCraft**, incluindo a árvore de arquivos, a finalidade de cada componente e serviço, a simulação do banco de dados e a engrenagem de fluxo de dados.

---

## 📂 Pastas Principais e Arquivos Importantes

O projeto segue a estrutura padrão de uma aplicação React empacotada com Vite:

*   `docs/`: Guarda a base de conhecimento permanente da aplicação (esta pasta).
*   `public/`: Guarda ativos estáticos de imagem servidos diretamente, como ícones e capturas de tela.
*   `src/`: Contém todo o código-fonte React/TypeScript.
    *   `src/components/`: Centraliza todos os componentes visuais reutilizáveis.
    *   `src/data/`: Guarda o arquivo estático de constantes e dados de apoio.
    *   `src/services/`: Centraliza regras de persistência e chamadas de API.
    *   `src/App.tsx`: Ponto de partida, orquestrador de estado global e roteamento de telas.
    *   `src/types.ts`: Armazena todos os contratos de tipos e interfaces do TypeScript.
    *   `src/index.css`: Arquivo de estilo CSS global contendo diretrizes do Tailwind CSS v4.

---

## 🧩 Componentes do Sistema (`src/components/`)

Abaixo está a lista detalhada de cada componente React e sua responsabilidade na interface:

1.  **`Header.tsx`**: Renderiza a barra superior do aplicativo. Gerencia a alternância dos modos de visualização (`builder`, `library`, `gallery`), os botões de controle de créditos (incluindo o atalho para abrir o modal de recargas Pix), a chave seletora de tema (`Theme`) e os botões de logout e acesso administrativo.
2.  **`Stepper.tsx`**: Exibe a linha de tempo visual com ícones dos 12 passos de configuração técnica do construtor de prompts. Controla a alteração reativa do estado `activeStep`.
3.  **`StepContent.tsx`**: Componente crítico. Controla a renderização dinâmica de inputs dependendo do passo ativo. Inclui:
    *   Passo 0: Textarea de assunto, botão de refinar e traduzir com IA, área de arrastar-e-soltar do *Modo Mestre* e botões de clima (*Visual Tags*).
    *   Passos 1-7 e 9-10: Grades dinâmicas de opções técnicas de enquadramento, iluminação, cenários, estilos artísticos com *preview de hover* e visualização com zoom de imagem em modal.
    *   Passo 8: Interface interna de cores, com abas para carregar imagem de referência, extrair paleta HEX, selecionar paletas prontas ou configurar técnicas de grading cinematográfico.
4.  **`PromptPreview.tsx`**: Caixa reativa lateral que exibe o prompt final formatado em tempo real. Possui botões de copiar prompt (que dispara a validação de créditos), campo para salvar o prompt ativo como preset de usuário e indicador visual de cópia realizada.
5.  **`UserPresets.tsx`**: Painel lateral contendo a listagem de presets armazenados localmente, permitindo carregar todas as seleções de câmera anteriores com um clique ou excluir presets.
6.  **`NegativePrompt.tsx`**: Exibe a caixa de texto livre abaixo do construtor para que o usuário insira termos que a inteligência artificial deve excluir da renderização final (utiliza a sintaxe `--no`).
7.  **`History.tsx`**: Painel lateral que lista os últimos 20 prompts copiados de forma cronológica, permitindo carregar o prompt antigo de volta à tela de trabalho ou limpar a lista.
8.  **`Library.tsx`**: Aba de pesquisa livre de técnicas visuais. Fornece uma visualização contínua de estilos e enquadramentos organizados por abas com a funcionalidade de aplicar a técnica selecionada de forma instantânea nas seleções do Builder.
9.  **`Gallery.tsx`**: Aba social de compartilhamento. Permite aos usuários compartilharem suas criações, visualizarem criações de terceiros, filtrarem por modo e copiarem/clonarem os prompts para o builder.
10. **`AdminDashboard.tsx`**: Painel fechado de administração. Renderiza um gráfico de acessos nos últimos 7 dias, dados de faturamento estimado, listagem de e-mails cadastrados, botões para incremento manual de créditos e exportação em CSV para e-mail marketing.
11. **`AuthPage.tsx`**: Tela de entrada e autenticação. Executa o cadastro automático ou login baseado em e-mail e fornece dicas de como acessar a conta administrativa (`admin@shotcraft.com`).
12. **`LandingPage.tsx`**: Página de apresentação com design moderno que destaca os diferenciais da plataforma e convida o visitante a testar o simulador.
13. **`Toast.tsx`**: Sistema dinâmico de exibição de alertas de feedback instantâneo (sucesso, erro, informação) empilhados no topo direito da tela.

---

## ⚙️ Serviços (`src/services/`)

O projeto possui um único serviço chamado [dataService.ts](file:///c:/Users/admin/Desktop/shotcraft/src/services/dataService.ts). Ele é o core de persistência de dados e regras de negócio:
- **`init()`**: Popula o banco com usuários e logs de acessos falsos iniciais para demonstração caso o banco esteja vazio.
- **`getUsers()` / `getAccessLogs()`**: Retorna as entidades armazenadas.
- **`register(email)` / `login(email)`**: Simula o fluxo de autenticação e registra logs de acesso diários reativos.
- **`setCurrentUser(user)` / `getCurrentUser()`**: Controla a sessão do usuário ativo.
- **`consumeCredit()`**: Valida se o período de trial de 7 dias expirou ou se o saldo de créditos está zerado. Caso seja válido, consome 1 crédito e persiste. Retorna `false` em caso de saldo zerado ou expirado.
- **`addCredits(email, amount)`**: Adiciona créditos a uma conta (também redefine a data de trial se o mesmo estava expirado).
- **`exportEmailsToCSV()`**: Converte a base de usuários do sistema em uma string CSV estruturada para download do administrador.

---

## 🗄️ Banco de Dados

O ShotCraft utiliza o **LocalStorage** do navegador como banco de dados NoSQL embarcado:
- As entidades são convertidas em strings JSON através de `JSON.stringify()` antes de serem armazenadas e convertidas de volta para objetos com `JSON.parse()` na leitura.
- **Chaves de Persistência**:
  1.  `shotcraft_users_data`: Base relacional simulada contendo todas as contas de e-mails de usuários.
  2.  `shotcraft_current_user`: Armazena os dados do usuário atualmente logado na sessão ativa.
  3.  `shotcraft_access_logs`: Registra o volume de conexões por data para plotar dados de engajamento no Admin.
  4.  `shotcraft_user_presets`: Lista de layouts e parâmetros de prompts salvos.
  5.  `shotcraft_history`: Lista de histórico das últimas 20 cópias do prompt ativo.
  6.  `shotcraft_custom_palettes`: Guarda as paletas personalizadas extraídas pelo canvas.
  7.  `shotcraft_gallery_items`: Armazena a lista de postagens e links de imagens compartilhadas.

---

## 🔄 Fluxo de Dados (Data Flow)

O fluxo de dados da aplicação segue o modelo reativo unidirecional do React:

```
                  +-----------------------------------+
                  |              App.tsx              |
                  |     (Estado Central Global)       |
                  +-----------------+-----------------+
                                    |
            Propaga Estados         |       Despacha Ações
            (selections, subject)   |       (setSelections, handleSelect)
                                    v
                  +-----------------+-----------------+
                  |         StepContent.tsx           |
                  |   (Visualização e Modificação)    |
                  +-----------------+-----------------+
                                    |
                                    | Clica em Cópia / Salvar
                                    v
                  +-----------------+-----------------+
                  |         dataService.ts            |
                  |     (Persiste no LocalStorage)    |
                  +-----------------+-----------------+
                                    |
                                    | Atualiza e Propaga
                                    v
                            [Retorna ao App.tsx]
```

1.  **Estado Raiz**: O [App.tsx](file:///c:/Users/admin/Desktop/shotcraft/src/App.tsx) mantém o estado global de seleção do construtor (`selections`), o assunto do prompt (`subject`) e os dados do usuário conectado (`user`).
2.  **Propagação (Props Down)**: Os componentes filhos (ex: `StepContent`, `PromptPreview`, `UserPresets`) recebem estes estados como propriedades de leitura apenas para renderizar seus cartões e caixas de visualização.
3.  **Ação Reativa (Events Up)**: Quando o usuário clica em um cartão do construtor, o evento dispara o callback `handleSelect` definido na raiz, atualizando de forma síncrona o estado global no `App.tsx`.
4.  **Sincronização com o Banco**: Ações de salvamento (Presets, Galeria) ou de consumo (Copiar Prompt) disparam chamadas diretas ao `dataService.ts`, que atualiza os dados no `LocalStorage` e retorna a resposta de sucesso ou erro para reajustar o estado local do React.
