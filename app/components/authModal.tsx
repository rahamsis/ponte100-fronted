'use client';

/* eslint-disable */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, LockKeyhole, Eye, EyeClosed } from "lucide-react";
import Cookies from 'js-cookie';

import { signIn, getSession } from "next-auth/react";

interface AuthModalProps {
    onClose: () => void
    onLogin: () => void
}

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
    const router = useRouter();

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevosErrores: { email?: string[]; password?: string[] } = {};

        if (!formData.email?.trim()) {
            nuevosErrores.email = ["El correo es obligatorio"];
        }

        if (!formData.password?.trim()) {
            nuevosErrores.password = ["La contraseña es obligatoria"];
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }

        setErrors({});
        setMessage(null);
        setIsLoading(true);

        // 📌 Obtener el User-Agent (dispositivo)
        const device = navigator.userAgent;
        // 📌 Obtener la IP pública desde una API externa
        let ip = "Unknown";
        try {
            const res = await fetch("https://api64.ipify.org?format=json");
            const data = await res.json();
            ip = data.ip;
        } catch (error) {
            console.error("Error obteniendo la IP:", error);
        }

        try {
            const response = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                device,  // Enviamos el dispositivo
                ip,      // Enviamos la IP
                redirect: false, // Evita redirección automática
            });

            if (!response?.ok) {
                setIsLoading(false);
                setMessage(response?.error!);
                return;
            }

            cleanForm();
            onLogin();
            // Esperar a que la sesión se actualice
            setTimeout(async () => {
                const session = await getSession();

                const welcome = session?.user?.welcome; // Asumiendo que incluyes `estado` en el JWT/session

                if (welcome === 0) {
                    //guardo en una cookie el welcome
                    Cookies.set("welcome", "0", { path: "/", sameSite: "Lax" });
                    //redirigo a la pagina de bienvenida
                    router.push('/bienvenida');
                } else {
                    router.push('/inicio'); // o lo que necesites
                }
            }, 500); // 500ms suele ser suficiente, puedes ajustar si es necesario

        } catch (error) {
            console.error("Login error:", error);
            setMessage("Error al iniciar sesión");
            setIsLoading(false);
        }
    }

    // Manejo de cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Eliminar espacios en blanco mientras el usuario escribe
        const sanitizedValue = value.replace(/\s+/g, "");
        setFormData({ ...formData, [name]: sanitizedValue });

        // Limpiar error del campo que está siendo modificado
        setErrors((prevErrors) => {
            // Si ya no hay error en ese campo, devolver prevErrors tal cual
            if (!prevErrors[name as keyof typeof prevErrors]) {
                return prevErrors;
            }

            // Crear copia y eliminar error del campo actual
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[name as keyof typeof prevErrors];

            return updatedErrors;
        });

        setMessage("")
    };

    const cleanForm = () => {
        setFormData({ username: '', email: '', password: '' });
        setErrors({});
        setMessage(null);
        setIsLoading(false);
        setShowPassword(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Iniciar sesión</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded pl-10 focus:outline-none"
                                placeholder="Ingrese un email"
                            // required
                            />
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-secondary peer-focus:text-gray-900" />
                        </div>
                        {
                            errors.email &&
                            <p className="mt-2 text-sm text-red-500" >
                                {errors.email}
                            </p>
                        }
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded pl-10"
                                placeholder="Ingrese una contraseña"
                            // required
                            />
                            <button
                                type="button"
                                // variant="ghost"
                                // size="icon"
                                className="absolute right-0 top-0 h-full px-3 text-gray3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ?
                                    <EyeClosed /> : <Eye />
                                }
                            </button>
                            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-secondary peer-focus:text-gray-900" />
                        </div>
                        {
                            errors.password &&
                            <p className="mt-2 text-sm text-red-500" >
                                {errors.password}
                            </p>
                        }
                    </div>

                    {
                        message &&
                        <div className="flex flex-row bg-red-100 rounded-lg text-red-500 px-2 py-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                            </svg>
                            <p className="text-sm text-red-500 text-center ml-2">
                                {message}
                            </p>
                        </div>

                    }

                    <button type="submit" className="w-full bg-button justify-center text-white py-2 rounded">
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8H4z"></path>
                                </svg>
                                Cargando...
                            </div>
                        ) : (
                            "Iniciar sesión"
                        )}
                    </button>
                </form>

                <button
                    disabled={true}
                    onClick={() => cleanForm()} className="mt-4 font-semibold text-opacity-30 text-secondary hover:underline" >
                    {/* <a href="/planes">¿No tienes cuenta? Regístrate</a> */}
                    <a href="/">¿No tienes cuenta? Regístrate</a>
                </button>
                <button onClick={onClose} className="absolute top-2 right-5 text-gray-500 text-3xl hover:text-gray-700">
                    &times;
                </button>
            </div>
        </div>
    )
}