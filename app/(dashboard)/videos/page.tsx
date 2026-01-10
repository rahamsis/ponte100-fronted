'use client'

import { useState, useEffect, useRef } from "react";
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

type Video = {
    name: string;
    url: string;
    author: string;
    createdAt: string;
    poster: string;
};

function Videos() {
    const [videos, setVideos] = useState<Video[]>([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            const res = await fetch("/api/videos");
            // const data = await res.json();
            const data = await res.json();

            if (data.error) {
                console.log("Error fetching videos:", data.error);
                return;
            }
            setVideos(data);
            // setLoading(false);
        }

        fetchVideos();
    }, []);

    // Fin del carrusel de Videos
    return (
        <div className="flex flex-col">
            {/* Versión escritorio */}
            <section className="bg-postbanner py-10">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="lg:w-full mx-auto">
                            <VideosWithSearch videos={videos} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

// function VideosWithSearch({ videos }: { videos: { imagen: string; title: string; subtitle: string; ponente: string, fecha: string; hora: string; }[] }) {
function VideosWithSearch({ videos }: { videos: Video[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name-asc');

    // Filtrar libros basado en el término de búsqueda
    const filteredVideos = videos.filter(video => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            video.name.toLowerCase().includes(searchTermLower)
            // || (video.subtitle && video.subtitle.toLowerCase().includes(searchTermLower)) 
            || (video.author && video.author.toLowerCase().includes(searchTermLower))
        );
    }).sort((a, b) => {
        switch (sortOption) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'date-newest':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'date-oldest':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
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
                <div className="mx-auto lg:mx-0">
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

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// function VideoCard({ video }: { video: { imagen: string; title: string; subtitle: string; ponente: string, fecha: string; hora: string; } }) {
function VideoCard({ video }: { video: Video }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onLoadedMetadata = () => {
            setDuration(v.duration);
        };
        v.addEventListener("loadedmetadata", onLoadedMetadata);
        return () => v.removeEventListener("loadedmetadata", onLoadedMetadata);
    }, [video.url]);

    return (
        <div className="flex flex-col justify-between bg-white rounded-xl border-2 items-start p-2 text-left shadow-lg">

            {/* VIDEO */}
            <div className="relative w-full aspect-video">
                <video
                    ref={videoRef}
                    src={video.url}
                    controls
                    preload="metadata"
                    poster={video.poster}
                    controlsList="nodownload"
                    className="w-full h-full rounded-lg object-cover"
                    // onLoadedMetadata={(e) =>
                    //     console.log("Duración:", e.currentTarget.duration)
                    // }
                />
            </div>

            <div className="mx-3 mt-1">
                <h3 className="text-base lg:text-lg font-bold mb-2 text-concepto">{video?.name || "Clase"}</h3>
                <p className="text-concepto text-base lg:text-lg">Ponente: {video.author ?? "Desconocido"}</p>
            </div>
            <div className="w-full mt-5 mb-3">
                <div className="flex flex-row justify-between mt-6 mb-2 px-3">
                    <div className="flex flex-row space-x-2 text-concepto items-center">
                        <Calendar className="text-black" /> <p className="text-sm">{new Date(video.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-row space-x-2 text-concepto items-center">
                        <Clock className="text-black" /> <p className="text-sm">{formatTime(Math.floor(duration))}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Progreso() {
    return (
        <div className="flex flex-col min-h-screen pb-20 lg:pb-5">
            <Inicio />

            <Videos />
        </div>
    )
}