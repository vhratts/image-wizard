import sharp from "sharp";

export async function POST(req) {
  try {
    const { width, height, color } = await req.json();

    if (!width || !height || !color) {
      return new Response(
        JSON.stringify({ error: "Width, height, and color are required" }),
        { status: 400 },
      );
    }

    const imageBuffer = await sharp({
      create: {
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        channels: 4,
        background: color,
      },
    })
      .png()
      .toBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "s-maxage=2592000, stale-while-revalidate=2592000",
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
