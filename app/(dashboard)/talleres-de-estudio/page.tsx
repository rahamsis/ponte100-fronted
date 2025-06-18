'use client'

/* eslint-disable */

import { useState,  } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTalleres } from "@/app/hooks/useTalleres";
import ExportPDFButton from "@/app/components/buttons/exportPdfButton";

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
                                            <span>{tallerAbierto === i ? <ChevronUp /> : <ChevronDown className={`${taller.tallerActivo ? "" : "text-gray-300"}`} />}</span>
                                        </div>

                                        {/* Clases del taller */}
                                        {tallerAbierto === i && (
                                            <div className="mt-4 space-y-4">
                                                {taller.clases.map((clase: Clase, j: number) => (
                                                    <div key={j} className="">
                                                        {/* Header de clase */}
                                                        <div className="flex">
                                                            <div className={`${session?.user?.perfil === "PF0003" && "hidden"}`}>
                                                                <div className="">
                                                                    <ExportPDFButton data={{ idClase: clase.idClase, tallerName: taller.nombre, claseName: clase.nombre  }} className="bg-red-500 p-1 text-white rounded-md ml-2">
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
                                                                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                                                                                <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                                                                            </svg>
                                                                        </span>

                                                                    </ExportPDFButton >
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="px-4 flex w-full justify-between items-center cursor-pointer"
                                                                onClick={() =>
                                                                    setClasesAbiertas((prev: Record<number, number | null>) => ({
                                                                        ...prev,
                                                                        [i]: prev[i] === j ? null : j,
                                                                    }))
                                                                }
                                                            >

                                                                <div>{clase.nombre}</div>
                                                                <span>{clasesAbiertas[i] === j ? <ChevronUp /> : <ChevronDown />}</span>
                                                            </div>
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