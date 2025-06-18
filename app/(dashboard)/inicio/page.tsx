'use client'

/* eslint-disable */

import Image from "next/image";
import { useState, useEffect } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { ModalPracticaTema } from "@/app/components/modales/modalPractica";
import { ModalPrimeraPractica } from "@/app/components/modales/modalPrimeraPractica";
import { ModalPrimerSimulacro } from "@/app/components/modales/modalPrimerSimulacro";
import { ModalPreguntasFalladas } from "@/app/components/modales/modalPreguntasFallidas";
import { ModalZoom } from "@/app/components/modales/modalZoom";
import { ModalZoomActive } from "@/app/components/modales/modalZoomActive";

import { fetchResultProgress, getQuantityFallidas, getActiveMeeting, getLastMeeting } from "@/app/lib/actions";

function Banner() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);

    const banners = [
        {
            id: 1,
            image: '/images/banners/imgBanner1.png',
            title: 'Conoce las estadísticas de los Procesos de Ascenso de la Policía Nacional del Perú, años 2023 - 2024',
            description: 'Conoce los principales resultados del proceso de ascenso de grado de la Policía Nacional del Perú',
            link: '/estadisticas',
            ancho: 500,
            alto: 300,
            bgClass: 'bg-banner1',
            button: "Ver más"
        },
        {
            id: 2,
            image: '/images/banners/imgBanner2.png',
            title: '¿Quieres entender cómo funciona el método de estudio PONTE 100™?',
            description: 'Conoce en detalle cómo funciona el método de estudio PONTE 100™ y cómo puede ayudarte a alcanzar tu máximo potencial.',
            link: '/public/ponte100 ppt.pdf',
            ancho: 150,
            alto: 150,
            bgClass: 'bg-banner2',
            button: "Descargar"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % banners.length);
        }, 50000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const current = banners[activeIndex];

    return (
        <>
            <section className="pb-5 lg:pb-14 flex-col pt-20 mx-4 lg:mx-20 bg-web">
                <div className="px-3 flex pb-4 flex-col flex-grow">
                    <a className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-2 lg:mb-4 text-primary">Bienvenido</a>
                </div>

                {/* Desktop */}
                <div className={`mx-2 flex-row pt-0 w-full ${current.bgClass} space-x-6 rounded-3xl items-center hidden lg:flex transition-all duration-500`}>
                    <div className={`w-3/12 ${current.id === 2 && "lg:ml-20 my-6"}`}>
                        <Image src={current.image} height={current.alto} width={current.ancho} alt="banner" className="rounded-l-3xl" style={{ height: 'auto' }} priority />
                    </div>
                    <div className="w-9/12 flex flex-col lg:flex-row mx-auto">
                        <div className="w-full lg:w-8/12 flex flex-col text-white my-4">
                            <p className="lg:text-xl font-bold">{current.title}</p>
                            <p className="hidden lg:block lg:text-base text-sm">{current.description}</p>
                        </div>
                        <div className="w-full lg:w-3/12 flex mx-auto justify-center pb-6 lg:pb-0">
                            {current.id === 1 && <button className="border-2 my-auto text-white rounded-lg border-white px-4 py-2" onClick={() => router.push(current.link)}>
                                {current.button}
                            </button>}

                            {current.id === 2 && <a href={'/document/ponte100 ppt.pdf'} target="_blank" className="border-2 my-auto text-white rounded-lg border-white px-4 py-2">
                                {current.button}
                            </a>
                            }

                        </div>
                    </div>
                </div>

                {/* Mobile */}
                <div className={`relative flex pt-0 w-full ${current.bgClass} rounded-3xl items-center lg:hidden transition-all duration-500`}>
                    <div className="w-8/12 flex flex-col items-end ml-auto rounded-3xl relative z-10 bg-transparent">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-full flex flex-col text-white ">
                                <p className="text-base text-justify font-medium m-3">{current.title}</p>
                            </div>
                            <div className="w-full flex justify-center pb-3">
                                <button className="border-2 text-white rounded-lg border-white px-4 py-2" onClick={() => router.push(current.link)}>
                                    Ver más
                                </button>
                            </div>
                        </div>
                    </div>
                    {current.id === 1 ? (
                        <div className="absolute left-0 top-0 h-full w-5/12 z-0 transform -ml-8 translate-x-10">
                            <Image
                                src={current.image}
                                alt="banner"
                                fill
                                className="object-cover rounded-l-3xl"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="absolute w-5/12 z-0 transform -ml-4 translate-x-10">
                            <Image
                                src={current.image}
                                alt="banner"
                                width={100}
                                height={100}
                                className="object-cover rounded-l-3xl"
                                priority
                            />
                        </div>
                    )}
                </div>

                {/* Dots navigation */}
                <div className="flex justify-center mt-4 space-x-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-primary' : 'bg-gray-300'} transition-all`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Ir al banner ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

        </>
    )
}

type ProgresoProps = {
    quantityFallidas: number | 0;
    loading: boolean;
    tiempoDeUso: number | 0;
    practicas: number | 0;
    simulacros: number | 0;
    totalPreguntas: number | 0;
};

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

function Progreso({ loading, quantityFallidas, tiempoDeUso, practicas, simulacros, totalPreguntas }: ProgresoProps) {
    return (
        <>
            <section className=" md:pb-6  flex-col  mx-4 lg:mx-20 bg-web">
                <div className="px-3 flex pb-4 flex-col flex-grow">
                    <a className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-2 lg:mb-4 text-primary">Mi Progreso</a>
                </div>
                <div className="">
                    <div className=" grid lg:grid-cols-5 grid-cols-2 gap-8 ">
                        <div className="flex flex-row border border-borderProgreso p-3 rounded-lg space-x-3">
                            <div className="flex w-1/5 items-center justify-center">
                                <Image src="/assets/frames/frame10.png" height={20} width={20} alt="frame" style={{ height: 'auto' }} priority />
                            </div>
                            <div className="w-4/5 flex">
                                <div className="flex flex-col ">
                                    <a className="text-xl font-bold">
                                        {loading ? "..." : practicas ?? 0}
                                    </a>
                                    <a className="text-base">prácticas</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row border border-borderProgreso p-3 rounded-lg space-x-3">
                            <div className="flex w-1/5 items-center justify-center">
                                <Image src="/assets/frames/frame11.png" height={30} width={30} alt="frame" style={{ height: 'auto' }} priority />
                            </div>
                            <div className="w-4/5 flex">
                                <div className="flex flex-col ">
                                    <a className="text-xl font-bold">
                                        {loading ? "..." : simulacros ?? 0}
                                    </a>
                                    <a className="text-base">simulacros</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row border border-borderProgreso p-3 rounded-lg space-x-3 col-span-2 lg:col-span-1">
                            <div className="flex w-1/5 items-center justify-center">
                                <Image src="/assets/frames/frame12.png" height={30} width={30} alt="frame" style={{ height: 'auto' }} priority />
                            </div>
                            <div className="w-4/5 flex">
                                <div className="flex flex-col ">
                                    <a className="text-xl font-bold">
                                        {loading ? "..." : formatTime(tiempoDeUso) ?? 0}
                                    </a>
                                    <a className="text-base">Tiempo</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row border border-borderProgreso p-3 rounded-lg space-x-3">
                            <div className="flex w-1/5 items-center justify-center">
                                <Image src="/assets/frames/frame13.png" height={30} width={30} alt="frame" style={{ height: 'auto' }} priority />
                            </div>
                            <div className="w-4/5 flex">
                                <div className="flex flex-col ">
                                    <a className="text-xl font-bold">
                                        {loading ? "..." : totalPreguntas ?? 0}
                                    </a>
                                    <a className="text-base">preguntas</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row border border-borderProgreso p-3 rounded-lg space-x-3">
                            <div className="flex w-1/5 items-center justify-center">
                                <Image src="/assets/frames/frame14.png" height={30} width={30} alt="frame" style={{ height: 'auto' }} priority />
                            </div>
                            <div className="w-4/5 flex">
                                <div className="flex flex-col ">
                                    <a className="text-xl font-bold">
                                        {loading ? "..." : quantityFallidas ?? 0}
                                    </a>
                                    <a className="text-base">erradas</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

function Actividades() {
    const router = useRouter();

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalExtra, setModalExtra] = useState<any>(null);

    const arrayActividades = [
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
            prevIndex === 0 ? arrayActividades.length - 1 : prevIndex - 1
        )
    }

    const nextActivity = () => {
        setActividadActive((prevIndex) => (prevIndex + 1) % arrayActividades.length);
    }
    // Fin del carrusel de Actividades

    return (
        <div className="flex flex-col">
            {/* Versión escritorio */}
            <section className="bg-postbanner hidden md:block py-10">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="mx-auto">
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-8 text-primary">
                                Actividades recomendados para ti
                            </h2>
                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
                                {arrayActividades.map((object, i) => (
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
                                    <h2 className="text-xl font-bold tracking-tighter text-lef text-primary">
                                        Actividades recomendados para ti
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
                                        src={arrayActividades[actividadActive].imagen}
                                        alt="fundamentos"
                                        width={500}
                                        height={300}
                                        className="mb-4"
                                    />
                                    <h3 className="text-xl font-bold mb-2 text-primary mx-2">{arrayActividades[actividadActive].title}</h3>
                                    <p className="text-concepto font-semibold text-justify mb-2 mx-2">{arrayActividades[actividadActive].subtitle}</p>
                                    <p className="text-concepto text-sm text-justify mx-2">{arrayActividades[actividadActive].concept}</p>
                                    <div className={`w-full ${arrayActividades[actividadActive].modalType === "none" && "hidden"}`}>
                                        <button className="bg-button text-white w-full py-3 rounded-lg mt-6 mb-3" onClick={() => openModal(arrayActividades[actividadActive].modalType, arrayActividades[actividadActive].ruta)}>
                                            Empezar
                                        </button>
                                    </div>
                                    <div className={`w-full ${arrayActividades[actividadActive].modalType !== "none" && "hidden"}`}>
                                        <button className="bg-button text-white w-full py-3 rounded-lg mt-6 mb-3" onClick={() => router.push(arrayActividades[actividadActive].ruta)}>
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

type ConocimientoProps = {
    quantityFallidas: number | null;
};

function Conocimientos({ quantityFallidas }: ConocimientoProps) {
    const router = useRouter();

    const [activeModal, setActiveModal] = useState<string | null>(null);
    // const [currentRoute, setCurrentRoute] = useState('');

    const arrayConocimientos = [
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
            subtitle: "Diversos Temas",
            concept: "Exámenes únicos, sin repetición de preguntas ni temas.",
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

    // Inicio del carrusel de Conocimientos
    const [conocimientoActive, setConocimientoActive] = useState(0)

    const prevConocimiento = () => {
        setConocimientoActive((prevIndex) =>
            prevIndex === 0 ? arrayConocimientos.length - 1 : prevIndex - 1
        )
    }

    const nextConocimiento = () => {
        setConocimientoActive((prevIndex) => (prevIndex + 1) % arrayConocimientos.length);
    }
    // Fin del carrusel de Conocimientos
    return (
        <div className="flex flex-col bg-white">
            {/* Versión escritorio */}
            <section className="bg-postbanner hidden md:block py-10">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="mx-auto">
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-8 text-primary">
                                Refuerza tus conocimientos
                            </h2>

                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
                                {arrayConocimientos.map((object, i) => (
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
                                    <h2 className="text-xl font-bold tracking-tighter text-lef text-primary">
                                        Refuerza tus conocimientos
                                    </h2>
                                </div>
                                <div className="w-4/12 flex flex-row space-x-3">
                                    <div className={`p-3 rounded-full ${conocimientoActive == 0 ? "bg-button3 bg-opacity-20 text-button3" : "bg-button bg-opacity-10 text-button"}`}>
                                        <ArrowLeft onClick={prevConocimiento} />
                                    </div>
                                    <div className={`p-3 rounded-full ${conocimientoActive == 3 ? "bg-button3 bg-opacity-20 text-button3" : "bg-button bg-opacity-10 text-button"}`}>
                                        <ArrowRight onClick={nextConocimiento} />
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-full">
                                <div className="flex flex-col border-2 bg-white rounded-xl items-start p-4 mx-2 text-left shadow-lg ">
                                    <Image
                                        src={arrayConocimientos[conocimientoActive].imagen}
                                        alt="fundamentos"
                                        width={60}
                                        height={60}
                                        className="mb-4"
                                    />
                                    <h3 className="text-xl font-bold mb-2 text-primary">{arrayConocimientos[conocimientoActive].title}</h3>
                                    <p className="text-concepto font-semibold mb-2">{arrayConocimientos[conocimientoActive].subtitle}</p>
                                    <p className="text-concepto text-sm text-justify">{arrayConocimientos[conocimientoActive].concept}</p>
                                    <div className={`w-full ${arrayConocimientos[conocimientoActive].modalType === "none" && "hidden"}`}>
                                        <button onClick={() => openModal(arrayConocimientos[conocimientoActive].modalType, arrayConocimientos[conocimientoActive].ruta)} className="text-button font-bold underline text-lg mt-6 mb-3">
                                            Empezar
                                        </button>
                                    </div>
                                    <div className={`w-full ${arrayConocimientos[conocimientoActive].modalType !== "none" && "hidden"}`}>
                                        <button onClick={() => router.push(arrayConocimientos[conocimientoActive].ruta)} className="text-button underline font-bold text-left">
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
                return <Modal onClose={closeModal} extra={quantityFallidas} />;
            })()}
        </div>
    )
}

function Videos() {
    const arrayVideos = [
        {
            imagen: "/images/videos/video.png",
            title: "Taller 1",
            subtitle: "Clase 1/ Sesión 1",
            ponente: `Guillermo Arturo Vasquez`,
            fecha: "hace 1 día",
            hora: "1H 20min"
        },
        {
            imagen: "/images/videos/video.png",
            title: "Taller 1",
            subtitle: "Clase 1/ Sesión 2",
            ponente: `Kevin Cieza Bautista`,
            fecha: "hace 1 día",
            hora: "1H 20min"
        },
        {
            imagen: "/images/videos/video.png",
            title: "Taller 1",
            subtitle: "Clase 1/ Sesión 3",
            ponente: `Evart Zegarra Enciso`,
            fecha: "hace 1 día",
            hora: "1H 20min"
        },
        {
            imagen: "/images/videos/video.png",
            title: "Taller 1",
            subtitle: "Clase 1/ Sesión 1",
            ponente: `Guillermo Arturo Vasquez`,
            fecha: "hace 1 día",
            hora: "1H 20min"
        },
    ]

    // Inicio del carrusel de Videos
    const [videoActive, setVideoActive] = useState(0)

    const prevVideo = () => {
        setVideoActive((prevIndex) =>
            prevIndex === 0 ? arrayVideos.length - 1 : prevIndex - 1
        )
    }

    const nextVideo = () => {
        setVideoActive((prevIndex) => (prevIndex + 1) % arrayVideos.length);
    }
    // Fin del carrusel de Videos
    return (
        <div className="flex flex-col bg-white">
            {/* Versión escritorio */}
            <section className="bg-postbanner hidden md:block py-10">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="mx-auto">
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-8 text-primary">
                                Refuerza tus conocimientos
                            </h2>
                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
                                {arrayVideos.map((object, i) => (
                                    <div key={i} className="flex flex-col justify-between bg-white rounded-xl border-2 items-start p-2 text-left shadow-lg">
                                        <Image
                                            src={object.imagen}
                                            alt="fundamentos"
                                            width={1000}
                                            height={800}
                                            className="mb-4"
                                        />
                                        <div className="mx-3">
                                            <h3 className="text-base lg:text-lg font-bold mb-2 text-concepto">{object.title}</h3>
                                            <h3 className="text-base lg:text-lg font-bold mb-2 text-primary">{object.subtitle}</h3>
                                            <p className="text-concepto text-base lg:text-lg">Ponente: {object.ponente}</p>
                                        </div>
                                        <div className="w-full mt-5 mb-3">
                                            <div className="flex flex-row justify-between mt-6 mb-2 px-3">
                                                <div className="flex flex-row space-x-2 text-concepto items-center">
                                                    <Calendar className="text-black" /> <p className="text-sm">{object.fecha}</p>
                                                </div>
                                                <div className="flex flex-row space-x-2 text-concepto items-center">
                                                    <Clock className="text-black" /> <p className="text-sm">{object.hora}</p>
                                                </div>
                                            </div>
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
                                    <h2 className="text-xl font-bold tracking-tighter text-lef text-primary">
                                        Refuerza tus conocimientos
                                    </h2>
                                </div>
                                <div className="w-4/12 flex flex-row space-x-3">
                                    <div className={`p-3 rounded-full ${videoActive == 0 ? "bg-button3 bg-opacity-20 text-button3" : "bg-button bg-opacity-10 text-button"}`}>
                                        <ArrowLeft onClick={prevVideo} />
                                    </div>
                                    <div className={`p-3 rounded-full ${videoActive == 3 ? "bg-button3 bg-opacity-20 text-button3" : "bg-button bg-opacity-10 text-button"}`}>
                                        <ArrowRight onClick={nextVideo} />
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-full">
                                <div className="flex flex-col border-2 bg-white rounded-xl items-start p-2 mx-2 text-left shadow-lg ">
                                    <Image
                                        src={arrayVideos[videoActive].imagen}
                                        alt="fundamentos"
                                        width={500}
                                        height={300}
                                        className="mb-4"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-concepto">{arrayVideos[videoActive].title}</h3>
                                        <p className="text-primary text-xl font-bold mb-2">{arrayVideos[videoActive].subtitle}</p>
                                        <p className="text-concepto text-lg text-justify">Ponente: {arrayVideos[videoActive].ponente}</p>
                                    </div>
                                    <div className="w-full mt-5 mb-3">
                                        <div className="flex flex-row justify-between mt-6 mb-2 px-3">
                                            <div className="flex flex-row space-x-2 text-concepto items-center">
                                                <Calendar className="text-black" /> <p className="text-sm">{arrayVideos[videoActive].fecha}</p>
                                            </div>
                                            <div className="flex flex-row space-x-2 text-concepto items-center">
                                                <Clock className="text-black" /> <p className="text-sm">{arrayVideos[videoActive].hora}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function Main() {
    const { data: session, status } = useSession()
    const [quantityFallidas, setQuantityFallidas] = useState<number | 0>(0)
    const [loading, setLoading] = useState(true)
    const [tiempoDeUso, setTiempoDeUso] = useState<number | 0>(0)
    const [practicas, setPracticas] = useState<number | 0>(0)
    const [simulacros, setSimulacros] = useState<number | 0>(0)
    const [totalPreguntas, setTotalPreguntas] = useState<number | 0>(0)

    useEffect(() => {
        const loadFallidas = async () => {
            if (status === "authenticated" && session?.user?.userId) {
                try {
                    const data = await fetchResultProgress(session.user.userId,)
                    const result = await getQuantityFallidas(session.user.userId)

                    setQuantityFallidas(result[0].cantidadFallidas ?? 0);

                    // Sumar todas las incorrectas y nulas de todos los registros
                    // const totalFallidas = data.reduce((acc: number, item: any) => {
                    //     const incorrectas = item.incorrectas ?? 0;
                    //     const nulas = item.nulas ?? 0;
                    //     return acc + incorrectas + nulas;
                    // }, 0);

                    // Sumar todas las horas de todos los registros
                    const horasRealizadas = data.reduce((acc: number, item: any) => {
                        const horas = item.timer ?? 0;
                        return acc + horas;
                    }, 0);

                    // Sumar todas las cantidades de preguntas de todos los registros
                    const preguntasTotal = data.reduce((acc: number, item: any) => {
                        const total = item.totalPreguntas ?? 0;
                        return acc + total;
                    }, 0);

                    // Sumar todos los intentos de simulacros
                    const totalSimulacros = data
                        .filter((item: any) => item.tipoExamen === "primer-simulacro")
                        .reduce((acc: number, item: any) => acc + (item.intentos ?? 0), 0);

                    // Sumar todos los intentos de practicas
                    const totalPracticas = data
                        .filter((item: any) => item.tipoExamen === "primera-practica" || item.tipoExamen === "practica-un-tema")
                        .reduce((acc: number, item: any) => acc + (item.intentos ?? 0), 0);

                    // Si lo encuentra, seteamos las incorrectas, si no, seteamos 0

                    setTiempoDeUso(horasRealizadas);
                    setTotalPreguntas(preguntasTotal);
                    setSimulacros(totalSimulacros);
                    setPracticas(totalPracticas);
                } catch (error) {
                    console.error("Error loading fallidas:", error)
                    setQuantityFallidas(0)
                } finally {
                    setLoading(false)
                }
            }
        }

        loadFallidas()
    }, [status, session?.user?.userId])

    return (
        <>
            <Banner />

            <Progreso
                quantityFallidas={quantityFallidas}
                loading={loading}
                tiempoDeUso={tiempoDeUso}
                practicas={practicas}
                simulacros={simulacros}
                totalPreguntas={totalPreguntas} />

            <Actividades />

            <Conocimientos quantityFallidas={quantityFallidas} />

            <Videos />

        </>
    )
}