"use client"

import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { getGradosById } from '@/app/lib/actions';
import { use } from 'react';
import { Check } from 'lucide-react';
import { signIn, useSession } from "next-auth/react";
import { updateGradoByUserId } from '@/app/lib/actions';
import Cookies from 'js-cookie';

interface Grado {
    idGrado: string;
    nombreGrado: string;
    estado: number;
    imagen: string;
}

export default function Grado({ params }: { params: Promise<{ idGrado: string }> }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [grado, setGrado] = useState<Grado | null>(null);
    const { idGrado } = use(params);

    // llenar los grados
    useEffect(() => {
        async function fetchData() {
            if (!idGrado) return;
            try {
                // const data = await getTemas();
                const data = await getGradosById(idGrado);
                setGrado(data[0]);
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            }
        }
        fetchData();
    }, [idGrado]);

    const handleFinalizar = async () => {
        if (!session?.user?.userId || !idGrado) {
            console.warn("Sesión o idGrado no disponible");
            return;
        }

        await updateGradoByUserId(session.user.userId, idGrado);
        Cookies.remove("welcome"); // eliminar cookie
        router.push('/inicio');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-12">
            <div className="flex flex-row">
                {/* Selector de rango */}
                <div className="w-full max-w-md lg:max-w-2xl mb-8 lg:mb-24">
                    <label htmlFor="idGrado" className="block text-xl font-bold  text-button mt-2 mb-6">
                        Comienza a practicar para alcanzar tu objetivo.
                    </label>
                    <div className="flex flex-row my-4">
                        <Check className="text-green-500" />
                        <p className="ml-2 text-primary">Accede a todos nuestros simuladores tipo SIECOPOL.</p>
                    </div>
                    <div className="flex flex-row my-4">
                        <Check className="text-green-500" />
                        <p className="ml-2 text-primary">Accede a un Banco inmenso de preguntas actualizadas.</p>
                    </div>
                    <div className="flex flex-row my-4">
                        <Check className="text-green-500" />
                        <p className="ml-2 text-primary">Mejora tu rapidez en responder las preguntas con nuestra práctica de control de habilidad.</p>
                    </div>
                    <div className="flex flex-row my-4">
                        <Check className="text-green-500" />
                        <p className="ml-2 text-primary">Repasa las preguntas que fallaste.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mx-4 lg:px-10 px-5 border bg-white border-gray-200  rounded-xl">
                    {/* Imagen del escudo */}
                    <Image
                        src={grado?.imagen ?? "/images/grados/GR0001.png"}
                        alt="grados"
                        width={80}
                        height={80}
                        className="mb-4"
                    />
                    <p className='flex flex-wrap '>{grado ? grado.nombreGrado : "Cargando..."}</p>
                </div>
            </div>

            <div className='flex mt-6 space-x-4'>
                {/* Botón de continuar */}
                <button
                    onClick={router.back}
                    className={`px-10 py-1 border-2 border-secondary rounded-md text-secondary font-semibold transition-colors`}
                >
                    Anterior
                </button>
                {/* Botón de continuar */}
                <button
                    onClick={handleFinalizar}
                    className={` px-6 py-2 rounded-md bg-green-600 text-white font-semibold transition-colors`}
                >
                    Finalizar
                </button>
            </div>
        </div>
    )
}