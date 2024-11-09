import sharp from "sharp";

export async function POST(req) {
  try {
    const { imageBuffer, format } = await req.json();

    if (!imageBuffer || !["jpeg", "png", "webp"].includes(format)) {
      return new Response("Parâmetros inválidos", { status: 400 });
    }

    const buffer = Buffer.from(imageBuffer, "base64");
    const convertedImage = await sharp(buffer).toFormat(format).toBuffer();

    return new Response(convertedImage, {
      status: 200,
      headers: { 
        "Content-Type": `image/${format}`,
        "Cache-Control": "s-maxage=3599, stale-while-revalidate=3600",
      },
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
