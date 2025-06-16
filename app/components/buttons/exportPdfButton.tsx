'use client'

import { jsPDF } from "jspdf";
import { downloadQuestionsToClase } from "@/app/lib/actions";
import { useEffect, useState } from "react";

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
    intentos: number;
};

const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({ data, children, className = "" }) => {

    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if (!data.idClase) return;
        const fetchData = async () => {
            try {
                const questions = await downloadQuestionsToClase(data.idClase);
                // console.log(questions)
                setQuestions(questions)
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            }
        };

        fetchData();
    }, [data.idClase]);

    const handleExport = async () => {
        const doc = new jsPDF();


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

        const logoBase64 = await imageToBase64("/images/banners/imgBanner2.png"); // 👈 Usa tu ruta aquí

        // 2. Agregar logo como marca de agua
        doc.addImage(logoBase64, "PNG", 20, 5, 15, 15);


        const lineHeight = 5;
        let startY = 30;
        let currentY = startY;
        const maxY = 280; // límite antes de cambiar de página

        doc.setFontSize(14);
        const codigo = parseInt(String(data.idClase).replace(/^CL0+/, ""), 10);
        const text = "EXAMEN DE CONOCIMIENTOS N° " + codigo;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(text);
        const centerX = (pageWidth - textWidth) / 2;
        doc.text(text, centerX, 20);
        doc.setFontSize(12);
        // doc.text(`Nombre: ${data.idClase}`, 20, 40);
        // doc.text(`Correo: ${data.correo}`, 20, 50);
        // doc.text(`Edad: ${data.edad}`, 20, 60);
        // doc.save("reporte.pdf");

        questions.forEach((pregunta, index) => {
            if (!pregunta.question) return;

            // 1. Dividir la pregunta en líneas
            const textoPregunta = doc.splitTextToSize(`${index + 1}. ${pregunta.question}`, 170);
            const alturaPregunta = textoPregunta.length * lineHeight;

            // 2. Procesar opciones desde string tipo: "ALT001@Texto1||ALT002@Texto2"
            const opcionesRaw = pregunta.options.split("||") || [];
            const opcionesLimpias = opcionesRaw.map(opt => opt.split("@")[1] || "");
            const opcionesDivididas = opcionesLimpias.map(opt => doc.splitTextToSize(opt, 160));
            const alturaOpciones = opcionesDivididas.reduce((sum, lines) => sum + lines.length * lineHeight, 0);

            const correctId = pregunta.correctAnswer;
            let textoRespuestaCorrecta = "";

            // 3. Si no cabe todo, crear nueva página
            if (currentY + alturaPregunta + alturaOpciones > maxY) {
                doc.addPage();
                currentY = startY;
            }

            // 4. Imprimir pregunta
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(textoPregunta, 20, currentY);
            currentY += alturaPregunta;

            // 5. Imprimir opciones con letras (A), B), ...)
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            opcionesDivididas.forEach((lineas, idx) => {
                const letra = String.fromCharCode(65 + idx); // A, B, C, ...
                lineas.forEach((linea: string, i: number) => {
                    const texto: string = i === 0 ? `${letra}) ${linea}` : `    ${linea}`;
                    doc.text(texto, 25, currentY);
                    currentY += lineHeight;
                });
            });

            // 6. Imprimir respuesta
            for (const opcion of opcionesRaw) {
                const [id, texto] = opcion.split("@");
                if (id === correctId) {
                    textoRespuestaCorrecta = texto;
                    break;
                }
            }

            doc.text(`RESPUESTA: ${textoRespuestaCorrecta}`, 20, currentY);
            currentY += lineHeight;

            // 7. Imprimir Ubicacion
            doc.text(`UBICACIÓN: ${pregunta.ubicacion}`, 20, currentY);
            currentY += lineHeight;

            // 8. Imprimir código
            doc.text(`CÓDIGO: ${pregunta.id}`, 20, currentY);
            currentY += lineHeight;

            currentY += 5; // Espacio entre preguntas
        });


        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
    };

    return (
        <button onClick={handleExport} className={className}>
            {children}
        </button>
    );
};

export default ExportPDFButton;
