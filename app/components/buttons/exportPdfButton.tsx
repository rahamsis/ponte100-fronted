'use client'

import { jsPDF } from "jspdf";
import { downloadQuestionsToClase } from "@/app/lib/actions";

interface ExportPDFButtonProps {
    data: {
        idClase: number;
        tallerName: string;
        claseName: string;
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
            const margin = { left: 15, right: 15, top: 45 };
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

            // 2. Agregar logo como marca de agua
            const logoBase64 = await imageToBase64("/images/banners/imgBanner2.png"); // 👈 Usa tu ruta aquí
            doc.addImage(logoBase64, "PNG", 20, 5, 20, 20);

            const webBase64 = await imageToBase64("/assets/frames/web.png"); // 👈 Usa tu ruta aquí
            doc.addImage(webBase64, "PNG", 50, 15, 5, 5);

            const whatsappBase64 = await imageToBase64("/assets/frames/whatsapp.png"); // 👈 Usa tu ruta aquí
            doc.addImage(whatsappBase64, "PNG", 50, 22, 5, 5);

            const facebookBase64 = await imageToBase64("/assets/frames/facebook.png"); // 👈 Usa tu ruta aquí
            doc.addImage(facebookBase64, "PNG", 150, 18, 7, 7);
            // Añadir un área clicable sobre la imagen
            doc.link(150, 18, 7, 7, { url: "https://www.facebook.com/share/1BnJ3MjZq4/?mibextid=wwXIfr" });

            const instagramBase64 = await imageToBase64("/assets/frames/instagram.png"); // 👈 Usa tu ruta aquí
            doc.addImage(instagramBase64, "PNG", 160, 18, 7, 7);
            doc.link(160, 18, 7, 7, { url: "https://www.instagram.com/metodoponte100?igsh=MW51ZDdudXVtbDRtcg==" });

            const xBase64 = await imageToBase64("/assets/frames/x.png"); // 👈 Usa tu ruta aquí
            doc.addImage(xBase64, "PNG", 170, 18, 7, 7);
            doc.link(170, 18, 7, 7, { url: "https://x.com/metodoponte100" });

            const tiktokBase64 = await imageToBase64("/assets/frames/tiktok.png"); // 👈 Usa tu ruta aquí
            doc.addImage(tiktokBase64, "PNG", 180, 18, 7, 7);
            doc.link(180, 18, 7, 7, { url: "https://www.tiktok.com/@metodoponte100?_t=ZM-8wgHyUnBF9Z&_r=1" });

            doc.setFontSize(15);
            doc.setFont("helvetica", "bold");
            const titulo = "MÉTODO DE ESTUDIO PONTE 100 - " + data.tallerName.toUpperCase() + " - " + data.claseName.toUpperCase();
            doc.text(titulo, 45, 12);

            const web = "www.ponte100.com"
            doc.textWithLink(web, 60, 19, { url: "https://ponte100.com" });

            const cellphone = "933-123-949"
            doc.text(cellphone, 60, 26);

            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            const follow = "Síguenos en nuestras redes"
            doc.text(follow, 147, 30);

            doc.setDrawColor(0, 0, 0); // Color negro
            doc.setLineWidth(0.2);     // Grosor de la línea
            // Dibuja la línea desde el margen izquierdo al derecho
            doc.line(margin.left, 36, doc.internal.pageSize.width - margin.right, 36);

            // Función para agregar texto con control de páginas
            const addTextWithPageBreak = (text: string | string[], claves?: string | string[], tipo?: string, options?: {
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

                const clavesArray = Array.isArray(claves) ? claves : (claves ? [claves] : []);
                const palabrasClaves = clavesArray.map(c => c.toLowerCase());


                const lines = Array.isArray(text) ? text : doc.splitTextToSize(text, doc.internal.pageSize.width - margin.left - margin.right - indent);
                const neededHeight = lines.length * lineHeight;

                if (currentY + neededHeight > doc.internal.pageSize.height - 5) {
                    doc.addPage();
                    currentY = 10;
                }

                // doc.text(lines, x + indent, currentY);
                // currentY += neededHeight;

                lines.forEach((line: string) => {
                    const words = line.split(" ");
                    let currentX = x + indent;

                    words.forEach((word: string) => {
                        const cleanWord = word.replace(/[.,;]/g, ""); // quitar signos para comparar
                        const isClave = palabrasClaves.includes(cleanWord.toLowerCase());

                        // Medir ancho de la palabra + espacio
                        const wordWidth = doc.getTextWidth(word + " ");

                        // Cambiar color si es clave
                        if (isClave) {
                            // doc.setFont("helvetica", style);
                            doc.setFont("helvetica", "bold");
                            doc.setTextColor(255, 0, 0); // rojo    
                        } else {
                            doc.setFont("helvetica", "normal");
                            doc.setTextColor(0, 0, 0); // negro normal
                        }

                        if (tipo === "pregunta") {
                            doc.setFont("helvetica", "bold");
                        }

                        // Dibujar texto
                        doc.text(word, currentX, currentY);

                        // Subrayado si es clave
                        if (isClave) {
                            const underlineY = currentY + 1;
                            doc.setDrawColor(255, 0, 0); // rojo
                            doc.setLineWidth(0.5);
                            doc.line(currentX, underlineY, currentX + doc.getTextWidth(word), underlineY);
                        }

                        currentX += wordWidth;
                    });

                    currentY += lineHeight;
                });
            };

            // Procesar preguntas
            questions.forEach((pregunta, index) => {
                if (!pregunta.question) return;

                const claves = pregunta.clave ? pregunta.clave.split("||") : undefined;

                // 1. Pregunta (en negrita)
                addTextWithPageBreak(`${index + 1}. ${pregunta.question}`, claves, "pregunta", {
                    style: "bold",
                    fontSize: 10
                });

                // 3. Opciones (con sangría)
                const options = pregunta.options.split("||").map(opt => opt.split("@")[1] || "");
                options.forEach((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    addTextWithPageBreak(`${letter}) ${opt}`, "null", "null", {
                        indent: 5,
                        fontSize: 9
                    });
                });

                // 4. Respuesta correcta
                const correctAnswer = pregunta.options.split("||")
                    .find(opt => opt.startsWith(pregunta.correctAnswer + "@"))
                    ?.split("@")[1] || "";

                addTextWithPageBreak(`RESPUESTA: ${correctAnswer}`, claves, "respuesta", {
                    style: "normal"
                });

                // 5. Metadata
                addTextWithPageBreak(`UBICACIÓN: ${pregunta.ubicacion}`, "null", "null");
                addTextWithPageBreak(`CÓDIGO: ${pregunta.id}`, "null", "null");

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
