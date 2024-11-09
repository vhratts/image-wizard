# Image Wizard 📸🧙‍♂️

**Image Wizard** é uma API para criação e manipulação de imagens desenvolvida com Next.js e a biblioteca Sharp. A API fornece funcionalidades essenciais para criação e edição de imagens, como redimensionamento, adição de texto e sobreposição de imagens.

Este repositório é ideal para desenvolvedores que desejam adicionar funcionalidades de edição de imagem aos seus projetos com uma API fácil de usar. Todas as chamadas são feitas via `POST` e devem conter o corpo da requisição em JSON.

<p align="center">
<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvhratts%2Fimage-wizard">
<img src="https://vercel.com/button" alt="Deploy with Vercel"/>
</a>
</p>

## Estrutura de rotas

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
│   │   │   └── convert/route.js         # Converte a imagem
```

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

## Observações

- As imagens devem ser enviadas em formato Base64 para processar corretamente.
- Para a rota `add-text`, certifique-se de que a URL da fonte é acessível diretamente.
- Enviar imagens grandes pode sobrecarregar o servidor.

## Contribuição

Para contribuir, faça um fork do repositório, crie uma branch para suas mudanças e envie um pull request com uma breve descrição das melhorias.

## Licença

Este projeto é licenciado sob a [MIT License](./LICENSE).