import fs from "fs";

import sharp from "sharp";
import { createCanvas, loadImage, registerFont } from "canvas";
import fetch from "node-fetch";
// import path from "path";
import tmp from "tmp";

export async function POST(req) {
  try {
    const { imageBuffer, fontUrl, text, color, fontSize, x, y } =
      await req.json();

    if (
      !imageBuffer ||
      !fontUrl ||
      !text ||
      !color ||
      !fontSize ||
      x == null ||
      y == null
    ) {
      return new Response(
        JSON.stringify({ error: "All parameters are required" }),
        { status: 400 }
      );
    }

    // Baixar a fonte antes de processar a imagem
    const fontResponse = await fetch(fontUrl);

    if (!fontResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to download the font" }),
        { status: 400 }
      );
    }

    // Salvar o conteúdo da fonte em um arquivo temporário
    // const fontBuffer = await fontResponse.arrayBuffer();
    const fontBuffer = await fontResponse.buffer();

    const tmpFile = tmp.fileSync({ postfix: ".woff2" });

    fs.writeFileSync(tmpFile.name, fontBuffer);

    // Registrar a fonte baixada
    registerFont(tmpFile.name, { family: "CustomFont" });

    // Carregar a imagem base
    const baseImage = await sharp(
      Buffer.from(imageBuffer, "base64")
    ).toBuffer();
    const { width, height } = await sharp(baseImage).metadata();

    // Criar o canvas e o contexto
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const img = await loadImage(baseImage);

    // Desenhar a imagem base no canvas
    ctx.drawImage(img, 0, 0, width, height);

    // Definir o estilo de fonte
    ctx.font = `${fontSize}px CustomFont`;
    ctx.fillStyle = color;

    // Adicionar o texto à imagem
    ctx.fillText(text, x, y);

    // Converter o canvas em buffer de imagem
    const textImageBuffer = canvas.toBuffer();

    // Limpar o arquivo temporário
    tmpFile.removeCallback();

    return new Response(textImageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "s-maxage=3599, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to create image: ${error.message}` }),
      {
        status: 500,
      }
    );
  }
}
