# Image Wizard 📸🧙‍♂️

**Image Wizard** é uma API para criação e manipulação de imagens desenvolvida com Next.js e a biblioteca Sharp. A API fornece funcionalidades essenciais para criação e edição de imagens, como redimensionamento, adição de texto e sobreposição de imagens.

Este repositório é ideal para desenvolvedores que desejam adicionar funcionalidades de edição de imagem aos seus projetos com uma API fácil de usar. Todas as chamadas são feitas via `POST` e devem conter o corpo da requisição em JSON.

<p align="center">
<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvhratts%2Fimage-wizard">
<img src="https://vercel.com/button" alt="Deploy with Vercel"/>
</a>
</p>

## Endpoints

### 1. **Criar Imagem**

Cria uma imagem com tamanho e cor de fundo especificados.

- **URL**: `/api/image/create`
- **Método**: `POST`
- **Parâmetros**:
  - `width` (number, obrigatório): Largura da imagem em pixels.
  - `height` (number, obrigatório): Altura da imagem em pixels.
  - `backgroundColor` (string, obrigatório): Cor de fundo da imagem em formato hexadecimal (ex.: `#FF5733`).

#### Exemplo de Chamada

```typescript
import axios from 'axios';

async function createImage() {
  try {
    const response = await axios.post('/api/image/create', {
      width: 800,
      height: 600,
      backgroundColor: '#FF5733',
    }, {
      responseType: 'arraybuffer', // Para receber a imagem como binário
    });

    const blob = new Blob([response.data], { type: 'image/png' });
    console.log(URL.createObjectURL(blob));
  } catch (error) {
    console.error('Erro ao criar a imagem:', error);
  }
}
```

---

### 2. **Adicionar Texto à Imagem**

Adiciona texto em uma imagem, permitindo personalização de fonte, cor, posição e tamanho do texto.

- **URL**: `/api/image/add-text`
- **Método**: `POST`
- **Parâmetros**:
  - `imageBuffer` (string, obrigatório): Imagem base codificada em base64.
  - `fontUrl` (string, obrigatório): URL direta para download da fonte.
  - `text` (string, obrigatório): Texto a ser adicionado.
  - `color` (string, obrigatório): Cor do texto em hexadecimal (ex.: `#FFFFFF`).
  - `fontSize` (number, obrigatório): Tamanho da fonte em pixels.
  - `x` (number, obrigatório): Posição horizontal do texto na imagem.
  - `y` (number, obrigatório): Posição vertical do texto na imagem.

#### Exemplo de Chamada

```typescript
import axios from 'axios';

async function addTextToImage() {
  try {
    const response = await axios.post('/api/image/add-text', {
      imageBuffer: 'BASE64_IMAGE_STRING',
      fontUrl: 'https://example.com/path-to-font.woff2',
      text: 'Hello World',
      color: '#FFFFFF',
      fontSize: 24,
      x: 100,
      y: 100,
    }, {
      responseType: 'arraybuffer',
    });

    const blob = new Blob([response.data], { type: 'image/png' });
    console.log(URL.createObjectURL(blob));
  } catch (error) {
    console.error('Erro ao adicionar texto:', error);
  }
}
```

---

### 3. **Sobrepor Imagem**

Sobrepõe uma imagem em outra, em uma posição específica.

- **URL**: `/api/image/overlay-image`
- **Método**: `POST`
- **Parâmetros**:
  - `baseImageBuffer` (string, obrigatório): Imagem base codificada em base64.
  - `overlayImageBuffer` (string, obrigatório): Imagem a ser sobreposta codificada em base64.
  - `x` (number, obrigatório): Posição horizontal da imagem sobreposta.
  - `y` (number, obrigatório): Posição vertical da imagem sobreposta.

#### Exemplo de Chamada

```typescript
import axios from 'axios';

async function overlayImage() {
  try {
    const response = await axios.post('/api/image/overlay-image', {
      baseImageBuffer: 'BASE64_IMAGE_STRING',
      overlayImageBuffer: 'OVERLAY_IMAGE_BASE64_STRING',
      x: 50,
      y: 75,
    }, {
      responseType: 'arraybuffer',
    });

    const blob = new Blob([response.data], { type: 'image/png' });
    console.log(URL.createObjectURL(blob));
  } catch (error) {
    console.error('Erro ao sobrepor imagem:', error);
  }
}
```

---

### 4. **Redimensionar Imagem**

Redimensiona uma imagem para a largura e altura especificadas.

- **URL**: `/api/image/resize`
- **Método**: `POST`
- **Parâmetros**:
  - `imageBuffer` (string, obrigatório): Imagem a ser redimensionada codificada em base64.
  - `width` (number, obrigatório): Nova largura da imagem em pixels.
  - `height` (number, obrigatório): Nova altura da imagem em pixels.

#### Exemplo de Chamada

```typescript
import axios from 'axios';

async function resizeImage() {
  try {
    const response = await axios.post('/api/image/resize', {
      imageBuffer: 'BASE64_IMAGE_STRING',
      width: 400,
      height: 300,
    }, {
      responseType: 'arraybuffer',
    });

    const blob = new Blob([response.data], { type: 'image/png' });
    console.log(URL.createObjectURL(blob));
  } catch (error) {
    console.error('Erro ao redimensionar imagem:', error);
  }
}
```

---

## Observações Importantes

- **Formato de Imagem**: As imagens devem ser enviadas em formato base64 para o processamento correto.
- **Fonte Externa**: A URL da fonte para a rota `add-text` precisa ser direta, sem redirecionamentos.
- **Limitações de Tamanho**: Enviar imagens muito grandes pode causar sobrecarga no servidor, levando a erros.
- **Códigos de Erro**:
  - `400` - Parâmetros inválidos ou ausentes.
  - `500` - Erro no processamento da imagem.

---

## Contribuição

Sinta-se à vontade para contribuir com novas funcionalidades ou melhorias! Faça um fork do repositório, adicione suas modificações e envie um pull request. Sugestões e feedback são sempre bem-vindos.

## Licença

Este projeto é licenciado sob a [MIT License](./LICENSE).