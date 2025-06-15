import React from "react";
import Image from "next/image";

function CommonHero() {
    return (
        <div className="flex flex-col bg-white">
            <div className="">
                <div className="mt-6 mx-5 lg:mx-28 text-center">
                    <div className="mx-auto px-3 max-w-full my-10 md:my-20">
                        <h1 className="mb-5 mt-8 text-2xl lg:text-4xl font-bold leading-tight text-button">Sobre el método de estudio PONTE 100™</h1>
                        <p className="text-justify text-primary">
                            Es un método innovador, práctico, 100% efectivo. Potencia la memoria, mejora la retención y estimula el 
                            pensamiento eficaz mediante técnicas visuales, palabras clave, asociaciones significativas. Basado en neurociencia 
                            cognitiva, motivación y autoevaluación, está diseñado para ayudarte a alcanzar tus metas académicas o profesionales. 
                            Protección legal: Registrado en INDECOPI - Derechos de Autor (Resolución N.º 3094-2023/DDA); Signo Distintivo (Certificado N.º 
                            00154860 - Resolución N.º 009022-2024/DSD).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Work() {
    return (
        <div className="flex flex-col bg-white">
            <div>
                <div className="mx-5 lg:mx-28 text-center">
                    <div className="mx-auto px-3 max-w-full">
                        <div>
                            <div className="bg-button rounded-2xl">
                                <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
                                    <div className="x:w-1/2 w-full text-left px-10 py-5">
                                        <h2 className="text-white font-bold text-lg x:text-3xl">
                                            &quot;Impulsamos el aprendizaje con neurociencia para que todos puedan alcanzar su máximo potencial.&quot;
                                        </h2>
                                        <div className=" text-white px-6 py-3 mt-6 rounded-lg">
                                            <a
                                                href="/contactanos"
                                                className="border-2 border-white text-white px-6 py-3 mt-6 rounded-lg inline-block"
                                            >
                                                Contáctanos
                                            </a>
                                        </div>
                                    </div>
                                    <div className="x:w-1/2 w-full">
                                        <div
                                            className="w-full h-[200px] md:h-[320px] lg:h-[230px] xl:h-[400px] bg-cover bg-center rounded-t-2xl lg:rounded-t-none lg:rounded-br-2xl lg:rounded-tr-2xl"
                                            style={{ backgroundImage: `url('/images/nosotros/equipo.png')` }}
                                        ></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PostWork() {
    const arrayUno = [
        {
            char: "P",
            title: "Planeación",
            concept: "Planea tu sesión con objetivos claros. Organiza tu tiempo de forma efectiva para lograr más con menos esfuerzo.",
        },
        {
            char: "O",
            title: "Organización",
            concept: "Organiza tu material con esquemas y herramientas visuales que te ayuden a entender y recordar mejor.",
        },
        {
            char: "N",
            title: "Neuro Aprendizaje",
            concept: "Aplica principios de neurociencia: alterna temas, practica lo aprendido y reduce el estrés para aprender mejor.",
        },
        {
            char: "T",
            title: "Tecnología",
            concept: "Aprovecha las herramientas tecnologicas y recursos digitales para practicar y repasar.",
        },
        {
            char: "E",
            title: "Evalúate",
            concept: "Evalúa continuamente tu progreso con autoevaluaciones y pruebas para mejorar y ajustar tu estudio.",
        },
        {
            char: "100",
            title: "100%",
            concept: "Da tu 100% en cada sesión con constancia y motivación para alcanzar tus objetivos.",
        },
    ]
    return (
        <div className="flex flex-col bg-gray5 -mt-40 pt-40">
            <div>
                <div className="mx-5 lg:mx-28 text-center">
                    <div className="mx-auto px-3 max-w-full">
                        <div>
                            <div className="py-16">
                                <div className="text-xl lg:text-4xl font-bold text-secondary pb-10">
                                    ¿Por qué método de estudio PONTE100™?
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                                    {arrayUno.map((object, i) => (
                                        <div key={i} className="flex flex-col items-center text-center">
                                            <div className="w-16 h-16 bg-secondary text-terciary rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                                                {object.char}
                                            </div>
                                            <h3 className="text-base font-bold mb-2 text-button">{object.title}</h3>
                                            <p className="text-gray2 text-center">{object.concept}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Members() {
    const arrayMembers = [
        {
            profile: "/images/miembros/miembro1.png",
            testimonio: "Licenciado en Educación y administración, creador del método de estudio Ponte 100, docente calificado en formación continua, con amplia experiencia en el sector educativo policial.",
            nombre: "Guillermo, Vasquez  Manco"
        },
        {
            profile: "/images/miembros/miembro2.png",
            testimonio: "Licenciado en Comunicaciones e Imagen Empresarial, creador de contenidos digitales y redes sociales con experiencia en marketing digital, en el sector público y privado.",
            nombre: "Miguel, Vasquez Peña"
        },
        {
            profile: "/images/miembros/miembro3.png",
            testimonio: "Ejecutivo senior con experiencia en Contabilidad, Administración y RRHH, experto en liderazgo y negociación. Enfocado en crear estrategias, resolver conflictos y generar alianzas.",
            nombre: "Evart, Zegarra Enciso"
        },
        {
            profile: "/images/miembros/miembro4.png",
            testimonio: "Técnico en Administración con experiencia en sector público y formación continua. Experto en soluciones personalizadas para optimizar la gestión educativa y administrativa.",
            nombre: "Kevin, Cieza Bautista"
        },
        {
            profile: "/images/miembros/miembro5.png",
            testimonio: "Bachiller en Ingeniería de Sistemas, desarrollador de software, administrador de redes, ciberseguridad, analista de datos y consultor tecnológico, con experiencia en el sector privado.",
            nombre: "Rahamsis, Correa Gamarra"
        },

    ]
    return (
        <div className="flex flex-col bg-white pb-9 lg:pb-16">
            <div>
                <div className="mx-5 lg:mx-28 text-center">
                    <div className="mx-auto px-3 max-w-full">
                        <div>
                            <div className="py-16">
                                <div className="text-xl lg:text-4xl font-bold text-button pb-10">
                                    Conoce al equipo detrás del método PONTE 100™
                                </div>
                                <div className="pb-14 mx-auto">
                                    <p className="text-primary mx-20 text-lg lg:text-xl font-medium">
                                        Somos un equipo multidisciplinario decidido a transformar la educación, integrando la neurociencia, la motivación 
                                        y estrategias de aprendizaje innovadoras. Creemos en el poder del conocimiento para despertar mentes, encender 
                                        propósitos y cambiar vidas, a través de una enseñanza que inspira, conecta y deja huella.
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-8">
                                    {arrayMembers.map((object, i) => (
                                        <div
                                            key={i}
                                            className="w-full md:w-[30%] flex flex-col items-center text-center bg-white p-4 rounded-2xl shadow-lg"
                                        >
                                            <Image
                                                src={object.profile}
                                                alt="Avatar"
                                                width={200}
                                                height={100}
                                                className="transition-opacity duration-1000 ease-in-out"
                                            />
                                            <div className="py-8 text-primary font-medium">
                                                {object.testimonio}
                                            </div>
                                            <div className="text-primary font-bold">
                                                {object.nombre}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Nosotros() {
    return (
        <React.Fragment>
            <CommonHero />
            <Work />
            <PostWork />
            <Members />
        </React.Fragment>
    );
}