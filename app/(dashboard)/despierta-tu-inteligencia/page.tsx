'use client'

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SelectorOne from "@/app/components/selectors/selectorOne";

function Practica() {
    const router = useRouter();
    const [selectedTheme, setSelectedTheme] = useState<string>('');

    return (
        <div className="flex flex-col pt-14 pb-10">
            {/* Versión escritorio */}
            <section className="bg-postbanner pt-5">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                        <button className="flex flex-row" onClick={() => router.push('/actividades')}>
                            <ArrowLeft />
                            <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                                <span className="text-concepto text-opacity-50">Actividades/</span>Despierta tu inteligencia
                            </h2>
                        </button>
                    </div>

                    <div className="mx-8 lg:mx-3 pt-3 lg:pt-6">
                        <div className="text-button space-y-3">
                            <h2 className="font-bold text-xl">Despierta tu inteligencia</h2>
                            <p className="text-concepto">
                                ¿Alguna vez te has quedado en blanco al tratar de recordar una palabra o una idea importante? Una forma
                                efectiva de evitarlo es aprendiendo a conectar palabras dentro de un texto. Este método no solo mejora tu memoria, sino que también
                                fortalece tu capacidad de comprensión y análisis. Solo debes seleccionar el tema que deseas practicar junto con el número de preguntas
                                que deseas.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-3 mt-3 rounded-2xl border lg:mt-10 lg:p-10 mx-3 lg:mx-0">
                        <h2 className="text-xl font-bold mb-4 text-secondary">Empieza a practicar</h2>
                        <div className='text-primary font-semibold'>
                            <h2>selecciona un tema</h2>
                            <SelectorOne onThemeSelect={setSelectedTheme} />
                        </div>
                        <div className="mt-3 lg:mt-10">
                            <button
                            disabled={selectedTheme===''}
                                onClick={() => router.push(`despierta-tu-inteligencia/${selectedTheme}`)}
                                className={`px-4 py-2 rounded-lg ${selectedTheme==='' && "bg-opacity-30"} bg-green-600 text-white`}
                            >
                                Iniciar práctica
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function DespiertaTuInteligencia() {
    return (
        <>
            <Practica />
        </>
    )
}