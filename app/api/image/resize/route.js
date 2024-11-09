import sharp from "sharp";

export async function POST(req) {
  try {
    const { imageBuffer, width, height } = await req.json();

    if (!imageBuffer || !width || !height) {
      return new Response("Parâmetros inválidos", { status: 400 });
    }

    const buffer = Buffer.from(imageBuffer, "base64");
    const resizedImage = await sharp(buffer).resize(width, height).toBuffer();

    return new Response(resizedImage, {
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
