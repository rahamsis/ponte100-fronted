"use client"

/* eslint-disable */

import { useState, useEffect } from "react"
import { useProductStore } from '../stores/usePrecioStore';
import { getFormToken } from "../../lib/actions";
import { useRouter } from 'next/navigation';

interface FormDataToPay {
    // Datos del primer formulario
    nombre: string
    apellidos: string
    email: string
    telefono: string
    identityType: string,
    identityCode: string,
    // Datos del segundo formulario
    direccion: string
    provincia: string
    codigoPostal: string
    departamento: string
    nombreProducto: string,
    precio: number
}

declare global {
    interface Window {
        Culqi: any;
    }
}

export default function Suscripcion() {
    const camposObligatoriosPaso1 = ['nombre', 'apellidos', 'email', 'identityCode'];
    const producto = useProductStore((state) => state.producto);
    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter();

    const paymentMethods = {// las opciones se ordenan según se configuren
        tarjeta: true,
        yape: true,
        billetera: true,
        bancaMovil: true,
        agente: true,
        cuotealo: true,
    }

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<FormDataToPay>({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        identityType: 'DNI',
        identityCode: "",
        direccion: "",
        provincia: "",
        codigoPostal: "",
        departamento: "",
        nombreProducto: "",
        precio: 0.00
    })

    useEffect(() => {
        if (producto?.precio == null) {
            router.push("/")
        }
    })

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.culqi.com/js/v4";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    // Sync producto con formData
    useEffect(() => {
        if (producto) {
            setFormData((prev) => ({
                ...prev,
                nombreProducto: producto.nombre || '',
                precio: producto.precio ? producto.precio / 100 : 0,
            }));
        }
    }, [producto]);

    const handleInputChange = (field: keyof FormDataToPay, value: string) => {
        setShowAlert(false)
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSiguiente = () => {
        const faltanCampos = camposObligatoriosPaso1.some(
            campo => !formData[campo as keyof FormDataToPay]
        );

        if (faltanCampos) {
            setShowAlert(true);
            return;
        }

        setShowAlert(false)
        setStep(2)
    }

    const handleAtras = () => {
        setStep(1)
    }

    const handleFinalizar = async () => {
        if (!window.Culqi) {
            console.error("Culqi no cargado");
            return;
        }

        const totalEnCentimos = formData.precio * 100;

        window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || "";
        window.Culqi.settings({
            title: "Metodo Ponte100",
            currency: "PEN",
            amount: totalEnCentimos,
            description: formData.nombreProducto,
            email: formData.email,
            style: {
                theme: "flat" // Aquí colocas el nombre del tema que quieres usar
            }
        });

        window.Culqi.options({
            lang: 'auto',
            modal: true,
            installments: true,
            paymentMethods: paymentMethods,
            paymentMethodsSort: Object.keys(paymentMethods),
        });

        // window.Culqi.open();

        // Manejar respuesta del token
        window.Culqi.token = async () => {
            const token = window.Culqi.token.id;

            if (!token) {
                console.error('No se obtuvo token de Culqi');
                return;
            }

            try {
                const response = await getFormToken(formData, token);
                
                const result = await response.json();
                if (response.ok) {
                    router.push('/gracias'); // Página de éxito
                } else {
                    console.error('Error en cargo Culqi', result);
                }

            } catch (error) {
                console.error('Error al procesar el pago con Culqi:', error);
            }
        };

        // window.Culqi.onClose = () => {
        //     console.log("Modal Culqi cerrado por el usuario");
        // };


        // Ahora sí abrir el modal
        window.Culqi.open();
    }


    return (
        <div className="w-full lg:w-1/2 mx-auto lg:mt-20 my-8">
            <div className="bg-white shadow-md rounded-xl p-6">
                <div className="text-center">
                    <h2 className="text-xl font-bold pb-7">{formData.nombreProducto.toUpperCase()}</h2>
                </div>
                {step === 1 && (
                    <>
                        <h2 className="text-xl font-semibold mb-1">Paso 1 de 2</h2>
                        <p className="text-sm text-gray-500 mb-4">Información Personal</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${showAlert && formData.nombre == "" ? "text-red-500" : ""}`} htmlFor="nombre">Nombres <a className="text-red-600">*</a></label>
                                <input
                                    id="nombre"
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                                    placeholder="Ingresa tu nombre completo"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 ${showAlert && formData.apellidos == "" ? "text-red-500" : ""}`} htmlFor="apellidos">Apellidos <a className="text-red-600">*</a></label>
                                <input
                                    id="apellidos"
                                    type="text"
                                    value={formData.apellidos}
                                    onChange={(e) => handleInputChange("apellidos", e.target.value)}
                                    placeholder="Ingresa tus apellidos"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 ${showAlert && formData.email == "" ? "text-red-500" : ""}`} htmlFor="email">Correo electrónico <a className="text-red-600">*</a></label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="ejemplo@correo.com"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="identityType">Tipo de Documento</label>
                                <select
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                    id="identityType"
                                    name="identityType"
                                    value={formData.identityType}
                                    onChange={(e) => handleInputChange("identityType", e.target.value)}
                                >
                                    <option value="DNI">DNI</option>
                                    <option value="PS">Pasaporte</option>
                                    <option value="CE">Carné de Extranjería</option>
                                </select>
                            </div>

                            <div className="form-group col-md-8">
                                <label className={`block text-sm font-medium mb-1 ${showAlert && formData.identityCode == "" ? "text-red-500" : ""}`} htmlFor="identityType">Documento <a className="text-red-600">*</a></label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                    id="identityCode"
                                    name="identityCode"
                                    placeholder="Doc. Identidad"
                                    value={formData.identityCode}
                                    onChange={(e) => handleInputChange("identityCode", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="telefono">Teléfono</label>
                                <input
                                    id="telefono"
                                    type="tel"
                                    value={formData.telefono}
                                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                                    placeholder="+51 123 456 789"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                />
                            </div>

                            <div className="col-span-2 w-1/2 mx-auto">
                                <button onClick={handleSiguiente} className="w-full bg-button text-white py-2 rounded">
                                    Siguiente
                                </button>
                            </div>
                            {
                                showAlert && (
                                    <label className="text-red-500 text-center col-span-2"> Falta completar algunos datos</label>
                                )
                            }
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-xl font-semibold mb-1">Paso 2 de 2</h2>
                        <p className="text-sm text-gray-500 mb-4">Información de Dirección</p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="direccion">Dirección</label>
                                <input
                                    id="direccion"
                                    type="text"
                                    value={formData.direccion}
                                    onChange={(e) => handleInputChange("direccion", e.target.value)}
                                    placeholder="Calle, número, colonia"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="departamento">Departamento</label>
                                <input
                                    id="departamento"
                                    type="text"
                                    value={formData.departamento}
                                    onChange={(e) => handleInputChange("departamento", e.target.value)}
                                    placeholder="Tu departamento"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="provincia">Provincia</label>
                                <input
                                    id="provincia"
                                    type="text"
                                    value={formData.provincia}
                                    onChange={(e) => handleInputChange("provincia", e.target.value)}
                                    placeholder="Tu provincia"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="codigoPostal">Código Postal</label>
                                <input
                                    id="codigoPostal"
                                    type="text"
                                    value={formData.codigoPostal}
                                    onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                                    placeholder="12345"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-button"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button onClick={handleAtras} className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400">
                                    Atrás
                                </button>
                                <button onClick={handleFinalizar} className="flex-1 bg-button text-white py-2 rounded">
                                    Pagar S/ {formData.precio}.00
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Indicador de progreso */}
            <div className="mt-4 flex justify-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-button" : "bg-gray-300"}`} />
                <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-button" : "bg-gray-300"}`} />
            </div>
        </div>
    )
}
