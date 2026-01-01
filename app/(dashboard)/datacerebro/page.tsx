'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import { getAllDataQuestions } from "@/app/lib/actions";

type Data = {
    pregunta: string,
    alternativa_a: string,
    alternativa_b: string,
    alternativa_c: string,
    alternativa_d: string,
    alternativa_e: string,
    respuesta: string,
    clave_pregunta: string,
    clave_respuesta: string,
    codigo: string,
    ubicacion: string,
    asignatura: string,
}



function Main() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Data[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10;
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;

    const currentData = data.slice(indexOfFirstData, indexOfLastData);

    const [rowHeights, setRowHeights] = useState<{ [key: number]: number }>({});
    const rowRefs = useRef<{ [key: number]: HTMLTableRowElement | null }>({});


    const cargarData = async (filtro: string) => {
        setIsLoading(true);
        try {
            const data = await getAllDataQuestions(filtro);
            setData(data);
        } catch (error) {
            console.error('Error al obtener los datos de la pregunta:', error);
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const resizers = document.querySelectorAll(".resizer");

        resizers.forEach((resizer) => {
            resizer.addEventListener("mousedown", (e) => {
                const mouseEvent = e as MouseEvent;
                mouseEvent.preventDefault();

                const th = resizer.parentElement as HTMLElement;
                const startX = mouseEvent.pageX;
                const startWidth = th.offsetWidth;

                const onMouseMove = (moveEvent: MouseEvent) => {
                    const newWidth = startWidth + (moveEvent.pageX - startX);
                    th.style.width = `${newWidth}px`;
                };

                const onMouseUp = () => {
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                };

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
            });
        });
    }, []);

    const startResizing = (index: number, e: React.MouseEvent) => {
        const startY = e.clientY;
        const startHeight = rowRefs.current[index]?.offsetHeight || 0;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const newHeight = startHeight + (moveEvent.clientY - startY);
            setRowHeights(prev => ({ ...prev, [index]: newHeight }));
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };


    return (
        <div className="w-full pt-16">
            <div className="lg:ml-20">
                <div className="mx-8 lg:mx-3">
                    <div className="py-4 space-y-4">
                        <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                            <button className="flex flex-row" onClick={() => router.push('/actividades')}>
                                <ArrowLeft />
                                <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                                    <span className="text-concepto text-opacity-50">Actividades/</span>Data Cerebro
                                </h2>
                            </button>
                        </div>

                        <div className="mx-8 lg:mx-3 pt-3 lg:pt-6">
                            <div className="text-button space-y-3">
                                <h2 className="font-bold text-xl">Data Cerebro ©</h2>
                                <p className="text-concepto">
                                    Data Cerebro ©, es la herramienta digital estratégica del método de estudio PONTE 100™, diseñada para organizar
                                    preguntas, respuestas, alternativas, palabras clave, códigos temáticos y asignaturas. Actúa como un banco inteligente
                                    de conocimiento, con filtros y buscadores automáticos que optimizan el acceso a la información, fortalecen la asociación
                                    cognitiva y aceleran la comprobación activa del aprendizaje.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row mx-auto items-center gap-4 w-1/2">
                            {/* Imagen izquierda */}
                            <div className="hidden md:block">
                                <Image
                                    src={"/images/row.png"}
                                    alt="row"
                                    width={500}
                                    height={500}
                                    className="w-20 h-10"
                                />
                            </div>

                            {/* Barra de búsqueda */}
                            <div className="flex-1">
                                <div className="flex gap-4 w-full">
                                    <div className="relative flex-1">
                                        <Search className="absolute w-5 h-5 mt-[10px] ml-2 text-secondary" />
                                        <input
                                            type="text"
                                            placeholder="Ingresa código o palabra a buscar..."
                                            className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-button"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => cargarData(searchTerm)}
                                            className="bg-button2 text-white px-4 py-2 rounded"
                                        >
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Imagen derecha */}
                            <div>
                                <Image
                                    src={"/images/banners/imgBanner2.png"}
                                    alt="row"
                                    width={500}
                                    height={500}
                                    className="w-10 h-10"
                                />
                            </div>
                        </div>


                        {/* Contenedor principal con scroll horizontal aislado */}
                        <div className="relative w-[calc(100vw-4rem)] md:w-[calc(100vw-6rem)] lg:w-[calc(100vw-18rem)] x:w-[calc(100vw-20rem)] rounded-lg">
                            {/* Contenedor de scroll con ancho restringido */}
                            <div className="overflow-x-auto ">
                                {/* Tabla con ancho mínimo garantizado */}
                                <table className="min-w-max table-auto border-collapse text-sm">
                                    <thead className="bg-button text-white">
                                        <tr>
                                            <th className="relative border border-gray-300 px-3 py-2 text-left whitespace-nowrap">
                                                #
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                PREGUNTA
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                A
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                B
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                C
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                D
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                E
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                RESPUESTA
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                CLAVE PREGUNTA
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                CLAVE RESPUESTA
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                CÓDIGO
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                UBICACIÓN
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                            <th style={{ width: '150px' }} className="relative border border-gray-300 px-4 py-2 text-left whitespace-nowrap cursor-col-resize resizer">
                                                ASIGNATURA
                                                <div className="resizer absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-400" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={13} className="text-center py-4 text-gray-500">
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
                                                        <span>Cargando información...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : currentData.length === 0 ? (
                                            <tr>
                                                <td colSpan={13} className="text-center py-4 text-gray-400">
                                                    No se encontraron resultados.
                                                </td>
                                            </tr>
                                        ) : (
                                            currentData.map((question, i) => (
                                                <tr key={i}
                                                    ref={el => { rowRefs.current[i] = el; }}
                                                    className="relative odd:bg-white even:bg-gray-200"
                                                    style={{ height: rowHeights[i] ? `${rowHeights[i]}px` : 'auto' }}>
                                                    <td className="border border-gray-300 px-3 py-2 truncate whitespace-nowrap">{indexOfFirstData + i + 1}
                                                        <div
                                                            className="resizer-row absolute bottom-0 left-0 w-full h-[2px] cursor-row-resize bg-blue-400"
                                                            onMouseDown={(e) => startResizing(i, e)}
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.pregunta}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.alternativa_a}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.alternativa_b}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.alternativa_c}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.alternativa_d}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.alternativa_e}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.respuesta}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.clave_pregunta}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.clave_respuesta}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.codigo}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.ubicacion}</td>
                                                    <td className="border border-gray-300 px-4 py-2 ">{question.asignatura}</td>
                                                </tr>
                                            ))
                                        )}
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
                                Página {currentPage} de {Math.ceil(data.length / dataPerPage)}
                            </span>

                            <button
                                className="px-3 py-1 border border-button text-button rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={indexOfLastData >= data.length}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Datacerebro() {
    return (
        <div className="flex flex-col min-h-screen pb-20 lg:pb-5">
            <Main />

        </div>
    )
}