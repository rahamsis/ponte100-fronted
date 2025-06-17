'use client'

import { jsPDF } from "jspdf";
import { downloadQuestionsToClase } from "@/app/lib/actions";

interface ExportPDFButtonProps {
    data: {
        idClase: number;
    };
    children: React.ReactNode;
    className?: string;
}

type Question = {
    id: string;
    question: string;
    tema: string;
    ubicacion: string;
    options: string;
    correctAnswer: string;
    clave: string;
};

const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({ data, children, className = "" }) => {
    const handleExport = async () => {
        try {
            const questions: Question[] = await downloadQuestionsToClase(data.idClase);
            if (!questions?.length) {
                alert("No hay preguntas para exportar.");
                return;
            }

            const doc = new jsPDF();
            // Configuración inicial
            doc.setFont("helvetica");
            doc.setFontSize(12);
            const lineHeight = 6; // Reducido para mejor ajuste
            const margin = { left: 20, right: 20, top: 30 };
            let currentY = margin.top;

            // 1. Cargar imagen desde URL/ruta y convertirla a base64
            const imageToBase64 = async (url: string): Promise<string> => {
                const response = await fetch(url);
                const blob = await response.blob();

                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });
            };

            //         // 2. Agregar logo como marca de agua
            const logoBase64 = await imageToBase64("/images/banners/imgBanner2.png"); // 👈 Usa tu ruta aquí
            doc.addImage(logoBase64, "PNG", 20, 5, 15, 15);

            doc.setFontSize(14);
            const codigo = parseInt(String(data.idClase).replace(/^CL0+/, ""), 10);
            const text = "EXAMEN DE CONOCIMIENTOS N° " + codigo;
            const pageWidth = doc.internal.pageSize.getWidth();
            const textWidth = doc.getTextWidth(text);
            const centerX = (pageWidth - textWidth) / 2;
            doc.text(text, centerX, 20);

            // Función para agregar texto con control de páginas
            const addTextWithPageBreak = (text: string | string[], claves?: string | string[], options?: {
                x?: number;
                style?: "bold" | "normal";
                fontSize?: number;
                indent?: number;
            }) => {
                const x = options?.x || margin.left;
                const style = options?.style || "normal";
                const fontSize = options?.fontSize || 10;
                const indent = options?.indent || 0;

                doc.setFont("helvetica", style);
                doc.setFontSize(fontSize);

                const lines = Array.isArray(text) ? text : doc.splitTextToSize(text, doc.internal.pageSize.width - margin.left - margin.right - indent);
                const neededHeight = lines.length * lineHeight;

                if (currentY + neededHeight > doc.internal.pageSize.height - 20) {
                    doc.addPage();
                    currentY = margin.top;
                }

                doc.text(lines, x + indent, currentY);
                currentY += neededHeight;
            };

            // Procesar preguntas
            questions.forEach((pregunta, index) => {
                if (!pregunta.question) return;

                const claves = pregunta.clave ? pregunta.clave.split("||") : null;

                // 1. Pregunta (en negrita)
                addTextWithPageBreak(`${index + 1}. ${pregunta.question}`, "null", {
                    style: "bold",
                    fontSize: 11
                });

                // 3. Opciones (con sangría)
                const options = pregunta.options.split("||").map(opt => opt.split("@")[1] || "");
                options.forEach((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    addTextWithPageBreak(`${letter}) ${opt}`, "null", {
                        indent: 5,
                        fontSize: 9
                    });
                });

                // 4. Respuesta correcta
                const correctAnswer = pregunta.options.split("||")
                    .find(opt => opt.startsWith(pregunta.correctAnswer + "@"))
                    ?.split("@")[1] || "";

                addTextWithPageBreak(`RESPUESTA: ${correctAnswer}`, "null", {
                    style: "normal"
                });

                // 5. Metadata
                addTextWithPageBreak(`UBICACIÓN: ${pregunta.ubicacion}`, "null");
                addTextWithPageBreak(`CÓDIGO: ${pregunta.id}`, "null");

                currentY += 3; // Espacio adicional entre preguntas
            });

            const pdfBlob = doc.output("blob");
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl);

        } catch (error) {
            console.error("Error al exportar preguntas:", error);
            alert("Ocurrió un error al exportar el PDF.");
        }
    };

    return (
        <button
            onClick={() => handleExport()} className={className}>
            {children}
        </button>
    );
};

export default ExportPDFButton;
