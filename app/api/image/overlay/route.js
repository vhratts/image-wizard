import sharp from "sharp";

export async function POST(req) {
  try {
    const { baseImageBuffer, overlayImageBuffer, x, y } = await req.json();

    if (!baseImageBuffer || !overlayImageBuffer || x == null || y == null) {
      return new Response(
        JSON.stringify({
          error: "Base image, overlay image, x, and y are required",
        }),
        { status: 400 },
      );
    }

    const baseImage = sharp(Buffer.from(baseImageBuffer, "base64"));
    const overlayImage = await sharp(
      Buffer.from(overlayImageBuffer, "base64"),
    ).toBuffer();

    const compositeImage = await baseImage
      .composite([{ input: overlayImage, left: x, top: y }])
      .toBuffer();

    return new Response(compositeImage, {
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
