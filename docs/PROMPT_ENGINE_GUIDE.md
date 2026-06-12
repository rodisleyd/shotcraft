# Guia do Motor de Prompts (Prompt Engine) - ShotCraft

O **Prompt Engine** é a unidade de processamento de strings que traduz a seleção de botões e seleções da interface em comandos formatados para modelos de inteligência artificial geradores de imagem.

Este documento explica em detalhes a matemática da string final, tratamentos especiais de proporção e exclusão, além de integrações do modelo Gemini.

---

## ⚙️ Concatenação e Estrutura do Prompt (`finalPrompt`)

A string final do prompt é gerada de forma reativa através de uma constante memoizada no [App.tsx](file:///c:/Users/admin/Desktop/shotcraft/src/App.tsx) chamada `finalPrompt`. O motor utiliza a seguinte lógica estrita para ordenar e filtrar os blocos técnicos:

```typescript
const finalPrompt = useMemo(() => {
  const parts = [];
  
  // 1. Assunto Principal
  if (subject) parts.push(subject);

  // 2. Parâmetros de Câmera e Composição (Recupera do arquivo constants.ts)
  const framing = SHOT_TYPES.find(o => o.id === selections.framing)?.prompt;
  if (framing) parts.push(framing);

  const angle = ANGLES.find(o => o.id === selections.angle)?.prompt;
  if (angle) parts.push(angle);

  const perspective = PERSPECTIVES.find(o => o.id === selections.perspective)?.prompt;
  if (perspective) parts.push(perspective);

  const lens = LENSES.find(o => o.id === selections.lens)?.prompt;
  if (lens) parts.push(lens);

  const lighting = LIGHTING.find(o => o.id === selections.lighting)?.prompt;
  if (lighting) parts.push(lighting);

  const env = ENVIRONMENTS.find(o => o.id === selections.environment)?.prompt;
  if (env) parts.push(env);

  // 3. Estilos Artísticos (Múltiplos)
  selections.style.forEach(id => {
    const prompt = STYLES.find(o => o.id === id)?.prompt;
    if (prompt) parts.push(prompt);
  });

  // 4. Paleta de Cores
  if (selections.colorPalette && selections.colorPalette.length > 0) {
    parts.push(`using color palette reference (${selections.colorPalette.join(', ')})`);
  }

  // 5. LUTs de Cor
  if (selections.lutId) {
    const lutPrompt = LUTS.find(o => o.id === selections.lutId)?.prompt;
    if (lutPrompt) parts.push(lutPrompt);
  }

  // 6. Técnicas de Grading
  if (selections.gradingTechniques && selections.gradingTechniques.length > 0) {
    selections.gradingTechniques.forEach(id => {
      const techPrompt = GRADING_TECHNIQUES.find(o => o.id === id)?.prompt;
      if (techPrompt) parts.push(techPrompt);
    });
  }

  // 7. Sufixo Estético de Modo
  if (mode === 'storyboard') parts.push("professional storyboard sketch, black and white pencil lines, compositional notes, rough sketches");
  else if (mode === 'cinematic') parts.push("cinematic color grading, professional cinematography, technical realism");
  else if (mode === 'illustration') parts.push("artistic hand-crafted illustration, distinct aesthetic");

  // 8. Detalhes Técnicos e de Câmera (Múltiplos)
  selections.detail.forEach(id => {
    const prompt = DETAILS.find(o => o.id === id)?.prompt;
    if (prompt) parts.push(prompt);
  });

  // 9. Proporção (Aspect Ratio)
  if (selections.aspect === 'custom') {
    parts.push(`--ar ${customAspect}`);
  } else {
    const aspect = ASPECT_RATIOS.find(o => o.id === selections.aspect)?.prompt;
    if (aspect) parts.push(aspect);
  }

  // 10. Parâmetro Negativo
  if (negativePrompt) {
    parts.push(`--no ${negativePrompt}`);
  }

  return parts.filter(Boolean).join(', ');
}, [subject, selections, mode, customAspect, negativePrompt]);
```

---

## ⚡ Auto-combinações (`AUTO_COMBINATIONS`)

Para otimizar o fluxo de trabalho do usuário, o arquivo [constants.ts](file:///c:/Users/admin/Desktop/shotcraft/src/data/constants.ts) expõe a tabela `AUTO_COMBINATIONS`. 

Se o usuário seleciona um card cujo ID possui um mapeamento de combinação, a função `handleSelect` do construtor intercepta a ação e injeta automaticamente os demais parâmetros no estado `selections`.

### Exemplo de Comportamento Técnico:
*   Se o usuário ativa a opção **`turnaround` (vários ângulos)** no passo Ângulo:
    *   O motor de auto-combinação identifica o gatilho.
    *   Altera automaticamente a perspectiva (`perspective`) para **`orthographic`** (necessário para model sheets sem distorção 3D).
    *   Configura a luz (`lighting`) para o modo **`ambient`** (luz uniforme sem sombras profundas que alterem a percepção do modelo).
    *   Garante que o prompt final seja perfeitamente formatado para gerar um modelo técnico para animação ou modelagem 3D.

---

## 📐 Proporções (Aspect Ratios) e Parâmetro Negativo

*   **Aspect Ratio Customizado**: Se a opção `'custom'` for ativada no passo 1, a interface do [StepContent.tsx](file:///c:/Users/admin/Desktop/shotcraft/src/components/StepContent.tsx) exibe um campo de texto livre conectado ao estado `customAspect`. O valor digitado (ex: `2:1`, `2.39:1`) é concatenado com o prefixo do Midjourney `--ar`. Se o usuário escolher um preset pronto, o prompt correspondente é puxado diretamente (ex: `--ar 16:9`).
*   **Negative Prompt**: O campo de texto livre do componente [NegativePrompt.tsx](file:///c:/Users/admin/Desktop/shotcraft/src/components/NegativePrompt.tsx) aceita termos indesejados. O motor concatena esses termos ao final do prompt com o prefixo clássico `--no` (ex: `--no ugly, low quality, duplicate`).

---

## 🤖 Refinamento e Tradução com Gemini

O ShotCraft utiliza a inteligência artificial do Gemini (`gemini-3-flash-preview`) para refinar e preparar os inputs de texto do usuário:

### 1. Refinamento de Assunto (`optimizeSubject`)
Envia o assunto original ao modelo solicitando o seu enriquecimento técnico cinematográfico:
- **Prompt da IA**: `"Transforme este assunto de imagem em algo mais rico, cinematográfico e detalhado (em poucas palavras): \"{subject}\". Retorne apenas a versão melhorada."`

### 2. Tradutor de Assunto (`translateSubject`)
Traduz textos inseridos em português para a semântica nativa de prompts em inglês de forma imperativa:
- **Prompt da IA**: `"Traduza o seguinte texto para o inglês, mantendo o estilo descritivo para um prompt de geração de imagem: \"{subject}\". Retorne APENAS a tradução em inglês."`
- **Por que é essencial**: A maioria das IAs de imagem gera resultados sensivelmente melhores quando alimentadas com termos descritivos em inglês.
