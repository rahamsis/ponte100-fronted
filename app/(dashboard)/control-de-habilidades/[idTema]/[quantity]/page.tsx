'use client'

import { useState, useEffect, use } from "react";
import { fetchQuestionHabilidades, fetchSaveIncorrectQuestions } from "@/app/lib/actions";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Results from "@/app/components/result/page";

import ExamenSinBalotario from "@/app/examenes/examensinbalotario";
import { ModalTimeExpired } from "@/app/components/modales/modalTimeExpired";

type Question = {
    id: string;
    question: string;
    tema: string;
    options: string[];
    correctAnswer: string;
    intentos: number;
};

export default function Habilidades({ params }: { params: Promise<{ idTema: string, quantity: string }> }) {
    const { idTema, quantity } = use(params);
    const { data: session } = useSession();
    const router = useRouter();
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
        if (!idTema || !quantity) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchQuestionHabilidades(idTema, Number(quantity));
                setQuestions(data);
                setStartTimer(data.length * 6); //72
                setTimer(data.length * 6); //72 tiempo oficial
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
                setError("Error al cargar las preguntas. Por favor intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idTema, quantity]);

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
        // setIncorrectQuestions(incorrectIds);

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

        router.push("/control-de-habilidades")
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

    if (isFinished) {

        return (
            <Results
                idUsuario={session?.user?.userId ?? ""}
                tipoExamen="control-de-habilidades"
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
        <div className="flex min-h-[80vh] py-4 md:p-8">
            <div className="mx-auto w-full">
                <div className="flex w-full justify-center">
                    <div className="w-full mx-3 lg:mx-0 lg:w-5/6 px-3 lg:px-6 p-4 md:p-8 bg-white rounded-xl shadow-lg mt-16 md:mt-12 mb-6">
                        <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                            <button className="flex flex-row" onClick={() => router.push('/control-de-habilidades')}>
                                <ArrowLeft />
                                <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                                    Volver
                                </h2>
                            </button>
                        </div>

                        <div className="flex w-full justify-center">
                            <ExamenSinBalotario
                                questions={questions}
                                selectedAnswers={answers}
                                setSelectedAnswers={setAnswers}
                                currentQuestion={currentQuestion}
                                setCurrentQuestion={setCurrentQuestion}
                                handleFinish={handleFinish}
                                timer={timer}
                                timeExpired={timeExpired}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Renderizado de modales */}
            {timeExpired && (
                <ModalTimeExpired onClose={() => { }} handleFinish={handleFinish} />
            )}
        </div>
    );
}
