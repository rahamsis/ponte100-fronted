'use client'

// import Image from "next/image";
import { Tab, TabPanel, TabList, Tabs } from "react-tabs";
import { useState, useEffect, useRef } from "react";
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

function Zona() {
    const [books, setBooks] = useState<{ name: string; url: string; imageUrl: string }[]>([]);
    const [banco, setBanco] = useState<{ name: string; url: string; imageUrl: string }[]>([]);
    const [normas, setNormas] = useState<{ name: string; url: string; imageUrl: string }[]>([]);
    const [selectedBanco, setSelectedBanco] = useState<string>("");
    const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingNormas, setLoadingNormas] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            setLoading(true);
            const res = await fetch("/api/books?bucket=temarioponte100");
            const data = await res.json();
            const booksWithImages = await Promise.all(
                data.books.map(async (book: { name: string; url: string }) => {
                    const localImagePath = `/images/covers/${encodeURIComponent(book.name.replace(".pdf", ""))}.jpg`;

                    // Verifica si la imagen existe localmente
                    const imageExists = await fetch(localImagePath, { method: "HEAD" })
                        .then((res) => res.ok)
                        .catch(() => false);

                    if (imageExists) {
                        return { ...book, imageUrl: localImagePath };
                    }

                    const imageRes = await fetch(`/api/covers?bucket=coversponte100&file=${book.name}.jpg`);
                    const imageData = await imageRes.json();
                    return {
                        ...book,
                        imageUrl: imageData.filePath || "/images/librodefault.jpg", // Imagen por defecto si falla
                    };
                })
            );
            setLoading(false);
            setBooks(booksWithImages);
        }

        fetchBooks();
    }, []);

    useEffect(() => {
        async function fetchBancos() {
            const res = await fetch("/api/books?bucket=archivosponte100");
            const data = await res.json();

            const booksWithImages = await Promise.all(
                data.books.map(async (book: { name: string; url: string }) => {

                    const localImagePath = `/images/covers/${book.name.replace(".pdf", "")}.jpg`;
                    //   console.log("imagen existe", book.name)
                    // Verifica si la imagen existe localmente
                    const imageExists = await fetch(localImagePath, { method: "HEAD" })
                        .then((res) => res.ok)
                        .catch(() => false);

                    if (imageExists) {
                        return { ...book, imageUrl: localImagePath };
                    }

                    const imageRes = await fetch(`/api/covers?bucket=coversponte100&file=${book.name}.jpg`);
                    const imageData = await imageRes.json();
                    return {
                        ...book,
                        imageUrl: imageData.filePath || "/images/librodefault.jpg", // Usa una imagen por defecto si falla
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
                    const localImagePath = `/images/covers/pdf.png`;

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
                                        <TabPanelWithSearch books={books} loading={loading} />
                                    </div>
                                </TabPanel>

                                {/* Panel de Banco de Preguntas */}
                                <TabPanel className={`${tabIndex === 1 ? "block" : "hidden"}`}>
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                            {banco.map((banco, i) => (
                                                <div key={i} className="px-3 bg-white rounded-lg shadow-md flex flex-row h-full overflow-hidden">
                                                    <div className="flex items-center justify-center">
                                                        <div className="">
                                                            <Image
                                                                src={banco.imageUrl}
                                                                alt={banco.name}
                                                                width={250}
                                                                height={120}
                                                                className="object-cover rounded-lg"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="p-4 items-left text-cenleftter flex flex-col flex-grow">
                                                        <h3 className="text-sm font-bold text-primary">{banco.name}</h3>
                                                        <div className="flex-grow"></div>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedBanco(banco.url);
                                                                setIsPdfViewerOpen(true);
                                                            }}
                                                            className="w-3/4 mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const img = new window.Image();
        img.src = book.imageUrl;
        img.crossOrigin = "anonymous"; // Evita problemas con imágenes externas

        img.onload = () => {
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        };
    }, [book.imageUrl]);

    return (
        <div className="px-3 bg-white rounded-lg shadow-md flex flex-row h-full my-2">
            <div className="flex items-center justify-center">
                <a className="" href={`${book.url}`} target="_blank">
                    <canvas
                        ref={canvasRef}
                        width={80}
                        height={120}
                        className="object-cover rounded-lg"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()} />
                </a>
            </div>

            <div className="p-4 items-left text-left flex flex-col flex-grow">
                <h3 className="text-sm font-bold text-primary">{book.name}</h3>
                {/* Espaciador flexible para empujar el botón hacia abajo */}
                <div className="flex-grow"></div>
                <button
                    onClick={() => window.open(book.url, "_blank")}
                    className="w-3/4 2xl:w-1/2 mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
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