'use client'

import { jsPDF } from "jspdf";
import { downloadQuestionsToClase } from "@/app/lib/actions";
import { useState } from "react";

interface ExportPDFProps {
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

const ExportPDF: React.FC<ExportPDFProps> = ({ data, children, className = "" }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleExport = async () => {
        setIsLoading(true);

        try {
            const questions: Question[] = await downloadQuestionsToClase(data.idClase);
            // const questions: Question[] = [{
            //     id: "186284",
            //     question: "¿QUIÉNES ESTÁN OBLIGADAS A INFORMAR SOBRE LAS CARACTERÍSTICAS DE LOS SERVICIOS PÚBLICOS QUE PRESTA, SUS TARIFAS Y SOBRE LAS FUNCIONES ADMINISTRATIVAS QUE EJERCE?",
            //     tema: "TUO de la Ley N° 27806 – Ley de Transparencia y Acceso a la información Pública.",
            //     ubicacion: "(texto: 9)** [TITULO III]",
            //     options: "ALT186284001@TODA PERSONA SUJETAS AL RÉGIMEN PRIVADO DESCRITAS EN EL INCISO 8 DEL ARTÍCULO PRIMERO DEL TÍTULO PRELIMINAR DE LA LEY 7444 QUE GESTIONEN SERVICIOS PÚBLICOS O EJERZAN FUNCIONES ADMINISTRATIVAS DEL SECTOR PÚBLICO BAJO CUALQUIER MODALIDAD.||ALT186284002@TODA PERSONA NATURAL O JURÍDICA SUJETAS AL RÉGIMEN PRIVADO DESCRITAS EN EL INCISO 8 DEL ARTÍCULO PRIMERO DEL TÍTULO PRELIMINAR DE LA LEY 27444 QUE GESTIONEN SERVICIOS PÚBLICOS O EJERZAN FUNCIONES ADMINISTRATIVAS DEL SECTOR PÚBLICO BAJO CUALQUIER MODALIDAD.||ALT186284003@LAS PERSONAS JURÍDICAS SUJETAS AL RÉGIMEN PRIVADO DESCRITAS EN EL INCISO 8 DEL ARTÍCULO PRIMERO DEL TÍTULO PRELIMINAR DE LA LEY 27444 QUE GESTIONEN SERVICIOS PÚBLICOS O EJERZAN FUNCIONES ADMINISTRATIVAS DEL SECTOR PÚBLICO BAJO CUALQUIER MODALIDAD.||ALT186284004@TODA PERSONA NATURAL O JURÍDICA SUJETAS AL RÉGIMEN ESPECIAL DESCRITAS EN EL INCISO 8 DEL ARTÍCULO PRIMERO DEL TÍTULO PRELIMINAR DE LA LEY 27444 QUE GESTIONEN SERVICIOS PÚBLICOS O EJERZAN FUNCIONES ADMINISTRATIVAS DEL SECTOR PÚBLICO BAJO CUALQUIER MODALIDAD.||ALT186284005@LAS PERSONAS JURÍDICAS SUJETAS AL RÉGIMEN ESPECIAL DESCRITAS EN EL INCISO 8 DEL ARTÍCULO PRIMERO DEL TÍTULO PRELIMINAR DE LA LEY 27444 QUE GESTIONEN SERVICIOS PÚBLICOS O EJERZAN FUNCIONES ADMINISTRATIVAS DEL SECTOR PÚBLICO BAJO CUALQUIER MODALIDAD.",
            //     correctAnswer: "ALT186284003",
            //     clave: "OBLIGADAS A INFORMAR||RÉGIMEN PRIVADO"
            // }]
            
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

            const addTextWithPageBreak = (
                text: string,
                claves?: string | string[],
                tipo?: string,
                options?: {
                    x?: number;
                    style?: "bold" | "normal";
                    fontSize?: number;
                    indent?: number;
                    maxWidth?: number;
                }
            ) => {
                const x = options?.x || margin.left;
                const style = options?.style || "normal";
                const fontSize = options?.fontSize || 10;
                const indent = options?.indent || 0;
                const maxWidth = options?.maxWidth || doc.internal.pageSize.width - x - margin.right;
                const pageHeight = doc.internal.pageSize.height;
                const marginBottom = 10; // Márgen inferior para evitar sobreescribir

                doc.setFont("helvetica", style);
                doc.setFontSize(fontSize);

                // Función para limpiar texto (igual que antes)
                const limpiar = (str: string) =>
                    str
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[.,!?;:()\[\]{}"“”¡¿]/g, "")
                        .toLowerCase();

                // Procesar claves (igual que antes)
                const clavesArray = Array.isArray(claves) ? claves : claves ? claves.split("||") : [];
                const palabrasClaves = clavesArray.map(c => limpiar(c));
                const partes: { texto: string; esClave: boolean }[] = [];
                let restante = text;

                // Dividir texto en partes normales/clave (igual que antes)
                while (restante.length > 0) {
                    let encontrado = false;
                    for (let i = 0; i < palabrasClaves.length; i++) {
                        const claveOriginal = clavesArray[i];
                        const claveLimpia = palabrasClaves[i];
                        const restanteLimpio = limpiar(restante);
                        const indexLimpio = restanteLimpio.indexOf(claveLimpia);

                        if (indexLimpio !== -1) {
                            let indexReal = 0;
                            let contadorLimpio = 0;
                            while (indexReal < restante.length && contadorLimpio < indexLimpio) {
                                const char = restante[indexReal];
                                if (limpiar(char) !== "") contadorLimpio++;
                                indexReal++;
                            }
                            const before = restante.slice(0, indexReal);
                            const match = restante.slice(indexReal, indexReal + claveOriginal.length);
                            const after = restante.slice(indexReal + claveOriginal.length);
                            const match2 = match.split(/(\s+)/);
                            if (before) partes.push({ texto: before, esClave: false });
                            match2.forEach((word: string) => {
                                partes.push({ texto: word, esClave: true });
                            });
                            restante = after;
                            encontrado = true;
                            break;
                        }
                    }
                    if (!encontrado) {
                        partes.push({ texto: restante, esClave: false });
                        break;
                    }
                }

                // Dibujar texto con saltos de línea y páginas
                let currentX = x + indent;
                let currentLineWidth = 0;

                const checkPageBreak = (neededHeight: number) => {
                    if (currentY + neededHeight > pageHeight - marginBottom) {
                        doc.addPage();
                        currentY = margin.top - 35; // Reinicia Y al margen superior
                        return true;
                    }
                    return false;
                };

                partes.forEach(({ texto, esClave }) => {
                    const words = texto.split(/(\s+)/);

                    words.forEach(word => {
                        if (!word.trim()) {
                            const spaceWidth = doc.getTextWidth(word);
                            currentLineWidth += spaceWidth;
                            return;
                        }

                        const wordWidth = doc.getTextWidth(word);
                        const wordHeight = fontSize * 0.5; // Aproximación de altura de línea

                        // Verificar si necesitamos un salto de línea o de página
                        if (currentLineWidth + wordWidth > maxWidth) {
                            currentY += lineHeight;
                            currentX = x + indent;
                            currentLineWidth = 0;
                            checkPageBreak(lineHeight); // Verificar si necesitamos nueva página
                        }

                        // Verificar si la palabra cabe en la página actual
                        if (checkPageBreak(wordHeight)) {
                            currentX = x + indent; // Reiniciar X si hay nueva página
                            currentLineWidth = 0;
                        }

                        doc.setFont("helvetica", esClave || tipo === "pregunta" ? "bold" : "normal");
                        doc.setTextColor(esClave ? 255 : 0, 0, 0);
                        doc.text(word, currentX + currentLineWidth, currentY);

                        if (esClave && word.trim()) {
                            const underlineY = currentY + 1;
                            doc.setDrawColor(255, 0, 0);
                            doc.setLineWidth(0.5);
                            doc.line(
                                currentX + currentLineWidth,
                                underlineY,
                                currentX + currentLineWidth + wordWidth,
                                underlineY
                            );
                        }

                        currentLineWidth += wordWidth;
                    });
                });

                currentY += lineHeight;
                checkPageBreak(lineHeight); // Verificar después de agregar el texto
            };

            // Procesar preguntas
            questions.forEach((pregunta, index) => {
                if (!pregunta.question) return;

                const claves = pregunta.clave ? pregunta.clave.split("||") : undefined;

                // 1. Pregunta (en negrita)
                addTextWithPageBreak(`${index + 1}. ${pregunta.question}`, claves?.[0], "pregunta", {
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

                addTextWithPageBreak(`RESPUESTA: ${correctAnswer}`, claves?.[1], "respuesta", {
                    style: "normal"
                });

                // 5. Metadata
                addTextWithPageBreak(`UBICACIÓN: ${pregunta.ubicacion}`, "null", "null");
                addTextWithPageBreak(`CÓDIGO: ${pregunta.id}`, "null", "null");

                currentY += 3; // Espacio adicional entre preguntas
            });

            const pdfBlob = doc.output("blob");
            const pdfUrl = URL.createObjectURL(pdfBlob);

            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

            if (isSafari) {
                const link = document.createElement("a");
                link.href = pdfUrl;
                link.download = `${data.tallerName} - ${data.claseName}.pdf`; // nombre del archivo
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(pdfUrl); // libera memoria
            } else {
                window.open(pdfUrl);
            }

        } catch (error) {
            console.error("Error al exportar preguntas:", error);
            alert("Ocurrió un error al exportar el PDF.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={() => handleExport()} className={className} disabled={isLoading}>
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8H4z"></path>
                </svg>
            ) : (
                children
            )}
        </button>
    );
};

export default ExportPDF;
