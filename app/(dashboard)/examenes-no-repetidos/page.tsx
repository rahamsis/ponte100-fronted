'use client'

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Search, ClipboardList } from "lucide-react";
import { fetchTableExams, } from "@/app/lib/actions";

type Examen = {
    idExamen: string;
    titulo: string;
    descripcion: string;
}

function Practica() {
    const router = useRouter();
    const [examenes, setExamenes] = useState<Examen[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchExamenes = async () => {
            try {
                const data = await fetchTableExams();
                setExamenes(data);
            } catch (error) {
                console.error("Error obteniendo los examenes:", error);
            }
        };
        fetchExamenes();
    }, []);

    // Filtrar libros basado en el término de búsqueda
    const filteredExams = examenes.filter(exam =>
        exam.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col pt-14 pb-10">
            {/* Versión escritorio */}
            <section className="bg-postbanner pt-5">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                        <button className="flex flex-row" onClick={() => router.push('/actividades')}>
                            <ArrowLeft />
                            <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                                Volver
                            </h2>
                        </button>
                    </div>

                    <div className="mx-8 lg:mx-3 pt-3 lg:pt-6">
                        <div className="text-button space-y-3">
                            <h2 className="font-bold text-xl">Exámenes no repetidos</h2>
                            <p className="text-concepto">Exámenes únicos, sin preguntas repetidas. Cada prueba es una nueva oportunidad para demostrar tu preparación.</p>
                        </div>
                    </div>

                    <div className="mx-8 lg:mx-3 pt-3">
                        {/* Barra de búsqueda */}
                        <div className="mb-6 mt-4">
                            <Search className="absolute w-8 h-8 mt-[10px] ml-2 text-secondary" />
                            <input
                                type="text"
                                placeholder="Buscar examenes..."
                                className="pl-16 w-full x:w-1/4 p-3 border rounded-lg focus:outline-none "
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* Resultados */}
                        {filteredExams.length === 0 ? (
                            <div className="flex flex-col items-center justify-centertext-center py-8">
                                <Search className="w-8 h-8 lg:w-16 lg:h-16 text-[#CAD3F5] " />
                                <p className="text-gray3 text-lg text-center">No se encontraron resultados de la búsqueda</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                {filteredExams.map((exam, i) => (
                                    <ExamCard key={i} exam={exam} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

// Componente que renderiza las tarjetas de examenes
function ExamCard({ exam }: { exam: { titulo: string; idExamen: string; } }) {
    const router = useRouter();
    return (
        <div className="p-3 bg-white rounded-lg shadow-md flex flex-row space-x-3 items-center">
            <div className="flex items-center justify-center">
                <ClipboardList className="text-button"/>
            </div>
            
            <div className="items-left text-left w-full">
                <h3 className="text-sm font-bold text-primary">{exam.titulo}</h3>
                {/* Espaciador flexible para empujar el botón hacia abajo */}
                {/* <div className="flex-grow"></div> */}

            </div>

            <div className="flex justify-end w-full">
                <button
                    onClick={() => router.push(`/examenes-no-repetidos/${exam.idExamen}`)}
                    className="bg-button text-white rounded-lg px-4 py-2"
                >
                    Empezar
                </button>
            </div>
        </div>
    );
}

export default function ExamenesNoRepetidos() {
    return (
        <>
            <Practica />
        </>
    )
}