# Instruções do Agente - Regras Permanentes do ShotCraft

Este documento contém as **regras permanentes e mandatórias** que devem guiar o comportamento e desenvolvimento de qualquer agente inteligente (IA) ou programador humano que interagir com o repositório do **ShotCraft**.

---

## 🚨 Regras Mandatórias de Desenvolvimento

Qualquer ação que altere os arquivos de código-fonte do ShotCraft deve obedecer estritamente às seguintes diretrizes:

*   **Sempre analisar a documentação antes de alterar o projeto**: 
    Antes de começar a escrever código ou alterar componentes, leia a documentação presente na pasta `docs/` para se alinhar com as regras de negócio, modelagem de dados e sistemas ativos.
*   **Sempre respeitar os padrões existentes**:
    Mantenha a padronização estética baseada em Tailwind CSS v4, o dicionário de classes do `themeClasses` do React e os esquemas de tipagem declarados em `types.ts`.
*   **Nunca quebrar funcionalidades existentes**:
    Garanta a manutenção de todos os fluxos ativos (Refinador de assunto com IA, Extrator de paleta, dashboard Admin, etc.). Realize testes manuais nas telas e certifique-se de que nada foi desativado.
*   **Sempre atualizar a documentação após criar uma nova funcionalidade**:
    Se você adicionar uma nova aba, um novo modo estético ou um novo fluxo de negócios, é obrigatório atualizar os respectivos documentos em `docs/` para manter a base de conhecimento viva e atualizada.
*   **Sempre manter compatibilidade com versões anteriores quando possível**:
    Não modifique a estrutura das chaves do `LocalStorage` de forma destrutiva. Ao estender o estado de opções do simulador (`SelectionState`), atualize a função de mapeamento e saneamento `sanitizeSelections` no [App.tsx](file:///c:/Users/admin/Desktop/shotcraft/src/App.tsx) para dar suporte a presets e históricos criados em versões passadas da aplicação.
*   **Sempre seguir a arquitetura já adotada pelo projeto**:
    Respeite o fluxo reativo unidirecional de dados (Estado global concentrado no `App.tsx` e componentes filhos recebendo handlers e dados via props). Nunca faça persistência direta no LocalStorage dentro dos componentes secundários (use o [dataService.ts](file:///c:/Users/admin/Desktop/shotcraft/src/services/dataService.ts)).
*   **Criação de Novos Estilos Automática**:
    Quando você for solicitado com a instrução **"Acrescente o estilo X"**, você deve gerar o prompt descritivo em inglês de forma **totalmente autônoma**. Nunca peça para o usuário fornecer a string ou o prompt. Siga o protocolo de 9 passos estabelecido no documento [STYLE_SYSTEM_GUIDE.md](file:///c:/Users/admin/Desktop/shotcraft/docs/STYLE_SYSTEM_GUIDE.md).
*   **Análise de Arquitetura em Novas Funcionalidades**:
    Quando for solicitado a implementar um novo módulo ou recurso na interface, analise o diagrama de fluxos de dados e telas do ShotCraft para posicionar o código-fonte de acordo com a modularização existente.

---

Estas regras são de cumprimento obrigatório para manter a integridade do código do ShotCraft e viabilizar a sua evolução como uma plataforma SaaS sustentável no longo prazo.
