'use client'

interface ModalUpdateSuccessfull {
    onClose: () => void;
    handleFinish: () => void;
}

export const ModalUpdateSuccessfull = ({ onClose, handleFinish }: ModalUpdateSuccessfull) => {

    const handleClose = () => {
        onClose(); // Cierra el modal
        handleFinish(); // Ejecuta la función de finalización
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-2 rounded-lg max-w-60 w-full ">
                <div className="flex justify-center items-center pt-3">
                    <div className="bg-timee bg-green-500 flex justify-center items-center text-white p-3 w-14 h-14 rounded-full ">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                    </div>
                </div>

                {/* <div className='text-primary font-semibold text-center py-3'>
                    <h2 className="text-sm">El tiempo se agotó</h2>
                </div> */}

                <div className='text-xs text-primary text-center py-3'>
                    <p className="pb-3">Registro actualizado correctamente</p>
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
        </div>
    );
};