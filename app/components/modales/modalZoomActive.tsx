'use client'

/* eslint-disable */

import { useState, useEffect } from "react";

interface ModalZoomActive {
    onClose: () => void;
    extra: string;
    // router?: any;
}

export const ModalZoomActive = ({ onClose, extra }: ModalZoomActive) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-3 lg:mx-0">
                <div><h2 className="text-xl font-bold mb-4 text-secondary">Iniciar una reunión</h2></div>
                <div className="flex justify-center mb-4">
                    <div className="bg-red-500 text-white rounded-full items-center justify-center p-4 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-telephone-x-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zm9.261 1.135a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-primary font-semibold ">No se puede iniciar una reunión mientras exista una reunión activa</h2>
                    <p className="text-primary font-semibold my-4 text-sm"> Reunión iniciada por: <span className="text-button text-base font-semibold">{extra}</span></p>
                </div>
                <div className="flex-grow border-b my-6"></div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};