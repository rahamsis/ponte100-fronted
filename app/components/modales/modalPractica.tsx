'use client'
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import SelectorOne from "../selectors/selectorOne";
import { usePracticeStore } from "@/app/lib/stores/practice";
import { useRouter } from 'next/navigation'; 

interface ModalPractica {
    onClose: () => void;
    extra: string;
    // router?: any;
}

export const ModalPracticaTema = ({ onClose, extra }: ModalPractica) => {
     const router = useRouter();

    const [selectedTheme, setSelectedTheme] = useState<string>('');

    const [quantity, setQuantity] = useState(50);

    const selectedQuantity = (quantity: number) => {
        setQuantity(quantity)
    }

    const handleNavigation = () => {
        // Zustand (primario)
        usePracticeStore.getState().setParams({ selectedTheme, quantity });

        // SessionStorage (fallback para recargas)
        sessionStorage.setItem('practiceParams', JSON.stringify({
            selectedTheme,
            quantity
        }));

        router.push("practica-un-tema");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-3 lg:mx-0">
                <h2 className="text-xl font-bold mb-4 text-secondary">Practica un tema</h2>
                <div className='text-primary font-semibold'>
                    <h2>selecciona un tema</h2>
                    <SelectorOne onThemeSelect={setSelectedTheme} />
                </div>

                <div className='text-sm md:text-base text-primary font-semibold mt-5'>
                    <h2>Selecciona un número total de preguntas que deseas</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
                        <div className={`${quantity === 50 ? "border-2 border-green-600" : "border"} text-center  rounded-lg py-2`}>
                            <button onClick={() => selectedQuantity(50)} className={`${quantity === 50 ? " text-green-600" : "text-concepto"} w-full`}>50 preguntas</button>
                        </div>
                        <div className={`${quantity === 100 ? "border-2 border-green-600" : "border"} text-center rounded-lg py-2`}>
                            <button onClick={() => selectedQuantity(100)} className={`${quantity === 100 ? " text-green-600" : "text-concepto"} w-full`}>100 preguntas</button>
                        </div>
                        <div className={`${quantity === 1000 ? "border-2 border-green-600" : "border"} text-center rounded-lg py-2`}>
                            <button onClick={() => selectedQuantity(1000)} className={`${quantity === 1000 ? " text-green-600" : "text-concepto"} w-full`}>todas las preguntas</button>
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
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Iniciar práctica
                    </button>
                </div>
            </div>
        </div>
    );
};