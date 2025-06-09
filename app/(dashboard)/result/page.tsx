import React from "react";
import { ArrowLeft, CircleCheck, CircleX, CircleMinus, Info } from "lucide-react";
import { Tab, TabPanel, TabList, Tabs } from "react-tabs";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

import { saveOrUpdateProgress } from "@/app/lib/actions";

interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

interface ResultsProps {
    idUsuario: string;
    tipoExamen: string
    score: number;
    questions: Question[];
    selectedAnswers: { [key: string]: string };
    startTimer: number;
    timer: number;
    onRestart: () => void;
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const Results = ({
    idUsuario,
    tipoExamen,
    score,
    questions,
    selectedAnswers,
    startTimer,
    timer,
    onRestart }: ResultsProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [tabIndex, setTabIndex] = useState(0);

    const effectRan = useRef(false);

    const handleRedirect = () => {
        if (pathname.includes('examenes-no-repetidos')) {
            router.push('/examenes-no-repetidos');
        } else if (pathname.includes('control-de-habilidades')) {
            router.push('/control-de-habilidades');
        } else if (pathname.includes('talleres-de-estudio')) {
            router.push('/talleres-de-estudio');
        } else {
            router.push('/actividades');
        }
    };

    useEffect(() => {
        if (effectRan.current === false) {

            const guardar = async () => {
                console.log("inicio del gusraddo de datos de progreso")
                const time = startTimer - timer;
                const totalPreguntas = questions.length;
                const correctas = score;
                const incorrectas = Object.keys(selectedAnswers).length - score;
                const nulas = questions.length - Object.keys(selectedAnswers).length;

                saveOrUpdateProgress(idUsuario, tipoExamen, time, totalPreguntas, correctas, incorrectas, nulas,);
                console.log("fin del gusraddo de datos de progreso")
            }
            guardar();

            effectRan.current = true;  // Marcar que ya corrió
        }
    }, []);

    return (
        <>
            <div className="flex flex-col px-2 pb-6 items-center justify-center min-h-screen pt-20">
                <div className="w-full md:w-3/4 p-4 md:p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-base md:text-3xl font-bold text-center text-button mb-3 md:mb-6">Resultados de La Práctica</h2>
                    <div className="flex flex-col justify-center">
                        {/* Version desktop */}
                        <div className="flex flex-col lg:flex-row gap-6 justify-center">
                            <div className="grid grid-col-2 gap-4">
                                <div className="border rounded-xl p-4 text-center flex flex-col justify-center">
                                    <h2 className="text-secondary font-bold text-4xl">{questions.length}</h2>
                                    <h1 className="text-primary font-semibold">Total de Preguntas</h1>
                                </div>
                                <div className="border rounded-xl p-4 text-center flex flex-col justify-center">
                                    <h2 className="text-primary font-bold text-xl">{formatTime(startTimer - timer)}</h2>
                                    <h1 className="text-primary font-semibold">Tiempo de duración</h1>
                                </div>
                            </div>
                            <div className="grid grid-col-3 gap-4">
                                {/* preguntas correctas */}
                                <div className="border rounded-xl p-4">
                                    <div className="flex flex-row space-x-2">
                                        <CircleCheck className="text-green-600" />
                                        <h1 className="text-sm text-primary font-semibold">Total de preguntas correctas</h1>
                                        <h1 className="text-sm font-semibold text-primary">
                                            <span>{score}</span>/<span className="text-gray3">{questions.length}</span>
                                        </h1>
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex flex-row space-x-3">
                                            {/* Barra de progreso */}
                                            <div className="relative mt-1 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-green-600`}
                                                    style={{
                                                        width: `${(score / questions.length) * 100}%`, //esto marca el porcentaje de las que se han respondido
                                                        transition: "width 0.3s ease"
                                                    }}
                                                />
                                            </div>
                                            <div className="text-sm font-semibold text-green-600">
                                                {((score / questions.length) * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Preguntas incorrectas */}
                                <div className="border rounded-xl p-4">
                                    <div className="flex flex-row space-x-2">
                                        <CircleX className="text-red-500" />
                                        <h1 className="text-sm text-primary font-semibold">Total de preguntas incorrectas</h1>
                                        <h1 className="text-sm font-semibold text-primary">
                                            <span>{Object.keys(selectedAnswers).length - score}</span>/<span className="text-gray3">{questions.length}</span>
                                        </h1>
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex flex-row space-x-3">
                                            {/* Barra de progreso */}
                                            <div className="relative mt-1 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-red-500`}
                                                    style={{
                                                        width: `${((Object.keys(selectedAnswers).length - score) / questions.length) * 100}%`, //esto marca el porcentaje de las que se han respondido
                                                        transition: "width 0.3s ease"
                                                    }}
                                                />
                                            </div>
                                            <div className="text-sm font-semibold text-red-500">
                                                {(((Object.keys(selectedAnswers).length - score) / questions.length) * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Preguntas sin responder */}
                                <div className="border rounded-xl p-4">
                                    <div className="flex flex-row space-x-2">
                                        <CircleMinus className="text-blue-500" />
                                        <h1 className="text-sm text-primary font-semibold">Total de preguntas sin responder</h1>
                                        <h1 className="text-sm font-semibold text-primary">
                                            <span>{questions.length - Object.keys(selectedAnswers).length}</span>/<span className="text-gray3">{questions.length}</span>
                                        </h1>
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex flex-row space-x-3">
                                            {/* Barra de progreso */}
                                            <div className="relative mt-1 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-blue-500`}
                                                    style={{
                                                        width: `${((questions.length - Object.keys(selectedAnswers).length) / questions.length) * 100}%`, //esto marca el porcentaje de las que se han respondido
                                                        transition: "width 0.3s ease"
                                                    }}
                                                />
                                            </div>
                                            <div className="text-sm text-blue-500">
                                                {(((Object.keys(questions).length - Object.keys(selectedAnswers).length) / questions.length) * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <div className="flex flex-row bg-timeexpired bg-opacity-10 space-x-4 items-center px-10 py-1 rounded-lg">
                                <Info className="text-button" />
                                <p className="text-button text-xs font-semibold"> * Toda respuesta sin responder ingresa al modulo de preguntas fallidas</p>
                            </div>

                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button className="mt-4 bg-green-600 py-3 px-5 text-sm rounded-xl text-white hover:bg-green-600 mb-4" onClick={handleRedirect}>
                            Reiniciar cuestionario
                        </button>
                    </div>

                    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="w-full">
                        <TabList className="flex flex-row w-full p-1 justify-center border-b mb-5">
                            <Tab
                                className={`p-3 text-xs md:text-sm text-left font-semibold cursor-pointer transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none ${tabIndex === 0 ? "text-primary font-bold underline underline-offset-8" : "text-gray3"
                                    }`}
                            >
                                Todas
                            </Tab>
                            <Tab
                                className={`p-3 text-xs md:text-sm text-left font-semibold cursor-pointer transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none ${tabIndex === 1 ? "text-primary font-bold underline underline-offset-8" : "text-gray3"
                                    }`}
                            >
                                Incorrectas ({Object.keys(selectedAnswers).length - score})
                            </Tab>
                            <Tab
                                className={`p-3 text-xs md:text-sm text-left font-semibold cursor-pointer transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none ${tabIndex === 2 ? "text-primary font-bold underline underline-offset-8" : "text-gray3"
                                    }`}
                            >
                                Correctas ({score})
                            </Tab>
                            <Tab
                                className={`p-3 text-xs md:text-sm text-left font-semibold cursor-pointer transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none ${tabIndex === 3 ? "text-primary font-bold underline underline-offset-8" : "text-gray3"
                                    }`}
                            >
                                Sin contestar ({questions.length - Object.keys(selectedAnswers).length})
                            </Tab>
                        </TabList>

                        <TabPanel className={` ${tabIndex === 0 ? "block" : "hidden"}`} >
                            <ul className="space-y-4">
                                {questions.map((question, index) => (
                                    <li key={index} className="p-4 border rounded-lg">
                                        <p className="font-semibold">{question.question}</p>
                                        {selectedAnswers[index + 1] == null ? (
                                            <div className="text-blue-600 flex flex-row space-x-2"><CircleMinus /> <p>Respuesta sin responder *</p></div>
                                        ) :
                                            question.correctAnswer === selectedAnswers[index + 1] ? (
                                                <div className="text-green-600 flex flex-row space-x-2"><CircleCheck /> <p>Respuesta correcta</p></div>
                                            ) : (
                                                <div className="text-red-500 flex flex-row space-x-2"><CircleX /> <p>Respuesta incorrecta</p></div>
                                            )}
                                        <p className="text-gray-500">
                                            Tu respuesta: <span className="text-xs">
                                                {question.options.map((option) => {
                                                    const [optionId, optionText] = option.split("@");
                                                    return selectedAnswers[index + 1] === optionId ? optionText : "";
                                                })}
                                            </span>
                                        </p>
                                        <p className="text-gray-700 font-semibold">
                                            Respuesta correcta: <span className="text-xs">
                                                {question.options.map((option) => {
                                                    const [optionId, optionText] = option.split("@");
                                                    return question.correctAnswer === optionId ? optionText : "";
                                                })}
                                            </span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>

                        <TabPanel className={`${tabIndex === 1 ? "block" : "hidden"}`}>
                            <ul className="space-y-4">
                                {(Object.keys(selectedAnswers).length - score) > 0 ? (
                                    questions
                                        .map((question, index) => {
                                            const selected = selectedAnswers[index + 1];
                                            if (selected == null || selected === question.correctAnswer) {
                                                return null; // No queremos mostrar si no fue correcta
                                            }

                                            return (
                                                <li key={index} className="p-4 border rounded-lg">
                                                    <p className="font-semibold">{question.question}</p>
                                                    <div className="text-red-500 flex flex-row space-x-2"><CircleX /> <p>Respuesta incorrecta</p></div>
                                                    <p className="text-gray-500">
                                                        Tu respuesta: <span className="text-xs">
                                                            {question.options.map((option) => {
                                                                const [optionId, optionText] = option.split("@");
                                                                return selected === optionId ? optionText : "";
                                                            })}
                                                        </span>
                                                    </p>
                                                    <p className="text-gray-700 font-semibold">
                                                        Respuesta correcta: <span className="text-xs">
                                                            {question.options.map((option) => {
                                                                const [optionId, optionText] = option.split("@");
                                                                return question.correctAnswer === optionId ? optionText : "";
                                                            })}
                                                        </span>
                                                    </p>
                                                </li>
                                            );
                                        })
                                        .filter(Boolean) // elimina los null
                                ) : (
                                    <li className="p-4 border rounded-lg">
                                        <p className="text-gray3 text-center"> No se encontraron datos para mostrar.</p>
                                    </li>
                                )}
                            </ul>
                        </TabPanel>

                        <TabPanel className={`${tabIndex === 2 ? "block" : "hidden"}`}>
                            <ul className="space-y-4">
                                {score > 0 ? (
                                    questions
                                        .map((question, index) => {
                                            const selected = selectedAnswers[index + 1]
                                            if (selected == null || selected !== question.correctAnswer) {
                                                return null;
                                            }

                                            return (
                                                <li key={index} className="p-4 border rounded-lg">
                                                    <p className="font-semibold">{question.question}</p>
                                                    <div className="text-green-600 flex flex-row space-x-2"><CircleCheck /> <p>Respuesta correcta</p></div>
                                                    <p className="text-gray-500">
                                                        Tu respuesta: <span className="text-xs">
                                                            {question.options.map((option) => {
                                                                const [optionId, optionText] = option.split("@");
                                                                return selectedAnswers[index + 1] === optionId ? optionText : "";
                                                            })}
                                                        </span>
                                                    </p>
                                                    <p className="text-gray-700 font-semibold">
                                                        Respuesta correcta: <span className="text-xs">
                                                            {question.options.map((option) => {
                                                                const [optionId, optionText] = option.split("@");
                                                                return question.correctAnswer === optionId ? optionText : "";
                                                            })}
                                                        </span>
                                                    </p>
                                                </li>
                                            );
                                        })
                                        .filter(Boolean)
                                ) : (
                                    <li className="p-4 border rounded-lg">
                                        <p className="text-gray3 text-center"> No se encontraron datos para mostrar.</p>
                                    </li>
                                )}
                            </ul>
                        </TabPanel>

                        <TabPanel className={`${tabIndex === 3 ? "block" : "hidden"}`}>
                            <ul className="space-y-4">
                                {(questions.length - Object.keys(selectedAnswers).length) > 0 ? (
                                    questions
                                        .map((question, index) => {
                                            const selected = selectedAnswers[index + 1];
                                            if (selected != null) return null; // Solo mostrar las no respondidas

                                            return (
                                                <li key={index} className="p-4 border rounded-lg">
                                                    <p className="font-semibold">{question.question}</p>
                                                    <div className="text-blue-600 flex flex-row space-x-2"><CircleMinus /> <p>Respuesta sin responder *</p></div>
                                                    <p className="text-gray-500">
                                                        Tu respuesta: <span className="text-xs">
                                                            {question.options.map((option) => {
                                                                const [optionId, optionText] = option.split("@");
                                                                return selectedAnswers[index + 1] === optionId ? optionText : "";
                                                            })}
                                                        </span>
                                                    </p>
                                                    <p className="text-gray-700 font-semibold">
                                                        Respuesta correcta: <span className="text-xs">
                                                            {question.options.map((option) => {
                                                                const [optionId, optionText] = option.split("@");
                                                                return question.correctAnswer === optionId ? optionText : "";
                                                            })}
                                                        </span>
                                                    </p>
                                                </li>
                                            )
                                        })
                                        .filter(Boolean)
                                ) : (
                                    <li className="p-4 border rounded-lg">
                                        <p className="text-gray3 text-center"> No se encontraron datos para mostrar.</p>
                                    </li>
                                )}
                            </ul>
                        </TabPanel>
                    </Tabs>

                    {/* Lista de preguntas con respuestas correctas o incorrectas */}
                    {/* <ul className="space-y-4">
                    {questions.map((question, index) => (
                        <li key={index} className="p-4 border rounded-lg">
                            <p className="font-semibold">{question.question}</p>
                            {selectedAnswers[index + 1] == null ? (
                                <p className="text-blue-600">Θ Respuesta sin responder *</p>
                            ) :
                                question.correctAnswer === selectedAnswers[index + 1] ? (
                                    <p className="text-green-600">✔ Respuesta correcta</p>
                                ) : (
                                    <p className="text-red-500">✘ Respuesta incorrecta</p>
                                )}
                            <p className="text-gray-500">
                                Tu respuesta: <span className="text-xs">
                                    {question.options.map((option) => {
                                        const [optionId, optionText] = option.split("@");
                                        return selectedAnswers[index + 1] === optionId ? optionText : "";
                                    })}
                                </span>
                            </p>
                            <p className="text-gray-700 font-semibold">
                                Respuesta correcta: <span className="text-xs">
                                    {question.options.map((option) => {
                                        const [optionId, optionText] = option.split("@");
                                        return question.correctAnswer === optionId ? optionText : "";
                                    })}
                                </span>
                            </p>
                        </li>
                    ))}
                </ul> */}


                    <div className="flex justify-center">
                        <button
                            className="mt-4 bg-green-600 py-3 px-3 rounded-xl text-white hover:bg-green-600 mb-4"
                            onClick={handleRedirect}
                        >
                            Reiniciar cuestionario
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Results;
