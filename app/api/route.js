export function GET() {
  return new Response(
    JSON.stringify({
      status: true,
      message: "API is running",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
