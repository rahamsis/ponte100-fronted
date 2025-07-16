'use client'

/* eslint-disable */
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchAllTalleres, fetchAllTalleresByUserId, updateTalleresByUserId } from '@/app/lib/actions';

interface ModalAddTalleres {
    userId: string;
    nombre: string;
    onClose: () => void;
    // onUserTallerAdded: () => Promise<void>;
}

interface Taller {
    idTaller: string;
    nombreTaller: string;
}

export const ModalAddTalleres = ({ userId, nombre, onClose }: ModalAddTalleres) => {
    const { data: session } = useSession();
    const [talleres, setTalleres] = useState<Taller[]>([]);
    const [ready, setReady] = useState(false);

    const [estadoTalleres, setEstadoTalleres] = useState<Record<string, number>>({});

    useEffect(() => {
        const loadData = async () => {
            const t = await fetchAllTalleres();
            const tu = await fetchAllTalleresByUserId(userId);

            setTalleres(t);
            // setTalleresUsuario(tu);

            // Crear mapa con todos los talleres, asignando estado 1 o 0
            const asignados = tu.map((t: any) => String(t.idTaller));
            const mapaEstado: Record<string, number> = {};

            t.forEach((taller: any) => {
                const id = String(taller.idTaller);
                mapaEstado[id] = asignados.includes(id) ? 1 : 0;
            });

            setEstadoTalleres(mapaEstado);
            setReady(true);
        };
        loadData();
    }, [userId]);

    const toggleTaller = (id: string) => {
        setEstadoTalleres((prev) => ({
            ...prev,
            [id]: prev[id] === 1 ? 0 : 1,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        if (!session?.user?.userId) {
            console.error("User ID is not available");
            return;
        }

        // Convertir el estado a arreglo de objetos
        const datos = Object.entries(estadoTalleres).map(([idTaller, estado]) => ({
            idTaller,
            estado,
        }));

        await updateTalleresByUserId(userId, datos, session.user.userId);
        onClose(); // cerrar modal si deseas
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 lg:mx-0 ">
                <div>
                    <h2 className="text-xl font-bold mb-4 text-secondary">Agregar Talleres</h2>
                </div>

                {!ready ? (
                    <p className="text-gray-500">Cargando talleres...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Aquí va todo tu contenido como lo tenías */}
                        <p className="text-primary mb-4">
                            Selecciona los talleres para: <span className="font-semibold">{nombre}</span>
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                            {talleres.map((taller) => (
                                <div key={taller.idTaller} className="mb-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            value={taller.idTaller}
                                            checked={estadoTalleres[String(taller.idTaller)] === 1}
                                            onChange={() => toggleTaller(String(taller.idTaller))}
                                            className="form-checkbox h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-gray-700 text-lg">{taller.nombreTaller}</span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end space-x-4 mt-4">
                            <button type="submit" className="bg-button text-white px-4 py-2 rounded">
                                Enviar
                            </button>
                            <button onClick={onClose} className="px-4 py-2 border rounded-lg">
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};