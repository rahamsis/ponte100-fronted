"use client";

/* eslint-disable */

import { useState, useEffect, useRef, useCallback } from "react";
import { getDocument, PDFDocumentProxy, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "../ui/pdf/sheet";


GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

interface PDFViewerProps {
  fileUrl: string;
  onClose: () => void;
}

const MyPDFViewer: React.FC<PDFViewerProps> = ({ fileUrl, onClose }) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Estado para el spinner
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<any>(null); // Guardar la tarea de renderización actual

  // Cargar el PDF y obtener el número de páginas
  useEffect(() => {
    const loadPDF = async () => {
      setIsLoading(true); // Activar el spinner
      try {
        const loadingTask = getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        renderPage(1, scale); // Renderizar la primera página
      } catch (error) {
        console.error("Error al cargar el PDF:", error);
      } finally {
        setIsLoading(false); // Desactivar el spinner
      }
    };

    loadPDF();
  }, [fileUrl, scale]);

  // Función para renderizar una página específica
  const renderPage = async (pageNum: number, scale: number) => {
    if (!pdfRef.current || !canvasRef.current) return;

    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    const context = canvas.getContext("2d");
    if (!context) return;

    // Cancelar cualquier renderización en curso antes de iniciar una nueva
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
    }

    // Configurar el canvas
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    // Guardar la tarea de renderizado actual
    renderTaskRef.current = page.render(renderContext);

    try {
      await renderTaskRef.current.promise; // Esperar a que termine la renderización
    } catch (error: any) {
      if (error.name === "RenderingCancelledException") {
        console.log("Renderización cancelada.");
      } else {
        console.error("Error al renderizar la página:", error);
      }
    }
  };

  const [isFullscreen, setIsFullscreen] = useState(false)

  // Cambio de página
  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      renderPage(newPage, scale);
    }
  }, [currentPage, scale]);

  const nextPage = useCallback(() => {
    if (currentPage < numPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      renderPage(newPage, scale);
    }
  }, [currentPage, scale, numPages]);

  // Zoom
  const zoomIn = () => {
    const newScale = Math.min(scale + 0.1, 2);
    setScale(newScale);
    renderPage(currentPage, newScale);
  };

  const zoomOut = () => {
    const newScale = Math.max(scale - 0.1, 0.5);
    setScale(newScale);
    renderPage(currentPage, newScale);
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true))
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false))
    }
  }, [])

  const handleClose = useCallback(() => {
    // Salir del modo de pantalla completa si está activado
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false); // Actualizar el estado
        onClose(); // Cerrar el modal
      });
    } else {
      onClose(); // Cerrar el modal directamente si no está en pantalla completa
    }
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-full p-4 flex flex-col">

        {/* // <div className="flex min-h-screen flex-col bg-background mt-11 items-center border-2 border-red-500"> */}
        {/* Controles */}
        <div className="  sticky z-10 flex items-center justify-between border-b pb-3 bg-background/95 px-4  backdrop-blur">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <button className="border-2 border-gray-300 p-3 rounded-lg font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                  </svg>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[700px]">
                <SheetTitle className="sr-only">Título accesible</SheetTitle>
                <div className="h-full overflow-y-auto p-4">
                  <div className="grid gap-4 p-4">
                    {Array.from({ length: numPages }, (_, index) => (
                      <SheetClose asChild key={index}>
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentPage(index + 1);
                            renderPage(index + 1, scale);// Las páginas comienzan desde 1                      
                            // setIsSheetOpen(false); // Cerrar el Sheet manualmente

                          }}
                          className={`rounded-lg border text-2xl p-4 text-left transition-colors 
                        ${currentPage === index + 1 ? "bg-white/50 text-gray-600" : "text-white"}`}>
                          <h3 className="font-bold">Página {index + 1}</h3>
                        </button>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-4">
              <button onClick={previousPage} disabled={currentPage === 1} className="border-2 border-gray-300 p-3 rounded-lg font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
              </button>
              <div className="min-w-[60px] text-center text-2xl">
                {currentPage} / {numPages}
              </div>
              <button onClick={nextPage} disabled={currentPage === numPages - 1} className="border-2 border-gray-300 p-3 rounded-lg font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
          </div>
          {/* Controles de zoom */}
          <div className="flex items-center gap-4">
            <button onClick={zoomOut} className="border-2 border-gray-300 p-3 rounded-lg font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-zoom-out" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z" />
                <path fillRule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
            <div className="min-w-[60px] text-center text-2xl">{(scale * 100).toFixed(0)}%</div>
            <button onClick={zoomIn} className="border-2 border-gray-300 p-3 rounded-lg font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-zoom-in" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z" />
                <path fillRule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5" />
              </svg>
            </button>
            <button onClick={toggleFullscreen} className="border-2 border-gray-300 p-3 rounded-lg font-semibold">
              {isFullscreen ?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                  <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707" />
                </svg>}
            </button>
            {/* Botón para cerrar el modal */}
            <button
              onClick={handleClose}
              className="border-2 border-red-300 p-3 rounded-lg font-semibold text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenedor del PDF con scroll */}
        <div className="flex-1 overflow-auto mt-4">
          {isLoading ? (
            // Spinner de carga
            // <div className="flex items-center justify-center h-full">
            //   <div className="animate-spin rounded-full h-12 w-12 border-t-2 "></div>
            // </div>
            <div className="flex items-center justify-center h-full">
              <button type="button" className="bg-transparent rounded-lg flex py-3 px-2" disabled>
                <div className="rounded-full h-5 w-5 border-t-4 border-green-600 animate-spin mr-3"></div>
                Cargando ...
              </button>
            </div>
          ) : (
            <canvas ref={canvasRef} className="border shadow-md mx-auto"></canvas>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPDFViewer;
