'use client'

/* eslint-disable */

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ModalPracticaTema } from "@/app/components/modales/modalPractica";
import { ModalPrimeraPractica } from "@/app/components/modales/modalPrimeraPractica";
import { ModalPrimerSimulacro } from "@/app/components/modales/modalPrimerSimulacro";
import { ModalPreguntasFalladas } from "@/app/components/modales/modalPreguntasFallidas";

import { ModalZoom } from "@/app/components/modales/modalZoom";
import { ModalZoomActive } from "@/app/components/modales/modalZoomActive";

import { getQuantityFallidas, getActiveMeeting, getLastMeeting } from "@/app/lib/actions";

function Inicio() {
    // Inicio del carrusel de Actividades

    // Fin del carrusel de Actividades
    return (
        <div className="flex flex-col pt-20">
            {/* Versión escritorio */}
            <section className="bg-postbanner pt-5">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="mx-auto">
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-4 lg:mb-8 text-primary">
                                Actividades
                            </h2>
                            <h2 className="text-sm md:text-xl font-semibold tracking-tighter sm:text-4xl text-left text-concepto">
                                Nuestras actividades están diseñadas con base en principios de neurociencia para activar las áreas clave del cerebro, fortalecer la memoria,
                                mejorar la concentración y fomentar el pensamiento crítico. Porque el verdadero aprendizaje no ocurre solo con la teoría, sino con la acción.
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function Zona() {
    const router = useRouter();

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalExtra, setModalExtra] = useState<any>(null);

    const arrayConocimientos = [
        {
            imagen: "/images/actividades/actividades1.png",
            title: "Talleres de estudio",
            subtitle: "Practica según los talleres",
            concept: `Entrena con preguntas usando un simulador SIECOPOL.`,
            ruta: "/talleres-de-estudio",
            modalType: "none",
        },
        {
            imagen: "/images/actividades/actividades2.png",
            title: "Despierta tu inteligencia",
            subtitle: "Asocia Palabras",
            concept: "Conecta palabras dentro de un texto y refuerza ideas.",
            ruta: "/despierta-tu-inteligencia",
            modalType: "none",
        },
        {
            imagen: "/images/actividades/actividades3.png",
            title: "Control de habilidades",
            subtitle: "Contra el tiempo",
            concept: "Entrena tu mente para recordar mejor y más rápido.",
            ruta: "/control-de-habilidades",
            modalType: "none",
        },
        {
            imagen: "/images/actividades/zoom.png",
            title: "Video call",
            subtitle: "Reunión instantánea",
            concept: "Inicia una reunión en zoom para clases personalizadas",
            ruta: "",
            modalType: "iniciar-zoom",
        },
    ]

    const modalComponents: Record<string, React.ComponentType<any>> = {
        'iniciar-zoom': ModalZoom,
        'zoom-active': ModalZoomActive,
    };

    const searchActiveMeeting = async () => {
        try {
            const activeMeeting = await getActiveMeeting();
            if (activeMeeting.data.meetings && activeMeeting.data.meetings.length > 0) {

                // consultar a bae de datos si hay una reunión activa
                const lastMeeting = await getLastMeeting();

                const fullname = lastMeeting.data[0].nombre + " " + lastMeeting.data[0].apellidos;
                openModal('zoom-active', fullname);
            } else {
                openModal('iniciar-zoom', '');
            }
        } catch (error) {
            console.error("Error al buscar reunión activa:", error);
        }
    }

    const openModal = (modalType: string, extra: string) => {
        setActiveModal(modalType);
        setModalExtra(extra);
    };

    const closeModal = () => setActiveModal(null);

    // Inicio del carrusel de Actividades
    const [actividadActive, setActividadActive] = useState(0)

    const prevActivity = () => {
        setActividadActive((prevIndex) =>
            prevIndex === 0 ? arrayConocimientos.length - 1 : prevIndex - 1
        )
    }

    const nextActivity = () => {
        setActividadActive((prevIndex) => (prevIndex + 1) % arrayConocimientos.length);
    }
    // Fin del carrusel de Actividades
    return (
        <div className="flex flex-col">
            {/* Versión escritorio */}
            <section className="bg-postbanner hidden md:block py-10">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="mx-auto">
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-8 text-secondary">
                                1. Zona de estudio
                            </h2>
                            <h2 className="text-base md:text-xl font-semibold tracking-tighter sm:text-4xl text-left mb-8 text-concepto">
                                Activa tu mente, refuerza tus habilidades y profundiza en cada tema con actividades, talleres y apoyo personalizado.
                            </h2>
                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
                                {arrayConocimientos.map((object, i) => (
                                    <div key={i} className="flex flex-col justify-between bg-white rounded-xl items-start p-2 text-left shadow-lg border-2">
                                        <Image
                                            src={object.imagen}
                                            alt="fundamentos"
                                            width={1000}
                                            height={800}
                                            className="mb-4"
                                        />
                                        <div className="">
                                            <h3 className="text-lg font-bold mb-2 text-texto mx-2">{object.title}</h3>
                                            <h3 className="text-base font-bold mb-2 text-concepto mx-2">{object.subtitle}</h3>
                                            <p className="text-concepto text-sm text-justify mx-2">{object.concept}</p>
                                        </div>
                                        <div className={`w-full ${object.modalType === "none" && "hidden"}`}>
                                            <button className="bg-button text-white w-full py-3 rounded-lg mt-6 mb-3"
                                                onClick={() => {
                                                    searchActiveMeeting();
                                                }}>
                                                Empezar
                                            </button>
                                        </div>
                                        <div className={`w-full ${object.modalType !== "none" && "hidden"}`}>
                                            <button className="bg-button text-white w-full py-3 rounded-lg mt-6 mb-3" onClick={() => router.push(object.ruta)}>
                                                Empezar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Versión móvil */}
            <section className="bg-postbanner md:hidden py-8">
                <div className="max-w-full">
                    <div className="flex flex-wrap items-center mx-4">
                        <div className="mx-auto w-full">
                            <div className="flex justify-between items-center mb-6 space-x-3 mx-2">
                                <div className="w-8/12">
                                    <h2 className="text-xl font-bold tracking-tighter text-lef text-secondary">
                                        1. Zona de estudio
                                    </h2>
                                </div>
                                <div className="w-4/12 flex flex-row space-x-3">
                                    <div className={`p-3 rounded-full ${actividadActive == 0 ? "bg-button3 bg-opacity-20 text-button3" : "bg-button bg-opacity-10 text-button"}`}>
                                        <ArrowLeft onClick={prevActivity} />
                                    </div>
                                    <div className={`p-3 rounded-full ${actividadActive == 3 ? "bg-button3 bg-opacity-20 text-button3" : "bg-button bg-opacity-10 text-button"}`}>
                                        <ArrowRight onClick={nextActivity} />
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-full">
                                <div className="flex flex-col border-2 bg-white rounded-xl items-start p-2 mx-2 text-left shadow-lg ">
                                    <Image
                                        src={arrayConocimientos[actividadActive].imagen}
                                        alt="fundamentos"
                                        width={500}
                                        height={300}
                                        className="mb-4"
                                    />
                                    <h3 className="text-xl font-bold mb-2 text-primary mx-2">{arrayConocimientos[actividadActive].title}</h3>
                                    <p className="text-concepto font-semibold text-justify mb-2 mx-2">{arrayConocimientos[actividadActive].subtitle}</p>
                                    <p className="text-concepto text-sm text-justify mx-2">{arrayConocimientos[actividadActive].concept}</p>
                                    
                                    <div className={`w-full ${arrayConocimientos[actividadActive].modalType === "none" && "hidden"}`}>
                                        <button className="bg-button text-white w-full py-3 rounded-lg mt-6 mb-3" onClick={() => openModal(arrayConocimientos[actividadActive].modalType, arrayConocimientos[actividadActive].ruta)}>
                                            Empezar
                                        </button>
                                    </div>
                                    <div className={`w-full ${arrayConocimientos[actividadActive].modalType !== "none" && "hidden"}`}>
                                        <button className="bg-button text-white w-full py-3 rounded-lg mt-6 mb-3" onClick={() => router.push(arrayConocimientos[actividadActive].ruta)}>
                                            Empezar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Renderizado de modales */}
            {activeModal && (() => {
                const Modal = modalComponents[activeModal];
                return <Modal onClose={closeModal} extra={modalExtra} />;
            })()}
        </div>
    )
}


function Aprende() {
    const { data: session } = useSession();
    const [activeModal, setActiveModal] = useState<string | null>(null);
    // const [currentRoute, setCurrentRoute] = useState('');
    const [quantityFallidas, setQuantityFallidas] = useState(0);
    const router = useRouter();

    const arrayActividades = [
        {
            imagen: "/assets/frames/frame3.png",
            title: "Practica un tema",
            subtitle: "Pon en práctica lo aprendido",
            concept: `Selecciona un tema y número de preguntas para practicar.`,
            ruta: "/practica-un-tema",
            modalType: "practica-tema"
        },
        {
            imagen: "/assets/frames/frame6.png",
            title: "Genera tu primera práctica",
            subtitle: "Créalo tu mismo",
            concept: "Crea una práctica personalizada con preguntas de varios temas.",
            ruta: "/primera-practica",
            modalType: "primera-practica"
        },
        {
            imagen: "/assets/frames/frame4.png",
            title: "Genera tu primer simulacro",
            subtitle: "Completamente ilimitado",
            concept: "Personalizado: con balotario, sin balotario o tipo SIECOPOL.",
            ruta: "/primer-simulacro",
            modalType: "primer-simulacro"
        },
        {
            imagen: "/assets/frames/frame5.png",
            title: "Examen preguntas falladas",
            subtitle: "Segunda oportunidad",
            concept: "No te preocupes si fallaste, puedes volver a intentarlo.",
            ruta: "/preguntas-fallidas",
            modalType: "preguntas-fallidas"
        },
        {
            imagen: "/assets/frames/frame7.png",
            title: "Examen no repetidos",
            subtitle: "Desafía tus límites",
            concept: "22 asignaturas, 30 exámenes únicos y 3,000 preguntas, 100% aleatorias que pondrán a prueba tu verdadero nivel",
            ruta: "/examenes-no-repetidos",
            modalType: "none"
        },
    ]

    const modalComponents: Record<string, React.ComponentType<any>> = {
        'practica-tema': ModalPracticaTema,
        'primera-practica': ModalPrimeraPractica,
        'primer-simulacro': ModalPrimerSimulacro,
        'preguntas-fallidas': ModalPreguntasFalladas,
    };

    const openModal = (modalType: string, route: string) => {
        setActiveModal(modalType);
        // setCurrentRoute(route);
    };

    const closeModal = () => setActiveModal(null);

    useEffect(() => {
        const fetchQuantityFallidas = async () => {
            if (!session?.user?.userId) return; // validación aquí

            try {
                // const data = await fetchResultProgress(session.user.userId);
                const result = await getQuantityFallidas(session.user.userId)

                // const totalFallidas = data.reduce((acc: number, item: any) => {
                //     const incorrectas = item.incorrectas ?? 0;
                //     const nulas = item.nulas ?? 0;
                //     return acc + incorrectas + nulas;
                // }, 0);

                setQuantityFallidas(result[0].cantidadFallidas ?? 0);
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            }
        };

        fetchQuantityFallidas(); // ya no necesitas condicional afuera
    }, [session?.user?.userId]);

    // Inicio del carrusel de Conocimientos
    const [conocimientoActive, setConocimientoActive] = useState(0)

    const prevConocimiento = () => {
        setConocimientoActive((prevIndex) =>
            prevIndex === 0 ? arrayActividades.length - 1 : prevIndex - 1
        )
    }

    const nextConocimiento = () => {
        setConocimientoActive((prevIndex) => (prevIndex + 1) % arrayActividades.length);
    }
    // Fin del carrusel de Conocimientos

    return (
        <div className="flex flex-col bg-white">
            {/* Versión escritorio */}
            <section className="bg-postbanner hidden md:block py-10">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="mx-auto">
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-8 text-secondary">
                                2. Aprende, practica y rétate
                            </h2>
                            <h2 className="text-base md:text-xl font-semibold tracking-tighter sm:text-4xl text-left mb-8 text-concepto">
                                Estas actividades sirven para que te evalues tu avance en condiciones similares a una prueba real.
                            </h2>
                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
                                {arrayActividades.map((object, i) => (
                                    <div key={i} className="flex flex-col justify-between bg-white border-2 rounded-xl items-start p-4 text-left shadow-lg">
                                        <Image
                                            src={object.imagen}
                                            alt="fundamentos"
                                            width={60}
                                            height={60}
                                            className="mb-4"
                                        />
                                        <div>
                                            <h3 className="text-base font-bold mb-2 text-texto">{object.title}</h3>
                                            <h3 className="text-sm font-bold mb-2 text-concepto">{object.subtitle}</h3>
                                            <p className="text-concepto text-sm text-justify">{object.concept}</p>
                                        </div>
                                        <div className={`w-full mt-6 mb-2 ${object.modalType === "none" && "hidden"}`}>
                                            <button onClick={() => openModal(object.modalType, object.ruta)} className="text-button underline font-bold text-left">
                                                Empezar
                                            </button>
                                        </div>
                                        <div className={`w-full mt-6 mb-2 ${object.modalType !== "none" && "hidden"}`}>
                                            <button onClick={() => router.push(object.ruta)} className="text-button underline font-bold text-left">
                                                Empezar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Versión móvil */}
            <section className="bg-postbanner py-8 md:hidden">
                <div className="max-w-full">
                    <div className="flex flex-wrap items-center mx-4">
                        <div className="mx-auto w-full">
                            <div className="flex justify-between items-center mb-6 space-x-3 mx-2">
                                <div className="w-8/12">
                                    <h2 className="text-xl font-bold tracking-tighter text-lef text-secondary">
                                        2. Aprende, practica y rétate
                                    </h2>
                                </div>
                                <div className="w-4/12 flex flex-row space-x-3">
                                    <div className={`p-3 rounded-full ${conocimientoActive == 0 ? "bg-button3 bg-opacity-20 text-button3" : "bg-button bg-opacity-10 text-button"}`}>
                                        <ArrowLeft onClick={prevConocimiento} />
                                    </div>
                                    <div className={`p-3 rounded-full ${conocimientoActive == 4 ? "bg-button3 bg-opacity-20 text-button3" : "bg-button bg-opacity-10 text-button"}`}>
                                        <ArrowRight onClick={nextConocimiento} />
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-full">
                                <div className="flex flex-col border-2 bg-white rounded-xl items-start p-4 mx-2 text-left shadow-lg ">
                                    <Image
                                        src={arrayActividades[conocimientoActive].imagen}
                                        alt="fundamentos"
                                        width={60}
                                        height={60}
                                        className="mb-4"
                                    />
                                    <h3 className="text-xl font-bold mb-2 text-primary">{arrayActividades[conocimientoActive].title}</h3>
                                    <p className="text-concepto font-semibold mb-2">{arrayActividades[conocimientoActive].subtitle}</p>
                                    <p className="text-concepto text-sm text-justify">{arrayActividades[conocimientoActive].concept}</p>
                                    <div className={`w-full ${arrayActividades[conocimientoActive].modalType == "none" && "hidden"}`}>
                                        <button onClick={() => openModal(arrayActividades[conocimientoActive].modalType, arrayActividades[conocimientoActive].ruta)} className="text-button font-bold underline text-lg mt-6 mb-3">
                                            Empezar
                                        </button>
                                    </div>
                                    <div className={`w-full ${arrayActividades[conocimientoActive].modalType !== "none" && "hidden"}`}>
                                        <button onClick={() => router.push(arrayActividades[conocimientoActive].ruta)} className="text-button underline font-bold text-left">
                                            Empezar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Renderizado de modales */}
            {activeModal && session?.user?.userId && (() => {
                const Modal = modalComponents[activeModal];
                return <Modal onClose={closeModal} extra={quantityFallidas} />; //quantityFallidas solo sirve para preguntas fallidas
            })()}
        </div>
    )
}

export default function Actividades() {
    return (
        <>
            <Inicio />

            <Zona />

            <Aprende />

            {/* <Actividades />

            <Conocimientos />

            <Videos /> */}

        </>
    )
}