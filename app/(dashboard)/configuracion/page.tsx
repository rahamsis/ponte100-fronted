'use client'

import { useState, useRef } from "react";
import SelectorUsers from "@/app/components/selectors/selectorUsers";
import SelectorTalleres from "@/app/components/selectors/selectorTalleres";
import { useSession } from "next-auth/react";
import { InsertOrUpdateTallerToOneUser } from "@/app/lib/actions";
import { ModalUpdateSuccessfull } from "@/app/components/modales/modalUpdateSuccessfull";
import { Loader2 } from "lucide-react";

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

type User = {
    userId: string,
    nombre: string,
    apellidos: string,
    email: string,
    telefono: string,
}

function UpdateTalleres() {
    const { data: session } = useSession();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedTaller, setSelectedTaller] = useState<{ idTaller: string }>({ idTaller: '' });
    const [activo, setActivo] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false)

    const hadleActualizarTalleres = async () => {
        if (!selectedUser || !selectedUser.userId || !selectedTaller.idTaller) return;

        if (!session?.user?.userId) {
            console.error("User ID is not available");
            return;
        }

        try {
            await InsertOrUpdateTallerToOneUser(selectedUser.userId, selectedTaller.idTaller, activo, session.user.userId);
            setShowModal(true)
        } catch (error) {
            console.error("Error al actualizar talleres (configuracion - UpdateTalleres):", error);
        }
    }

    const resetForm = () => {
        setSelectedUser({ userId: '', nombre: 'selecciona un usauario', apellidos: '', email: '', telefono: '' });
        setSelectedTaller({ idTaller: '' });
        setActivo(true);
        setShowModal(false);
    };

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
                                    <SelectorUsers onUserSelect={(user) => setSelectedUser(user)} selectedUserId={selectedUser?.userId} />
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
                                        <span>{activo ? "Si" : "No"}</span>
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 font-medium">Opcion:</label>
                                    <button
                                        onClick={() => hadleActualizarTalleres()}
                                        className={`${selectedUser?.userId === '' || selectedTaller.idTaller == '' ? "bg-opacity-15" : ""} w-full bg-button2 text-white rounded-lg px-4 py-2 transition-colors`}>
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
                    handleFinish={resetForm}
                />
            )}
        </>
    )
}

function UploadVideos() {

    const [creator, setCreator] = useState("");
    // const [name, setName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async () => {
        if (!file || !creator) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        setIsUploading(true);
        setStatusMessage("Preparando subida...");

        try {
            const res = await fetch("/api/videos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ creator }),
            });

            const { uploadURL } = await res.json();

            // Limpia el formulario antes de subir
            setCreator("");
            // setName("");
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setStatusMessage("Subiendo video en segundo plano, por favor no cierre esta ventana...");

            const form = new FormData();
            form.append("file", file);

            const uploadRes = await fetch(uploadURL, {
                method: "POST",
                body: form,
            });

            if (!uploadRes.ok) throw new Error("Error durante la subida");

            setStatusMessage("✅ Video subido correctamente.");
        } catch (err) {
            console.error("❌ Error al subir el video:", err);
            setStatusMessage("❌ Error al subir el video.");
        } finally {
            setIsUploading(false);
        }
    };

    return (<>
        <div className="flex flex-col">
            <div className="lg:mx-20">
                <div className="mx-8 lg:mx-3">
                    <div className="py-4 space-y-4">
                        <h2 className="text-button text-base lg:text-lg font-semibold">Subir nuevo video</h2>
                        <div className="w-full flex grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                            {/* <input
                                type="text"
                                placeholder=" Título del video"
                                value={name}
                                onChange={(e) => {
                                    setStatusMessage("")
                                    setName(e.target.value)
                                }}
                                className=" border px-3 rounded"
                            /> */}

                            <input
                                type="text"
                                placeholder=" Ponente o creador"
                                value={creator}
                                onChange={(e) => {
                                    setStatusMessage("")
                                    setCreator(e.target.value)
                                }}
                                className=" border px-3 rounded"
                            />

                            <input
                                type="file"
                                accept="video/*"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    setStatusMessage("")
                                    setFile(e.target.files?.[0] ?? null)
                                }}
                                className=""
                            />

                            <button
                                onClick={handleUpload}
                                disabled={isUploading}
                                className="bg-button text-white px-4 py-2 rounded"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="flex flex-row">
                                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                            Subiendo...
                                        </div>
                                    </>
                                ) : (
                                    "Subir"
                                )}
                            </button>
                        </div>
                        {statusMessage && (
                            <p className="text-sm mt-4 text-primary">{statusMessage}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default function Configuracion() {
    return (
        <>
            <Inicio />

            <UpdateTalleres />

            <UploadVideos />
        </>
    )
}