'use client'

/* eslint-disable */

import { Clock, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { usePreguntasFallidasStore } from "@/app/lib/stores/preguntasfallidas";
import { useRouter } from 'next/navigation';

interface ModalPreguntasFallidas {
    onClose: () => void;
    extra: string;
    // router?: any;
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const ModalPreguntasFalladas = ({ onClose, extra }: ModalPreguntasFallidas) => {
    const router = useRouter();
    
    // const [selectedTheme, setSelectedTheme] = useState<string>('');

    const [quantity, setQuantity] = useState(0);
    const [failledQuantity, setFailledQuantity] = useState('0');
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() =>{
        setFailledQuantity(extra)
    })

    const selectedQuantity = (quantity: number) => {
        setQuantity(quantity)
    }

    const handleNavigation = () => {
        if (quantity <= 0) {
            setShowAlert(true)
            return;
        }

        setShowAlert(false);
        // Zustand (primario)
        usePreguntasFallidasStore.getState().setParams({failledQuantity, quantity  });

        // SessionStorage (fallback para recargas)
        sessionStorage.setItem('preguntasFallidasParams', JSON.stringify({
            failledQuantity,
            quantity
        }));

        router.push("preguntas-fallidas");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-3 lg:mx-0">
                <h2 className="text-xl font-bold mb-4 text-secondary">Practica las preguntas falladas</h2>
                <div className='text-primary font-semibold'>
                    <h2 className="text-red-500 text-sm">Total de preguntas fallidas: {extra}</h2>
                    {/* <SelectorOne onThemeSelect={setSelectedTheme} /> */}
                </div>

                <div className='text-sm md:text-base text-primary font-semibold mt-5'>
                    <h2>Selecciona un número total de preguntas que deseas</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-3">
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
                            <Clock /> <h1>{quantity > 0 ? formatTime(quantity * 6) : "--:--:--"} </h1> {/* Paso el numero de preguntas por el tiempo oficial que es 72 */}
                        </label>
                    </div>
                </div>

                <div className="flex flex-row text-button text-xs font-semibold bg-timeexpired bg-opacity-10 py-2 px-5 rounded-lg mt-5 space-x-3">
                    <Info className=""/>
                    <div>Recuerda: Necesitas responder 2 veces una pregunta para eliminarla, si fallas se reinicia tus intento sobre la pregunta</div>
                </div>

                <div className="flex-grow border-b my-6"></div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleNavigation}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Iniciar práctica
                    </button>
                </div>

                {showAlert && (
                    <div className="text-center pt-4">
                        <p className="text-xs text-red-500">Selecciona una cantidad válida para continuar</p>
                    </div>
                )}
            </div>
        </div>
    );
};