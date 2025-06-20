import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userId?: string | null;
      welcome?: number | null;
      menu?: string[] | null;
      perfil?: string | null;
    };
  }
}