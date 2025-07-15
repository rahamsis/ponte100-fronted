'use client'

/* eslint-disable */

import { EyeClosed, Eye } from "lucide-react";
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";
import { ResetPassword } from "@/app/lib/actions";

interface ModalResetPassword {
    userId: string;
    onClose: () => void;
}

export const ModalResetPassword = ({ userId, onClose }: ModalResetPassword) => {
    const { register, handleSubmit, formState: { errors }, watch, clearErrors } = useForm<{ password: string }>();
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmitForm = async (data: { password: string }) => {
        try {
            const payload = { ...data, userId }; // Combine password and userId
            const response = await ResetPassword(payload);

            if (response.ok) {
                onClose();
            } else {
                console.log("Error en la respuesta del backend:", response.error);
                alert("Error al resetear la contraseña. Por favor, inténtalo de nuevo.");
            }

        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-3 lg:mx-0">
                <div>
                    <h2 className="text-xl font-bold mb-4 text-secondary">Resetear contraseña</h2>
                </div>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="mb-4 w-full">
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
                            </div>
                            {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>
                                )}
                        </div>
                    </div>


                    <div className="flex-grow border-b my-6"></div>
                    <div className="flex justify-end space-x-4">
                        <button type="submit" className="bg-button text-white px-4 py-2 rounded">
                            Resetear
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};