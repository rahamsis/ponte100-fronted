import { NextRequest, NextResponse } from "next/server";
import { fetchEmailVerification } from "@/app/lib/session";
import { updateUserDeleteEmailVerification } from "@/app/lib/session";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const sessionToken = url.searchParams.get("sessionToken");

    if (!sessionToken) return NextResponse.json({ error: "Token inválido" }, { status: 401 });

    try {
        const user = await fetchEmailVerification(sessionToken as string);
        
        if (!user || user.length === 0) {
            return NextResponse.json({ message: "Token no válido o expirado." }, { status: 400 });
        }

        await updateUserDeleteEmailVerification(user[0].userId, sessionToken);

        return NextResponse.redirect(new URL("/verified", req.url)); // Redirige a login después de verificar
    } catch (error) {
        console.error("Error al obtener la sesión:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
