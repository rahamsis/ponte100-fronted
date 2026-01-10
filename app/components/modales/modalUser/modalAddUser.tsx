'use client'

/* eslint-disable */
import { useForm } from 'react-hook-form'
import { useState, useEffect } from "react"
import { AddingUser, getAllPerfiles, getGrados, updatetUserdata } from '@/app/lib/actions'
import { AddUser } from '@/types/modalUsuario'
import { FormData, Grado, Perfil, } from '@/types/users'
import { useSession } from 'next-auth/react'

export const ModalAddUser = ({
    mode,
    usuario,
    onSuccess,
    onClose,
}: AddUser) => {
    const { data: session, status } = useSession()

    const isEdit = mode === "edit"
    const isDisabled = usuario?.email === "rahamsiscg.95@gmail.com" && session?.user?.email !== "rahamsiscg.95@gmail.com";

    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset, //es util para resetear el formulario si es necesario
        setValue
    } = useForm<FormData>({
        defaultValues: isEdit && usuario ? {
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email,
            telefono: usuario.telefono,
            cip: usuario.cip,
            dni: usuario.dni,
            genero: usuario.genero,
            username: usuario.username,
            password: "",
        } : {}
    })

    const [grados, setGrados] = useState<Grado[]>([])
    const [perfiles, setPerfiles] = useState<Perfil[]>([])
    const [errorRegister, setErrorRegister] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "" }
    }, [])


    useEffect(() => {
        if (isEdit && usuario && grados.length > 0) {
            setValue("idGrado", usuario.idGrado)
        }
        if (isEdit && usuario && perfiles.length > 0) {
            setValue("idPerfil", usuario.idPerfil)
        }
    }, [isEdit, usuario, grados, perfiles, setValue])

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getGrados()
                setGrados(data)
            } catch (error) {
                console.error("Error obteniendo grados:", error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllPerfiles()
                setPerfiles(data)
            } catch (error) {
                console.error("Error obteniendo perfiles:", error)
            }
        }
        fetchData()
    }, [])

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true)
            setErrorRegister(null)

            const result = isEdit && usuario
                ? await updatetUserdata(usuario.userId, data)
                : await AddingUser(data)

            if (!result.ok) {
                setErrorRegister(result.message)
                return
            }

            onSuccess()
            onClose()

        } catch (error) {
            setErrorRegister("Ocurrió un error al guardar el usuario")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-3 lg:mx-0">

                <h2 className="text-xl font-bold mb-4 text-secondary">
                    {isEdit ? "Editar Usuario" : "Agregar Usuario"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                                        disabled={isDisabled}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                            ${errors.nombre ? 'border-red-500' : 'border-gray-300'}
                                            ${isDisabled && 'text-gray-400'}
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
                                        disabled={isDisabled}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                            ${errors.apellidos ? 'border-red-500' : 'border-gray-300'}
                                            ${isDisabled && 'text-gray-400'}
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
                                        disabled={isDisabled}
                                        autoComplete="email"
                                        onChange={() => setErrorRegister(null)}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2 
                                            ${errors.email ? 'border-red-500' : 'border-gray-300'}
                                            ${isDisabled && 'text-gray-400'}
                                        `}
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
                                        disabled={isDisabled}
                                        className={`block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500
                                         ${errors.genero ? 'border-red-500' : 'border-gray-300'}
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
                                        disabled={isDisabled}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        maxLength={8}
                                        // onChange={(e) => {
                                        //     const onlyNumbers = e.target.value.replace(/\D/g, '');
                                        //     e.target.value = onlyNumbers;
                                        // }}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                        ${errors.cip ? 'border-red-500' : 'border-gray-300'}
                                        ${isDisabled && 'text-gray-400'}
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
                                        disabled={isDisabled}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        maxLength={8}
                                        // onChange={(e) => {
                                        //     const onlyNumbers = e.target.value.replace(/\D/g, '');
                                        //     e.target.value = onlyNumbers;
                                        // }}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                            ${errors.dni ? 'border-red-500' : 'border-gray-300'}
                                            ${isDisabled && 'text-gray-400'}
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
                                        disabled={isDisabled}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        maxLength={9}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                            ${errors.telefono ? 'border-red-500' : 'border-gray-300'}
                                            ${isDisabled && 'text-gray-400'}
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
                                        {...register('idGrado', {
                                            required: 'Debe seleccionar un grado',
                                        })}
                                        disabled={isDisabled}
                                        className={`block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500
                                         ${errors.idGrado ? 'border-red-500' : 'border-gray-300'}
                                         `}
                                    >
                                        <option value="">Selecciona un grado</option>
                                        {grados.map((g) => (
                                            <option key={g.idGrado} value={g.idGrado}>
                                                {g.nombreGrado}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.idGrado && (
                                        <p className="text-red-500 text-sm mt-1">{String(errors.idGrado.message)}</p>
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
                                        placeholder="username"
                                        disabled={isDisabled}
                                        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-button p-2
                                            ${errors.apellidos ? 'border-red-500' : 'border-gray-300'}
                                            ${isDisabled && 'text-gray-400'}
                                        `}
                                    />
                                    {errors.username && <p className="text-red-500 text-sm mt-1">{String(errors.username.message)}</p>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    perfil
                                </label>

                                <div>
                                    <select
                                        {...register('idPerfil', {
                                            required: 'Debe seleccionar un perfil',
                                        })}
                                        disabled={isDisabled}
                                        className={`block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500
                                         ${errors.idPerfil ? 'border-red-500' : 'border-gray-300'}
                                         `}
                                    >
                                        <option value="">Selecciona un perfil</option>
                                        {perfiles.filter((p) => p.idPerfil !== "PF0001").map((perfil) => (
                                            <option key={perfil.idPerfil} value={perfil.idPerfil}>
                                                {perfil.nombrePerfil}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.idPerfil && (
                                        <p className="text-red-500 text-sm mt-1">{String(errors.idPerfil.message)}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow border-b my-2"></div>

                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="submit"
                            disabled={isDisabled || loading}
                            className={`bg-button text-white px-4 py-2 rounded
                                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Guardando..." : isEdit ? "Actualizar" : "Guardar"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancelar
                        </button>
                    </div>

                    {errorRegister && (
                        <p className="text-red-500 text-sm mt-2">{errorRegister}</p>
                    )}

                    {isDisabled && (
                        <p className="text-red-500 text-sm mt-2">No se puede editar este usuario, contacte al administrador del sistema</p>
                    )}
                </form>
            </div>
        </div>
    )
}
