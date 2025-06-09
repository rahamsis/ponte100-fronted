import { NextResponse } from "next/server";
import { fetchActiveSession } from "@/app/lib/session";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const sessionToken = url.searchParams.get("sessionToken");

    if (!sessionToken) return NextResponse.json({ error: "No session token" }, { status: 401 });

    try {
        const rows = await fetchActiveSession(sessionToken as string)

        if (!rows || rows.length === 0) {
            return NextResponse.json({ active: false }, { status: 401 });
        }

        return NextResponse.json({ active: true });
    } catch (error) {
        console.error("Error al obtener la sesión:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
