'use client'

/* eslint-disable */

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePreguntasFallidasStore } from "@/app/lib/stores/preguntasfallidas";
import { useSession } from "next-auth/react";
import { fetchIncorrectQuestions, fetchSaveIncorrectQuestions } from "@/app/lib/actions";
import ExamenConBalotario from "@/app/examenes/examenconbalotario";

import { ModalTimeExpired } from "@/app/components/modales/modalTimeExpired";
import Results from "../result/page";

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

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const quantity = params?.quantity ?? 0;
                if (session?.user?.userId) {
                    const data = await fetchIncorrectQuestions(session.user.userId, quantity)
                    setQuestions(data);
                    setStartTimer(data.length * 72); //72
                    setTimer(data.length * 72); //72 tiempo oficial
                } else {
                    console.error("User ID is not available Fallidas class");
                }
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            }
        };
        fetchQuestions();
    }, []);

    const handleFinish = async () => {
        setIsFinished(true);

        const incorrectIds: string[] = [];
        const correctAnswers = questions.reduce((acc, question, index) => {
            const isCorrect = answers[index + 1] === question.correctAnswer;

            if (!isCorrect) {
                incorrectIds.push(question.id);
            }

            return acc + (isCorrect ? 1 : 0);
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
        setAnswers({});
        setStartTimer(0);
        setTimer(0);
        setIsFinished(false);
        setScore(0);
        setTimeExpired(false);
        sessionStorage.removeItem('preguntasFallidasParams');
        router.push("/actividades")
    }

    if (isFinished) {

        return (
            <Results
                idUsuario={session?.user?.userId ?? ""}
                tipoExamen="preguntas-fallidas"
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
            {timeExpired && (
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