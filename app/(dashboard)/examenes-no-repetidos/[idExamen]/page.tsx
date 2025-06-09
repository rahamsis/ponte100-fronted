"use client"

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { use } from 'react';
import {
    fetchQuestionSiecopolWhitOffset,
    fetchSaveIncorrectQuestions
} from "@/app/lib/actions";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { ModalTimeExpired } from "@/app/components/modales/modalTimeExpired";
import Results from "../../../components/result/result";

interface Question {
    id: string;
    question: string;
    tema: string;
    options: string[];
    correctAnswer: string;
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};


export default function Examen({ params }: { params: Promise<{ idExamen: string }> }) {
    const { data: session } = useSession();
    const { idExamen } = use(params);
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [startTimer, setStartTimer] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [timeExpired, setTimeExpired] = useState(false);
    const columns = Math.ceil(questions.length / 20);
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [answeredQuestions, setAnsweredQuestions] = useState<{ question: number; letter: string }[]>([]);
    const [score, setScore] = useState(0);

    // Traer las preguntas por idExamen
    useEffect(() => {
        if (!idExamen) return;

        const fetchQuestions = async () => {
            try {
                const data = await fetchQuestionSiecopolWhitOffset(idExamen);
                setQuestions(data);
                setStartTimer(data.length * 72); //72
                setTimer(data.length * 72); //72 tiempo oficial
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            }
        };
        fetchQuestions();
    }, [idExamen]);

    // Contador o timer
    useEffect(() => {
        if (isFinished || timeExpired) return;

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setTimeExpired(true);
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [
        isFinished,
        timeExpired,
    ]);

    const handleAnswer = (value: string) => {
        const optionIndex = questions[currentQuestion - 1].options.findIndex(
            (opt) => opt.startsWith(value)
        );
        const letter = String.fromCharCode(65 + optionIndex);

        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion]: value,
        });

        setAnsweredQuestions((prev) => {
            // Si la pregunta ya está respondida, la reemplazamos
            const updatedAnswers = prev.filter(
                (ans) => ans.question !== currentQuestion
            );
            return [...updatedAnswers, { question: currentQuestion, letter }];
        });
    };

    const deleteAnswer = () => {
        if (selectedAnswers[currentQuestion]) {
            // Crear una copia del objeto sin la respuesta de la pregunta actual
            const updatedAnswers = { ...selectedAnswers };
            delete updatedAnswers[currentQuestion];

            setSelectedAnswers(updatedAnswers);

            // También eliminar de las preguntas respondidas
            setAnsweredQuestions((prev) =>
                prev.filter((ans) => ans.question !== currentQuestion)
            );
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleFinish = async () => {
        setIsFinished(true);

        const incorrectIds: string[] = [];

        const correctAnswers = questions.reduce((acc, question, index) => {
            const isCorrect = selectedAnswers[index + 1] === question.correctAnswer;

            if (!isCorrect) {
                incorrectIds.push(question.id);
            }

            return acc + (isCorrect ? 1 : 0)
        }, 0);

        setScore(correctAnswers);

        if (session?.user?.userId) {
            await fetchSaveIncorrectQuestions(session.user.userId, incorrectIds);
        } else {
            console.error("User ID is not available Practica class");
        }
    };

    const restartAll = () => {
        setQuestions([]);
        setCurrentQuestion(1);
        setSelectedAnswers({});
        setIsFinished(false);
        setScore(0);
        // setQuantitySelect(0);
        // setExamStarted(false);
        setStartTimer(0);
        setTimer(0);

        router.push("/Examenes-no-repetidos")
    }

    if (isFinished) {
        return (
            <Results
                idUsuario={session?.user?.userId ?? ""}
                tipoExamen="examenes-no-repetidos"
                score={score}
                questions={questions}
                selectedAnswers={selectedAnswers}
                startTimer={startTimer}
                timer={timer}
                onRestart={restartAll} />

        );
    }

    if (questions.length === 0) {
        return <div>Cargando preguntas...</div>;
    }

    return (
        <div className="relative pb-8 pt-16 mx-auto lg:mx-16">
            <button className="flex flex-row mt-5" onClick={() => router.push('/examenes-no-repetidos')}>
                <ArrowLeft />
                <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                    Volver
                </h2>
            </button>
            <div className="bg-[#087bb4] text-center text-white py-5 top-0 border-b-2 border-blue-600">
                <div className="text-lg md:text-2xl font-extrabold">POLICÍA NACIONAL DEL PERÚ</div>
                <div className="text-xs md:text-base">Sistema de Evaluación del Conocimiento Policial - SIECOPOL</div>
                <div className="text-xs md:text-base">Módulo de Examen Virtual</div>
                <div className="text-[9px] md:text-xs">
                    SIMULADOR DEL PROCESO DE SUBOFICIALES DE ARMAS 2025 - PROMOCIÓN 2026
                </div>
            </div>

            <div className="mx-2">
                <div className="w-full py-4 text-center md:text-right">
                    Usuario: {session ? session.user?.name : ""}
                </div>
                <div className="w-full border-t-2 border-blue-600 ">
                    <div className={`flex mt-4 `}>
                        <div className="hidden lg:w-4/12 x:w-3/12 x:block ">
                            <div className="rounded-lg border border-black p-3 2xl:p-8 shadow-sm">
                                <h3 className="mb-6 text-center text-lg font-medium">
                                    Tabla de Preguntas
                                </h3>
                                <div className="grid grid-cols-5 gap-1 ">
                                    {Array.from({ length: columns }).map((_, colIndex) => (
                                        <div key={colIndex} className="flex flex-col gap-0">
                                            {questions
                                                .slice(colIndex * 20, (colIndex + 1) * 20)
                                                .map((question, index) => {
                                                    const questionNumber = colIndex * 20 + index + 1;
                                                    return (
                                                        <button
                                                            key={questionNumber}
                                                            onClick={() => setCurrentQuestion(questionNumber)}
                                                            className="flex w-12 h-7 items-center gap-1"
                                                        >
                                                            {/* Círculo */}
                                                            <div className="w-4 h-4 border-2 border-black rounded-full flex items-center justify-center">
                                                                <div
                                                                    className={`w-2 h-2 rounded-full ${currentQuestion === questionNumber
                                                                        ? "bg-black"
                                                                        : "bg-white"
                                                                        }`}
                                                                ></div>
                                                            </div>
                                                            {/* Número */}
                                                            <span
                                                                className={`text-sm ${selectedAnswers[questionNumber]
                                                                    ? " bg-red-400 px-1"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                {questionNumber}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-full x:w-9/12 ">
                            <div className="mx-auto w-full rounded-lg p-3 shadow-sm">
                                <div className="md:flex items-center  mb-4">
                                    <div className="text-blue-800 font-semibold mb-4 md:mb-0">
                                        {" "}
                                        {formatTime(timer)}{" "}
                                        <span className="text-blue-600 font-semibold">
                                            | {questions[currentQuestion - 1].tema}
                                        </span>
                                    </div>
                                    <button
                                        className={`py-3 px-3 w-full lg:w-4/12 x:w-3/12 rounded-xl text-black border-2 border-gray-300 text-base ml-auto`}
                                        onClick={handleFinish}
                                    >
                                        Finalizar Simulacro
                                    </button>
                                </div>
                                <h3 className="pt-3 mb-6 text-justify text-xs md:text-base border-y-2 border-blue-600">
                                    {currentQuestion}. {questions[currentQuestion - 1].question}
                                </h3>
                                <RadioGroup
                                    value={selectedAnswers[currentQuestion] ?? null}
                                    onChange={handleAnswer}
                                    className="space-y-4"
                                >
                                    {questions[currentQuestion - 1].options.map(
                                        (option, index) => {
                                            const [optionId, optionText] = option.split("@");
                                            // Convertir índice numérico a letra (A, B, C, D...)
                                            const letter = String.fromCharCode(65 + index);

                                            return (
                                                <RadioGroup.Option key={optionId} value={optionId}>
                                                    {({ checked }) => (
                                                        <div className={`flex items-center`}>
                                                            {/* Círculo externo */}
                                                            <div
                                                                className={`relative flex items-center justify-center h-5 w-5 rounded-full border-2 border-black`}
                                                            >
                                                                {/* Círculo interno (se pinta de negro si está seleccionado) */}
                                                                <div
                                                                    className={`w-3 h-3 rounded-full ${checked ? "bg-black" : "bg-white"
                                                                        }`}
                                                                ></div>
                                                            </div>
                                                            <span className="ml-3 text-xs md:text-sm cursor-default">
                                                                {letter}. {optionText}
                                                            </span>
                                                        </div>
                                                    )}
                                                </RadioGroup.Option>
                                            );
                                        }
                                    )}
                                </RadioGroup>

                                <div className="pt-7 grid grid-cols-4 gap-2">
                                    <button
                                        className="lg:hidden px-4 py-2 bg-gray-200 border border-black font-bold text-sm"
                                        onClick={handlePrevious}
                                    >
                                        &lt;
                                    </button>

                                    <button
                                        className="px-4 col-span-2 lg:col-span-2 x:col-span-1 py-2 bg-gray-200 border border-black font-bold text-sm md:text-base"
                                        onClick={deleteAnswer}
                                    >
                                        Borrar Respuesta
                                    </button>

                                    <button
                                        className="lg:hidden px-4 py-2 bg-gray-200 border border-black font-bold text-sm"
                                        onClick={handleNext}
                                    >
                                        &gt;
                                    </button>
                                </div>

                                <div className="pt-7 font-semibold text-xs md:text-base">
                                    <span>
                                        CÓDIGO DE PREGUNTA - {questions[currentQuestion - 1].id}
                                    </span>
                                </div>

                                <div className="border-b-2 border-blue-600 pb-6" />

                                <div className="text-blue-600 font-semibold my-4 text-xs md:text-base">
                                    <span>
                                        Preguntas Contestadas: {Object.keys(selectedAnswers).length}{" "}
                                        | Preguntas sin Contestar{" "}
                                        {questions.length - Object.keys(selectedAnswers).length}
                                    </span>
                                </div>

                                <div className="text-blue-600 font-semibold my-4 flex gap-1">
                                    <span>
                                        {answeredQuestions
                                            .sort((a, b) => Number(a.question) - Number(b.question)) // Ordenar por número de pregunta
                                            .map(({ question, letter }) => `${question}${letter}`)
                                            .join(", ")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Renderizado de modales */}
            {timeExpired && (
                <ModalTimeExpired onClose={() => { }} handleFinish={handleFinish} />
            )}
        </div>
    )
}