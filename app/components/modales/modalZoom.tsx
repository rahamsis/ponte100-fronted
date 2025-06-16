'use client'

/* eslint-disable */

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { startMeeting, saveStartMeeting } from "@/app/lib/actions";

import SelectorUsers from "../selectors/selectorUsers";

interface ModalPractica {
    onClose: () => void;
    extra: string;
    // router?: any;
}

type User = {
    userId: string,
    nombre: string,
    apellidos: string,
    email: string,
    telefono: string,
}

function formatZoomDateToLima(isoDate: string): string {
    const limaTime = new Date(isoDate).toLocaleString("es-PE", {
        timeZone: "America/Lima",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return limaTime;
}

export const ModalZoom = ({ onClose, extra }: ModalPractica) => {
    const { data: session } = useSession();

    const [perfil, setPerfil] = useState<string>("");
    const [userId, setUserId] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [cellphone, setCellphone] = useState<string>('');

    const [showMessageAlert, setShowMessageAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('')
    const [showMessageAlertCellphone, setShowMessageAlertCellphone] = useState(false);
    const [messageAlertCellphone, setMessageAlertCellphone] = useState('')
    const [showMessageAlertZoom, setShowMessageAlertZoom] = useState(false);
    const [messageAlertZoom, setMessageAlertZoom] = useState('')

    const [startUrlZoom, setStartUrlZoom] = useState<string>('');

    const handleSendMessage = async () => {

        if (!/^[9]\d{8}$/.test(cellphone)) {
            setMessageAlertCellphone('Por favor, ingresa un número de teléfono válido');
            setShowMessageAlertCellphone(true);
            return;
        }

        try {
            const dataMeeting = await startMeeting();
            setStartUrlZoom(dataMeeting.data.start_url);
            const message = "PONTE 100™ le está invitando a una reunión de Zoom programada.\n\n" +

                "Tema: Taller PONTE 100™\n" +
                `Hora: ${formatZoomDateToLima(dataMeeting.data.created_at)}\n` +
                `Enlace para unirse: ${dataMeeting.data.join_url}\n\n` +

                `ID de reunión: ${dataMeeting.data.id}\n` +
                `Código de acceso: ${dataMeeting.data.password}\n`;

            const whatsappLink = `https://wa.me/+51${cellphone}?text=${encodeURIComponent(message)}`;

            window.open(whatsappLink, '_blank');


        } catch (error) {
            console.error("Error al iniciar la reunión:", error);
        }
    }

    const startZoomMeeting = async () => {
        if (!selectedUser?.userId || typeof selectedUser.userId !== 'string') {
            setMessageAlert('Por favor, selecciona un usuario');
            setShowMessageAlert(true);
            return;
        }

        if (!/^[9]\d{8}$/.test(cellphone)) {
            setMessageAlertCellphone('Por favor, ingresa un número de teléfono válido');
            setShowMessageAlertCellphone(true);
            return;
        }

        if (startUrlZoom === '') {
            setMessageAlertZoom('Por favor, enviar un mensaje de WhatsApp para iniciar la reunión');
            setShowMessageAlertZoom(true);
            return;
        }

        // registarr en la base de datos si incio la reunión
        await saveStartMeeting(userId)

        window.open(startUrlZoom, "_blank");
        restartAll();
    }

    const restartAll = () => {
        setSelectedUser(null);
        setCellphone('');
        setMessageAlert('');
        setShowMessageAlert(false);
        setMessageAlertCellphone('');
        setShowMessageAlertCellphone(false);
        setStartUrlZoom('');
        onClose();
    }

    // Cargar perfil del usuario
    useEffect(() => {
        // Limpiar el estado al cerrar el modal
        if (session?.user?.perfil != '') {
            setPerfil(session?.user?.perfil ?? "");
            setUserId(session?.user?.userId ?? '');
        }
    }, [session]);

    useEffect(() => {
        if (selectedUser) {
            setMessageAlert('');
            setShowMessageAlert(false);
        }

        if (selectedUser?.telefono) {
            setCellphone(selectedUser.telefono);
        } else {
            setCellphone('');
        }
    }, [selectedUser]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {perfil === "PF0001" || perfil === "PF0002" ? (
                <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-3 lg:mx-0">
                    <h2 className="text-xl font-bold mb-4 text-secondary">Iniciar una reunión</h2>
                    <div className='text-primary font-semibold'>
                        <h2 className="my-4">selecciona un usuario</h2>
                        <SelectorUsers onUserSelect={(user) => setSelectedUser(user)} selectedUserId={selectedUser?.userId} />
                        {
                            showMessageAlert && (
                                <div className="text-red-500 mt-2 text-sm">
                                    {messageAlert}
                                </div>
                            )
                        }
                    </div>

                    <div className='text-sm md:text-base text-primary font-semibold mt-5'>
                        <h2>Ingresa un numero telefonico</h2>

                        <span className="text-gray-600 mr-2 select-none">+51</span>
                        <input
                            type="tel"
                            maxLength={9}
                            className="border-gray-300 py-2 px-4 w-3/4 mt-2 border rounded-lg focus:outline-none"
                            placeholder="Ej: 1234567890"
                            value={cellphone}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (/^\d*$/.test(value)) {
                                    setCellphone(value);

                                    if (value.length === 0) {
                                        setMessageAlertCellphone('Por favor, ingresa un número de teléfono');
                                        setShowMessageAlertCellphone(true);
                                    } else if (value.length < 9) {
                                        setMessageAlertCellphone('El número debe tener 9 dígitos');
                                        setShowMessageAlertCellphone(true);
                                    } else {
                                        setMessageAlertCellphone('');
                                        setShowMessageAlertCellphone(false);
                                    }

                                } else {
                                    setMessageAlertCellphone('Solo se permiten números');
                                    setShowMessageAlertCellphone(true);
                                }
                            }
                            }
                        />
                        <button onClick={handleSendMessage} className="text-white p-3 rounded-full ml-2 bg-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                            </svg>
                        </button>
                        {
                            showMessageAlertCellphone && (
                                <div className="text-red-500 mt-2 text-sm">
                                    {messageAlertCellphone}
                                </div>
                            )
                        }
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
                            onClick={startZoomMeeting}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Iniciar práctica
                        </button>
                    </div>
                    <div>
                        {
                            showMessageAlertZoom && (
                                <div className="text-red-500 mt-2 text-sm">
                                    {messageAlertZoom}
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-3 lg:mx-0">
                    <div><h2 className="text-xl font-bold mb-4 text-secondary">Iniciar una reunión</h2></div>
                    <div className="flex justify-center mb-4">
                        <div className="bg-button text-white rounded-full items-center justify-center p-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-shield-lock" viewBox="0 0 16 16">
                                <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                                <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-center"><h2 className="text-primary font-semibold">No cuentas con permisos para iniciar una reunión, contacta a tu ponente</h2></div>
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
            )}

        </div>
    );
};