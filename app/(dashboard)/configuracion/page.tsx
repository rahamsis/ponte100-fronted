'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, KeyRound, BookOpenCheck, Pencil, Save } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
// import SelectorUsers from "@/app/components/selectors/selectorUsers";
// import SelectorTalleres from "@/app/components/selectors/selectorTalleres";
// import { useSession } from "next-auth/react";
import {
    fetchAllUsers,
    getCompleteQuestionById,
    updatePregunta,
    updateAlternativas,
    updateClaves
    // InsertOrUpdateTallerToOneUser 
} from "@/app/lib/actions";
import { ModalUpdateSuccessfull } from "@/app/components/modales/modalUpdateSuccessfull";
import { Loader2 } from "lucide-react";
import { ModalAddUser } from '@/app/components/modales/modalAddUser';
import { ModalResetPassword } from '@/app/components/modales/modalResetPassword';
import { ModalAddTalleres } from '@/app/components/modales/modalAddTalleres';

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

// function UpdateTalleres() {
//     const { data: session } = useSession();
//     const [selectedUser, setSelectedUser] = useState<User | null>(null);
//     const [selectedTaller, setSelectedTaller] = useState<{ idTaller: string }>({ idTaller: '' });
//     const [activo, setActivo] = useState<boolean>(true);
//     const [showModal, setShowModal] = useState(false)

//     const hadleActualizarTalleres = async () => {
//         if (!selectedUser || !selectedUser.userId || !selectedTaller.idTaller) return;

//         if (!session?.user?.userId) {
//             console.error("User ID is not available");
//             return;
//         }

//         try {
//             await InsertOrUpdateTallerToOneUser(selectedUser.userId, selectedTaller.idTaller, activo, session.user.userId);
//             setShowModal(true)
//         } catch (error) {
//             console.error("Error al actualizar talleres (configuracion - UpdateTalleres):", error);
//         }
//     }

//     const resetForm = () => {
//         setSelectedUser({
//             userId: '', nombre: 'selecciona un usuario', apellidos: '', genero: '', idGrado: '', nombreGrado: '',
//             email: '', telefono: '', cip: '', dni: '', username: '', idPerfil: '', nombrePerfil: ''
//         });
//         setSelectedTaller({ idTaller: '' });
//         setActivo(true);
//         setShowModal(false);
//     };

//     // Fin del carrusel de Videos
//     return (
//         <div>
//             <div className="flex flex-col">
//                 {/* Versión escritorio */}
//                 <section className="bg-postbanner py-10">
//                     <div className="lg:mx-20">
//                         <div className="flex flex-wrap items-center mx-8 lg:mx-3">
//                             <div className="text-button text-base lg:text-lg font-semibold">Actualizar talleres</div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 w-full">
//                                 <div className="w-full flex flex-col">
//                                     <label>Usuario: </label>
//                                     <SelectorUsers onUserSelect={(user) => setSelectedUser(user)} selectedUserId={selectedUser?.userId} />
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <label>Taller: </label>
//                                     <SelectorTalleres onTallerSelect={(idTaller) => setSelectedTaller({ idTaller })} selectedTallerId={selectedTaller.idTaller} />
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <label className="mb-1 font-medium">Activo:</label>
//                                     <label className="flex items-center cursor-pointer gap-2 select-none h-full">
//                                         <input
//                                             type="checkbox"
//                                             className="peer hidden"
//                                             checked={activo}
//                                             onChange={(e) => setActivo(e.target.checked)}
//                                         />
//                                         <div className="w-5 h-5 rounded-full border border-gray-400 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors"></div>
//                                         <span>{activo ? "Si" : "No"}</span>
//                                     </label>
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <label className="mb-1 font-medium">Opcion:</label>
//                                     <button
//                                         onClick={() => hadleActualizarTalleres()}
//                                         className={`${selectedUser?.userId === '' || selectedTaller.idTaller == '' ? "bg-opacity-15" : ""} w-full bg-button2 text-white rounded-lg px-4 py-2 transition-colors`}>
//                                         Actualizar Talleres
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             {showModal && (
//                 <ModalUpdateSuccessfull
//                     onClose={() => setShowModal(false)}
//                     handleFinish={resetForm}
//                 />
//             )}
//         </div>
//     )
// }

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
                                className=" border px-3 rounded-md h-10 md:h-8 lg:h-10 focus:outline-none focus:ring-1 focus:ring-button"
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

    const [addTalleres, setAddTalleres] = useState<{ userId: string, nombre: string } | null>(null);

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
                                    className="pl-16 w-10/12 lg:w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-button"
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
                                                        ><KeyRound className='text-blue-400 w-4 h-4' /></button>
                                                    </td>
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

interface Alternativas {
    idAlternativa: string,
    alternativa: string,
    respuesta: string
}

interface Claves {
    idPalabra: string,
    palabra: string
}

interface Data {
    idPregunta: string,
    pregunta: string,
    alternativas: Alternativas[],
    claves: Claves[],
}

function UpdateTotalQuestion() {

    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<Data | null>(null);

    const [editPregunta, setEditPregunta] = useState(false);
    const [editAlternativas, setEditAlternativas] = useState<{ [key: string]: boolean }>({});
    const [editClaves, setEditClaves] = useState<{ [key: string]: boolean }>({});
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(false);
    const [activeModal, setActiveModal] = useState(false);

    const cargarData = async (idPregunta: string) => {
        try {
            if (editPregunta || Object.values(editAlternativas).some(Boolean) || Object.values(editClaves).some(Boolean)) {
                setAlert(true);
                return;
            }

            // Reiniciar todos los estados de edición
            limpiarEstadosEdicion();

            const data = await getCompleteQuestionById(idPregunta);
            setData(data);

        } catch (error) {
            console.error('Error al obtener la pregunta, alternativa y claves:', error);
            setData(null);
        }
    };

    const limpiarEstadosEdicion = () => {
        setEditPregunta(false);
        setEditAlternativas({});
        setEditClaves({});
        setMessage("");
    };

    const handleUpdatePregunta = async (idPregunta: string, pregunta: string) => {
        try {
            const response = await updatePregunta(idPregunta, pregunta);

            if (response.ok) {
                setEditPregunta(false);
                setStatus(true)
                setMessage("Pregunta actualizada correctamente.")
                setActiveModal(true)
                setAlert(false);
            } else {
                setStatus(false)
                setMessage("No se pudo actualizar la pregunta.")
                setActiveModal(true)
                setAlert(false);
            }

        } catch (error) {
            console.error("Error al actualizar la pregunta:", error);
        }
    };

    const handleUpdateAlternativa = async (idAlternativa: string, alternativa: string) => {
        try {
            const response = await updateAlternativas(idAlternativa, alternativa);

            if (response.ok) {
                setEditAlternativas(prev => ({
                    ...prev,
                    [idAlternativa]: false
                }));
                setStatus(true)
                setMessage("Alternativa actualizada correctamente.")
                setActiveModal(true)
                setAlert(false);
            } else {
                setStatus(false)
                setMessage("No se pudo actualizar la alternativa.")
                setActiveModal(true)
                setAlert(false);
            }

        } catch (error) {
            console.error("Error al actualizar la alternativa:", error);
        }
    };

    const handleUpdateClave = async (idPalabra: string, palabra: string) => {
        try {
            const response = await updateClaves(idPalabra, palabra);

            if (response.ok) {
                setEditClaves(prev => ({
                    ...prev,
                    [idPalabra]: false
                }));
                setStatus(true)
                setMessage("Clave actualizada correctamente.")
                setActiveModal(true)
                setAlert(false);
            } else {
                setStatus(false)
                setMessage("No se pudo actualizar la Clave.")
                setActiveModal(true)
                setAlert(false);
            }

        } catch (error) {
            console.error("Error al actualizar la Clave:", error);
        }
    };

    const limpiarModal = async () => {
        setStatus(false)
        setMessage("");
        setActiveModal(false)
        setAlert(false);
    }

    return (
        <div className="w-full">
            <div className="lg:ml-20">
                <div className="mx-8 lg:mx-3">
                    <div className="py-4 space-y-4">
                        <div className="w-full">
                            <h1 className="text-button text-base lg:text-lg font-semibold mb-4">Actualizar Preguntas, Alternativas y Claves</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 w-full x:w-1/2 gap-4">
                            {/* Barra de búsqueda */}
                            <div className="">
                                <Search className="absolute w-5 h-5 mt-[10px] ml-2 text-secondary" />
                                <input
                                    type='text'
                                    placeholder="Ingresa código..."
                                    className="pl-10 w-10/12 lg:w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-button"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setAlert(false);
                                    }}
                                />
                                {alert && (
                                    <p className='text-sm text-red-500'> Tienes algunos cambios sin guardar; guarda tus cambios antes de continuar</p>
                                )}
                            </div>
                            {/* Botón de*/}
                            <div className=''>
                                <button onClick={() => cargarData(searchTerm)} className='bg-button2 text-white px-4 py-2 rounded'> Buscar</button>
                            </div>
                        </div>

                        {!data && (
                            <div className='w-full text-center text-gray-500 py-4'>
                                <p className=''>No se encontraron resultados para el código ingresado, verifique el código e intentelo nuevamente</p>
                            </div>
                        )}

                        {/* Pregunta */}
                        {data && (
                            <div className='w-full flex-row'>
                                <label className='block text-md font-medium text-gray-700'>Pregunta</label>
                                <div className='w-full flex flex-row'>
                                    <div className='w-11/12'>
                                        <TextareaAutosize
                                            value={data.pregunta}
                                            onChange={(e) => setData({ ...data, pregunta: e.target.value })}
                                            minRows={1}
                                            maxRows={10}
                                            className='w-full h-full rounded-lg border p-2 focus:outline-none focus:border-blue-500 focus:ring-0'
                                            disabled={!editPregunta}
                                        />
                                    </div>
                                    <div className='flex items-center pl-2'>
                                        {!editPregunta ? (
                                            <button onClick={() => setEditPregunta(true)} className='bg-button2 text-white p-2 rounded-full'><Pencil className='w-4 h-4' /> </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setEditPregunta(false);
                                                    handleUpdatePregunta(data.idPregunta, data.pregunta);
                                                }}
                                                className='bg-button text-white p-2 rounded-full'
                                            ><Save className='w-4 h-4' /></button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Alternativas */}
                        {data && (
                            <div className='w-full flex-row'>
                                <label className='block text-md font-medium text-gray-700'>Alternativas</label>
                                <div className='w-full flex flex-col space-y-2'>
                                    {data.alternativas.map((alt, index) => (
                                        <div key={index} className='w-full flex flex-row'>
                                            <div className='w-11/12'>
                                                <TextareaAutosize
                                                    value={alt.alternativa}
                                                    onChange={(e) => {
                                                        const nuevas = data.alternativas.map((a) =>
                                                            a.idAlternativa === alt.idAlternativa ? { ...a, alternativa: e.target.value } : a
                                                        );
                                                        setData({ ...data, alternativas: nuevas });
                                                    }}
                                                    minRows={1}
                                                    maxRows={10}
                                                    className={`w-full h-full rounded-lg border p-2 focus:outline-none focus:border-blue-500 focus:ring-0 ${alt.respuesta == "1" && "text-button2"}`}
                                                    disabled={!editAlternativas[alt.idAlternativa]}
                                                />
                                            </div>
                                            <div className='flex items-center pl-2'>
                                                {!editAlternativas[alt.idAlternativa] ? (
                                                    <button
                                                        onClick={() =>
                                                            setEditAlternativas({ ...editAlternativas, [alt.idAlternativa]: true })
                                                        }
                                                        className='bg-button2 text-white p-2 rounded-full'
                                                    ><Pencil className='w-4 h-4' /></button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setEditAlternativas({ ...editAlternativas, [alt.idAlternativa]: false });
                                                            handleUpdateAlternativa(alt.idAlternativa, alt.alternativa)
                                                        }}
                                                        className='bg-button text-white p-2 rounded-full'
                                                    ><Save className='w-4 h-4' /></button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Claves */}
                        {data && (
                            <div className='w-full flex-row'>
                                <label className='block text-md font-medium text-gray-700'>Claves</label>
                                <div className='w-full flex flex-col space-y-2'>
                                    {data.claves.map((clave, index) => (
                                        <div key={index} className='w-full flex flex-row'>
                                            <div className='w-11/12'>
                                                <TextareaAutosize
                                                    value={clave.palabra}
                                                    onChange={(e) => {
                                                        const nuevas = data.claves.map((c) =>
                                                            c.idPalabra === clave.idPalabra ? { ...c, palabra: e.target.value } : c
                                                        );
                                                        setData({ ...data, claves: nuevas });
                                                    }}
                                                    minRows={1}
                                                    maxRows={10}
                                                    className='w-full h-full rounded-lg border p-2 focus:outline-none focus:border-blue-500 focus:ring-0'
                                                    disabled={!editClaves[clave.idPalabra]}
                                                />
                                            </div>
                                            <div className='flex items-center pl-2'>
                                                {!editClaves[clave.idPalabra] ? (
                                                    <button
                                                        onClick={() =>
                                                            setEditClaves({ ...editClaves, [clave.idPalabra]: true })
                                                        }
                                                        className='bg-button2 text-white p-2 rounded-full'
                                                    ><Pencil className='w-4 h-4' /></button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setEditClaves({ ...editClaves, [clave.idPalabra]: false });
                                                            handleUpdateClave(clave.idPalabra, clave.palabra)
                                                        }}
                                                        className='bg-button text-white p-2 rounded-full'
                                                    ><Save className='w-4 h-4' /></button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {activeModal && (
                <ModalUpdateSuccessfull
                    onClose={() => setActiveModal(false)}
                    handleFinish={limpiarModal}
                    status={status}
                    message={message}
                />
            )}
        </div>
    )
}

export default function Configuracion() {
    return (
        <div className="flex flex-col min-h-screen pb-20 lg:pb-5">
            <Inicio />

            <Users />

            {/* <UpdateTalleres /> */}

            <UploadVideos />

            <UpdateTotalQuestion />

        </div>
    )
}