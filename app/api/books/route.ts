// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const res = await fetch(`${process.env.APP_BACK_END}/banco-preguntas`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//         // Authorization si usas JWT
//         // 'Authorization': `Bearer ${token}`
//       },
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       throw new Error('Error obteniendo el banco de preguntas');
//     }

//     const data = await res.json();
//     return NextResponse.json(data);

//   } catch (error) {
//     return NextResponse.json(
//       { error: 'No se pudo cargar el banco de preguntas: ' + error },
//       { status: 500 }
//     );
//   }
// }