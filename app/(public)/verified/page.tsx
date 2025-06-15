
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifiedPage() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/"); // Después de 3 segundos redirige al login
        }, 3000);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-green-600">✅ Cuenta Verificada</h2>
                <p className="text-gray-600 mt-2">Tu cuenta ha sido verificada correctamente.</p>
                <p className="text-gray-500 text-sm mt-1">Seras redireccionado en 3 segundos al login</p>
                <button
                    onClick={() => router.push("/")}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                >
                    Ir al Login
                </button>
            </div>
        </div>
    );
}
