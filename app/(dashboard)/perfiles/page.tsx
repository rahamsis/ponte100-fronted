'use client'

import { useEffect, useState } from 'react'
import { Search, SquarePen, Trash } from "lucide-react";
import { getAllPerfiles } from "@/app/lib/actions";
import { Perfil } from '@/types/users';
import { ModalUpdatePerfil } from '@/app/components/modales/modalPerfil/modalUpdatePerfil';
import { ModalDeletePerfil } from '@/app/components/modales/modalPerfil/modalDeletePerfil';
import { ModalStatusDb } from '@/app/components/modales/modalStatusDb';

function Inicio() {
    return (
        <div className="w-full">
            <div className="flex flex-col pt-20">
                <section className="bg-postbanner pt-5">
                    <div className="lg:mx-20">
                        <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                            <div className="">
                                <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-4 lg:mb-8 text-primary">
                                    Perfiles
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}


function PerfilesAll() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeModal, setActiveModal] = useState(false);
    const [deletePerfilModal, setDeletePerfilModal] = useState(false);
    const [deletePerfil, setDeletePerfil] = useState<Perfil | null>(null);
    const [selectedPerfil, setSelectedPerfil] = useState<Perfil | null>(null)
    const [modalMode, setModalMode] = useState<"create" | "edit">("create")

    const [perfil, setPerfil] = useState<Perfil[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perfilPerPage = 10;

    const filteredPerfil = perfil.filter((perfil) =>
        perfil.nombrePerfil.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastPerfil = currentPage * perfilPerPage;
    const indexOfFirstPerfil = indexOfLastPerfil - perfilPerPage;
    const currentPerfiles = filteredPerfil.slice(indexOfFirstPerfil, indexOfLastPerfil);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cargarPerfiles = async () => {
        setIsLoading(true);
        try {
            const data = await getAllPerfiles();
            if (Array.isArray(data)) {
                setPerfil(data);
            } else {
                console.error("La respuesta no es un arreglo:", data);
                setPerfil([]);
            }
        } catch (error) {
            console.error('Error al cargar perfiles:', error);
            setPerfil([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarPerfiles();
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
                            <h1 className="text-button text-base lg:text-lg font-semibold mb-4">Administración de Perfiles</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 w-full x:w-1/2 gap-4">
                            {/* Barra de búsqueda */}
                            <div className="">
                                <Search className="absolute w-5 h-5 mt-[10px] ml-2 text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Buscar perfil..."
                                    className="pl-16 w-10/12 lg:w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-button"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {/* Botón de agregar perfil */}
                            <div className=''>
                                <button onClick={(() => setActiveModal(true))} className='bg-button2 text-white px-4 py-2 rounded'> Agregar Perfil</button>
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
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Perfil</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Fecha Creación</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Editar</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Eliminar</th>
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
                                                        <span>Cargando perfiles...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : currentPerfiles.length === 0 ? (
                                            <tr>
                                                <td colSpan={10} className="text-center py-4 text-gray-400">
                                                    No se encontraron usuarios.
                                                </td>
                                            </tr>
                                        ) : (
                                            currentPerfiles.map((perfil, i) => (
                                                <tr key={i} className="odd:bg-white even:bg-gray-200">
                                                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap relative">{indexOfFirstPerfil + i + 1}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{perfil.nombrePerfil}</td>
                                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                                                        {new Date(perfil.createdDate).toLocaleDateString()} {<br></br>}{new Date(perfil.createdDate).toLocaleTimeString()}
                                                    </td>
                                                    <td className="border text-center">
                                                        <button
                                                            className="border border-orange-500 p-2 rounded-md"
                                                            title="Editar"
                                                            onClick={() => {
                                                                setSelectedPerfil(perfil)
                                                                setModalMode("edit")
                                                                setActiveModal(true)
                                                            }}
                                                        // disabled={!this.state.reset}
                                                        ><SquarePen className='text-orange-500 w-4 h-4' /></button>
                                                    </td>
                                                    <td className="border text-center">
                                                        <button
                                                            className="border border-red-400 p-2 rounded-md"
                                                            title="Eliminar"
                                                            onClick={() => {
                                                                setDeletePerfil(perfil)
                                                                setDeletePerfilModal(true)
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
                                Página {currentPage} de {Math.ceil(filteredPerfil.length / perfilPerPage)}
                            </span>

                            <button
                                className="px-3 py-1 border border-button text-button rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={indexOfLastPerfil >= filteredPerfil.length}
                            >
                                Siguiente
                            </button>
                        </div>

                        <div className="lg:hidden mt-6">
                            {
                                currentPerfiles.map((perfil, i) => (
                                    <div key={i} className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <div>
                                                <h3 className="text-sm">{perfil.nombrePerfil}</h3>
                                                <p className="text-xs text-gray-500">ID: {perfil.idPerfil}</p>
                                            </div>
                                            <div className='text-xs'>
                                                {new Date(perfil.createdDate).toLocaleDateString()} {<br></br>}{new Date(perfil.createdDate).toLocaleTimeString()}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className=" border border-orange-500 p-2 rounded-md"
                                                    title="editar"
                                                    onClick={() => {
                                                        setSelectedPerfil(perfil)
                                                        setModalMode("edit")
                                                        setActiveModal(true)
                                                    }}
                                                ><SquarePen className='text-orange-500 w-4 h-4' />
                                                </button>
                                                <button
                                                    className="border border-red-400 p-2 rounded-md"
                                                    title="Eliminar"
                                                    onClick={() => {
                                                        setDeletePerfil(perfil)
                                                        setDeletePerfilModal(true)
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
            {
                activeModal && (
                    <ModalUpdatePerfil
                        mode={modalMode}
                        perfil={selectedPerfil}
                        onClose={() => {
                            setActiveModal(false)
                            setSelectedPerfil(null)
                        }}
                        onSuccess={() => {
                            setActiveModal(false)
                            setSelectedPerfil(null)
                            cargarPerfiles()
                        }}
                    />
                )
            }

            {
                deletePerfilModal && (
                    <ModalDeletePerfil
                        perfil={deletePerfil}
                        onClose={() => {
                            setDeletePerfilModal(false)
                            setSelectedPerfil(null)
                        }}
                        onSuccess={() => {
                            setDeletePerfilModal(false)
                            setSelectedPerfil(null)
                            cargarPerfiles()
                        }}
                        onError={(msg) => setError(msg)}
                    />
                )
            }

            {
                error && (
                    <ModalStatusDb
                        message={error}
                        onClose={() => setError(null)}
                    />
                )
            }
        </div >
    );
}

export default function Perfiles() {
    return (
        <div className="flex flex-col min-h-screen pb-20 lg:pb-5">
            <Inicio />

            <PerfilesAll />

        </div>
    )
}