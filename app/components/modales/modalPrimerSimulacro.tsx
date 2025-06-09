'use client'

/* eslint-disable */

import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { usePrimerSimulacroStore } from "@/app/lib/stores/primerSimulacro";
import { useRouter } from 'next/navigation';

interface ModalTuPrimerSimulacro {
    onClose: () => void;
    extra: string;
    // router?: any;
}

export const ModalPrimerSimulacro = ({ onClose, extra }: ModalTuPrimerSimulacro) => {
    const router = useRouter();

    const [codeSimulador, setCodeSimulado] = useState('SM001')
    const [quantity, setQuantity] = useState(50);

    const selectedSimulador = (code: string) => {
        setCodeSimulado(code)
    }

    const selectedQuantity = (quantity: number) => {
        setQuantity(quantity)
    }

    const handleNavigation = () => {
        // Zustand (primario)
        usePrimerSimulacroStore.getState().setParams({ codeSimulador, quantity });

        // SessionStorage (fallback para recargas)
        sessionStorage.setItem('primerSimulacroParams', JSON.stringify({
            codeSimulador,
            quantity
        }));

        router.push("primer-simulacro");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-3 lg:mx-0">
                <h2 className="text-xl font-bold mb-4 text-secondary">genera tu primer simulacro</h2>
                <div className='text-primary font-semibold'>
                    <h2>selecciona un simulador</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
                        <div className={`${codeSimulador === 'SM001' ? "border-2 border-green-600" : "border"} text-center  rounded-lg py-2`}>
                            <button onClick={() => selectedSimulador('SM001')} className={`${codeSimulador === 'SM001' ? " text-green-600" : "text-concepto"} w-full`}>Ponte 100</button>
                        </div>
                        <div className={`${codeSimulador === 'SM002' ? "border-2 border-green-600" : "border"} text-center  rounded-lg py-2`}>
                            <button onClick={() => selectedSimulador('SM002')} className={`${codeSimulador === 'SM002' ? " text-green-600" : "text-concepto"} w-full`}>RCG</button>
                        </div>
                        <div className={`${codeSimulador === 'SM003' ? "border-2 border-green-600" : "border"} text-center  rounded-lg py-2`}>
                            <button onClick={() => selectedSimulador('SM003')} className={`${codeSimulador === 'SM003' ? " text-green-600" : "text-concepto"} w-full`}>SIECOPOL-PNP</button>
                        </div>
                    </div>
                </div>
                <div className='text-sm md:text-base text-primary font-semibold mt-5'>
                    <h2>Selecciona un número total de preguntas que deseas</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
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
                            <Clock /> <h1>{quantity === 50 ? '1 Hora' : '2 horas'}</h1>
                        </label>
                    </div>
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
                        className={` px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700`}
                    >
                        Iniciar Práctica
                    </button>
                </div>
            </div>
        </div>
    );
};