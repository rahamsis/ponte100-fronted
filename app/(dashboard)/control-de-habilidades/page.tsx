'use client'

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import SelectorOne from "@/app/components/selectors/selectorOne";

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

function Practica() {
    const router = useRouter();
    const [selectedTheme, setSelectedTheme] = useState<string>('');
    const [quantity, setQuantity] = useState(0);

    const selectedQuantity = (quantity: number) => {
        setQuantity(quantity)
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
                                <span className="text-concepto text-opacity-50">Actividades/</span>Control de habilidades
                            </h2>
                        </button>
                    </div>

                    <div className="mx-8 lg:mx-3 pt-3 lg:pt-6">
                        <div className="text-button space-y-3">
                            <h2 className="font-bold text-xl">Control de habilidades</h2>
                            <p className="text-concepto">
                                Pon a prueba tu memoria con prácticas diseñadas bajo nuestro método. Cada Practica tiene un tiempo límite para ayudarte a
                                concentrarte, retener y recuperar información con mayor agilidad.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-3 mt-3 mx-4 lg:mx-0 rounded-2xl border lg:mt-10 lg:p-10">
                        <h2 className="text-xl font-bold mb-4 text-secondary">Empieza a practicar</h2>
                        <div className='text-primary font-semibold'>
                            <h2 className="my-2">selecciona un tema</h2>
                            <SelectorOne onThemeSelect={setSelectedTheme} />
                        </div>

                        <div className='text-sm md:text-base text-primary font-semibold mt-5'>
                            <h2>Selecciona un número total de preguntas que deseas</h2>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
                                <div className={`${quantity === 10 ? "border-2 border-green-600" : "border"} text-center  rounded-lg py-2`}>
                                    <button onClick={() => selectedQuantity(10)} className={`${quantity === 10 ? " text-green-600" : "text-concepto"} w-full`}>10 preguntas</button>
                                </div>
                                <div className={`${quantity === 20 ? "border-2 border-green-600" : "border"} text-center rounded-lg py-2`}>
                                    <button onClick={() => selectedQuantity(20)} className={`${quantity === 20 ? " text-green-600" : "text-concepto"} w-full`}>20 preguntas</button>
                                </div>
                                <div className={`${quantity === 50 ? "border-2 border-green-600" : "border"} text-center rounded-lg py-2`}>
                                    <button onClick={() => selectedQuantity(50)} className={`${quantity === 50 ? " text-green-600" : "text-concepto"} w-full`}>50 preguntas</button>
                                </div>
                                <div className={`${quantity === 100 ? "border-2 border-green-600" : "border"} text-center rounded-lg py-2`}>
                                    <button onClick={() => selectedQuantity(100)} className={`${quantity === 100 ? " text-green-600" : "text-concepto"} w-full`}>100 preguntas</button>
                                </div>
                            </div>
                        </div>

                        <div className='text-primary pt-3'>
                            <h2>Tiempo</h2>
                            <div className="text-gray3 pt-3">
                                <label className="flex flex-row border rounded-lg py-2 px-5 w-full lg:w-3/12 space-x-3">
                                    <Clock /> <h1>{quantity > 0 ? formatTime(quantity * 6) : "--:--:--"} </h1>
                                </label>
                            </div>
                        </div>

                        <div className="mt-3 lg:mt-10">
                            <button
                                disabled={(selectedTheme === '' || quantity <= 0)}
                                onClick={() => router.push(`control-de-habilidades/${selectedTheme}/${quantity}`)}
                                className={`px-4 py-2 rounded-lg ${(selectedTheme === '' || quantity <= 0) && "bg-opacity-30"} bg-green-600 text-white`}
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

export default function ControlDeHabilidades() {
    return (
        <>
            <Practica />
        </>
    )
}