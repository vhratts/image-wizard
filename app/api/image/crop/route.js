import sharp from "sharp";

export async function POST(req) {
  try {
    const { imageBuffer, width, height, left, top } = await req.json();

    if (
      !imageBuffer ||
      !width ||
      !height ||
      left === undefined ||
      top === undefined
    ) {
      return new Response("Parâmetros inválidos", { status: 400 });
    }

    const buffer = Buffer.from(imageBuffer, "base64");
    const croppedImage = await sharp(buffer)
      .extract({ width, height, left, top })
      .toBuffer();

    return new Response(croppedImage, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=3600",
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
