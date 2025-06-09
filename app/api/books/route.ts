import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export const dynamic = "force-dynamic";

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
// const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_ENDPOINT = process.env.R2_ENDPOINT;

// Configurar el cliente S3 para Cloudflare R2
const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID!,
    secretAccessKey: R2_SECRET_ACCESS_KEY!,
  },
});

// Handler para la petición GET
export async function GET(req: Request) {
  try {
    // Obtener el parámetro `bucket` desde la URL
    const { searchParams } = new URL(req.url);
    const R2_BUCKET_NAME = searchParams.get("bucket");

    if (!R2_BUCKET_NAME) {
      return NextResponse.json({ error: "El parámetro 'bucket' es requerido" }, { status: 400 });
    }

    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
    });

    const { Contents } = await s3.send(command);

    if (!Contents) {
      return NextResponse.json({ books: [] });
    }

    
    // Convertir los archivos en un array de objetos con su URL
    const books = Contents.map((file) => ({
      name: file.Key,
      url: file.Key ? `/api/book?file=${encodeURIComponent(file.Key)}&bucket=${R2_BUCKET_NAME}` : '',
    }));

    return NextResponse.json({ books });
  } catch (error) {
    console.error("❌ Error al obtener los libros:", error);
    return NextResponse.json({ error: "No se pudo obtener la lista de libros" }, { status: 500 });
  }
}
