// export async function GET() {
//   const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/stream`, {
//     headers: {
//       Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_TOKEN}`,
//     },
//   });

//   const data = await res.json();

//   return Response.json(data.result); // devuelve solo la lista de videos
// }

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { creator } = body;

//   if (!creator) {
//     return Response.json({ error: "Faltan campos obligatorios" }, { status: 400 });
//   }

//   const cloudflareRes = await fetch(
//     `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/stream/direct_upload`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         maxDurationSeconds: 7200,
//         meta: {
//           creator,
//         },
//       }),
//     }
//   );

//   const data = await cloudflareRes.json();

//   if (!data.success || !data.result) {
//     return Response.json(
//       { error: "Falló la creación del uploadURL", details: data },
//       { status: 500 }
//     );
//   }

//   return Response.json({
//     uploadURL: data.result.uploadURL,
//     uid: data.result.uid,
//   });
// }

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.APP_BACK_END}/videos`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
        // Authorization si usas JWT
        // 'Authorization': `Bearer ${token}`
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Error obteniendo videos');
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { error: 'No se pudieron cargar los videos' },
      { status: 500 }
    );
  }
}
