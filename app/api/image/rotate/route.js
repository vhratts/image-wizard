import sharp from "sharp";

export async function POST(req) {
  try {
    const { imageBuffer, angle } = await req.json();

    if (!imageBuffer || angle === undefined) {
      return new Response("Parâmetros inválidos", { status: 400 });
    }

    const buffer = Buffer.from(imageBuffer, "base64");
    const rotatedImage = await sharp(buffer).rotate(angle).toBuffer();

    return new Response(rotatedImage, {
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
