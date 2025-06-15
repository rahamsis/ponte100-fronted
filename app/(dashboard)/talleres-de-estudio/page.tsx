'use client'

/* eslint-disable */

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTalleres } from "@/app/hooks/useTalleres";

type Taller = {
    idTaller: string;
    nombre: string;
    tallerActivo: boolean;
    clases: Clase[];
};

type Clase = {
    idClase: number;
    nombre: string;
    sesiones: Sesion[];
};

type Sesion = {
    nombre: string;
    indice: number;
    limit: number;
    offset: number;
};

// const talleresData = Array.from({ length: 5 }, (_, tIndex) => ({
//     idTaller: tIndex,
//     nombre: `Taller ${tIndex + 1}`,
//     clases: Array.from({ length: 5 }, (_, cIndex) => ({
//         idClase: cIndex + 1,
//         nombre: `Clase ${cIndex + 1}`,
//         sesiones: Array.from({ length: 3 }, (_, sIndex) => ({
//             nombre: `Sesión ${sIndex + 1}`,
//             limit: (sIndex === 2 ? 40 : 30),
//             offset: (sIndex === 0 ? 0 : sIndex === 1 ? 30 : 60),
//         })),
//     })),
// }));

function Practica() {
    const { data: session } = useSession();
    const userId = session?.user?.userId;

    const router = useRouter();

    const { data: talleres, isLoading } = useTalleres(userId ?? "123")


    const [tallerAbierto, setTallerAbierto] = useState<number | null>(null);
    const [clasesAbiertas, setClasesAbiertas] = useState<Record<number, number | null>>({});

    function handleEmpezar(idTaller: number, limit: number, offset: number) {
        router.push(`talleres-de-estudio/${idTaller}/${limit}/${offset}`)
    }

    return (
        <div className="flex flex-col pt-14 pb-10">
            {/* Versión escritorio */}
            <section className="bg-postbanner pt-5">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                        <button className="flex flex-row" onClick={() => router.push('/actividades')}>
                            <ArrowLeft />
                            <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                                <span className="text-concepto text-opacity-50">Actividades/</span>Taller de estudio
                            </h2>
                        </button>
                    </div>

                    <div className="mx-8 lg:mx-3 pt-3 lg:pt-6">
                        <div className="text-button space-y-3">
                            <h2 className="font-bold text-xl">Taller de estudio</h2>
                            <p className="text-concepto">
                                Refuerza lo aprendido en cada sesión con nuestros simuladores SIECOPOL diseñados para activar tus
                                redes neuronales, consolidar el conocimiento y lograr un aprendizaje duradero. Cada práctica está basada
                                en principios de la neurociencia para que aprendas de forma más rápida, significativa y eficaz.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xl p-4 space-y-4">
                        {
                            isLoading ? (<div className="flex min-h-[80vh] items-center justify-center">
                                <div className="text-center">
                                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent">
                                        <span className="sr-only">Cargando...</span>
                                    </div>
                                    <p className="mt-4 text-button">Cargando Talleres...</p>
                                </div>
                            </div>
                            ) : (
                                talleres.map((taller: Taller, i: number) => (
                                    <div key={i} className="border rounded-lg shadow-md p-4 bg-white">
                                        {/* Header del taller */}
                                        <div
                                            className="flex justify-between items-center cursor-pointer"
                                            onClick={() => {
                                                taller.tallerActivo &&
                                                setTallerAbierto(tallerAbierto === i ? null : i)
                                            }}
                                        >
                                            <div>
                                                <div className="flex flex-row items-start space-x-3 mb-3">
                                                    <Image src="/assets/frames/frame15.png" alt="frame15" width={30} height={30} className="" />
                                                    <div>
                                                        <h2 className="font-semibold text-primary">{taller.nombre}</h2>
                                                        <p className="text-sm text-gray-500">
                                                            {taller.clases.length} clases - {taller.clases.length * 3} sesiones
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <span>{tallerAbierto === i ? <ChevronUp/> : <ChevronDown className={`${taller.tallerActivo ? "" : "text-gray-300"}`}/>}</span>
                                        </div>

                                        {/* Clases del taller */}
                                        {tallerAbierto === i && (
                                            <div className="mt-4 space-y-4">
                                                {taller.clases.map((clase: Clase, j: number) => (
                                                    <div key={j} className="">
                                                        {/* Header de clase */}
                                                        <div
                                                            className="px-4 py-2 flex justify-between items-center cursor-pointer"
                                                            onClick={() =>
                                                                setClasesAbiertas((prev: Record<number, number | null>) => ({
                                                                    ...prev,
                                                                    [i]: prev[i] === j ? null : j,
                                                                }))
                                                            }
                                                        >
                                                            <span>{clase.nombre}</span>
                                                            <span>{clasesAbiertas[i] === j ? <ChevronUp /> : <ChevronDown />}</span>
                                                        </div>

                                                        {/* Sesiones de clase */}
                                                        {clasesAbiertas[i] === j && (
                                                            <div className="p-4 space-y-2">
                                                                {clase.sesiones.map((sesion: Sesion, k: number) => (
                                                                    <div
                                                                        key={k}
                                                                        className="flex justify-between items-center border rounded-lg p-2"
                                                                    >
                                                                        <div className="flex flex-row items-center space-x-3">
                                                                            <Image src="/assets/frames/frame16.png" alt="frame15" width={15} height={15} className="" />
                                                                            <span>{sesion.nombre}</span>
                                                                        </div>
                                                                        <button
                                                                            // onClick={() => handleEmpezar((clase.idClase + (taller.clases.length * taller.idTaller)), sesion.limit, sesion.offset)}
                                                                            onClick={() => handleEmpezar(sesion.indice, sesion.limit, sesion.offset)}
                                                                            className="bg-button text-white px-4 py-1 rounded-md hover:bg-blue-700">
                                                                            Empezar
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function TalleresDeEstudio() {
    return (
        <>
            <Practica />
        </>
    )
}