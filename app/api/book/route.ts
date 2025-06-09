import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const dynamic = "force-dynamic";

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_ENDPOINT = process.env.R2_ENDPOINT!;

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("file");
    const R2_BUCKET_NAME = searchParams.get("bucket");

    if (!R2_BUCKET_NAME) {
      return NextResponse.json({ error: "El parámetro 'bucket' es requerido" }, { status: 400 });
    }

    if (!fileName) {
      return NextResponse.json({ error: "Falta el parámetro file" }, { status: 400 });
    }

    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
    });

    const { Body, ContentType } = await s3.send(command);

    if (!Body) {
      return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
    }

    return new Response(Body as any, {
      headers: {
        "Content-Type": ContentType || "application/pdf",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    console.error("❌ Error al obtener el archivo:", error);
    return NextResponse.json({ error: "No se pudo obtener el archivo" }, { status: 500 });
  }
}
