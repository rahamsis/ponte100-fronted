'use client'

/* eslint-disable */
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";
import { EyeClosed, Eye } from "lucide-react";
import { AddingUser, getGrados } from '@/app/lib/actions';

interface ModalAddUser {
    onClose: () => void;
    extra: string;
    onUserAdded: () => Promise<void>;
    // router?: any;
}

interface Grado {
    idGrado: string;
    nombreGrado: string;
}

interface FormData {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    cip: string;
    dni: string;
    grado: string;
    genero: string;
    username: string;
    password: string;
}

export const ModalAddUser = ({ onClose, onUserAdded, extra }: ModalAddUser) => {
    const { register, handleSubmit, formState: { errors }, watch, clearErrors } = useForm<FormData>();
    const emailValue = watch('email');
    const gradoSeleccionado = watch("grado");
    const [grados, setGrados] = useState<Grado[]>([]);
    const [showPassword, setShowPassword] = useState(false)
    const [errorRegister, setErrorRegister] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden"; // Bloquea scroll
        return () => {
            document.body.style.overflow = ""; // Lo restaura cuando se cierra
        };
    }, []);

    useEffect(() => {
        if (emailValue) {
            clearErrors('email'); // ❌ Borra el error al escribir algo
        }
    }, [emailValue]);

    useEffect(() => {
        if (gradoSeleccionado) {
            clearErrors("grado");
        }
    }, [gradoSeleccionado]);

    // llenar los grados
    useEffect(() => {
        async function fetchData() {
            try {
                // const data = await getTemas();
                const data = await getGrados();

                setGrados(data);
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            }
        }
        fetchData();
    }, []);

    const handleSubmitForm = async (data: FormData) => {
        console.log("Datos del formulario:", data);
        try {
            const response = await AddingUser(data);

            if (!response?.ok) {
                // console.error("Error en la respuesta del backend:", response.error);
                // alert("Error al agregar el usuario: " + response.error);
                setErrorRegister(response.message)
            } else {
                onUserAdded();
                onClose();
            }

        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-3 lg:mx-0 ">
                <div>
                    <h2 className="text-xl font-bold mb-4 text-secondary">Agregar Usuario</h2>
                </div>

                <form onSubmit={handleSubmit(handleSubmitForm)} >
                    <div className='overflow-y-auto max-h-[70vh]'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <div>
                                    <input
                                        {...register('nombre', { required: 'Este campo es obligatorio' })}
                                        placeholder="Nombre"
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                    ${errors.nombre ? 'border-red-500' : 'border-gray-300'}
                                    `}
                                    />
                                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{String(errors.nombre.message)}</p>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Apellidos
                                </label>
                                <div>
                                    <input
                                        {...register('apellidos', { required: 'Este campo es obligatorio' })}
                                        placeholder="Apellidos"
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                        ${errors.apellidos ? 'border-red-500' : 'border-gray-300'}
                                    `}
                                    />
                                    {errors.apellidos && <p className="text-red-500 text-sm mt-1">{String(errors.apellidos.message)}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Correo
                                </label>
                                <div>
                                    <input
                                        {...register("email", {
                                            required: "Este campo es obligatorio",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Correo inválido"
                                            }
                                        })}
                                        type="email"
                                        placeholder="email"
                                        autoComplete="email"
                                        onChange={() => setErrorRegister(null)}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2 
                                        ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`
                                        }
                                    />
                                    {errors.email?.message && (
                                        <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Genero
                                </label>
                                <div>
                                    <select
                                        {...register('genero', {
                                            required: 'Debe seleccionar un genero',
                                        })}
                                        defaultValue=""
                                        className={`block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500
                                        ${errors.grado ? 'border-red-500' : 'border-gray-300'}
                                        `}
                                    >
                                        <option value="">Selecciona un género</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                    </select>
                                    {errors.genero && <p className="text-red-500 text-sm mt-1">{String(errors.genero.message)}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    CIP
                                </label>
                                <div>
                                    <input
                                        {...register('cip', {
                                            required: 'Campo obligatorio',
                                            pattern: {
                                                value: /^[0-9]{6,8}$/,
                                                message: 'Solo números (6-8 dígitos)',
                                            }
                                        })}
                                        type="text"
                                        placeholder="CIP"
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        maxLength={8}
                                        // onChange={(e) => {
                                        //     const onlyNumbers = e.target.value.replace(/\D/g, '');
                                        //     e.target.value = onlyNumbers;
                                        // }}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                    ${errors.cip ? 'border-red-500' : 'border-gray-300'}
                                    `}
                                    />
                                    {errors.cip && <p className="text-red-500 text-sm mt-1">{String(errors.cip.message)}</p>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    DNI
                                </label>
                                <div>
                                    <input
                                        {...register('dni', {
                                            required: 'Campo obligatorio',
                                            pattern: {
                                                value: /^[0-9]{8}$/,
                                                message: 'Debe tener 8 números',
                                            }
                                        })}
                                        type="text"
                                        placeholder="DNI"
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        maxLength={8}
                                        // onChange={(e) => {
                                        //     const onlyNumbers = e.target.value.replace(/\D/g, '');
                                        //     e.target.value = onlyNumbers;
                                        // }}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                    ${errors.dni ? 'border-red-500' : 'border-gray-300'}
                                    `}
                                    />
                                    {errors.dni && <p className="text-red-500 text-sm mt-1">{String(errors.dni.message)}</p>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Telefono
                                </label>
                                <div>
                                    <input
                                        {...register('telefono', {
                                            required: 'Campo obligatorio',
                                            pattern: {
                                                value: /^[0-9]{9}$/,
                                                message: 'Debe tener 9 números',
                                            }
                                        })}
                                        type="text"
                                        placeholder="Telefono"
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        maxLength={9}
                                        // onChange={(e) => {
                                        //     const onlyNumbers = e.target.value.replace(/\D/g, '');
                                        //     e.target.value = onlyNumbers;
                                        // }}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                    ${errors.telefono ? 'border-red-500' : 'border-gray-300'}
                                    `}
                                    />
                                    {errors.telefono && <p className="text-red-500 text-sm mt-1">{String(errors.telefono.message)}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 w-full">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Grado
                                </label>
                                <div>
                                    <select
                                        {...register('grado', {
                                            required: 'Debe seleccionar un grado',
                                        })}
                                        defaultValue=""
                                        className={`block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500
                                        ${errors.grado ? 'border-red-500' : 'border-gray-300'}
                                        `}
                                    >
                                        <option value="">Selecciona un grado</option>
                                        {grados.map((grado) => (
                                            <option key={grado.idGrado} value={grado.idGrado}>
                                                {grado.nombreGrado}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.grado && (
                                        <p className="text-red-500 text-sm mt-1">{String(errors.grado.message)}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div>
                                    <input
                                        {...register('username', { required: 'Este campo es obligatorio' })}
                                        placeholder="Username"
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                        ${errors.apellidos ? 'border-red-500' : 'border-gray-300'}
                                    `}
                                    />
                                    {errors.username && <p className="text-red-500 text-sm mt-1">{String(errors.username.message)}</p>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("password", { required: "Este campo es obligatorio" })}
                                        placeholder="Contraseña"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="password"
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2 
                                        ${errors.password ? 'border-red-500' : 'border-gray-300'
                                            }`
                                        }
                                    />
                                    <button
                                        type="button"
                                        // variant="ghost"
                                        // size="icon"
                                        className="absolute right-0 top-0 h-full px-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeClosed /> : <Eye />}
                                    </button>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow border-b my-2"></div>

                    <div className="flex justify-end space-x-4">
                        <button type="submit" className="bg-button text-white px-4 py-2 rounded">
                            Enviar
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                    </div>

                    {errorRegister && (
                        <p className="text-red-500 text-sm mt-2">{errorRegister}</p>
                    )}
                </form>
            </div>
        </div>
    );
};