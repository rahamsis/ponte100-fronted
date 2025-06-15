import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    // Obtener token con req
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.redirect(new URL("/", req.url));

    try {
        // Lógica existente para validar que la sesión está activ
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/session?sessionToken=${token.sessionToken}`);
        const data = await res.json();

        if (!data.active) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        const pathname = req.nextUrl.pathname;
        const welcomeCookie = req.cookies.get("welcome");

        // ✅ Permitir el acceso a /bienvenida si welcome es 0
        if (welcomeCookie?.value === "0" && (!pathname.startsWith("/bienvenida"))) {
            return NextResponse.redirect(new URL("/bienvenida", req.url));
        }

        if(pathname.startsWith("/bienvenida") && welcomeCookie?.value !== "0"){
             return NextResponse.redirect(new URL("/inicio", req.url));
        }

    } catch (error) {
        console.error("Error en el middleware:", error);
        return NextResponse.redirect(new URL("/error", req.url));
    }

    return NextResponse.next();
}

export const config = {
    // runtime: "nodejs",
    matcher: [
        '/actividades',
        '/bienvenida', '/bienvenida/:idGrado*',
        '/control-de-habilidades','/control-de-habilidades/:idTema*',
        '/despierta-tu-inteligencia','/despierta-tu-inteligencia/:idTema*',
        '/estadisticas',
        '/examenes-no-repetidos','/examenes-no-repetidos/:idExamen*',
        '/inicio', 
        '/practica-un-tema', 
        '/preguntas-fallidas', 
        '/primer-simulacro', 
        '/primera-practica',
        '/progreso', 
        '/registro', 
        '/result', 
        '/talleres-de-estudio', '/talleres-de-estudio/:idTema*',
        '/temario',
        '/videos',
        '/configuracion',
    ],
};
