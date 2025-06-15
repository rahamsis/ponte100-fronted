'use client'

import { useState } from "react";
import SelectorUsers from "@/app/components/selectors/selectorUsers";
import SelectorTalleres from "@/app/components/selectors/selectorTalleres";
import { useSession } from "next-auth/react";
import { InsertOrUpdateTallerToOneUser } from "@/app/lib/actions";
import { ModalUpdateSuccessfull } from "@/app/components/modales/modalUpdateSuccessfull";

function Inicio() {
    // Inicio del carrusel de Actividades

    // Fin del carrusel de Actividades
    return (
        <div className="flex flex-col pt-20">
            {/* Versión escritorio */}
            <section className="bg-postbanner pt-5">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                        <div className="">
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-4 lg:mb-8 text-primary">
                                Configuraciones
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function UpdateTalleres() {
    const { data: session } = useSession();
    const [selectedUser, setSelectedUser] = useState<{ userId: string }>({ userId: '' });
    const [selectedTaller, setSelectedTaller] = useState<{ idTaller: string }>({ idTaller: '' });
    const [activo, setActivo] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false)

    const hadleActualizarTalleres = async (userId: string, idTaller: string, activo: boolean) => {
        if (session?.user?.userId) {
            try {
                await InsertOrUpdateTallerToOneUser(userId, idTaller, activo, session.user.userId);
                setShowModal(true)
            } catch (error) {
                console.error("Error al actualizar talleres (configuracion - UpdateTalleres):", error);
            }
        } else {
            console.error("User ID is not available Practica class");
        }
    }

    // Fin del carrusel de Videos
    return (
        <>
            <div className="flex flex-col">
                {/* Versión escritorio */}
                <section className="bg-postbanner py-10">
                    <div className="lg:mx-20">
                        <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                            <div className="text-button text-base lg:text-lg font-semibold">Actualizar talleres</div>
                            <div className="w-full flex grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                                <div className="flex flex-col">
                                    <div>Usuario: </div>
                                    <SelectorUsers onUserSelect={(userId) => setSelectedUser({ userId })} selectedUserId={selectedUser.userId} />
                                </div>
                                <div className="flex flex-col">
                                    <div>Taller: </div>
                                    <SelectorTalleres onTallerSelect={(idTaller) => setSelectedTaller({ idTaller })} selectedTallerId={selectedTaller.idTaller} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 font-medium">Activo:</label>
                                    <label className="flex items-center cursor-pointer gap-2 select-none h-full">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                            checked={activo}
                                            onChange={(e) => setActivo(e.target.checked)}
                                        />
                                        <div className="w-5 h-5 rounded-full border border-gray-400 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors"></div>
                                        <span>{activo  ? "Si" : "No"}</span>
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 font-medium">Opcion:</label>
                                    <button
                                        onClick={() => hadleActualizarTalleres(selectedUser.userId, selectedTaller.idTaller, activo)}
                                        className={`${selectedUser.userId === '' || selectedTaller.idTaller == '' ? "bg-opacity-15" : ""} w-full bg-button2 text-white rounded-lg px-4 py-2 transition-colors`}>
                                        Actualizar Talleres
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {showModal && (
                <ModalUpdateSuccessfull
                    onClose={() => setShowModal(false)}
                    handleFinish={() => {
                        setSelectedUser({ userId: '' });
                        setSelectedTaller({ idTaller: '' });
                        setActivo(true);
                        setShowModal(false);
                    }}
                />
            )}
        </>
    )
}

export default function Configuracion() {
    return (
        <>
            <Inicio />

            <UpdateTalleres />
        </>
    )
}