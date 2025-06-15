
/* eslint-disable */

import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { fetchUserLogin, fetchCreateSession, fetchActiveSession, saveVerificationToken } from "./session";
import { sendVerificationEmail } from './mailer';

type User = {
    id: string;
    email: string | null | undefined;
    name: string | null | undefined;
    providerId: string | null | undefined;
    userDevice: string | null | undefined;
    userIp: string | null | undefined;
    sessionToken?: string | null | undefined;
    welcome?: number | null | undefined;
    menu?:string[] | null | undefined;
};

declare module "next-auth" {
    interface Session {
        activeSession?: boolean;
        sessionToken?: string;
    }
}

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials: any) => {
                const { email, password, device, ip } = credentials;

                // Verificar que `device` e `ip` existen
                if (!device || !ip) {
                    throw new Error("Device or IP information is missing.");
                }

                try {
                    const user = await fetchUserLogin(email as string, password as string);

                    if (!user || user?.message) {
                        // return null;
                        throw new Error(user?.message || "Credenciales Invalidas")
                    };
                    
                    if (!user.verified) {
                        const verificationToken = crypto.randomUUID();
                        await saveVerificationToken(user.userId, verificationToken);
                        await sendVerificationEmail(email, verificationToken);

                        throw new Error("Verifica tu correo antes de iniciar sesión.");
                    }

                    const sessionToken = crypto.randomUUID(); // Token seguro
                    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 días

                    await fetchCreateSession(user.userId, device, ip, sessionToken, expires);

                    return { ...user, name: user.username, image: user.profile, sessionToken, id: user.userId, welcome: user.welcome, menu: user.menu }; // Pasar el token en el usuario
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(error.message || "Error. Credenciales Invalidas");
                    } else {
                        throw new Error("Error!. Credenciales Invalidas");
                    }
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sessionToken = (user as User).sessionToken || ""; // Guardar token en el JWT
                token.userId = (user as User).id || ""; // Agregar userId al token
                token.welcome = (user as User).welcome;
                token.menu = (user as User).menu || [];
            }

            try {
                const activeSession = token.sessionToken
                    ? await fetchActiveSession(token.sessionToken as string)
                    : null;

                token.activeSession = Array.isArray(activeSession)
                    ? activeSession.length > 0
                    : !!activeSession;
            } catch (error) {
                console.error("⚠️ Error al verificar sesión activa:", error);
                token.activeSession = false
            }

            return token;
        },
        async session({ session, token }) {
            session.activeSession = token.activeSession as boolean | undefined;
            session.sessionToken = token.sessionToken as string | undefined;
            // Asegurar que `session.user` existe y agregar `userId`
            session.user = session.user || {};
            session.user.userId = token.userId as string | undefined;
            session.user.welcome = token.welcome as number | undefined;
            session.user.menu = token.menu as string[] | undefined;
            return session;

        },
    },
};

export default authOptions;
