'use client'

import { Check, Star, Zap, Crown, Rocket, ClipboardList, Shapes, BookOpen, ChevronLeft, ChevronRight, } from "lucide-react"
import { useRef } from 'react';
import { useProductStore } from "../stores/usePrecioStore";
import { useRouter } from 'next/navigation';

// declare global {
//     interface Window {
//         Krypton?: any;
//     }
// }

type Plan = {
    name: string;
    description: string;
    price: string;
    period?: string;
    icon: React.ReactNode;
    features?: string[];
    popular: boolean;
};

export default function Planes() {
    const setProducto = useProductStore((state) => state.setProducto);
    const router = useRouter();

    const plans: Plan[] = [
        {
            name: "Básico",
            description: "Lo esencial para comenzar con el pie derecho.",
            price: "S/ 200.00",
            period: "/proceso",
            icon: <Star className="h-6 w-6" />,
            features: [
                "Simulador online personalizado",
                "1 taller virtual (5h, 500 preguntas con instructor)",
                "Libro digital Método PONTE 100™ vol. II con palabras clave, preguntas y respuestas",
                "Control de habilidades y monitoreo de progresos",
            ],
            popular: false,
        },
        {
            name: "Estándar",
            description: "Mayor práctica, una mayor confianza.",
            price: "S/ 250.00",
            period: "/mes",
            icon: <Zap className="h-6 w-6" />,
            features: [
                "Simulador online personalizado",
                "2 talleres virtuales (10h en total, 1000 preguntas)",
                "Libro digital Método PONTE 100™ vol. II con palabras clave, preguntas y respuestas",
                "Control de habilidades y monitoreo de progresos",
            ],
            popular: true,
        },
        {
            name: "Medium",
            description: "Ideal para quienes quieren entrenarse a fondo.",
            price: "S/ 300.00",
            period: "/mes",
            icon: <Crown className="h-6 w-6" />,
            features: [
                "Simulador online personalizado",
                "3 talleres virtuales (15h, 1500 preguntas)",
                "Libro digital Método PONTE 100™ vol. II, con palabras clave, preguntas y respuestas",
                "Control de habilidades y monitoreo de progresos",
                "Regalo sorpresa incluido",
            ],
            popular: false,
        },
        {
            name: "Gold",
            description: "Para quienes se lo toman muy en serio.",
            price: "S/ 350.00",
            period: "",
            icon: <Rocket className="h-6 w-6" />,
            features: [
                "Simulador online personalizado",
                "5 talleres virtuales (25h, 2500 preguntas)",
                "Libro digital Método PONTE 100™ vol. I y II con palabras clave, preguntas y respuestas",
                "Control de habilidades y monitoreo de progresos",
                "Regalo sorpresa incluido",
            ],
            popular: false,
        },
        {
            name: "Platinium",
            description: "Entrenamiento avanzado con materiales completos.",
            price: "S/ 400.00",
            period: "",
            icon: <Rocket className="h-6 w-6" />,
            features: [
                "Simulador online personalizado",
                "4 talleres virtuales (20h, 2000 preguntas)",
                "Libro digital Método PONTE 100™ vol. I y II con palabras clave, preguntas y respuestas",
                "Control de habilidades y monitoreo de progresos",
                "Regalo sorpresa incluido",
            ],
            popular: false,
        },
    ]

    const planesIdividuales: Plan[] = [
        {
            name: "Simulador online",
            description: "Creado para quienes quieren estudiar con un sistema hecho 100% para ti",
            price: "S/ 60.00",
            period: "/proceso",
            icon: <ClipboardList className="h-6 w-6" />,
            popular: false,
            // buttonVariant: "outline" as const,
        },
        {
            name: "Clase virtual",
            description: "introducción al Método PONTE 100™ (hora académica de 45')",
            price: "S/ 100.00",
            period: "/mes",
            icon: <Shapes className="h-6 w-6" />,
            popular: false,
            // buttonVariant: "default" as const,
        },
        {
            name: "Libro digital ",
            description: "Libor digital Método PONTE 100™ vol. I y II con palabras claves en 3000 preguntas y respuestas",
            price: "S/ 100.00",
            period: "/mes",
            icon: <BookOpen className="h-6 w-6" />,
            popular: false,
            // buttonVariant: "outline" as const,
        }
    ]

    // Función para iniciar el pago
    const handlePayClick = async (precio: number, nombre: string) => {
        setProducto({ nombre, precio });
        router.push('/suscripcion');
    };

    const containerRef = useRef<HTMLDivElement | null>(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="pt-10 pb-10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Elige el plan perfecto
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                            para tu ascenso
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Planes flexibles diseñados para crecer contigo. Desde videoconferencias, hasta planes personalizados.
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            Comprometidos con tu avance
                        </div>
                        <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            Apoyo en tu proceso cognitivo
                        </div>
                        <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            Interacciones personalizadas
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="py-0">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Productos Individuales</h2>
                        <p className="text-lg text-gray-600">Adquiere diversos productos individualmente</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {planesIdividuales.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative rounded-xl border bg-white p-6 ${plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"} transition-all duration-300 hover:shadow-xl`}
                            >

                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
                                        Más Popular
                                    </div>
                                )}


                                {/* Header */}
                                <div className="text-center pb-4">
                                    <div
                                        className={`mx-auto mb-4 p-3 w-fit rounded-full ${plan.popular ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                                    >
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{plan.name}</h3>
                                    <p className="text-sm text-gray-500">{plan.description}</p>
                                </div>

                                {/* Content */}
                                <div className="text-center pb-6">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div >
                                    <button
                                        onClick={() => {
                                            // Convierte precio $9.99 a número en céntimos o la unidad que maneje tu backend
                                            const priceNumber = Number(plan.price.replace(/[^0-9.]/g, ''));
                                            const amountInCents = Math.round(priceNumber * 100);
                                            handlePayClick(amountInCents, `${plan.name.toLowerCase()}`);
                                        }}
                                        className={`w-full rounded-lg px-4 py-2 text-white font-semibold bg-button hover:bg-gray-900`}
                                    >
                                        {`Adquirir ${plan.name}`}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20">
                <div className="container mx-auto px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Planes de Suscripción
                        </h2>
                        <p className="text-lg text-gray-600">
                            Elige el plan que mejor se adapte a tus necesidades
                        </p>
                    </div>

                    {/* Botones de navegación */}
                    <div className="relative">
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div
                            ref={containerRef}
                            className="flex gap-14 overflow-x-auto px-8 scrollbar-hide"
                            style={{
                                scrollBehavior: "smooth",
                            }}
                        >
                            {plans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`relative min-w-[280px] max-w-[280px] flex-shrink-0 rounded-xl border bg-white p-6 my-10 ${plan.popular
                                        ? "border-blue-500 shadow-lg scale-105"
                                        : "border-gray-200"
                                        } transition-all duration-300 hover:shadow-xl`}
                                >
                                    {plan.popular && (
                                        <div className="absolute z-10 -top-3 left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
                                            Más Popular
                                        </div>
                                    )}

                                    {/* Header */}
                                    <div className="text-center pb-4">
                                        <div
                                            className={`mx-auto mb-4 p-3 w-fit rounded-full ${plan.popular
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {plan.icon}
                                        </div>
                                        <h3 className="text-xl font-bold">{plan.name}</h3>
                                        <p className="text-sm text-gray-500">{plan.description}</p>
                                    </div>

                                    {/* Content */}
                                    <div className="text-center pb-6">
                                        <div className="mb-6">
                                            <span className="text-4xl font-bold text-gray-900">
                                                {plan.price}
                                            </span>
                                        </div>
                                        <ul className="space-y-3 text-left">
                                            {plan.features?.map((feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className="flex items-start text-sm text-gray-600"
                                                >
                                                    <span className="mr-2 text-green-500">✔</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Footer */}
                                    <button
                                        onClick={() => alert(`Seleccionaste el plan: ${plan.name}`)}
                                        className={`w-full rounded-lg px-4 py-2 text-white font-semibold ${plan.popular
                                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                            : "bg-button hover:bg-gray-900"
                                            }`}
                                    >
                                        {plan.price === "Personalizado"
                                            ? "Contactar Ventas"
                                            : `Adquirir plan ${plan.name}`}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Info extra */}
                    <div className="text-center mt-16">
                        <p className="text-gray-600 mb-4">
                            ¿Necesitas algo diferente?
                            <a href="/contactanos" className="text-blue-600 hover:underline ml-1">
                                Contáctanos
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}