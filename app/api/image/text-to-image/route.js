import sharp from "sharp";
import fetch from "node-fetch";
import { registerFont, createCanvas } from "canvas";

export async function POST(req) {
  try {
    const { text, fontUrl, fontSize, fontColor } = await req.json();

    if (!text || !fontUrl || !fontSize || !fontColor) {
      return new Response("Parâmetros inválidos", { status: 400 });
    }

    // Baixar a fonte da URL
    const fontResponse = await fetch(fontUrl);
    const fontBuffer = await fontResponse.arrayBuffer();
    const fontPath = "/tmp/custom-font.ttf";

    // Registrar a fonte baixada
    const fs = require("fs");

    fs.writeFileSync(fontPath, Buffer.from(fontBuffer));

    registerFont(fontPath, { family: "CustomFont" });

    // Definir dimensões da imagem de acordo com o tamanho do texto
    const canvas = createCanvas(800, 200);
    const context = canvas.getContext("2d");

    context.font = `${fontSize}px CustomFont`;

    const textWidth = context.measureText(text).width;
    const textHeight = fontSize * 1.2;
    const imageWidth = textWidth + 20;
    const imageHeight = textHeight + 20;

    // Redimensionar o canvas e ajustar o texto
    const textCanvas = createCanvas(imageWidth, imageHeight);
    const textContext = textCanvas.getContext("2d");

    textContext.font = `${fontSize}px CustomFont`;
    textContext.fillStyle = fontColor;
    textContext.fillText(text, 10, textHeight);

    // Converter canvas para buffer de imagem com sharp
    const textBuffer = textCanvas.toBuffer();

    const image = await sharp(textBuffer).png().toBuffer();

    return new Response(image, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to create image: ${error.message}` }),
      {
        status: 500,
      },
    );
  }
}
