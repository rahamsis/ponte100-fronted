'use client'
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { usePrimeraPracticaStore } from "@/app/lib/stores/primeraPractica";
import { useRouter } from 'next/navigation';

interface ModalTuPrimeraPractica {
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

export const ModalPrimeraPractica = ({ onClose, extra }: ModalTuPrimeraPractica) => {
    const router = useRouter();

    const [quantity, setQuantity] = useState(0);
    const [showAlert, setShowAlert] = useState(false)

    const selectedQuantity = (quantity: number) => {
        setShowAlert(false);
        setQuantity(quantity)
    }

    const handleNavigation = () => {
        if (quantity <= 0) {
            setShowAlert(true)
            return;
        }

        setShowAlert(false);
        // Zustand (primario)
        usePrimeraPracticaStore.getState().setParams({ quantity });

        // SessionStorage (fallback para recargas)
        sessionStorage.setItem('primeraPracticaParams', JSON.stringify({
            quantity
        }));

        router.push("primera-practica");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-3 lg:mx-0">
                <h2 className="text-xl font-bold mb-4 text-secondary">genera tu primera práctica</h2>
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
                            <Clock /> <h1>{quantity > 0 ? formatTime(quantity * 72) : "--:--:--"} </h1> {/* Paso el numero de preguntas por el tiempo oficial que es 72 */}
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
                        disabled={showAlert}
                        onClick={handleNavigation}
                        className={` px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700`}
                    >
                        Iniciar Práctica
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