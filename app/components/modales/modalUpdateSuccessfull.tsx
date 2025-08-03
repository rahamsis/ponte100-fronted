'use client'

import Image from "next/image";

interface ModalUpdateSuccessfull {
    onClose: () => void;
    handleFinish: () => void;
    status: boolean;
    message: string;
}

export const ModalUpdateSuccessfull = ({ onClose, handleFinish, status, message }: ModalUpdateSuccessfull) => {

    const handleClose = () => {
        onClose(); // Cierra el modal
        handleFinish(); // Ejecuta la función de finalización
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white px-4 py-2 rounded-lg max-w-60 w-full ">
                <div className="flex justify-center items-center pt-3">
                    <div className="bg-time flex justify-center items-center text-white p-3 rounded-full ">
                        {
                            status === true ? (
                                <Image
                                    src={"/images/status/true.png"}
                                    alt="true"
                                    width={500}
                                    height={500}
                                    className="w-1/2 h-1/2"
                                />
                            ) : (
                                <Image
                                    src={"/images/status/false.png"}
                                    alt="false"
                                    width={500}
                                    height={500}
                                    className="w-1/2 h-1/2"
                                />
                            )
                        }
                    </div>
                </div>

                {/* <div className='text-primary font-semibold text-center py-3'>
                    <h2 className="text-sm">El tiempo se agotó</h2>
                </div> */}

                <div className='text-sm text-primary text-center py-3'>
                    <p className="pb-3">{message}</p>
                    <div className="w-full ">
                        <div className={`text-center rounded-lg py-2`}>
                            <button onClick={() => {
                                // onClose();
                                handleClose();
                            }}
                                className={`w-full bg-button text-white py-2 rounded-lg`}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};