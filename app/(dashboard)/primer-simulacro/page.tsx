'use client'

/* eslint-disable */

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePrimerSimulacroStore } from "@/app/lib/stores/primerSimulacro";
import { useSession } from "next-auth/react";
import {
    fetchQuestionSiecopol,
    fetchSaveIncorrectQuestions,
    fetchValidatePersonByCipAndDni,
    saveOrUpdateProgress
} from "@/app/lib/actions";
import ExamenConBalotario from "@/app/examenes/examenconbalotario";
import ExamenSinBalotario from "@/app/examenes/examensinbalotario";
import ExamenSiecopol from "@/app/examenes/examensiecopol";

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

interface ExamComponentsMap {
    [key: string]: React.ComponentType<{
        questions: Question[];
        selectedAnswers: { [key: number]: string };
        setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
        currentQuestion: number;
        setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
        handleFinish: () => void;
        timer: number;
        timeExpired: boolean;
    }>;
}

const examComponents: ExamComponentsMap = {
    'SM001': ExamenConBalotario,
    'SM002': ExamenSinBalotario,
    //   SM003: ExamenPractico,
    default: ExamenSinBalotario
};

function Practica() {
    const { params, clearParams } = usePrimerSimulacroStore();
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

    const [codeSimulador, setCodeSimulador] = useState('')

    const [formData, setFormData] = useState({ cip: "", dni: "" });
    const [isVerifiedPerson, setVerifiedPerson] = useState(false);
    const [showAlertUser, setShowAlertUser] = useState(false);
    const [timerSiecopol, setTimerSiecopol] = useState(0)

    useEffect(() => {
        if (!params) return;

        // Intentar obtener de Zustand primero
        if (params?.codeSimulador == null || params?.quantity < 0) {
            router.push("/actividades")
            return;
        }
        if (params) {
            // console.log('Datos desde Zustand:', params);
            sessionStorage.setItem('primerSimulacroParams', JSON.stringify(params));
            setCodeSimulador(params?.codeSimulador ?? '');
            // setSelectedTheme(params.selectedTheme);
            // clearParams();
            return;
        }

        // Fallback a sessionStorage
        const sessionData = sessionStorage.getItem('primerSimulacroParams');
        if (sessionData) {
            // console.log('Datos desde sessionStorage:', JSON.parse(sessionData));
            setCodeSimulador(JSON.parse(sessionData).codeSimulador ?? '');
        }
    }, [params]);

    // timer
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

    // timer Siecopol
    useEffect(() => {
        if (isFinished || timeExpired) return;

        if (isVerifiedPerson) {
            const countdown = setInterval(() => {
                setTimerSiecopol((prev) => {
                    if (prev <= 1) {
                        setTimeExpired(true);
                        clearInterval(countdown);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [
        isFinished,
        timeExpired,
        isVerifiedPerson
    ]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                const quantity = params?.quantity ?? 0;
                const data = await fetchQuestionSiecopol(quantity);
                setQuestions(data);
                setStartTimer(data.length * 72); //72
                setTimer(data.length * 72); //72 tiempo oficial
                setTimerSiecopol(data.length * 72) //un timer independiente para siecopol
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
                setError("Error al cargar las preguntas. Por favor intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    // Manejo de cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowAlertUser(false);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVerifyPerson = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = await fetchValidatePersonByCipAndDni(
            session?.user?.email,
            formData.cip,
            formData.dni
        );
        if (data) {
            setVerifiedPerson(true);
        } else {
            setVerifiedPerson(false);
            setShowAlertUser(true);
        }
    };

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

        // Inicializar valores para guardar el progreso del usuario
        const time = startTimer - timer;
        const totalPreguntas = questions.length;
        const correctas = correctAnswers;
        const incorrectas = Object.keys(answers).length - correctAnswers;
        const nulas = questions.length - Object.keys(answers).length;

        if (session?.user?.userId) {
            try {
                await fetchSaveIncorrectQuestions(session.user.userId, incorrectIds);
                await saveOrUpdateProgress(session.user.userId, "primer-simulacro", time, totalPreguntas, correctas, incorrectas, nulas,);
            } catch (error) {
                console.error("Error al guardar progreso o fallidas (primer-simulacro):", error);
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
        setTimerSiecopol(0);
        setIsFinished(false);
        setScore(0);
        sessionStorage.removeItem('primerSimulacroParams');
        setTimeExpired(false);

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
                timer={isVerifiedPerson ? timerSiecopol : timer}
                onRestart={restartAll}
            />
        );
    }

    const ComponentToRender = examComponents[codeSimulador];

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
                            {!params || questions.length === 0 || !codeSimulador ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : codeSimulador === 'SM003' ? (
                                isVerifiedPerson ? (
                                    <ExamenSiecopol
                                        questions={questions}
                                        selectedAnswers={answers}
                                        setSelectedAnswers={setAnswers}
                                        currentQuestion={currentQuestion}
                                        setCurrentQuestion={setCurrentQuestion}
                                        handleFinish={handleFinish}
                                        timer={timerSiecopol}
                                    // timeExpired={timeExpired}
                                    />

                                ) : (

                                    <form onSubmit={handleVerifyPerson} className="relative w-full">
                                        <div className="bg-[#087bb4] text-center text-white py-5 top-0">
                                            <div className="text-lg md:text-2xl font-extrabold">
                                                POLICÍA NACIONAL DEL PERÚ
                                            </div>
                                            <div className="text-xs md:text-base">
                                                Sistema de Evaluación del Conocimiento Policial - SIECOPOL
                                            </div>
                                            <div className="text-xs md:text-base">Módulo de Examen Virtual</div>
                                            <div className="text-[9px] md:text-xs">
                                                SIMULADOR DEL PROCESO DE SUBOFICIALES DE ARMAS 2025 -
                                                PROMOCIÓN 2026
                                            </div>
                                        </div>
                                        <div className="flex justify-center my-3">
                                            <div className="w-9/12 md:w-6/12">
                                                <div className="flex gap-2 my-2">
                                                    <div className="bg-[#087bb4] w-1/3 flex items-center justify-center border border-blue-500 text-white font-bold">
                                                        CIP:
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="cip"
                                                        name="cip"
                                                        value={formData.cip}
                                                        onChange={handleChange}
                                                        className="w-full px-2 py-1 border rounded pl-10 outline-none"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={8}
                                                        onInput={(e) => {
                                                            (e.target as HTMLInputElement).value = (
                                                                e.target as HTMLInputElement
                                                            ).value.replace(/\D/g, ""); // Remueve letras y caracteres no numéricos
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex gap-2">
                                                    <div className="bg-[#087bb4] w-1/3 flex items-center justify-center border border-blue-500 text-white font-bold">
                                                        DNI:
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="dni"
                                                        name="dni"
                                                        value={formData.dni}
                                                        onChange={handleChange}
                                                        className="w-full px-2 py-1 border rounded pl-10 outline-none"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        maxLength={8}
                                                        onInput={(e) => {
                                                            (e.target as HTMLInputElement).value = (
                                                                e.target as HTMLInputElement
                                                            ).value.replace(/\D/g, ""); // Remueve letras y caracteres no numéricos
                                                        }}
                                                    />
                                                </div>

                                                <div className="my-2 text-center">
                                                    <button type="submit" className="bg-gray-300 w-1/2  py-1 border border-gray-600">
                                                        INGRESAR
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {showAlertUser && (
                                            <div className="text-center text-red-500">
                                                Los datos ingresados son incorrectos, volver a validar.
                                            </div>
                                        )}
                                    </form>
                                )
                            ) : (
                                <ComponentToRender
                                    questions={questions}
                                    selectedAnswers={answers}
                                    setSelectedAnswers={setAnswers}
                                    currentQuestion={currentQuestion}
                                    setCurrentQuestion={setCurrentQuestion}
                                    handleFinish={handleFinish}
                                    timer={timer}
                                    timeExpired={timeExpired}
                                />
                            )}
                        </div>
                    </div >
                </div >
            </section >

            {/* Renderizado de modales */}
            {
                timeExpired && questions.length > 0 && (
                    <ModalTimeExpired onClose={() => { }} handleFinish={handleFinish} />
                )
            }
        </div >
    )
}

export default function PrimerSimulacro() {
    return (
        <>
            <Practica />
        </>
    )
}