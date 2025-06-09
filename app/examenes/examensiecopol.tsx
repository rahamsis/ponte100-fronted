"use client";

/* eslint-disable */


import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useSession } from "next-auth/react";

interface Question {
    id: string;
    question: string;
    tema: string;
    options: string[];
    correctAnswer: string;
}

interface QuestionnaireProps {
    questions: Question[];
    selectedAnswers: { [key: string]: string };
    setSelectedAnswers: (answers: { [key: string]: string }) => void;
    currentQuestion: number;
    setCurrentQuestion: (question: number) => void;
    handleFinish: () => void;
    timer: number;
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const ExamenSiecopol = ({
    questions,
    selectedAnswers,
    setSelectedAnswers,
    currentQuestion,
    setCurrentQuestion,
    handleFinish,
    timer,
}: QuestionnaireProps) => {
    const [answeredQuestions, setAnsweredQuestions] = useState<
        { question: number; letter: string }[]
    >([]);
    const columns = Math.ceil(questions.length / 20);
    const { data: session, status } = useSession();

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

    return (
        <div className="relative w-full pb-8">
            <div className="bg-[#087bb4] text-center text-white py-5 top-0 border-b-2 border-blue-600">
                <div className="text-lg md:text-2xl font-extrabold">POLICÍA NACIONAL DEL PERÚ</div>
                <div className="text-xs md:text-base">Sistema de Evaluación del Conocimiento Policial - SIECOPOL</div>
                <div className="text-xs md:text-base">Módulo de Examen Virtual</div>
                <div className="text-[9px] md:text-xs">
                    SIMULADOR DEL PROCESO DE SUBOFICIALES DE ARMAS 2025 - PROMOCIÓN 2026
                </div>
            </div>

            <div className="mx-2 md:mx-8">
                <div className="w-full py-4 text-center md:text-right">
                    Usuario: {session ? session.user?.name : ""}
                </div>
                <div className="w-full border-t-2 border-blue-600 ">
                    <div className={`flex mt-4 `}>
                        <div className="hidden lg:w-4/12 x:w-3/12 md:block ">
                            <div className="rounded-lg border border-black p-6 shadow-sm">
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

                        <div className="w-full md:w-9/12 ">
                            <div className="mx-auto w-full rounded-lg px-6 shadow-sm">
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
                                        className="md:hidden px-4 py-2 bg-gray-200 border border-black font-bold text-sm"
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
                                        className="md:hidden px-4 py-2 bg-gray-200 border border-black font-bold text-sm"
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
        </div>
    );
};

export default ExamenSiecopol;
