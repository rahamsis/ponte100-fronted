'use client'

/* eslint-disable */

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Tab, TabPanel, TabList, Tabs } from "react-tabs";
import { signIn, useSession } from "next-auth/react";

import { fetchResultProgress, getGradoObjetivoByUserId } from "@/app/lib/actions";

function Inicio() {
    // Inicio del carrusel de Actividades

    // Fin del carrusel de Actividades
    return (
        <div className="flex flex-col pt-20">
            {/* Versión escritorio */}
            <section className="bg-postbanner pt-5">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                        <div className="">
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-4 lg:mb-8 text-primary">
                                Mi Progreso
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

type ProgresoProps = {
    quantityFallidas: number | 0;
    loading: boolean;
    loadingImageGrado: boolean;
    nombreGradoObjetivo: string | null;
    imageGradoObjetivo: string | null;
    tiempoDeUso: number | 0;
    primeraPractica: number | 0;
    totalPrimeraPractica: number | 0;
    totalCorrectasPrimeraPractica: number | 0;
    practicaUnTema: number | 0;
    totalPracticaUnTema: number | 0;
    totalCorrectasPracticaUnTema: number | 0;
    simulacros: number | 0;
    totalSimulacros: number | 0;
    totalCorrectasSimulacros: number | 0;
    totalPreguntas: number | 0;
    fallidas: number | 0;
    totalPreguntasFallidas: number | 0;
    totalCorrectasPreguntasFallidas: number | 0;
    examenesRepetidos: number | 0;
    totalExamenesRepetidos: number | 0;
    totalCorrectasExamenesRepetidos: number | 0;
    talleresEstudio: number | 0;
    totalTalleresEstudio: number | 0;
    totalCorrectasTalleresEstudio: number | 0;
};

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

function Zona({ loading, quantityFallidas, tiempoDeUso,
    loadingImageGrado, imageGradoObjetivo, nombreGradoObjetivo,
    primeraPractica, totalPrimeraPractica, totalCorrectasPrimeraPractica,
    practicaUnTema, totalPracticaUnTema, totalCorrectasPracticaUnTema,
    simulacros, totalSimulacros, totalCorrectasSimulacros, totalPreguntas,
    fallidas, totalPreguntasFallidas, totalCorrectasPreguntasFallidas,
    examenesRepetidos, totalExamenesRepetidos, totalCorrectasExamenesRepetidos,
    talleresEstudio, totalTalleresEstudio, totalCorrectasTalleresEstudio }: ProgresoProps) {
    const actividades = [
        {
            titulo: "Talleres de Estudio",
            tema: "Aprendizaje",
            imagen: "/assets/frames/frame2.png",
            modulos: `${talleresEstudio} intentos`,
            ref: "zona",
            progress: !totalTalleresEstudio ? 0 : ((totalCorrectasTalleresEstudio / totalTalleresEstudio) * 100),
            show: true,
        },
        {
            titulo: "Practica un tema",
            tema: "Simulacro",
            imagen: "/assets/frames/frame3.png",
            modulos: `${practicaUnTema} intentos`,
            ref: "practica",
            progress: !totalPracticaUnTema ? 0 : ((totalCorrectasPracticaUnTema / totalPracticaUnTema) * 100),
            show: false,
        },
        {
            titulo: "Exámenes genera tu primera práctica",
            tema: "Aprendizaje",
            imagen: "/assets/frames/frame6.png",
            modulos: `${primeraPractica} intentos`,
            ref: "generador",
            progress: !totalPrimeraPractica ? 0 : ((totalCorrectasPrimeraPractica / totalPrimeraPractica) * 100),
            show: false,
        },
        {
            titulo: "Genera tu primer simulacro ilimitado",
            tema: "Aprendizaje",
            imagen: "/assets/frames/frame4.png",
            modulos: `${simulacros} intentos`,
            ref: "simulacro",
            progress: !totalSimulacros ? 0 : ((totalCorrectasSimulacros / totalSimulacros) * 100),
            show: true,
        },
        {
            titulo: "Examen preguntas falladas",
            tema: "Aprendizaje",
            imagen: "/assets/frames/frame5.png",
            modulos: `${fallidas} intentos`,
            ref: "fallidas",
            progress: !totalPreguntasFallidas ? 0 : ((totalCorrectasPreguntasFallidas / totalPreguntasFallidas) * 100),
            show: false,
        },
        {
            titulo: "Examenes no repetidos",
            tema: "Aprendizaje",
            imagen: "/assets/frames/frame7.png",
            modulos: `${examenesRepetidos} intentos`,
            ref: "examenes",
            progress: !totalExamenesRepetidos ? 0 : ((totalCorrectasExamenesRepetidos / totalExamenesRepetidos) * 100),
            show: true,
        },
    ]

    const premios = [
        {
            caja: "/images/premios/premio.png",
            xp: "10000XP",
            premio: "images/premios/premio1.png",
            nombrePremio: "¡Ganaste Un Kit Ponte 100! ",
            detalle: "Envíanos una captura de esta pantalla a nuestro correo: example@info.com para coordinar la entrega del premio."
        },
        {
            caja: "/images/premios/premio.png",
            xp: "10000XP",
            premio: "images/premios/premio1.png",
            nombrePremio: "¡Ganaste Un Kit Ponte 100! ",
            detalle: "Envíanos una captura de esta pantalla a nuestro correo: example@info.com para coordinar la entrega del premio."
        },
        {
            caja: "/images/premios/premio.png",
            xp: "10000XP",
            premio: "images/premios/premio1.png",
            nombrePremio: "¡Ganaste Un Kit Ponte 100! ",
            detalle: "Envíanos una captura de esta pantalla a nuestro correo: example@info.com para coordinar la entrega del premio."
        },
        {
            caja: "/images/premios/premio.png",
            xp: "10000XP",
            premio: "images/premios/premio1.png",
            nombrePremio: "¡Ganaste Un Kit Ponte 100! ",
            detalle: "Envíanos una captura de esta pantalla a nuestro correo: example@info.com para coordinar la entrega del premio."
        }
    ]

    const { data: session, status } = useSession()
    const [showPremio, setShowPremio] = useState(false)
    const [tabIndex, setTabIndex] = useState(0);

    // Fin del carrusel de Actividades
    return (
        <div className="flex flex-col">
            {/* Versión escritorio */}
            <section className="bg-postbanner  py-10">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="w-full">
                            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="w-full">
                                {/* Pestañas */}
                                <TabList className="flex flex-row w-full p-1">
                                    <Tab
                                        className={`p-3 text-sm md:text-xl text-left font-semibold cursor-pointer transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none ${tabIndex === 0 ? "text-primary font-bold underline underline-offset-8" : "text-gray3"
                                            }`}
                                    >
                                        Detalle
                                    </Tab>
                                    <Tab
                                        className={`p-3 text-sm md:text-xl text-left font-semibold cursor-pointer transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none ${tabIndex === 1 ? "text-primary font-bold underline underline-offset-8" : "text-gray3"
                                            }`}
                                    >
                                        Mi meta
                                    </Tab>
                                </TabList>

                                {/* Panel de Detalle */}
                                <TabPanel className={` ${tabIndex === 0 ? "block" : "hidden"}`} >
                                    <div>
                                        <div className=" grid xl:grid-cols-5 grid-cols-2 gap-8 ">
                                            <div className="flex flex-row border p-3 rounded-lg space-x-3 bg-white">
                                                <div className="flex w-1/5 items-center justify-center">
                                                    <Image src="/assets/frames/frame10.png" height={20} width={20} alt="frame" style={{ height: 'auto' }} priority />
                                                </div>
                                                <div className="w-4/5 flex">
                                                    <div className="flex flex-col ">
                                                        <a className="text-xl font-bold">
                                                            {loading ? "..." : (primeraPractica + practicaUnTema)}
                                                        </a>
                                                        <a className="text-base">prácticas</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row border p-3 rounded-lg space-x-3 bg-white">
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
                                            <div className="flex flex-row border p-3 rounded-lg space-x-3 col-span-2 x:col-span-1 bg-white">
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
                                            <div className="flex flex-row border p-3 rounded-lg space-x-3 bg-white">
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
                                            <div className="flex flex-row border p-3 rounded-lg space-x-3 bg-white">
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
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold pt-5 text-secondary">Conoce a detalle tu progreso</h2>
                                        <h2 className="text-sm md:text-lg font-medium py-5 text-concepto">Activa tu mente, refuerza tus habilidades y profundiza en cada tema con actividades, talleres y apoyo personalizado.</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {actividades.map((actividad, i) => (
                                                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden p-3">
                                                    <Image
                                                        src={actividad.imagen}
                                                        alt={actividad.titulo}
                                                        width={60}
                                                        height={60}
                                                        className=""
                                                        priority
                                                    />
                                                    <div className="">
                                                        <h3 className="text-lg font-bold text-primary py-2">{actividad.titulo}</h3>
                                                        <p className="text-black font-bold py-2">{actividad.modulos}</p>
                                                    </div>
                                                    <div className="flex-grow bg-gray5 rounded-full h-1 my-2 overflow-hidden">
                                                        <div
                                                            className="bg-green-600 h-full rounded-full transition-all"
                                                            style={{ width: `${actividad.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex justify-between text-black">
                                                        <div>Progreso</div>
                                                        <div>{actividad.progress}%</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabPanel>

                                {/* Panel de Progreso */}
                                <TabPanel className={`${tabIndex === 1 ? "block" : "hidden"}`}>
                                    <div>
                                        <div className=" grid x:grid-cols-5 grid-cols-2 gap-0 ">
                                            <div className="flex flex-col border p-3 rounded-lg space-x-3 bg-white">
                                                <div className="flex w-full items-center justify-center">
                                                    {session?.user?.image?.length != undefined && session?.user?.image?.length > 0 ?
                                                        <div className="relative w-20 h-20">
                                                            <Image
                                                                className="rounded-full object-cover border-2 border-green-700 w-full h-full"
                                                                src={session!.user!.image}
                                                                width={300}
                                                                height={300}
                                                                alt="Foto de perfil"
                                                            />
                                                        </div>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                        </svg>
                                                    }
                                                    {/* <Image src="/images/profile.png" height={100} width={100} alt="frame" priority /> */}
                                                </div>
                                                <div className="">
                                                    <div className="flex justify-center py-4">
                                                        <a className="text-xl font-bold">{session?.user?.name} </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col border p-3 rounded-lg space-x-3 bg-white">
                                                <div className="flex w-full items-center justify-center">
                                                    {loadingImageGrado ? "..." :
                                                        <Image src={imageGradoObjetivo != null ? imageGradoObjetivo : "/images/galardon.png"} height={50} width={50} alt="frame" priority />
                                                    }
                                                    {/* <Image src="/images/galardon.png" height={50} width={50} alt="frame" priority /> */}
                                                </div>
                                                <div className="">
                                                    <div className="flex justify-center  py-4">
                                                        <a className="text-base font-bold text-primary">
                                                            {loadingImageGrado ? "..." :
                                                                (nombreGradoObjetivo != null || nombreGradoObjetivo != undefined ? nombreGradoObjetivo : "pendiente")
                                                            }
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center border p-3 rounded-lg space-x-3 col-span-2 x:col-span-1 bg-white">
                                                <div className="flex text-4xl font-bold w-full items-center justify-center">
                                                    100XP
                                                </div>
                                                <div className="flex">
                                                    <div className="flex flex-col ">
                                                        <a className="text-base">Experiencia</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold pt-5 text-secondary">Tabla de premios</h2>
                                        <h2 className="text-sm md:text-lg font-medium py-5 text-concepto">Conforme vas ganando más experiencia, irás desbloqueando premios.</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 x:grid-cols-4 gap-6">
                                            {premios.map((premio, i) => (
                                                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden p-3 flex flex-col items-center">
                                                    <Image
                                                        src={premio.caja}
                                                        alt={"caja"}
                                                        width={60}
                                                        height={60}
                                                        className="opacity-35"
                                                        priority
                                                    />
                                                    <div className="">
                                                        <h3 className="text-lg text-center text-primary text-opacity-75 py-2">Acumula <label className="text-green-500">{premio.xp}</label> y reclama tu premio.</h3>
                                                    </div>
                                                    <div className="">
                                                        <button onClick={() => setShowPremio(true)} className="bg-primary bg-opacity-55 text-white rounded-xl py-3 px-4"> Ver mi premio</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default function Progreso() {
    const { data: session, status } = useSession()
    const [quantityFallidas, setQuantityFallidas] = useState<number | 0>(0)
    const [gradoObjetivo, setGradoObjetivo] = useState("");
    const [nombreGradoObjetivo, setNombreGradoObjetivo] = useState("");
    const [loadingImageGrado, setLoadingImageGrado] = useState(true)

    const [loading, setLoading] = useState(true)
    const [tiempoDeUso, setTiempoDeUso] = useState<number | 0>(0)

    const [primeraPractica, setPrimeraPractica] = useState<number | 0>(0)
    const [totalPrimeraPractica, setTotalPrimeraPractica] = useState<number | 0>(0)
    const [totalCorrectasPrimeraPractica, setTotalCorrectasPrimeraPractica] = useState<number | 0>(0)

    const [practicaUnTema, setPracticaUnTema] = useState<number | 0>(0)
    const [totalPracticaUnTema, setTotalPracticaUnTema] = useState<number | 0>(0)
    const [totalCorrectasPracticaUnTema, setTotalCorrectasPracticaUnTema] = useState<number | 0>(0)

    const [simulacros, setSimulacros] = useState<number | 0>(0)
    const [totalSimulacros, setTotalSimulacros] = useState<number | 0>(0)
    const [totalCorrectasSimulacros, setTotalCorrectasSimulacros] = useState<number | 0>(0)

    const [fallidas, setFallidas] = useState<number | 0>(0)
    const [totalPreguntasFallidas, setTotalPreguntasFallidas] = useState<number | 0>(0)
    const [totalCorrectasPreguntasFallidas, setTotalCorrectasPreguntasFallidas] = useState<number | 0>(0)

    const [examenesRepetidos, setExamenesRepetidos] = useState<number | 0>(0)
    const [totalExamenesRepetidos, setTotalExamenesRepetidos] = useState<number | 0>(0)
    const [totalCorrectasExamenesRepetidos, setTotalCorrectasExamenesRepetidos] = useState<number | 0>(0)

    const [talleresEstudio, setTalleresEstudio] = useState<number | 0>(0)
    const [totalTalleresEstudio, setTotalTalleresEstudio] = useState<number | 0>(0)
    const [totalCorrectasTalleresEstudio, setTotalCorrectasTalleresEstudio] = useState<number | 0>(0)

    const [totalPreguntas, setTotalPreguntas] = useState<number | 0>(0)

    useEffect(() => {
        const loadFallidas = async () => {
            if (status === "authenticated" && session?.user?.userId) {
                try {
                    const data = await fetchResultProgress(session.user.userId,)

                    // Sumar todas las incorrectas y nulas de todos los registros
                    const totalFallidas = data.reduce((acc: number, item: any) => {
                        const incorrectas = item.incorrectas ?? 0;
                        const nulas = item.nulas ?? 0;
                        return acc + incorrectas + nulas;
                    }, 0);

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

                    // ******************************************** Examenes no repetidos *****************************************************
                    // Sumar todos los intentos de simulacros
                    const talleresEstudio = data
                        .filter((item: any) => item.tipoExamen === "talleres-de-estudio")
                        .reduce((acc: number, item: any) => acc + (item.intentos ?? 0), 0);

                    // Sumar todos las preguntas de los simulacros realizados
                    const totalTalleresEstudio = data
                        .filter((item: any) => item.tipoExamen === "talleres-de-estudio")
                        .reduce((acc: number, item: any) => acc + (item.totalPreguntas ?? 0), 0);

                    // Sumar todos las preguntas correctas de simulacros
                    const totalCorrectasTalleresEstudio = data
                        .filter((item: any) => item.tipoExamen === "talleres-de-estudio")
                        .reduce((acc: number, item: any) => acc + (item.correctas ?? 0), 0);

                    // ******************************************** Examenes no repetidos *****************************************************
                    // Sumar todos los intentos de simulacros
                    const examenesRepetidos = data
                        .filter((item: any) => item.tipoExamen === "examenes-no-repetidos")
                        .reduce((acc: number, item: any) => acc + (item.intentos ?? 0), 0);

                    // Sumar todos las preguntas de los simulacros realizados
                    const totalExamenesRepetidos = data
                        .filter((item: any) => item.tipoExamen === "examenes-no-repetidos")
                        .reduce((acc: number, item: any) => acc + (item.totalPreguntas ?? 0), 0);

                    // Sumar todos las preguntas correctas de simulacros
                    const totalCorrectasExamenesRepetidos = data
                        .filter((item: any) => item.tipoExamen === "examenes-no-repetidos")
                        .reduce((acc: number, item: any) => acc + (item.correctas ?? 0), 0);

                    // ******************************************** preguntas fallidas *****************************************************
                    // Sumar todos los intentos de simulacros
                    const fallidas = data
                        .filter((item: any) => item.tipoExamen === "preguntas-fallidas")
                        .reduce((acc: number, item: any) => acc + (item.intentos ?? 0), 0);

                    // Sumar todos las preguntas de los simulacros realizados
                    const totalPreguntasFallidas = data
                        .filter((item: any) => item.tipoExamen === "preguntas-fallidas")
                        .reduce((acc: number, item: any) => acc + (item.totalPreguntas ?? 0), 0);

                    // Sumar todos las preguntas correctas de simulacros
                    const totalCorrectasPreguntasFallidas = data
                        .filter((item: any) => item.tipoExamen === "preguntas-fallidas")
                        .reduce((acc: number, item: any) => acc + (item.correctas ?? 0), 0);

                    // ******************************************** simulacros *****************************************************
                    // Sumar todos los intentos de simulacros
                    const totalSimulacros = data
                        .filter((item: any) => item.tipoExamen === "primer-simulacro")
                        .reduce((acc: number, item: any) => acc + (item.intentos ?? 0), 0);

                    // Sumar todos las preguntas de los simulacros realizados
                    const totalPreguntasSimulacros = data
                        .filter((item: any) => item.tipoExamen === "primer-simulacro")
                        .reduce((acc: number, item: any) => acc + (item.totalPreguntas ?? 0), 0);

                    // Sumar todos las preguntas correctas de simulacros
                    const totalCorrectasPreguntasSimulacros = data
                        .filter((item: any) => item.tipoExamen === "primer-simulacro")
                        .reduce((acc: number, item: any) => acc + (item.correctas ?? 0), 0);


                    // ******************************************** primera practica *****************************************************
                    // Sumar todos los intentos de practicas
                    const totalPrimeraPractica = data
                        .filter((item: any) => item.tipoExamen === "primera-practica")
                        .reduce((acc: number, item: any) => acc + (item.intentos ?? 0), 0);

                    // Sumar todos las preguntas de los primera practica
                    const totalPreguntasPrimeraPractica = data
                        .filter((item: any) => item.tipoExamen === "primera-practica")
                        .reduce((acc: number, item: any) => acc + (item.totalPreguntas ?? 0), 0);

                    // Sumar todos las preguntas correctas de simulacros
                    const totalCorrectasPreguntasPrimeraPractica = data
                        .filter((item: any) => item.tipoExamen === "primera-practica")
                        .reduce((acc: number, item: any) => acc + (item.correctas ?? 0), 0);


                    // ******************************************** practica un tema *****************************************************
                    // Sumar todos los intentos de practicas
                    const totalPracticaUnTema = data
                        .filter((item: any) => item.tipoExamen === "practica-un-tema")
                        .reduce((acc: number, item: any) => acc + (item.intentos ?? 0), 0);

                    // Sumar todos las preguntas de los primera practica
                    const totalPreguntasPracticaUnTema = data
                        .filter((item: any) => item.tipoExamen === "practica-un-tema")
                        .reduce((acc: number, item: any) => acc + (item.totalPreguntas ?? 0), 0);

                    // Sumar todos las preguntas correctas de simulacros
                    const totalCorrectasPreguntasPracticaUnTema = data
                        .filter((item: any) => item.tipoExamen === "practica-un-tema")
                        .reduce((acc: number, item: any) => acc + (item.correctas ?? 0), 0);

                    // Si lo encuentra, seteamos las incorrectas, si no, seteamos 0
                    setQuantityFallidas(totalFallidas);
                    setTiempoDeUso(horasRealizadas);
                    setTotalPreguntas(preguntasTotal);

                    setSimulacros(totalSimulacros);
                    setTotalSimulacros(totalPreguntasSimulacros);
                    setTotalCorrectasSimulacros(totalCorrectasPreguntasSimulacros);

                    setPrimeraPractica(totalPrimeraPractica);
                    setTotalPrimeraPractica(totalPreguntasPrimeraPractica);
                    setTotalCorrectasPrimeraPractica(totalCorrectasPreguntasPrimeraPractica);

                    setPracticaUnTema(totalPracticaUnTema);
                    setTotalPracticaUnTema(totalPreguntasPracticaUnTema);
                    setTotalCorrectasPracticaUnTema(totalCorrectasPreguntasPracticaUnTema);

                    setFallidas(fallidas);
                    setTotalPreguntasFallidas(totalPreguntasFallidas);
                    setTotalCorrectasPreguntasFallidas(totalCorrectasPreguntasFallidas);

                    setExamenesRepetidos(examenesRepetidos);
                    setTotalExamenesRepetidos(totalExamenesRepetidos);
                    setTotalCorrectasExamenesRepetidos(totalCorrectasExamenesRepetidos);

                    setTalleresEstudio(talleresEstudio);
                    setTotalTalleresEstudio(totalTalleresEstudio);
                    setTotalCorrectasTalleresEstudio(totalCorrectasTalleresEstudio);

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

    // llenar los grados
    useEffect(() => {
        const gradoByUserId = async () => {
            if (status === "authenticated" && session?.user?.userId) {
                try {
                    const data = await getGradoObjetivoByUserId(session.user.userId)
                    // const data = await getTemas();
                    setGradoObjetivo(data[0].imagen);
                    setNombreGradoObjetivo(data[0].nombreGrado)
                } catch (error) {
                    console.error("Error obteniendo el grado by userId:", error);
                    setGradoObjetivo("")
                } finally {
                    setLoadingImageGrado(false)
                }
            }
        }
        gradoByUserId()
    }, [status, session?.user?.userId]);

    return (
        <>
            <Inicio />

            <Zona
                quantityFallidas={quantityFallidas}
                nombreGradoObjetivo={nombreGradoObjetivo}
                imageGradoObjetivo={gradoObjetivo}
                loadingImageGrado={loadingImageGrado}
                loading={loading}
                tiempoDeUso={tiempoDeUso}

                primeraPractica={primeraPractica}
                totalPrimeraPractica={totalPrimeraPractica}
                totalCorrectasPrimeraPractica={totalCorrectasPrimeraPractica}

                practicaUnTema={practicaUnTema}
                totalPracticaUnTema={totalPracticaUnTema}
                totalCorrectasPracticaUnTema={totalCorrectasPracticaUnTema}

                simulacros={simulacros}
                totalSimulacros={totalSimulacros}
                totalCorrectasSimulacros={totalCorrectasSimulacros}

                fallidas={fallidas}
                totalPreguntasFallidas={totalPreguntasFallidas}
                totalCorrectasPreguntasFallidas={totalCorrectasPreguntasFallidas}

                examenesRepetidos={examenesRepetidos}
                totalExamenesRepetidos={totalExamenesRepetidos}
                totalCorrectasExamenesRepetidos={totalCorrectasExamenesRepetidos}

                talleresEstudio={talleresEstudio}
                totalTalleresEstudio={totalTalleresEstudio}
                totalCorrectasTalleresEstudio={totalCorrectasTalleresEstudio}

                totalPreguntas={totalPreguntas} />
        </>
    )
}