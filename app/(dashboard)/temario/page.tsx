'use client'

// import Image from "next/image";
import { Tab, TabPanel, TabList, Tabs } from "react-tabs";
import {
    useState,
    useEffect,
    // useRef 
} from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import MyPDFViewer from "@/app/components/pdfViewer";

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
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left text-primary">
                                Material de estudio
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const books = [
    // MATERIAS COMUNES
    {
        name: "Constitución Política del Perú",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H682678",
    },
    {
        name: "Declaración Universal de los Derechos Humanos",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H682819",
    },
    {
        name: "Decreto Legislativo Nº 1267 - Ley de la Policía Nacional del Perú",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1170025",
    },
    {
        name: "Decreto Legislativo Nº 1149 - Ley de la Carrera y Situación del Personal de la Policía Nacional del Perú",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1090246",
    },
    {
        name: "Decreto Legislativo Nº 1318 - Ley que Regula la Formación Profesional de la Policía Nacional del Perú",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1226432",
    },
    {
        name: "Ley Nº 30714 - Ley de Régimen Disciplinario de la Policía Nacional del Perú",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1197214",
    },
    {
        name: "Ley Nº 31873 - Ley que Regula los Procesos de Ascenso del Personal de la Policía Nacional del Perú",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1357992",
    },
    {
        name: "Decreto Legislativo Nº 1291 - Lucha Contra la Corrupción del Sector Interior",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1170748",
    },
    {
        name: "TUO de la Ley N° 27806 - Ley de Transparencia y Acceso a la información Pública",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1250134",
    },
    {
        name: "Ley Nº 27444 - Ley del Procedimiento Administrativo General",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H805476",

    },
    // MATERIAS DE ESPECIALIDAD
    {
        name: "Decreto Legislativo Nº 957 - Código Procesal Penal",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H682695",
    },
    {
        name: "Decreto Legislativo Nº 635 - Código Penal",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H682692",
    },
    {
        name: "Decreto Legislativo Nº 1186 - Ley que Regula el Uso de la Fuerza por parte de la Policía Nacional del Perú",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1134390",
    },
    {
        name: "Ley Nº 32130 Ley que modifica el CPP, para fortalecer la investigación del delito como función de la PNP",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1386701",
    },
    {
        name: "Decreto Legislativo Nº 1241 - Ley que Fortalece la lucha Contra el TID",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1137135",
    },
    {
        name: "Decreto Legislativo Nº 1106 - Ley de Lucha eficaz Contra el Lavado de Activos y otros delitos",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1053470",
    },
    {
        name: "Ley N° 30364 - Ley para prevenir, sancionar y erradicar la violencia contra las mujeres y los integrantes del grupo familiar",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1141065",
    },
    {
        name: "Ley N° 30077 - Ley Contra el Crimen Organizado",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1084545",
    },
    {
        name: "Decreto Legislativo N°1611 - Ley que aprueba medidas especiales para la prevención e Investigación del Delito de Extorsión y Delitos Conexos",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1365316",
    },
    {
        name: "Decreto Supremo N°009-2018-JUS - Protocolos para la aplicación del Proceso Inmediato Reformado",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1214668",
    },
    {
        name: "Decreto Supremo N°010-2018-JUS - Protocolos para la aplicación del Código Procesal Penal",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1214669",
    },
    {
        name: "Resolución Ministerial 952-2018-IN - Derechos Humanos Aplicado a la Función Policial",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1213816",
    },
    {
        name: "Decreto Legislativo Nº 1428 - Que desarrolla medidas para la atención de casos de desaparición de personas en situación de vulnerabilidad",
        imageUrl: "/images/covers/MCA.png",
        url: "https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1216396",
    },
]

function Zona() {
    // const [books, setBooks] = useState<{ name: string; url: string; imageUrl: string }[]>([]);
    const [banco, setBanco] = useState<{ name: string; url: string; imageUrl: string }[]>([]);
    const [normas, setNormas] = useState<{ name: string; url: string; imageUrl: string }[]>([]);
    const [selectedBanco, setSelectedBanco] = useState<string>("");
    const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [loadingNormas, setLoadingNormas] = useState(true);

    // useEffect(() => {
    //     async function fetchBooks() {
    //         setLoading(true);
    //         const res = await fetch("/api/books?bucket=temarioponte100");
    //         const data = await res.json();
    //         const booksWithImages = await Promise.all(
    //             data.books.map(async (book: { name: string; url: string }) => {
    //                 const localImagePath = `/images/covers/${encodeURIComponent(book.name.replace(".pdf", ""))}.jpg`;

    //                 // Verifica si la imagen existe localmente
    //                 const imageExists = await fetch(localImagePath, { method: "HEAD" })
    //                     .then((res) => res.ok)
    //                     .catch(() => false);

    //                 if (imageExists) {
    //                     return { ...book, imageUrl: localImagePath };
    //                 }

    //                 const imageRes = await fetch(`/api/covers?bucket=coversponte100&file=${book.name}.jpg`);
    //                 const imageData = await imageRes.json();
    //                 return {
    //                     ...book,
    //                     imageUrl: imageData.filePath || "/images/librodefault.jpg", // Imagen por defecto si falla
    //                 };
    //             })
    //         );
    //         setLoading(false);
    //         setBooks(booksWithImages);
    //     }

    //     fetchBooks();
    // }, []);

    useEffect(() => {
        async function fetchBancos() {
            const res = await fetch("/api/books?bucket=archivosponte100");
            const data = await res.json();

            const booksWithImages = await Promise.all(
                data.books.map(async (book: { name: string; url: string }) => {

                    const localImagePath = `/images/covers/${book.name.replace(".pdf", "")}.png`;
                    //   console.log("imagen existe", book.name)
                    // Verifica si la imagen existe localmente
                    const imageExists = await fetch(localImagePath, { method: "HEAD" })
                        .then((res) => res.ok)
                        .catch(() => false);

                    if (imageExists) {
                        return { ...book, imageUrl: localImagePath };
                    }

                    const imageRes = await fetch(`/api/covers?bucket=coversponte100&file=${book.name}.png`);
                    const imageData = await imageRes.json();
                    return {
                        ...book,
                        imageUrl: imageData.filePath || "/images/librodefault.png", // Usa una imagen por defecto si falla
                    };
                })
            );

            setBanco(booksWithImages);
        }
        fetchBancos();
    }, []);

    useEffect(() => {
        async function fetchNormas() {
            setLoadingNormas(true);
            const res = await fetch("/api/books?bucket=normas");
            const data = await res.json();

            const booksWithImages = await Promise.all(
                data.books.map(async (book: { name: string; url: string }) => {
                    const localImagePath = `/images/covers/Normas institucionales.png`;

                    return { ...book, imageUrl: localImagePath };

                })
            );
            setLoadingNormas(false);
            setNormas(booksWithImages);
        }

        fetchNormas();
    }, []);

    const [tabIndex, setTabIndex] = useState(0);

    // Fin del carrusel de Actividades
    return (
        <div className="flex flex-col">
            {/* Versión escritorio */}
            <section className="bg-postbanner  pt-4">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                        <div className="w-full">
                            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="w-full">
                                {/* Pestañas */}
                                <TabList className="flex flex-row w-full p-1">
                                    <Tab className={`p-3 text-sm md:text-xl text-left font-semibold cursor-pointer transition-all duration-200 outline-none focus:outline-none ${tabIndex === 0 ? "text-primary font-bold underline underline-offset-8" : "text-gray3"}`}
                                    >
                                        Temario
                                    </Tab>
                                    <Tab className={`p-3 text-sm md:text-xl text-left font-semibold cursor-pointer transition-all duration-200 outline-none focus:outline-none ${tabIndex === 1 ? "text-primary font-bold underline underline-offset-8" : "text-gray3"}`}
                                    >
                                        Banco de Preguntas
                                    </Tab>
                                    <Tab className={`p-3 text-sm md:text-xl text-left font-semibold cursor-pointer transition-all duration-200 outline-none focus:outline-none ${tabIndex === 2 ? "text-primary font-bold underline underline-offset-8" : "text-gray3"}`}
                                    >
                                        Normas Institucionales
                                    </Tab>
                                </TabList>

                                {/* Panel de Temario */}
                                <TabPanel className={` ${tabIndex === 0 ? "block" : "hidden"}`} >
                                    <div className="">
                                        <TabPanelWithSearch books={books} 
                                        // loading={loading} 
                                        loading={true} 
                                        />
                                    </div>
                                </TabPanel>

                                {/* Panel de Banco de Preguntas */}
                                <TabPanel className={`${tabIndex === 1 ? "block" : "hidden"}`}>
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                            {banco.map((banco, i) => (
                                                <div
                                                    key={i}
                                                    className="grid grid-cols-[auto_1fr] bg-white rounded-lg shadow-md px-3 py-2 my-2 min-h-[120px] gap-4 items-center overflow-hidden"
                                                >
                                                    {/* Imagen */}
                                                    <div className="flex items-center justify-center h-[120px] w-[90px]">
                                                        <Image
                                                            src={banco.imageUrl}
                                                            alt={banco.name}
                                                            width={90}
                                                            height={120}
                                                            className="object-cover rounded-lg"
                                                        />
                                                    </div>

                                                    {/* Contenido */}
                                                    <div className="grid grid-rows-[auto_1fr_auto] h-full text-left">
                                                        {/* Título */}
                                                        <h3 className="text-sm font-bold text-primary leading-snug break-words">
                                                            {banco.name}
                                                        </h3>

                                                        {/* Espaciador para empujar el botón hacia abajo */}
                                                        <div></div>

                                                        {/* Botón */}
                                                        <button
                                                            onClick={() => {
                                                                setSelectedBanco(banco.url);
                                                                setIsPdfViewerOpen(true);
                                                            }}
                                                            className="w-3/4 h-10 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                                                        >
                                                            <span className="hidden lg:block">Leer ahora</span>
                                                            <span className="lg:hidden block">Leer</span>
                                                        </button>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>

                                        {isPdfViewerOpen && (
                                            <MyPDFViewer
                                                fileUrl={selectedBanco}
                                                onClose={() => setIsPdfViewerOpen(false)} />
                                        )}
                                    </div>
                                </TabPanel>

                                {/* Panel de Normas institucionales */}
                                <TabPanel className={` ${tabIndex === 2 ? "block" : "hidden"}`} >
                                    <div className="">
                                        <TabPanelWithSearch books={normas} loading={loadingNormas} />
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section >


        </div >
    )
}

function TabPanelWithSearch({ books, loading, }: { books: { name: string; url: string; imageUrl: string }[]; loading: boolean }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar libros basado en el término de búsqueda
    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Barra de búsqueda */}
            <div className="mb-6 mt-4">
                <Search className="absolute w-8 h-8 mt-[10px] ml-2 text-secondary" />
                <input
                    type="text"
                    placeholder="Buscar libros..."
                    className="pl-16 w-full x:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading && <div className="flex min-h-[80vh] items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent">
                        <span className="sr-only">Cargando...</span>
                    </div>
                    <p className="mt-4 text-button">Cargando Temario...</p>
                </div>
            </div>}

            {/* Resultados */}
            {filteredBooks.length === 0 ? (
                <div className="flex flex-col items-center justify-centertext-center py-8">
                    <Search className="w-8 h-8 lg:w-16 lg:h-16 text-[#CAD3F5] " />
                    <p className="text-gray3 text-lg text-center">No se encontraron resultados de la búsqueda</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-4 lg:pb-7">
                    {filteredBooks.map((book, i) => (
                        <BookCard key={i} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}

// Componente que usa Canvas para evitar descargas
function BookCard({ book }: { book: { name: string; url: string; imageUrl: string } }) {
    // const canvasRef = useRef<HTMLCanvasElement>(null);

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     if (!canvas) return;
    //     const ctx = canvas.getContext("2d");

    //     const img = new window.Image();
    //     img.src = book.imageUrl;
    //     img.crossOrigin = "anonymous"; // Evita problemas con imágenes externas

    //     img.onload = () => {
    //         if (ctx) {
    //             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //         }
    //     };
    // }, [book.imageUrl]);

    return (
        <div className="grid grid-cols-[auto_1fr] bg-white rounded-lg shadow-md px-3 py-2 my-2 min-h-[130px] gap-4 items-center">
            {/* Imagen */}
            <div className="flex items-center justify-center h-[120px] w-[90px]">
                <a href={book.url} target="_blank">
                    <Image
                        alt=""
                        src={book.imageUrl}
                        width={90}
                        height={120}
                        className="object-cover rounded-lg"
                    />
                </a>
            </div>

            {/* Contenido */}
            <div className="grid grid-rows-[auto_1fr_auto] h-full">
                {/* Título */}
                <h3 className="text-sm font-bold text-primary leading-snug">
                    {book.name}
                </h3>

                {/* Espaciador (crece para empujar el botón abajo) */}
                <div></div>

                {/* Botón */}
                <button
                    onClick={() => window.open(book.url, "_blank")}
                    className="w-8/12 2xl:w-7/12 h-10 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    Leer ahora
                </button>
            </div>
        </div>
    );
}

export default function Temario() {
    return (
        <>
            <Inicio />

            <Zona />
        </>
    )
}