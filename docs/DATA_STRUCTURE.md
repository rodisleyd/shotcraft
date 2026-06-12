# Estrutura de Dados - ShotCraft

Este documento detalha o modelo e formato de dados utilizados no **ShotCraft**, servindo como especificação para manutenções estruturais.

---

## 🏷️ Tipagem TypeScript (`src/types.ts`)

O arquivo [types.ts](file:///c:/Users/admin/Desktop/shotcraft/src/types.ts) define as estruturas de dados fundamentais do sistema:

### 1. Modos e Temas
- **`ShotMode`**: `'storyboard' | 'cinematic' | 'illustration'`
- **`Theme`**: `'dark' | 'sepia'`

### 2. Configurações Técnicas (`Option`)
Cada card de escolha técnica é instanciado a partir da interface `Option`:
```typescript
interface Option {
  id: string;            // Ex: 'close-up'
  label: string;         // Ex: 'Close-up'
  prompt: string;        // Ex: 'close-up shot'
  description?: string;  // Explicação curta
  category: string;      // Ex: 'framing'
  subCategory?: string;  // Ex: '1. Enquadramentos Básicos'
  image?: string;        // Link relativo de imagem
}
```

### 3. Estado de Seleção Activo (`SelectionState`)
Objeto que monitora os parâmetros ativos no builder:
```typescript
interface SelectionState {
  framing: string;            // ID do enquadramento ativo
  angle: string;              // ID do ângulo
  perspective: string;        // ID da perspectiva
  aspect: string;             // ID do aspect ratio
  lens: string;               // ID da lente
  lighting: string;           // ID da iluminação
  environment: string;        // ID do cenário
  style: string[];            // Lista de IDs de estilos ativos
  detail: string[];           // Lista de IDs de detalhes ativos
  colorPalette: string[];     // Array de strings HEX de cores
  colorPaletteId: string;     // ID da paleta selecionada
  lutId?: string;             // ID de LUT ativo
  gradingTechniques: string[];// IDs de técnicas de grading ativas
}
```

### 4. Entidades de Sessão e Uso
- **`UserPreset`**:
  ```typescript
  interface UserPreset {
    name: string;               // Nome do preset customizado
    selections: SelectionState; // Configurações salvas
    subject: string;            // Assunto do prompt salvo
  }
  ```
- **`HistoryItem`**:
  ```typescript
  interface HistoryItem {
    id: string;              // Timestamp de identificação
    timestamp: number;       // Epoch Unix
    prompt: string;          // String do prompt final
    subject: string;         // Descrição do assunto
    negativePrompt?: string; // Textos sob a chave '--no'
  }
  ```
- **`UserAccount`**:
  ```typescript
  interface UserAccount {
    email: string;           // E-mail de cadastro
    isAdmin: boolean;        // Se possui status de administrador
    createdAt: number;       // Epoch Unix do cadastro
    credits: number;         // Saldo de créditos da conta
    trialStartDate: number;  // Epoch Unix do início do período de testes
  }
  ```
- **`AccessLog`**: `{ date: string; count: number; }` (Para o gráfico de acessos).
- **`ColorPaletteOption`**: `{ id: string; name: string; colors: string[]; description: string; }`
- **`GalleryItem`**: `{ id: string; url: string; title: string; prompt: string; author: string; generatorIA?: string; postProcessing?: string; createdAt: number; }`

---

## 💾 Banco de Dados Simulativo (`LocalStorage`)

Para permitir a portabilidade instantânea e dispensar a necessidade de um banco SQL externo para demonstrações, os dados do ShotCraft são serializados e mantidos no **LocalStorage** do navegador.

Abaixo está o mapeamento detalhado das chaves e esquemas em formato JSON:

### 1. Lista de Usuários (`shotcraft_users_data`)
- **Tipo**: `UserAccount[]`
- **Utilidade**: Armazena as contas cadastradas para controle de saldo de créditos e expiração de trial.
- **Estrutura**:
  ```json
  [
    {
      "email": "lucas.manga@art.com",
      "isAdmin": false,
      "createdAt": 1717942000000,
      "credits": 15,
      "trialStartDate": 1717942000000
    }
  ]
  ```

### 2. Sessão do Usuário Logado (`shotcraft_current_user`)
- **Tipo**: `UserAccount`
- **Utilidade**: Armazena as credenciais do usuário conectado na máquina atual.

### 3. Presets Salvos (`shotcraft_user_presets`)
- **Tipo**: `UserPreset[]`
- **Utilidade**: Salva as combinações técnicas dos usuários.
- **Estrutura**:
  ```json
  [
    {
      "name": "Cinematic Golden Hour",
      "selections": {
        "framing": "mcu",
        "angle": "eye-level",
        "perspective": "normal",
        "aspect": "16:9",
        "lens": "35mm",
        "lighting": "golden-hour",
        "environment": "fantasy-forest",
        "style": [],
        "detail": ["film-grain"],
        "colorPalette": [],
        "colorPaletteId": ""
      },
      "subject": "A knight looking at a dragon"
    }
  ]
  ```

### 4. Histórico de Prompts (`shotcraft_history`)
- **Tipo**: `HistoryItem[]`
- **Utilidade**: Registra os últimos 20 prompts copiados.

### 5. Paletas Customizadas (`shotcraft_custom_palettes`)
- **Tipo**: `ColorPaletteOption[]`
- **Utilidade**: Armazena paletas extraídas de imagens e salvas pelo usuário.

### 6. Galeria de Imagens (`shotcraft_gallery_items`)
- **Tipo**: `GalleryItem[]`
- **Utilidade**: Armazena a lista de postagens compartilhadas.
