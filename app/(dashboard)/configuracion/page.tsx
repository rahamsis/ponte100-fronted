'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, KeyRound, BookOpenCheck } from "lucide-react";
import SelectorUsers from "@/app/components/selectors/selectorUsers";
import SelectorTalleres from "@/app/components/selectors/selectorTalleres";
import { useSession } from "next-auth/react";
import { fetchAllUsers, InsertOrUpdateTallerToOneUser } from "@/app/lib/actions";
import { ModalUpdateSuccessfull } from "@/app/components/modales/modalUpdateSuccessfull";
import { Loader2 } from "lucide-react";
import { ModalAddUser } from '@/app/components/modales/modalAddUser';
import { ModalResetPassword } from '@/app/components/modales/modalResetPassword';
import { ModalAddTalleres } from '@/app/components/modales/modalAddTalleres';
import { string } from 'zod';

function Inicio() {
    return (
        <div className="w-full">
            <div className="flex flex-col pt-20">
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
        </div>
    )
}

type User = {
    userId: string,
    nombre: string,
    apellidos: string,
    genero: string,
    idGrado: string,
    nombreGrado: string,
    email: string,
    telefono: string,
    cip: string,
    dni: string,
    username: string,
    idPerfil: string,
    nombrePerfil: string,
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
        setSelectedUser({
            userId: '', nombre: 'selecciona un usuario', apellidos: '', genero: '', idGrado: '', nombreGrado: '',
            email: '', telefono: '', cip: '', dni: '', username: '', idPerfil: '', nombrePerfil: ''
        });
        setSelectedTaller({ idTaller: '' });
        setActivo(true);
        setShowModal(false);
    };

    // Fin del carrusel de Videos
    return (
        <div>
            <div className="flex flex-col">
                {/* Versión escritorio */}
                <section className="bg-postbanner py-10">
                    <div className="lg:mx-20">
                        <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                            <div className="text-button text-base lg:text-lg font-semibold">Actualizar talleres</div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 w-full">
                                <div className="w-full flex flex-col">
                                    <label>Usuario: </label>
                                    <SelectorUsers onUserSelect={(user) => setSelectedUser(user)} selectedUserId={selectedUser?.userId} />
                                </div>
                                <div className="flex flex-col">
                                    <label>Taller: </label>
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
        </div>
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
            <div className="lg:mx-20 pb-8">
                <div className="mx-8 lg:mx-3">
                    <div className="py-4 space-y-4">
                        <h2 className="text-button text-base lg:text-lg font-semibold">Subir nuevo video</h2>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">

                            <input
                                type="text"
                                placeholder=" Ponente o creador"
                                value={creator}
                                onChange={(e) => {
                                    setStatusMessage("")
                                    setCreator(e.target.value)
                                }}
                                className=" border px-3 rounded-md h-10 md:h-8 lg:h-10"
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
                                className="bg-button2 text-white px-4 py-2 rounded"
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

function Users() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeModal, setActiveModal] = useState(false);

    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const filteredUsers = users.filter((user) =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellidos?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const [resetUserId, setResetUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [addTalleres, setAddTalleres] = useState<{userId: string, nombre: string} | null>(null);

    const cargarUsuarios = async () => {
        setIsLoading(true);
        try {
            const data = await fetchAllUsers();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error("La respuesta no es un arreglo:", data);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="w-full">
            <div className="lg:ml-20">
                <div className="mx-8 lg:mx-3">
                    <div className="py-4 space-y-4">
                        <div className="w-full">
                            <h1 className="text-button text-base lg:text-lg font-semibold mb-4">Usuarios</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 w-full x:w-1/2 gap-4">
                            {/* Barra de búsqueda */}
                            <div className="">
                                <Search className="absolute w-5 h-5 mt-[10px] ml-2 text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Buscar usuario..."
                                    className="pl-16 w-10/12 lg:w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {/* Botón de agregar usuario */}
                            <div className=''>
                                <button onClick={(() => setActiveModal(true))} className='bg-button2 text-white px-4 py-2 rounded'> Agregar usuario</button>
                            </div>
                        </div>

                        {/* Contenedor principal con scroll horizontal aislado */}
                        <div className="relative w-[calc(100vw-4rem)] md:w-[calc(100vw-6rem)] lg:w-[calc(100vw-18rem)] x:w-[calc(100vw-20rem)] rounded-lg">
                            {/* Contenedor de scroll con ancho restringido */}
                            <div className="overflow-x-auto ">
                                {/* Tabla con ancho mínimo garantizado */}
                                <table className="min-w-[800px] w-full table-auto border-collapse text-sm">
                                    <thead className="bg-button text-white">
                                        <tr>
                                            <th className="border border-gray-300 px-3 py-2 text-left whitespace-nowrap">#</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Nombre</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Genero</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Grado</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Correo</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Telefono</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">CIP/DNI</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Perfil</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Talleres</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Resetear</th>
                                            {/* <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Eliminar</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={10} className="text-center py-4 text-gray-500">
                                                    <div className="flex justify-center items-center space-x-2">
                                                        <svg
                                                            className="animate-spin h-5 w-5 text-gray-500"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                            ></path>
                                                        </svg>
                                                        <span>Cargando usuarios...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : currentUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan={10} className="text-center py-4 text-gray-400">
                                                    No se encontraron usuarios.
                                                </td>
                                            </tr>
                                        ) : (
                                            currentUsers.map((user, i) => (
                                                <tr key={i} className="odd:bg-white even:bg-gray-200">
                                                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap relative">{indexOfFirstUser + i + 1}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.nombre}{user.apellidos ? ' ' + user.apellidos : ''}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.genero}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.nombreGrado}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.email}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.telefono}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{<span>{user.cip}</span>}{" /"}{<br></br>}{<span>{user.dni}</span>}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.nombrePerfil}</td>
                                                    <td className="border text-center">
                                                        <button
                                                            className="border border-button2 p-2 rounded-md"
                                                            title="talleres"
                                                            onClick={() => setAddTalleres({ userId: user.userId, nombre: user.nombre + ' ' + (user.apellidos ? user.apellidos : '') })}
                                                        // disabled={!this.state.reset}
                                                        ><BookOpenCheck className='text-button2 w-4 h-4' /></button>
                                                    </td>
                                                    <td className="border text-center">
                                                        <button
                                                            className="border border-blue-400 p-2 rounded-md"
                                                            title="Resetear"
                                                            onClick={() => setResetUserId(user.userId)}
                                                        // disabled={!this.state.reset}
                                                        ><KeyRound className='text-blue-400 w-4 h-4' /></button>
                                                    </td>
                                                    {/* <td className="border border-gray-300 text-center">
                                                    <button
                                                        className="border border-red-500 p-2 rounded-md"
                                                        title="Editar"
                                                    // onClick={() => this.onEventDelete(item.idUsuario)}
                                                    // disabled={!this.state.remove}
                                                    >
                                                        <Trash2 className='text-red-500 w-4 h-4' /></button>
                                                </td> */}
                                                </tr>
                                            )))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2 mr-20">
                            <button
                                className="px-3 py-1 border border-button text-button rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>

                            <span className="px-3 py-1">
                                Página {currentPage} de {Math.ceil(filteredUsers.length / usersPerPage)}
                            </span>

                            <button
                                className="px-3 py-1 border border-button text-button rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={indexOfLastUser >= filteredUsers.length}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {activeModal && (
                <ModalAddUser
                    onClose={() => setActiveModal(false)}
                    onUserAdded={cargarUsuarios} // 👈 Nuevo prop
                    extra=""
                />
            )}
            {resetUserId && (
                <ModalResetPassword
                    userId={resetUserId}
                    onClose={() => setResetUserId(null)}
                />
            )}
            {addTalleres && (
                <ModalAddTalleres
                    userId={addTalleres.userId}
                    nombre={addTalleres.nombre}
                    onClose={() => setAddTalleres(null)} />
            )}
        </div>
    );
}

export default function Configuracion() {
    return (
        <div className="flex flex-col min-h-screen pb-20 lg:pb-5">
            <Inicio />

            <Users />

            <UpdateTalleres />

            <UploadVideos />

        </div>
    )
}