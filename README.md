# Image Wizard 📸🧙‍♂️

**Image Wizard** é uma API para criação e manipulação de imagens usando Next.js e Sharp. Ela oferece funcionalidades como redimensionamento, corte, rotação, adição de texto, sobreposição, conversão de formato e criação de imagem a partir de texto, entre outras.

## Estrutura de Pastas

```plaintext
├── app/
│   ├── api/
│   │   ├── image/
│   │   │   ├── resize/route.js          # Redimensiona imagem
│   │   │   ├── crop/route.js            # Corta imagem
│   │   │   ├── rotate/route.js          # Rotaciona a imagem
│   │   │   ├── create/route.js          # Cria uma nova imagem
│   │   │   ├── add-text/route.js        # Adiciona texto à imagem
│   │   │   ├── overlay/route.js         # Sobrepõe uma imagem em outra
│   │   │   ├── convert/route.js         # Converte a imagem
│   │   │   └── text-to-image/route.js   # Converte texto em imagem
```

---

## Endpoints

### 1. **Criar Imagem**

Cria uma nova imagem com cor de fundo e tamanho especificados.

- **URL**: `/api/image/create`
- **Método**: `POST`
- **Parâmetros**:
  - `width` (number): Largura da imagem em pixels.
  - `height` (number): Altura da imagem em pixels.
  - `color` (string): Cor de fundo da imagem em hexadecimal (ex.: `#FF5733`).

#### Exemplo de Chamada

```typescript
import axios from 'axios';

async function createImage() {
  const response = await axios.post('/api/image/create', {
    width: 800,
    height: 600,
    color: '#FF5733',
  }, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  console.log(URL.createObjectURL(blob));
}
```

---

### 2. **Adicionar Texto à Imagem**

Adiciona texto em uma imagem, com fonte, cor, posição e tamanho personalizados.

- **URL**: `/api/image/add-text`
- **Método**: `POST`
- **Parâmetros**:
  - `imageBuffer` (string): Imagem base codificada em base64.
  - `fontUrl` (string): URL para download da fonte.
  - `text` (string): Texto a ser adicionado.
  - `color` (string): Cor do texto em hexadecimal.
  - `fontSize` (number): Tamanho da fonte em pixels.
  - `x` (number): Posição horizontal do texto.
  - `y` (number): Posição vertical do texto.

#### Exemplo de Chamada

```typescript
import axios from 'axios';

async function addTextToImage() {
  const response = await axios.post('/api/image/add-text', {
    imageBuffer: '<base64 image>',
    fontUrl: 'https://example.com/path/to/font.ttf',
    text: 'Hello, World!',
    color: '#FFFFFF',
    fontSize: 48,
    x: 50,
    y: 50
  }, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  console.log(URL.createObjectURL(blob));
}
```

---

### 3. **Sobrepor Imagem**

Sobrepõe uma imagem em outra em uma posição específica.

- **URL**: `/api/image/overlay`
- **Método**: `POST`
- **Parâmetros**:
  - `baseImageBuffer` (string): Imagem base em base64.
  - `overlayImageBuffer` (string): Imagem sobreposta em base64.
  - `x` (number): Posição horizontal.
  - `y` (number): Posição vertical.

#### Exemplo de Chamada

```typescript
import axios from 'axios';

async function overlayImage() {
  const response = await axios.post('/api/image/overlay', {
    baseImageBuffer: '<base64 base image>',
    overlayImageBuffer: '<base64 overlay image>',
    x: 100,
    y: 100
  }, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  console.log(URL.createObjectURL(blob));
}
```

---

### 4. **Redimensionar Imagem**

Redimensiona uma imagem para a largura e altura especificadas.

- **URL**: `/api/image/resize`
- **Método**: `POST`
- **Parâmetros**:
  - `imageBuffer` (string): Imagem a ser redimensionada em base64.
  - `width` (number): Nova largura.
  - `height` (number): Nova altura.

---

### 5. **Cortar Imagem**

Corta uma imagem nas dimensões e posição especificadas.

- **URL**: `/api/image/crop`
- **Método**: `POST`
- **Parâmetros**:
  - `imageBuffer` (string): Imagem base em base64.
  - `width` (number): Largura do corte.
  - `height` (number): Altura do corte.
  - `left` (number): Posição horizontal inicial.
  - `top` (number): Posição vertical inicial.

---

### 6. **Rotacionar Imagem**

Rotaciona a imagem em um ângulo específico.

- **URL**: `/api/image/rotate`
- **Método**: `POST`
- **Parâmetros**:
  - `imageBuffer` (string): Imagem base em base64.
  - `angle` (number): Ângulo de rotação em graus.

---

### 7. **Converter Imagem**

Converte uma imagem para um formato especificado (JPEG, PNG ou WebP).

- **URL**: `/api/image/convert`
- **Método**: `POST`
- **Parâmetros**:
  - `imageBuffer` (string): Imagem base em base64.
  - `format` (string): Formato desejado (`jpeg`, `png`, `webp`).

---

### 8. **Converter Texto em Imagem**

Gera uma imagem a partir de um texto, utilizando uma fonte personalizada, com cor e tamanho definidos.

- **URL**: `/api/image/text-to-image`
- **Método**: `POST`
- **Parâmetros**:
  - `text` (string): Texto a ser exibido na imagem.
  - `fontUrl` (string): URL da fonte usada para escrever o texto.
  - `fontSize` (number): Tamanho do texto em pixels.
  - `fontColor` (string): Cor do texto em hexadecimal (ex.: `#000000`).

#### Exemplo de Chamada

```typescript
import axios from 'axios';

async function generateTextImage() {
  const response = await axios.post('/api/image/text-to-image', {
    text: 'Hello, Image Wizard!',
    fontUrl: 'https://example.com/path/to/font.ttf',
    fontSize: 48,
    fontColor: '#000000'
  }, { responseType: 'arraybuffer' });

  const blob = new Blob([response.data], { type: 'image/png' });
  console.log(URL.createObjectURL(blob));
}
```

---

## Observações

- As imagens devem ser enviadas em formato Base64 para processamento correto.
- Certifique-se de que a URL da fonte é acessível diretamente para as rotas que utilizam fontes personalizadas.
- Enviar imagens grandes pode sobrecarregar o servidor e causar erros de processamento.

## Contribuição

Para contribuir, faça um fork do repositório, crie uma branch para suas mudanças e envie um pull request com uma breve descrição das melhorias.

## Licença

Este projeto é licenciado sob a [MIT License](./LICENSE).