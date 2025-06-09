'use client'
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import SelectorOne from "../selectors/selectorOne";
import { usePracticeStore } from "@/app/lib/stores/practice";
import { useRouter } from 'next/navigation';
import Image from "next/image";

interface ModalTimeExpired {
    onClose: () => void;
    handleFinish: () => void;
}

export const ModalTimeExpired = ({ onClose, handleFinish }: ModalTimeExpired) => {

    const handleFinishQuestion = () => {
        onClose(); // Cierra el modal
        handleFinish(); // Ejecuta la función de finalización
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-2 rounded-lg max-w-60 w-full ">
                <div className="flex justify-center items-center pt-3">
                    <div className="bg-timee bg-timeexpired p-3 w-20 h-20 rounded-full bg-opacity-30">
                       <Image
                        src="/images/timeexpired.png"
                        alt="timeexpired"
                        width={50}
                        height={50}
                        className=""
                    /> 
                    </div>
                </div>

                <div className='text-primary font-semibold text-center py-3'>
                    <h2 className="text-sm">El tiempo se agotó</h2>
                </div>

                <div className='text-xs text-primary text-center'>
                    <p className="pb-3">Lo sentimos, superaste el limite de tiempo. Por favor, finaliza el quiz.</p>
                    <div className="w-full ">
                        <div className={`text-center rounded-lg py-2`}>
                            <button onClick={() => {
                                // onClose();
                                handleFinishQuestion();
                            }}
                                className={`w-full bg-green-600 text-white py-2 rounded-lg`}>Finalizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};