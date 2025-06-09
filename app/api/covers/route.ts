import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

export const dynamic = "force-dynamic";

const pipelineAsync = promisify(pipeline);

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
    const R2_BUCKET_NAME = searchParams.get("bucket");
    const fileName = searchParams.get("file")?.replace(".pdf", "");

    if (!R2_BUCKET_NAME) {
        return NextResponse.json({ error: "El parámetro 'bucket' es requerido" }, { status: 400 });
      }

    if (!fileName) {
      return NextResponse.json({ error: "El parámetro 'file' es requerido" }, { status: 400 });
    }

    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
    });

    const { Body } = await s3.send(command);

    if (!Body) {
      return NextResponse.json({ error: "No se pudo obtener el archivo" }, { status: 404 });
    }

    // Ruta donde se guardará la imagen en el servidor local
    const filePath = path.join(process.cwd(), "public", "images", "covers", fileName);

    // Asegurar que el directorio existe
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Guardar el archivo localmente
    await pipelineAsync(Body as NodeJS.ReadableStream, fs.createWriteStream(filePath));

    return NextResponse.json({ success: true, filePath: `/images/covers/${fileName}` });
  } catch (error) {
    console.error("❌ Error al descargar la imagen:", error);
    return NextResponse.json({ error: "No se pudo descargar la imagen" }, { status: 500 });
  }
}
