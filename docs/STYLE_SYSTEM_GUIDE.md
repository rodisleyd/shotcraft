# Guia do Sistema de Estilos - ShotCraft

Este guia técnico documenta a arquitetura de armazenamento, convenções visuais, organização de categorias e as regras permanentes e mandatórias de criação e inclusão de novos estilos artísticos na plataforma **ShotCraft**.

---

## 🎨 Onde os Estilos são Armazenados

Todos os estilos estáticos da plataforma são armazenados no arquivo [constants.ts](file:///c:/Users/admin/Desktop/shotcraft/src/data/constants.ts) sob o array exportado de objetos `STYLES`. 

```typescript
export const STYLES: Option[] = [
  // ... estilos
];
```

---

## 🧩 Estrutura do Objeto de Estilo

Cada item dentro do array de estilos deve seguir rigorosamente o tipo `Option` definido no arquivo [types.ts](file:///c:/Users/admin/Desktop/shotcraft/src/types.ts):

*   **`id`** (`string`): Identificador único da opção (ex: `'aquarela'`).
*   **`label`** (`string`): Nome legível por humanos exibido no cartão da interface (ex: `'Aquarela'`).
*   **`prompt`** (`string`): A instrução textual descritiva em inglês que será concatenada ao prompt final (ex: `'watercolor painting style, bleeding pigments, paper texture'`).
*   **`category`** (`string`): Deve ser rigidamente `'style'`.
*   **`subCategory`** (`string`): Subgrupo ao qual o estilo pertence no acordeão (ex: `'1. Pintura Tradicional'`).
*   **`image`** (`string` - opcional): O caminho relativo para a imagem de demonstração prática que o usuário visualiza no hover e no zoom (ex: `'/images/styles/aquarela.png'`).

---

## 🏷️ Convenções e Regras de Nomenclatura

1.  **Chave identificadora (`id`)**:
    *   Deve ser escrita obrigatoriamente em minúsculas.
    *   Usa separação por hífen (*kebab-case*), ex: `aquarela-aplicada`, `estilo-ghibli`.
    *   Deve ser única e curta.
2.  **String do Prompt (`prompt`)**:
    *   Deve ser escrita obrigatoriamente em **Inglês**.
    *   Deve conter de 2 a 5 tags descritivas separadas por vírgula para fornecer contexto suficiente ao gerador de imagens por IA (ex: `'gauche painting, matte finish, textured brush strokes'`).
    *   Evite o uso de termos genéricos como "high quality", "4k" ou "masterpiece". Prefira termos técnicos estilísticos e descritores de meios físicos (ex: `canvas texture`, `visible ink lines`, `impasto oil`).
3.  **Rótulo (`label`)**:
    *   Deve ser escrito em português do Brasil com a primeira letra em maiúscula.
    *   Deve descrever de forma concisa e clara o estilo para o usuário brasileiro.

---

## 🗂️ Organização das Categorias

Os estilos são agrupados por subcategorias (`subCategory`) para que o acordeão visual do passo 9 do Stepper os organize em coleções lógicas. As categorias existentes são:

*   **`1. Pintura Tradicional`**: Pinturas em mídia física (Aquarela, Óleo, Guache, Acrílica, Afresco).
*   **`2. Ilustração Digital`**: Estilos modernos concebidos no computador (Vetor, Pintura Digital 2D, Arte de Pixel, Matte Painting).
*   **`3. Desenho e Hachura`**: Estilos focados em linhas e traços (Desenho a Lápis, Caneta Tinteiro, Carvão, Hachura clássica, Xilogravura).
*   **`4. Escolas de Arte & Históricos`**: Movimentos de arte clássicos (Expressionismo, Impressionismo, Barroco, Renascimento, Ukiyo-e, Art Nouveau).
*   **`5. Cultura Pop, HQ e Anime`**: Estilos modernos de mídias de entretenimento (Mangá clássico, HQ Americana, Pixel Art 16-bit, Retrofuturismo).

---

## ✨ Criação de Novos Estilos (Regras Permanentes)

> [!IMPORTANT]
> Quando for solicitada a adição de um estilo através do comando:
> **"Acrescente o estilo X"**
> você, agente de inteligência artificial ou desenvolvedor, deve executar autonomamente o seguinte protocolo de 9 etapas:

1.  **Identificar o Estilo Artístico**: Compreender qual é o estilo, técnica de pintura ou movimento artístico solicitado ("X").
2.  **Pesquisar Características Visuais**: Mapear mentalmente as texturas, pinceladas, suportes físicos (papel, tela, madeira), contraste de cores e iluminações clássicas associadas a esse estilo.
3.  **Gerar o Prompt Otimizado em Inglês**:
    *   Criar de forma **automatizada** a melhor combinação de termos em inglês (*prompt string*) que replique as características identificadas no passo 2.
    *   **Importante**: O usuário **NÃO** precisa fornecer o prompt. O agente deve gerá-lo de forma independente.
4.  **Criar o Objeto no Padrão do ShotCraft**: Estruturar o objeto com as chaves `id`, `label`, `prompt`, `category: 'style'`, `subCategory` e `image` (se aplicável), respeitando a tipagem do sistema.
5.  **Localizar o Arquivo Correto**: Abrir o arquivo [constants.ts](file:///c:/Users/admin/Desktop/shotcraft/src/data/constants.ts).
6.  **Posicionar na Categoria Apropriada**: Inserir o novo objeto dentro de `STYLES`, ordenado logicamente sob a subcategoria (`subCategory`) correspondente à sua natureza (Tradicional, Digital, Histórico, etc.).
7.  **Evitar Duplicações**: Verificar se o ID ou um estilo semelhante já não existe no array `STYLES` antes de gravar.
8.  **Manter Consistência**: Assegurar que os descritores do prompt e rótulos sigam os mesmos padrões de profundidade e estilo linguístico das opções vizinhas.
9.  **Salvar as Alterações**: Concluir a escrita física do arquivo no repositório.
