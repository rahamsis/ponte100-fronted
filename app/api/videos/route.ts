export async function GET() {
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/stream`, {
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_TOKEN}`,
    },
  });

  const data = await res.json();

  return Response.json(data.result); // devuelve solo la lista de videos
}
