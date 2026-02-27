'use client'

import { useEffect, useState } from 'react'
import { BookOpenCheck, KeyRound, Search, SquarePen, Trash } from "lucide-react";
import { fetchAllUsers } from "@/app/lib/actions";
import { User } from '@/types/users';
import { ModalStatusDb } from '@/app/components/modales/modalStatusDb';
import { ModalAddUser } from '@/app/components/modales/modalUser/modalAddUser';
import { ModalResetPassword } from '@/app/components/modales/modalUser/modalResetPassword';
import { ModalDeleteUser } from '@/app/components/modales/modalUser/modalDeleteUser';
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
                                    Usuarios
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

function UsuariosAll() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeModal, setActiveModal] = useState(false);
    const [deleteUsuarioModal, setDeleteUsuarioModal] = useState(false);
    const [deleteUsuario, setDeleteUsuario] = useState<User | null>(null);
    const [selectedUsuario, setSelectedUsuario] = useState<User | null>(null)
    const [modalMode, setModalMode] = useState<"create" | "edit">("create")

    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usuarioPerPage = 10;

    const [addTalleres, setAddTalleres] = useState<{ userId: string, nombre: string } | null>(null);

    const filteredUsuarios = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUsuario = currentPage * usuarioPerPage;
    const indexOfFirstUsuario = indexOfLastUsuario - usuarioPerPage;
    const currentUsuarios = filteredUsuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

    const [resetUserId, setResetUserId] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    // const [statusRegister, setStatusRegister] = useState<boolean | null>(null)
    const statusRegister = null
    const [error, setError] = useState<string | null>(null)

    const cargarUsuarios = async () => {
        setIsLoading(true);
        try {
            const data = await fetchAllUsers();
            if (Array.isArray(data)) {
                setUsuarios(data);
            } else {
                console.error("La respuesta no es un arreglo:", data);
                setUsuarios([]);
            }
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            setUsuarios([]);
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
                            <h1 className="text-button text-base lg:text-lg font-semibold mb-4">Administración de Usuarios</h1>
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
                                <button onClick={(() => setActiveModal(true))} className='bg-button2 text-white px-4 py-2 rounded'> Agregar Usuario</button>
                            </div>
                        </div>

                        {/* Contenedor principal con scroll horizontal aislado */}
                        <div className="relative w-[calc(100vw-4rem)] md:w-[calc(100vw-6rem)] lg:w-[calc(100vw-18rem)] x:w-[calc(100vw-20rem)] rounded-lg hidden lg:block">
                            {/* Contenedor de scroll con ancho restringido */}
                            <div className="overflow-x-auto ">
                                {/* Tabla con ancho mínimo garantizado */}
                                <table className="min-w-[800px] w-full table-auto border-collapse text-sm">
                                    <thead className="bg-button text-white">
                                        <tr>
                                            <th className="border border-gray-300 px-3 py-2 text-left whitespace-nowrap">#</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Nombre</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Perfil</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Genero</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Grado</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Correo</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Telefono</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">CIP/DNI</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Editar</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Talleres</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Resetear</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Eliminar</th>
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
                                                        <span>Cargando perfiles...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : currentUsuarios.length === 0 ? (
                                            <tr>
                                                <td colSpan={10} className="text-center py-4 text-gray-400">
                                                    No se encontraron usuarios.
                                                </td>
                                            </tr>
                                        ) : (
                                            currentUsuarios.map((user, i) => (
                                                <tr key={i} className="odd:bg-white even:bg-gray-200">
                                                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap relative">{indexOfFirstUsuario + i + 1}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.nombre}{user.apellidos ? ' ' + user.apellidos : ''}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.nombrePerfil}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.genero}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.nombreGrado}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.email}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.telefono}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{<span>{user.cip}</span>}{" /"}{<br></br>}{<span>{user.dni}</span>}</td>
                                                    <td className="border text-center">
                                                        <button
                                                            className="border border-orange-500 p-2 rounded-md"
                                                            title="editar"
                                                            onClick={() => {
                                                                setSelectedUsuario(user)
                                                                setModalMode("edit")
                                                                setActiveModal(true)
                                                            }}
                                                        // onClick={() => setAdd({ userId: user.userId, nombre: user.nombre + ' ' + (user.apellidos ? user.apellidos : '') })}
                                                        // disabled={!this.state.reset}
                                                        ><SquarePen className='text-orange-500 w-4 h-4' /></button>
                                                    </td>
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
                                                    <td className="border text-center">
                                                        <button
                                                            className="border border-red-400 p-2 rounded-md"
                                                            title="Eliminar"
                                                            onClick={() => {
                                                                setDeleteUsuario(user)
                                                                setDeleteUsuarioModal(true)
                                                            }}
                                                        ><Trash className='text-red-400 w-4 h-4' /></button>
                                                    </td>
                                                </tr>
                                            )))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="lg:flex justify-end mt-4 gap-2 mr-20 hidden">
                            <button
                                className="px-3 py-1 border border-button text-button rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>

                            <span className="px-3 py-1">
                                Página {currentPage} de {Math.ceil(filteredUsuarios.length / usuarioPerPage)}
                            </span>

                            <button
                                className="px-3 py-1 border border-button text-button rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={indexOfLastUsuario >= filteredUsuarios.length}
                            >
                                Siguiente
                            </button>
                        </div>

                        <div className="lg:hidden mt-6">
                            {
                                currentUsuarios.map((usuario, i) => (
                                    <div key={i} className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <div>
                                                <h3 className="text-sm">{usuario.nombre}</h3>
                                                <p className="text-xs text-gray-500">ID: {usuario.userId}</p>
                                            </div>
                                            <div className='text-xs'>
                                                {new Date(usuario.createdDate!).toLocaleDateString()} {<br></br>}{new Date(usuario.createdDate!).toLocaleTimeString()}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className=" border border-orange-500 p-2 rounded-md"
                                                    title="editar"
                                                    onClick={() => {
                                                        setSelectedUsuario(usuario)
                                                        setModalMode("edit")
                                                        setActiveModal(true)
                                                    }}
                                                ><SquarePen className='text-orange-500 w-4 h-4' />
                                                </button>
                                                <button
                                                    className="border border-red-400 p-2 rounded-md"
                                                    title="Eliminar"
                                                    onClick={() => {
                                                        setDeleteUsuario(usuario)
                                                        setDeleteUsuarioModal(true)
                                                    }}
                                                ><Trash className='text-red-400 w-4 h-4' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {activeModal && (
                <ModalAddUser
                    mode={modalMode}
                    usuario={selectedUsuario}
                    onClose={() => {
                        setActiveModal(false)
                        setModalMode("create")
                        setSelectedUsuario(null)
                    }}
                    onSuccess={() => {
                        setActiveModal(false)
                        setModalMode("create")
                        setSelectedUsuario(null)
                        cargarUsuarios()
                    }}
                />
            )}

            {resetUserId && (
                <ModalResetPassword
                    userId={resetUserId}
                    onClose={() => setResetUserId(null)}
                />
            )}

            {deleteUsuarioModal && (
                <ModalDeleteUser
                    usuario={deleteUsuario}
                    onClose={() => {
                        setDeleteUsuarioModal(false)
                        setSelectedUsuario(null)
                    }}
                    onSuccess={() => {
                        setDeleteUsuarioModal(false)
                        setSelectedUsuario(null)
                        cargarUsuarios()
                    }}
                    onError={(msg) => setError(msg)}
                />
            )}

            {error && (
                <ModalStatusDb
                    statusRegister={statusRegister}
                    message={error}
                    onClose={() => setError(null)}
                />
            )}

            {addTalleres && (
                <ModalAddTalleres
                    userId={addTalleres.userId}
                    nombre={addTalleres.nombre}
                    onClose={() => setAddTalleres(null)} />
            )}
        </div >
    );
}

export default function Usuarios() {
    return (
        <div className="flex flex-col min-h-screen pb-20 lg:pb-5">
            <Inicio />

            <UsuariosAll />

        </div>
    )
}