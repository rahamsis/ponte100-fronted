'use client'

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { Clock } from "lucide-react";

interface Question {
    id: string;
    question: string;
    tema: string;
    options: string[];
    correctAnswer: string;
    intentos: number;
};

interface QuestionnaireProps {
    questions: Question[];
    currentQuestion: number;
    setCurrentQuestion: (question: number) => void;
    selectedAnswers: { [key: string]: string };
    setSelectedAnswers: (answers: { [key: string]: string }) => void;
    timer: number;
    timeExpired: boolean;
    handleFinish: () => void;
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const ExamenSinBalotario: React.FC<QuestionnaireProps> = ({
    questions,
    selectedAnswers,
    setSelectedAnswers,
    currentQuestion,
    timer,
    timeExpired,
    setCurrentQuestion,
    handleFinish,
}) => {
    // const [pageStart, setPageStart] = useState(1);
    // console.log(questions, selectedAnswers, currentQuestion, timer, timeExpired, )

    const handleAnswer = (value: string) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion]: value,
        });
    };

    const handleNext = () => {
        // valida que se marque al menos una alternativa para pasara a la siguiente
        // if (currentQuestion < questions.length && selectedAnswers[currentQuestion] !== undefined) { 
        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            // if (currentQuestion % 10 === 0) {
            //     setPageStart((prev) => prev + 10);
            // }
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div className="flex my-7 lg:px-0 w-full 0">
            <div className="mx-auto md:w-full">
                <div className={`x:flex flex-row space-x-3`}>
                    <div className="w-full">
                        <div className="mx-auto w-full rounded-lg border p-3 lg:p-6 shadow-sm bg-white">
                            <div className={`w-full text-center mb-4 ${questions[currentQuestion - 1].intentos !== undefined ? 'md:hidden' : 'hidden'}`}>
                                <div className={`text-2xl font-semibold ${timeExpired ? "text-red-500" : ""}`}>
                                    {formatTime(timer)}
                                </div>
                            </div>

                            <div className="flex flex-row space-x-3 mb-3">
                                <div className="text-sm font-semibold text-black">
                                    {Object.keys(selectedAnswers).length}/{questions.length}
                                </div>
                                {/* Barra de progreso */}
                                <div className="relative mt-1 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${timeExpired ? "bg-red-500" : "bg-green-600"}`}
                                        style={{
                                            width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%`, //esto marca el porcentaje de las que se han respondido
                                            transition: "width 0.3s ease"
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                {/* Intentos */}
                                {questions[currentQuestion - 1].intentos !== undefined &&
                                    <div className="text-sm md:text-xl font-semibold flex justify-center items-center">
                                        {/* Icono con tooltip */}
                                        <div className="relative cursor-pointer text-green-800 group mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                            </svg>
                                            <span className="absolute left-1/2 -top-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] 
                                            transition-all duration-200 bg-green-800 text-white text-xs rounded-md px-2 py-2 whitespace-nowrap">
                                                intentos para eliminar pregunta fallida
                                            </span>
                                        </div>
                                        <div className="">
                                            Intento: {questions[currentQuestion - 1].intentos > 1 ? 1 : 2} de 2
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className="flex flex-col lg:flex-row space-x-4">
                                {/* Timer - si no hay intentos muestro el timer a la derecha (para no descuadrar) */}
                                <div className={`${questions[currentQuestion - 1].intentos !== undefined ? 'hidden' : ''} md:flex border rounded-md p-2 flex justify-center items-center`}>
                                    <div className="pr-2">
                                        <Clock className={`w-10 h-10 ${timeExpired ? "text-red-500" : "text-secondary"}`} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold">
                                            Tiempo restante
                                        </div>
                                        <div className={`text-sm font-semibold ${timeExpired ? "text-red-500" : ""}`}>
                                            {formatTime(timer)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <h2 className="text-sm md:text-base text-slate-800 font-semibold left-0">
                                        Tema: <span className="text-secondary break-words">{questions[currentQuestion - 1].tema}</span>
                                    </h2>
                                    <h2 className="text-sm md:text-base text-slate-800 font-semibold right-0">
                                        Codigo: <span className="text-secondary break-words">{questions[currentQuestion - 1].id}</span>
                                    </h2>
                                </div>
                            </div>

                            <h3 className="text-[10px] leading-[12px] md:text-sm 2xl:text-base font-semibold mb-2 mt-4 md:mb-4 text-justify">{questions[currentQuestion - 1].question}</h3>
                            <RadioGroup value={selectedAnswers[currentQuestion] ?? null} onChange={handleAnswer} className="space-y-4">
                                {questions[currentQuestion - 1].options.map((option, index) => {

                                    const [optionId, optionText] = option.split("@")
                                    return (
                                        <RadioGroup.Option key={optionId} value={optionId}>
                                            {({ checked }) => (
                                                <div className={`flex text-[8px] leading-[12px] md:text-xs items-center rounded-lg border p-2 transition-colors 
                                                ${checked ? 'bg-green-500 text-white' : 'hover:bg-accent'}`}>
                                                    <span className={`pr-3 h-5 w-5 rounded-full border-2 ${checked ? 'bg-green-500' : 'border-gray-400'}`} />
                                                    <span className="ml-3 text-xs text-justify  cursor-default">{optionText}</span>
                                                </div>
                                            )}
                                        </RadioGroup.Option>
                                    )
                                })}
                            </RadioGroup>

                            <div className="mt-6 flex justify-end space-x-3 border-t-2 pt-4">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentQuestion === 0}
                                    className={`border-2 border-button py-2 px-5 rounded-xl text-button 
                                        ${currentQuestion === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    Anterior
                                </button>
                                {currentQuestion === questions.length ? (
                                    <button
                                        className={`bg-button py-2 px-5 rounded-xl text-white ${selectedAnswers[currentQuestion] !== null && "hover:bg-green-500"}`}
                                        onClick={handleFinish}
                                    // disabled={selectedAnswers[currentQuestion] === undefined}
                                    >
                                        Finalizar
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        disabled={currentQuestion === questions.length}
                                        className={`bg-button py-2 px-5 rounded-xl text-white 
                                            ${selectedAnswers[currentQuestion] !== undefined && "cursor-pointer"}`}
                                    >
                                        Siguiente
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ExamenSinBalotario;
