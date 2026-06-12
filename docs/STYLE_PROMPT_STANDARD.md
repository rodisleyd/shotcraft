# Padrão de Estilos e Prompts (STYLE_PROMPT_STANDARD) - ShotCraft

Este documento estabelece o padrão oficial de Prompt Engineering para a estruturação, evolução e manutenção dos estilos artísticos da plataforma **ShotCraft**. 

Ele se baseia nas melhores práticas modernas de comunicação com modelos generativos de imagem (como Midjourney v6, SDXL e Flux), focando na qualidade descritiva, clareza e controle estético em substituição a termos vazios ou instruções negativas excessivas.

---

## 🎯 Objetivo do Sistema de Estilos

Os estilos do ShotCraft têm a função de **injetar a assinatura estética principal da imagem**. Diferente dos parâmetros estruturais (como enquadramento ou lentes), os estilos descrevem *como* a imagem é pintada, desenhada, moldada ou renderizada fisicamente.

Para que os modelos modernos de IA compreendam essa assinatura com precisão:
1.  O prompt deve descrever as propriedades físicas e visuais do estilo em formato **declarativo**, e não imperativo.
2.  Deve haver contexto suficiente para que a IA simule pigmentos, papéis, texturas e imperfeições físicas reais.
3.  A estrutura deve evitar confusão de pesos de tokens (*token dilution*).

---

## 🏗️ Estrutura Ideal dos Prompts

Um prompt de estilo de alto nível deve ser estruturado de forma linear e descritiva, ordenando os atributos do macro (a técnica geral) ao micro (acabamentos e texturas).

### Ordem Recomendada dos Elementos:

1.  **Técnica Principal**: A definição do meio artístico (ex: `watercolor painting`, `ink sketch`, `oil painting`).
2.  **Aparência Visual / Comportamento dos Pigmentos**: Como o meio interage com a luz ou com a gravidade (ex: `bleeding pigments`, `heavy impasto impastato strokes`, `soft color transitions`).
3.  **Textura e Suporte**: O material de fundo no qual a arte é aplicada (ex: `textured cold-press paper`, `grainy canvas texture`, `fibrous cotton weave`).
4.  **Materiais Adicionais / Instrumentos**: A ferramenta física utilizada (ex: `tapered brush pens`, `graphite pencil lines`, `wax crayons`).
5.  **Características Distintivas**: Elementos visuais únicos que assinam a técnica (ex: `organic watermarks`, `cross-hatching shadows`, `ink pooling`).
6.  **Acabamento e Estilo de Luz**: Detalhes de finalização da técnica (ex: `matte finish`, `soft studio lighting highlighting relief`, `high contrast black and white contrast`).

---

## 📏 Quantidade Ideal de Termos

*   **Faixa Recomendada**: Entre **15 e 35 palavras** por estilo.
*   **Qualidade vs. Verbocidade**: Modelos modernos como Midjourney v6 e Flux possuem alta sensibilidade a termos descritivos. Evite prompts longos que leiam como instruções conversacionais extensas (mais de 60 palavras), pois isso dilui a importância do assunto original do usuário. Prefira frases curtas separadas por vírgula que empilhem texturas, meios e acabamentos.

---

## 👍 Boas Práticas (Modern Prompt Engineering)

*   **Seja Declarativo**: Descreva o que está visível na cena em vez de dar ordens ao modelo (ex: use `ink sketch on white paper` em vez de `draw this as a sketch`).
*   **Detalhe Texturas Físicas**: Termos de relevo como `impasto`, `paper grain`, `etched details` e `fluid bleeding` instruem os modelos de difusão a gerar ruídos táteis que quebram o visual artificial de IA.
*   **Use Termos de Luz e Contraste**: Descreva como a luz bate nos pigmentos (ex: `diffused warm lighting highlighting the wax relief`).
*   **Sintaxe Concisa**: Mantenha a separação por vírgula em ordem decrescente de importância estática.

---

## 👎 O Que Evitar (Anti-patterns)

*   **Palavras Vazias ("Buzzwords")**: Não use termos como `ultra realistic`, `hyperrealistic`, `4k`, `8k`, `photorealistic` ou `masterpiece`. Elas não adicionam detalhes técnicos e diluem o prompt.
*   **Comandos de Instrução Direta à IA**: Evite comandos imperativos como `"Edit and enhance the image by..."` ou `"Transform the image..."`. O Midjourney e o Flux não leem instruções contextuais de tarefas de edição no prompt padrão; eles interpretam essas palavras como objetos que devem aparecer na imagem, causando artefatos.
*   **Parâmetros Negativos no Meio da String**: Evite injetar instruções como `"Do not add background"`, `"no color"` ou `"without distortion"` diretamente na string descritiva. Instruções negativas em texto normal costumam ser interpretadas de forma afirmativa pela IA (ela foca no termo "color" ou "background"). Utilize exclusivamente o parâmetro `--no` ao final do prompt para essa finalidade.

---

## 📝 Exemplos de Prompts Bem Estruturados

### Exemplo 1: Óleo sobre Tela
> `traditional oil painting on canvas, heavy impasto texture, visible palette knife strokes, rich color layering, semi-gloss varnish finish`
*(Ordem: Técnica -> Textura -> Ferramenta -> Comportamento de cor -> Acabamento)*

### Exemplo 2: Desenho a Carvão
> `charcoal sketch on rough-textured paper, deep black charcoal shading, smudged edges, loose gestural graphite lines, physical carbon dust build-up`
*(Ordem: Técnica -> Suporte/Textura -> Detalhe -> Características distintivas)*

---

## 🛠️ Regras para Criação de Novos Estilos

Quando o usuário pedir **"Acrescente o estilo X"**, execute as seguintes etapas:
1.  **Estudo**: Analise quais são as propriedades estéticas do estilo solicitado.
2.  **Tradução Técnica**: Crie o prompt em inglês de forma autônoma (sem requisitar ao usuário), ordenando as propriedades conforme este padrão (Técnica -> Textura -> Ferramenta -> Acabamento).
3.  **Encapsulamento**: Estruture o objeto seguindo a assinatura da interface `Option` no arquivo [constants.ts](file:///c:/Users/admin/Desktop/shotcraft/src/data/constants.ts).
4.  **Consistência**: Coloque o estilo sob o subgrupo mais apropriado e verifique se o ID ou prompt já não está duplicado.

---

## 📈 Regras para Manutenção Futura

*   **Auditoria Periódica**: Estilos antigos que contêm termos instrucionais extensos (como `"strictly apply the SUMI-E technique..."`) devem ser progressivamente simplificados para descrições físicas declarativas.
*   **Validação de Modelos**: Teste os prompts periodicamente em geradores de imagem modernos para calibrar se as texturas descritas estão sendo representadas nos renders sem criar anomalias ou artefatos no assunto principal.
