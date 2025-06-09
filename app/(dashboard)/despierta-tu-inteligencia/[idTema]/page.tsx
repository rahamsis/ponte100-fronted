'use client'

import { useState, useEffect, use } from "react";
import { fetchQuestionAndAnswer } from "@/app/lib/actions";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Question = {
    id: string;
    question: string;
    tema: string;
    claves: string;
    correctAnswer: string;
};

export default function Inteligencia({ params }: { params: Promise<{ idTema: string }> }) {
    const { idTema } = use(params);
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!idTema) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchQuestionAndAnswer(idTema);
                setQuestions(data);
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
                setError("Error al cargar las preguntas. Por favor intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idTema]);

    const resaltarPalabrasClave = (texto: string, claves: string[]) => {
        if (!claves || claves.length === 0) return texto;

        // Función para limpiar texto (sin tildes, puntuación, etc.)
        const limpiar = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/^[.,!?;:()\[\]{}"“”¡¿]+|[.,!?;:()\[\]{}"“”¡¿]+$/g, "")
                .toLowerCase();

        // Mapeamos claves limpias → claves originales
        const clavesMap = claves.map(original => ({
            original,
            limpio: limpiar(original)
        }));

        const partes: React.ReactNode[] = [];
        let i = 0;

        while (i < texto.length) {
            let match = null;

            for (const { original, limpio } of clavesMap) {
                const segmento = texto.slice(i, i + original.length);
                const segmentoLimpio = limpiar(segmento);

                if (segmentoLimpio === limpio) {
                    match = original;
                    break;
                }
            }

            if (match) {
                partes.push(
                    <span
                        key={i}
                        style={{ color: 'red', textDecoration: 'underline' }}
                    >
                        {texto.slice(i, i + match.length)}
                    </span>
                );
                i += match.length;
            } else {
                partes.push(<span key={i}>{texto[i]}</span>);
                i++;
            }
        }

        return partes;
    };

    if (loading) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent">
                        <span className="sr-only">Cargando...</span>
                    </div>
                    <p className="mt-4 text-button">Cargando preguntas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <div className="text-center p-4 bg-red-100 rounded-lg max-w-md">
                    <p className="text-red-700 font-medium">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    if (questions.length === 0 && !loading) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">No se encontraron preguntas para este tema.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex py-4 md:p-8">
            <div className="mx-auto w-full">
                <div className="items-start mx-4 mt-16 lg:hidden">
                    <button className="flex flex-row" onClick={() => router.push('/despierta-tu-inteligencia')}>
                        <ArrowLeft />
                        <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                            Volver
                        </h2>
                    </button>
                </div>

                <div className="flex w-full justify-center">

                    <div className="lg:w-5/6 w-full mx-3 lg:mx-0 lg:px-6 px-2 md:p-8 bg-white rounded-xl shadow-lg  md:mt-12 mb-6">
                        <div className="lg:flex flex-wrap items-start mx-8 lg:mx-3 hidden">
                            <button className="flex flex-row" onClick={() => router.push('/despierta-tu-inteligencia')}>
                                <ArrowLeft />
                                <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                                    Volver
                                </h2>
                            </button>
                        </div>

                        <div className="justify-between items-start gap-8 mb-2">
                            <div className="flex items-center justify-center w-full relative">
                                {/* Botón Volver (alineado a la izquierda) */}
                                {/* <button
                                    className="flex flex-row items-center"
                                    onClick={() => router.push('/despierta-tu-inteligencia')}
                                >
                                    <ArrowLeft />
                                    <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                                        Volver
                                    </h2>
                                </button> */}

                                {/* Contenedor central (absoluto centrado) */}
                                <div className=" pt-8 left-1/2 text-center border pb-4 rounded-xl w-full lg:w-1/2 min-w-fit">
                                    <h2 className="mb-0 text-[10px] leading-[12px] md:text-xl text-slate-800 font-semibold">
                                        <span className="text-button">{questions[currentQuestion - 1]?.tema?.toUpperCase()}</span>
                                    </h2>
                                    <h2 className="text-secondary text-[8px] lg:text-base font-bold">Total de preguntas: {questions.length}</h2>
                                </div>
                            </div>
                            {questions.map((q, index) => {

                                const clavesArray = q.claves
                                    ? q.claves.split(',').map(p => p.trim())
                                    : [];

                                return (
                                    <div key={q.id || index} className="border p-2 lg:p-4 my-2 mt-3 lg:mb-4 lg:mt-8 rounded-xl">
                                        <h2 className="text-[10px] leading-[12px] md:text-base font-semibold mb-2 text-justify">
                                            {index + 1}.- {resaltarPalabrasClave(q.question, clavesArray)}
                                        </h2>
                                        <h3 className="text-[9px] leading-[12px] md:text-[15px] font-semibold mb-2 text-justify">
                                            Respuesta: {resaltarPalabrasClave(q.correctAnswer, clavesArray)}
                                        </h3>
                                        <div>
                                            <h2 className="text-[10px] leading-[12px] md:text-base text-slate-800 font-semibold right-0">
                                                <span className="text-button">Codigo:</span>
                                                <span className="text-primary break-words">{q.id}</span>
                                            </h2>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-4 md:bottom-14 left-4 md:left-52 bg-green-700 text-white px-3 py-3 rounded-full shadow-md hover:bg-green-600 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
