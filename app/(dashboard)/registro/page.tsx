'use client'

/* eslint-disable */

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Tab, TabPanel, TabList, Tabs } from "react-tabs";
import { getUserdata, updatetUserdata, getSignature } from "@/app/lib/actions";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

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
                            <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-4 lg:mb-8 text-primary">
                                Mi registro Personal
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

interface UserData {
    userId: string;
    profile: string;
    nombre: string;
    apellidos: string;
    email: string;
    grupo: string;
    grado: string;
    dni: string;
    cip: string;
    fechaNacimiento: string;
    genero: string;
    username: string;
    password: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    codigoPostal: string;
    provincia: string;
    // terminosCondiciones: boolean;
}

// Esquema de validación para el paso 1: Información personal
const personalInfoSchema = z.object({
    profile: z.object({ profile: z.string().optional() }),
    nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    apellidos: z.string().min(2, { message: "Los apellidos deben tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Introduce un email válido" }),
    // grupo: z.string(),
    // grado: z.string(),
    dni: z.string().min(8, { message: "Introduce un DNI válido" }).max(8, { message: "Introduce un DNI válido" }),
    cip: z.string().min(6, { message: "Introduce un codigo CIP válido" }).max(8, { message: "Introduce un codigo CIP válido" }),
    fechaNacimiento: z
        .string({
            required_error: "La fecha de nacimiento es requerida",
        })
        .refine(
            (date) => {
                const today = new Date()
                const birthDate = new Date(date)
                let age = today.getFullYear() - birthDate.getFullYear()
                const m = today.getMonth() - birthDate.getMonth()
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--
                }
                return age >= 18
            },
            { message: "Debes tener al menos 18 años para registrarte" },
        ),
    genero: z.enum(["masculino", "femenino"], {
        required_error: "Por favor selecciona una opción",
    }),
})

// Esquema de validación para el paso 2: Credenciales
const credentialsSchema = z.object({
    username: z.string().min(4, { message: "el username debe tener al menos 4 caracteres" }),
    password: z
        .string()
        .optional()
        .refine((val) => !val || val.length >= 8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .refine((val) => !val || /[A-Z]/.test(val), { message: "La contraseña debe contener al menos una letra mayúscula" })
        .refine((val) => !val || /[a-z]/.test(val), { message: "La contraseña debe contener al menos una letra minúscula" })
        .refine((val) => !val || /[0-9]/.test(val), { message: "La contraseña debe contener al menos un número" })
        .refine((val) => !val || /[^A-Za-z0-9]/.test(val), { message: "La contraseña debe contener al menos un carácter especial" }),
    confirmPassword: z.string(),
    telefono: z
        .string()
        .min(9, { message: "El número de teléfono debe tener al menos 9 dígitos" })
        .regex(/^\d+$/, { message: "El número de teléfono solo debe contener dígitos" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
})

// Esquema de validación para el paso 3: Dirección
const addressSchema = z.object({
    direccion: z.string().optional().refine((val) => !val || val.length >= 5, { message: "La dirección debe tener al menos 5 caracteres" }),
    ciudad: z.string().optional().refine((val) => !val || val.length >= 2, { message: "La ciudad debe tener al menos 2 caracteres" }),
    codigoPostal: z
        .string()
        .optional()
        .refine((val) => !val || val.length >= 5, { message: "El código postal debe tener al menos 5 caracteres" })
        .refine((val) => !val || /^\d+$/, { message: "El código postal solo debe contener dígitos" }),
    provincia: z.string().optional().refine((val) => !val || val.length >= 2, { message: "La provincia debe tener al menos 2 caracteres" }),
})

// Función para calcular la fortaleza de la contraseña
function getPasswordStrength(password: string): { strength: number; label: string; color: string } {
    if (!password) return { strength: 0, label: "Muy débil", color: "bg-red-500" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    const labels = ["Muy débil", "Débil", "Media", "Fuerte", "Muy fuerte"]
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

    return {
        strength,
        label: labels[strength - 1] || "Muy débil",
        color: colors[strength - 1] || "bg-red-500",
    }
}


function Personal() {

    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

    const [preview, setPreview] = useState<string | null>(null);
    const [fileProfile, setFileProfile] = useState<File | null>(null);

    const [userData, setUserData] = useState<UserData | null>(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [formData, setFormData] = useState<any>({})

    const { data: session, status } = useSession();

    const [loading, setLoading] = useState(true);

    // Formulario para información personal
    const personalForm = useForm<z.infer<typeof personalInfoSchema>>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            // profile: "",
            profile: { profile: "" },
            nombre: "",
            apellidos: "",
            // grado: "",
            // grupo: "",
            email: "",
            dni: "",
            cip: "",
            genero: "masculino",
        },
    });

    // Formulario para credenciales
    const credentialsForm = useForm<z.infer<typeof credentialsSchema>>({
        resolver: zodResolver(credentialsSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            telefono: "",
        },
    })

    // Formulario para dirección
    const addressForm = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            direccion: userData?.direccion || "",
            ciudad: userData?.ciudad || "",
            codigoPostal: userData?.codigoPostal || "",
            provincia: userData?.provincia || "",
        },
    })

    // Obtener los datos del usuario desde la base de datos al cargar la página
    useEffect(() => {
        async function fetchUserData() {
            try {
                if (status === "authenticated" && session?.user?.userId) {
                    setLoading(true);

                    const response = await getUserdata(session?.user?.userId);
                    setUserData(response[0]);

                    const imageUrl = response[0].profile
                        ? response[0].profile
                        : (response[0].genero === "femenino" ? "/assets/users/userf.png" : "/assets/users/userm.png");

                    setPreview(imageUrl);
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUserData();
    }, [status, session?.user?.userId]);

    // Efecto para actualizar los formularios
    useEffect(() => {
        if (userData) {
            personalForm.setValue("nombre", userData.nombre || "");
            personalForm.setValue("apellidos", userData.apellidos || "");
            // personalForm.setValue("grado", userData.grado || "");
            // personalForm.setValue("grupo", userData.grupo || "");
            personalForm.setValue("email", userData.email || "");
            personalForm.setValue("dni", userData.dni || "");
            personalForm.setValue("cip", userData.cip || "");
            personalForm.setValue("fechaNacimiento", userData.fechaNacimiento || "");
            if (userData.genero === "masculino" || userData.genero === "femenino") {
                personalForm.setValue("genero", userData.genero || "");
            }

            // actualizar el formulario de credenciales una vez que Data esté listo
            credentialsForm.setValue("username", userData.username || "");
            credentialsForm.setValue("telefono", userData.telefono || "");

            // actualizar el formulario de direccion una vez que Data esté listo
            addressForm.setValue("direccion", userData.direccion || "");
            addressForm.setValue("ciudad", userData.ciudad || "");
            addressForm.setValue("codigoPostal", userData.codigoPostal || "");
            addressForm.setValue("provincia", userData.provincia || "");
        }
    }, [userData, personalForm, credentialsForm, addressForm]);

    // Manejar la selección de imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true)
            // Generar una URL de vista previa
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            setFileProfile(file)

            // Guardar el archivo en el formulario usando setValue
            personalForm.setValue("profile", { profile: previewUrl });
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        } finally {
            setLoading(false);
        }
    };

    // Manejador para el envío del paso 1
    function onSubmitPersonal(values: z.infer<typeof personalInfoSchema>) {
        setFormData({ ...formData, ...values })
        setTabIndex(1)
    }

    // Manejador para el envío del paso 2
    function onSubmitCredentials(values: z.infer<typeof credentialsSchema>) {
        setFormData({ ...formData, ...values })
        setTabIndex(2)
    }

    // Manejador para el envío del paso 3 (final)
    async function onSubmitAddress(values: z.infer<typeof addressSchema>) {
        setIsSubmitting(true)

        try {
            let imageUrl = "";
            // Verificamos si hay una imagen en el formulario
            if (formData.profile && fileProfile instanceof File) {
                
                // Subimos la imagen a Cloudinary
                if (session?.user?.userId) {
                    imageUrl = await uploadImage(session?.user?.userId, fileProfile);
                } else {
                    console.error("User ID is not available getUserdata");
                }

                const completeFormData = {
                    ...formData,
                    profile: imageUrl || "",
                    ...values,
                }

                // console.log("COMPLETE_FORM_DATA", completeFormData)

                setTimeout(() => {
                    // console.log("ya entrooo aqui")
                    updateDataToUser(completeFormData)
                    setIsSubmitting(false)
                    setIsRegistered(true)
                }, 2000)

            } else {
                const completeFormData = {
                    ...formData,
                    profile: "",
                    ...values,
                }
                setTimeout(() => {
                    updateDataToUser(completeFormData)
                    setIsSubmitting(false)
                    setIsRegistered(true)
                }, 2000)
            }
        } catch (error) {
            console.error("Error al subir la imagen o enviar el formulario:", error);
            alert("Ocurrió un error al guardar los datos. Por favor, intenta nuevamente.");
        }
    }

    async function uploadImage(userId: string, file: File): Promise<string> {
        // console.log("entro a subir imagen")
        if (!allowedFormats.includes(file.type)) {
            throw new Error("Formato de imagen no soportado");
        }
        // Obtener la firma desde el backend
        const signatureData = await getSignature(userId);
        // console.log("SIGNATURED: ", signatureData)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", signatureData.api_key);
        formData.append("timestamp", signatureData.timestamp);
        formData.append("signature", signatureData.signature);
        formData.append("public_id", userId); // Asegura que se guarde con el nombre "profiles/userId"
        formData.append("folder", "profilesPonte100");

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            // console.log("Respuesta de Cloudinary:", );

            if (!response.ok) {
                throw new Error(data.error?.message || "Error en la subida de la imagen");
            }

            if (data.secure_url) {
                return data.secure_url;
            } else {
                throw new Error("No se obtuvo la URL de la imagen");
            }
        } catch (error) {
            console.error("Error al subir la imagen a Cloudinary:", error);
            throw error;
        }
    }


    const updateDataToUser = async (completeFormData: any) => {
        if (session?.user?.userId) {
            await updatetUserdata(session?.user?.userId, completeFormData)
        } else {
            console.error("User ID is not available updateDataToUser");
        }
    }

    // Obtener la fortaleza de la contraseña actual
    const passwordValue = credentialsForm.watch("password")
    const passwordStrength = (passwordValue != "" && passwordValue != undefined) ? getPasswordStrength(passwordValue) : null

    // Si el registro se ha completado, mostrar mensaje de éxito
    if (isRegistered) {
        return (
            //usar un para hacerlo visible
            <div className="container mx-auto grid h-[50vh] items-center">
                <div className="mx-auto w-1/3 flex">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="h-50 w-50 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold">¡Registro Completado!</h3>
                        <p className="text-muted-foreground max-w-md">
                            Tus datos han sido actualizados exitosamente. Para ver los cambios reflejados. favor de volver a iniciar sesión. 
                        </p>
                        <Link href={"/inicio"}>
                            <button className="w-full bg-button text-xs md:text-base text-center text-white px-4 py-2 rounded transition-colors duration-300">
                                Volver al inicio
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        )
    }

    // Mostrar un spinner o mensaje de carga mientras se obtienen los datos
    if (loading) return <p className="text-center text-gray-500 pt-10">Cargando ...</p>

    return (
        <div className="flex flex-col">
            {/* Versión escritorio */}
            <section className="bg-postbanner py-10">
                <div className="lg:mx-20">
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="w-full lg:w-3/4">
                            <Tabs selectedIndex={tabIndex} onSelect={() => false} className="w-full">
                                <TabList className="grid w-full grid-cols-3 bg-gray-200 p-1 border-b-2 border-gray-200 rounded-lg mb-8">
                                    <Tab className={`p-3 text-sm md:text-xl text-center font-semibold transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none rounded-lg ${tabIndex === 0 ? "bg-white text-green-700 font-bold" : "text-gray-600"}`}>
                                        Mi perfil
                                    </Tab>
                                    <Tab className={`p-3 text-sm md:text-xl text-center font-semibold transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none rounded-lg ${tabIndex === 1 ? "bg-white text-green-700 font-bold" : "text-gray-600"}`}>
                                        Credenciales
                                    </Tab>
                                    <Tab className={`p-3 text-sm md:text-xl text-center font-semibold transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none rounded-lg ${tabIndex === 2 ? "bg-white text-green-700 font-bold" : "text-gray-600"}`}>
                                        Dirección
                                    </Tab>
                                </TabList>

                                {/* Paso 1: Información Personal */}
                                <TabPanel className={`p-2 ${tabIndex === 0 ? "block" : "hidden"}`}>

                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        // console.log("Submit capturado");
                                        personalForm.handleSubmit(onSubmitPersonal)(e);
                                    }} className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <Controller
                                                name="profile"
                                                control={personalForm.control}
                                                render={() => (
                                                    <div className="relative w-36 h-36 mx-auto">
                                                        <label className="cursor-pointer">
                                                            {preview ? (
                                                                <Image
                                                                    className="rounded-full object-cover border-4 border-green-700 w-full h-full"
                                                                    src={preview}
                                                                    width={150}
                                                                    height={150}
                                                                    alt="Foto de perfil"
                                                                />
                                                            ) : (
                                                                <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center">
                                                                    📷
                                                                </div>
                                                            )}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={handleImageChange}
                                                            />
                                                            <div className="absolute bottom-0 right-0 bg-green-600 text-white p-1 rounded-full shadow-md">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                                                                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                                                                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                                                </svg>
                                                            </div>
                                                        </label>
                                                    </div>
                                                )}
                                            />

                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Controller
                                                name="nombre"
                                                control={personalForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Nombre
                                                        </label>
                                                        <input
                                                            {...field}
                                                            placeholder="Tu nombre"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                name="apellidos"
                                                control={personalForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Apellidos
                                                        </label>
                                                        <input
                                                            {...field}
                                                            placeholder="Tus apellidos"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Controller
                                                name="grupo"
                                                control={personalForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Grupo
                                                        </label>
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            placeholder="Suboficiales de Armas"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                name="grado"
                                                control={personalForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Grado
                                                        </label>
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            placeholder="Tu grado"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div> */}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Controller
                                                name="dni"
                                                control={personalForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            DNI
                                                        </label>
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            pattern="[0-9]*"
                                                            inputMode="numeric"
                                                            maxLength={8}
                                                            placeholder="Tu DNI"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/\D/g, ""); // ❌ Elimina letras
                                                                field.onChange(value.slice(0, 8)); // 🔢 Máximo 8 números
                                                            }}
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                name="cip"
                                                control={personalForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            CIP
                                                        </label>
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            pattern="[0-9]*"
                                                            inputMode="numeric"
                                                            placeholder="Tu CIP"
                                                            maxLength={8}
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/\D/g, ""); // ❌ Elimina letras
                                                                field.onChange(value.slice(0, 8)); // 🔢 Máximo 8 números
                                                            }}
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Controller
                                                name="email"
                                                control={personalForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Email
                                                        </label>
                                                        <input
                                                            {...field}
                                                            placeholder="Tu email"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                name="fechaNacimiento"
                                                control={personalForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Fecha de nacimiento
                                                        </label>
                                                        <input
                                                            {...field}
                                                            type="date"
                                                            placeholder="Tu fecha de nacimiento"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                            value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                                            onChange={(e) => field.onChange(e.target.value ? e.target.value : null)}
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        <Controller
                                            name="genero"
                                            control={personalForm.control}
                                            render={({ field, fieldState }) => (
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Género
                                                    </label>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {["masculino", "femenino"].map((option) => (
                                                            <label key={option} className="flex items-center space-x-3">
                                                                <input
                                                                    type="radio"
                                                                    {...field} // 🔥 React Hook Form maneja `onChange` y `value`
                                                                    value={option}
                                                                    checked={field.value === option}
                                                                    className="form-radio"
                                                                />
                                                                <span className="font-normal capitalize">{option.replace("_", " ")}</span>
                                                            </label>
                                                        ))}
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <div className="pt-7">
                                            <button type="submit" className="w-full bg-button text-xs md:text-base text-center text-white px-4 py-2 rounded transition-colors duration-300">
                                                Continuar
                                            </button>
                                        </div>

                                    </form>
                                </TabPanel>

                                {/* Paso 2: Credenciales */}
                                <TabPanel value="credentials" className={`p-2 ${tabIndex === 1 ? "block" : "hidden"}`}>

                                    <form onSubmit={credentialsForm.handleSubmit(onSubmitCredentials)} className="space-y-4">
                                        <Controller
                                            name="username"
                                            control={credentialsForm.control}
                                            render={({ field, fieldState }) => (
                                                <div className="mb-4">
                                                    <label>Usuario</label>
                                                    <input placeholder="Nombre de usuario" {...field}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2" />
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />

                                        <Controller
                                            name="password"
                                            control={credentialsForm.control}
                                            render={({ field, fieldState }) => (
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Contraseña
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            {...field}
                                                            placeholder="Contraseña" type={showPassword ? "text" : "password"}
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2" />
                                                        <button
                                                            type="button"
                                                            // variant="ghost"
                                                            // size="icon"
                                                            className="absolute right-0 top-0 h-full px-3"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                                                </svg> :
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                </svg>
                                                            }
                                                        </button>
                                                    </div>
                                                    {(passwordValue && passwordStrength != null) && (
                                                        <div className="mt-2 space-y-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs">{passwordStrength.label}</span>
                                                                <span className="text-xs">{passwordStrength.strength}/5</span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full ${passwordStrength.color}`}
                                                                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <label className="block text-sm font-medium text-gray-400">
                                                        La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un
                                                        carácter especial.
                                                    </label>
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />

                                        <Controller
                                            name="confirmPassword"
                                            control={credentialsForm.control}
                                            render={({ field, fieldState }) => (
                                                <div className="mb-4">
                                                    <label>Confirmar Contraseña</label>
                                                    <div className="relative">
                                                        <input
                                                            {...field}
                                                            placeholder="Confirmar contraseña"
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                        />
                                                        <button
                                                            type="button"
                                                            // variant="ghost"
                                                            // size="icon"
                                                            className="absolute right-0 top-0 h-full px-3"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        >
                                                            {showConfirmPassword ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                                                </svg> :
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                </svg>
                                                            }
                                                        </button>
                                                    </div>
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />

                                        <Controller
                                            name="telefono"
                                            control={credentialsForm.control}
                                            render={({ field, fieldState }) => (
                                                <div className="mb-4">
                                                    <label>Teléfono</label>
                                                    <input placeholder="Número de teléfono" {...field}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2" />
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />

                                        <div className="flex justify-between pt-4">
                                            <button type="button" className=" w-1/4 border border-gray-300 text-xs md:text-base text-center text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300"
                                                // variant="outline" 
                                                onClick={() => setTabIndex(0)}>
                                                Atrás
                                            </button>
                                            <button type="submit" className=" w-1/4 bg-button text-xs md:text-base text-center text-white px-4 py-2 rounded transition-colors duration-300">
                                                Continuar
                                            </button>
                                        </div>
                                    </form>

                                </TabPanel>

                                {/* Paso 3: Dirección */}
                                <TabPanel value="address" className={`p-2 ${tabIndex === 2 ? "block" : "hidden"}`}>
                                    <form onSubmit={addressForm.handleSubmit(onSubmitAddress)} className="space-y-4">
                                        <Controller
                                            name="direccion"
                                            control={addressForm.control}
                                            render={({ field, fieldState }) => (
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                                                    <input
                                                        {...field}
                                                        placeholder="Calle, número, piso..."
                                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2" />
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Controller
                                                name="ciudad"
                                                control={addressForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">Ciudad</label>

                                                        <input
                                                            {...field}
                                                            placeholder="Ciudad"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2" />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />

                                            <Controller
                                                name="codigoPostal"
                                                control={addressForm.control}
                                                render={({ field, fieldState }) => (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                                                        <input
                                                            {...field}
                                                            placeholder="Código postal"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2" />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        <Controller
                                            name="provincia"
                                            control={addressForm.control}
                                            render={({ field, fieldState }) => (
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">Provincia</label>
                                                    <input
                                                        {...field}
                                                        placeholder="Provincia"
                                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2" />
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />

                                        <div className="flex justify-between pt-4">
                                            <button type="button" className=" w-1/4 border border-gray-300 text-xs md:text-base text-center text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300"
                                                onClick={() => setTabIndex(1)}>
                                                Atrás
                                            </button>
                                            <button type="submit" disabled={isSubmitting}
                                                className=" w-1/4 bg-button text-xs md:text-base text-center text-white px-4 py-2 rounded transition-colors duration-300"
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex items-center">
                                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8H4z"></path>
                                                        </svg>
                                                        Procesando...
                                                    </div>
                                                ) : (
                                                    "Completar Registro"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default function Registro() {
    return (
        <>
            <Inicio />

            <Personal />
        </>
    )
}