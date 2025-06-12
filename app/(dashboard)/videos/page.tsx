'use client'

import Image from "next/image";
import { useState } from "react";
import { Calendar, Clock, Search } from "lucide-react";

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
                                Videos de sesiones
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function Videos() {
    const arrayVideos = [
        {
            imagen: "/images/videos/video.png",
            title: "Taller 1",
            subtitle: "Clase 1/ Sesión 1",
            ponente: `Guillermo Arturo`,
            fecha: "01/06/2025",
            hora: "1H 20min"
        },
        {
            imagen: "/images/videos/video.png",
            title: "Taller 2",
            subtitle: "Clase 1/ Sesión 2",
            ponente: `Evart`,
            fecha: "02/06/2025",
            hora: "1H 20min"
        },
        {
            imagen: "/images/videos/video.png",
            title: "Taller 3",
            subtitle: "Clase 1/ Sesión 3",
            ponente: `Kevin`,
            fecha: "03/06/2025",
            hora: "1H 20min"
        },
        {
            imagen: "/images/videos/video.png",
            title: "Taller 4",
            subtitle: "Clase 1/ Sesión 1",
            ponente: `Arturo Guillermo`,
            fecha: "04/06/2025",
            hora: "1H 20min"
        },
    ]

    // Fin del carrusel de Videos
    return (
        <div className="flex flex-col">
            {/* Versión escritorio */}
            <section className="bg-postbanner py-10">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="mx-auto">
                            {/* <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
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
                            </div> */}
                            <VideosWithSearch videos={arrayVideos} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function VideosWithSearch({ videos }: { videos: { imagen: string; title: string; subtitle: string; ponente: string, fecha: string; hora: string; }[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name-asc');

    // Filtrar libros basado en el término de búsqueda
    const filteredVideos = videos.filter(video => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            video.title.toLowerCase().includes(searchTermLower) ||
            (video.subtitle && video.subtitle.toLowerCase().includes(searchTermLower)) ||
            (video.ponente && video.ponente.toLowerCase().includes(searchTermLower))
        );
    }
    ).sort((a, b) => {
        switch (sortOption) {
            case 'name-asc':
                return a.title.localeCompare(b.title);
            case 'name-desc':
                return b.title.localeCompare(a.title);
            case 'date-newest':
                return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
            case 'date-oldest':
                return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
            default:
                return 0;
        }
    });

    return (
        <div>
            {/* Barra de búsqueda */}
            <div className="mb-6 mt-4 flex flex-col lg:flex-row justify-between gap-6">
                <div className="lg:w-1/2">
                    <Search className="absolute w-8 h-8 mt-[10px] ml-2 text-secondary" />
                    <input
                        type="text"
                        placeholder="Buscar videos..."
                        className="pl-16 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-primary font-bold whitespace-nowrap">Ordenar por</h1>
                        <select
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="name-asc">Nombre (A-Z)</option>
                            <option value="name-desc">Nombre (Z-A)</option>
                            <option value="date-newest">Más recientes</option>
                            <option value="date-oldest">Más antiguos</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Resultados */}
            {filteredVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-centertext-center py-8">
                    <Search className="w-8 h-8 lg:w-16 lg:h-16 text-[#CAD3F5] " />
                    <p className="text-gray3 text-lg text-center">No se encontraron resultados de la búsqueda</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {filteredVideos.map((video, i) => (
                        <VideoCard key={i} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
}

function VideoCard({ video }: { video: { imagen: string; title: string; subtitle: string; ponente: string, fecha: string; hora: string; } }) {
    return (
        <div className="flex flex-col justify-between bg-white rounded-xl border-2 items-start p-2 text-left shadow-lg">
            <Image
                src={video.imagen}
                alt="fundamentos"
                width={1000}
                height={800}
                className="mb-4"
            />
            <div className="mx-3">
                <h3 className="text-base lg:text-lg font-bold mb-2 text-concepto">{video.title}</h3>
                <h3 className="text-base lg:text-lg font-bold mb-2 text-primary">{video.subtitle}</h3>
                <p className="text-concepto text-base lg:text-lg">Ponente: {video.ponente}</p>
            </div>
            <div className="w-full mt-5 mb-3">
                <div className="flex flex-row justify-between mt-6 mb-2 px-3">
                    <div className="flex flex-row space-x-2 text-concepto items-center">
                        <Calendar className="text-black" /> <p className="text-sm">{video.fecha}</p>
                    </div>
                    <div className="flex flex-row space-x-2 text-concepto items-center">
                        <Clock className="text-black" /> <p className="text-sm">{video.hora}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Progreso() {
    return (
        <>
            <Inicio />

            <Videos />
        </>
    )
}