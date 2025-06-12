'use client'

/* eslint-disable */

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePreguntasFallidasStore } from "@/app/lib/stores/preguntasfallidas";
import { useSession } from "next-auth/react";
import { fetchIncorrectQuestions, updateIncorrectQuestions, saveOrUpdateProgress } from "@/app/lib/actions";
import ExamenConBalotario from "@/app/examenes/examenconbalotario";

import { ModalTimeExpired } from "@/app/components/modales/modalTimeExpired";
import Results from "../../components/result/result";

type Question = {
    id: string;
    question: string;
    tema: string;
    options: string[];
    correctAnswer: string;
    intentos: number;
};

function PreguntasFallidas() {
    const { params, clearParams } = usePreguntasFallidasStore();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [questions, setQuestions] = useState<Question[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [timeExpired, setTimeExpired] = useState(false);

    const [startTimer, setStartTimer] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        // Intentar obtener de Zustand primero
        if (params?.quantity == null || params?.quantity < 0) {
            router.push("/actividades")
        }
        if (params) {
            console.log('Datos desde Zustand:', params);
        }

        // Fallback a sessionStorage
        const sessionData = sessionStorage.getItem('preguntasFallidasParams');
        if (sessionData) {
            console.log('Datos desde sessionStorage:', JSON.parse(sessionData));
            // sessionStorage.removeItem('primeraPracticaParams');
        }
    }, []);

    // Contador o timer
    useEffect(() => {
        if (isFinished || timeExpired || questions.length === 0 || timer === 0) return;

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
        questions.length,
        timer
    ]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                const quantity = params?.quantity ?? 0;
                if (session?.user?.userId) {
                    const data = await fetchIncorrectQuestions(session.user.userId, quantity)
                    setQuestions(data);
                    setStartTimer(data.length * 6); //72
                    setTimer(data.length * 6); //72 tiempo oficial
                } else {
                    console.error("User ID is not available Fallidas class");
                }
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
                setError("Error al cargar las preguntas. Por favor intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleFinish = async () => {
        setIsFinished(true);

        // Inicializar arrays para IDs correctos e incorrectos
        const correctIds: string[] = [];
        const incorrectIds: string[] = [];

        const correctAnswers = questions.reduce((acc, question, index) => {
            const isCorrect = answers[index + 1] === question.correctAnswer;

            if (isCorrect) {
                correctIds.push(question.id);
            } else {
                incorrectIds.push(question.id);
            }

            return acc + (isCorrect ? 1 : 0);
        }, 0);

        setScore(correctAnswers);

        // Inicializar valores para guardar el progreso del usuario
        console.log("inicio del guardado de datos de progreso")
        const time = startTimer - timer;
        const totalPreguntas = questions.length;
        const correctas = correctAnswers;
        const incorrectas = Object.keys(answers).length - correctAnswers;
        const nulas = questions.length - Object.keys(answers).length;

        if (session?.user?.userId) {
            try {
                await updateIncorrectQuestions(session.user.userId, correctIds, incorrectIds);
                await saveOrUpdateProgress(session.user.userId, "preguntas-fallidas", time, totalPreguntas, correctas, incorrectas, nulas,);
            } catch (error) {
                console.error("Error al guardar progreso o preguntas fallidas:", error);
            }
        } else {
            console.error("User ID is not available Practica class");
        }
    };

    const restartAll = () => {
        setQuestions([]);
        setCurrentQuestion(1);
        setAnswers({});
        setStartTimer(0);
        setTimer(0);
        setIsFinished(false);
        setScore(0);
        setTimeExpired(false);
        sessionStorage.removeItem('preguntasFallidasParams');
        router.push("/actividades")
    }

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
                        // onClick={() => window.location.reload()}
                        onClick={() => router.push("/examenes-no-repetidos")}
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

    if (isFinished) {

        return (
            <Results
                idUsuario={session?.user?.userId ?? ""}
                score={score}
                questions={questions}
                selectedAnswers={answers}
                startTimer={startTimer}
                timer={timer}
                onRestart={restartAll}
            />
        );
    }

    return (
        <div className="flex flex-col pt-14">
            {/* Versión escritorio */}
            <section className="bg-postbanner pt-5">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                        <button className="flex flex-row" onClick={() => router.back()}>
                            <ArrowLeft />
                            <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                                Volver
                            </h2>
                        </button>
                    </div>

                    <div>
                        <div className="flex w-full justify-center">
                            {questions.length > 0 && <ExamenConBalotario
                                questions={questions}
                                selectedAnswers={answers}
                                setSelectedAnswers={setAnswers}
                                currentQuestion={currentQuestion}
                                setCurrentQuestion={setCurrentQuestion}
                                handleFinish={handleFinish}
                                timer={timer}
                                timeExpired={timeExpired}
                            />}
                        </div>
                    </div>
                </div>
            </section>

            {/* Renderizado de modales */}
            {timeExpired && questions.length > 0 && (
                <ModalTimeExpired onClose={() => { }} handleFinish={handleFinish} />
            )}
        </div>
    )
}

export default function PracticaUntema() {
    return (
        <>
            <PreguntasFallidas />
        </>
    )
}