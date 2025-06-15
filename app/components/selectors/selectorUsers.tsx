'use client'

/* eslint-disable */

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { fetchAllUsers } from '@/app/lib/actions'

type Opcion = {
    userId: string
    usuario: string
}

interface SelectorUsersProps {
    onUserSelect: (userId: string,) => void;
    selectedUserId?: string;
}

export default function SelectorUsers({ onUserSelect, selectedUserId }: SelectorUsersProps) {
    const [users, setUsers] = useState<Opcion[]>([])
    const [selected, setSelected] = useState<Opcion | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const selectorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (selectedUserId === '') {
            setSelected(null);
        }
    }, [selectedUserId]);

    // Cargar usuarios desde el backend
    useEffect(() => {
        async function cargarUsuarios() {
            try {
                const data = await fetchAllUsers()
                const opcionesFormateadas: Opcion[] = [
                    { userId: '', usuario: 'Selecciona un usuario' }, // 👈 Placeholder
                    ...data.map((user: any) => ({
                        userId: user.userId,
                        usuario: `${user.nombre} ${user.apellidos ?? ''}`,
                    })),
                ]
                setUsers(opcionesFormateadas)
                setSelected(opcionesFormateadas[0])
            } catch (error) {
                console.error('Error al cargar usuarios:', error)
            }
        }
        cargarUsuarios()
    }, [])

    // Cerrar el dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const filteredOptions = users.filter((opcion) =>
        opcion.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="relative w-72" ref={selectorRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-300 rounded-xl shadow-sm pl-4 pr-10 py-2 text-left cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
            >
                <span className="text-gray-700">{selected?.usuario ?? 'Selecciona un usuario'}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg">
                    {/* Buscador */}
                    <div className="flex items-center px-3 py-2 border-b">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            className="w-full border-none focus:outline-none text-sm text-gray-700"
                            placeholder="Buscar usuario..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Opciones filtradas */}
                    <ul className="max-h-60 overflow-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opcion) => (
                                <li
                                    key={opcion.userId}
                                    onClick={() => {
                                        setSelected(opcion)
                                        if (opcion.userId) {
                                            onUserSelect(opcion.userId)
                                        }
                                        setIsOpen(false)
                                        setSearchTerm('')
                                    }}
                                    className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${selected?.userId === opcion.userId ? 'bg-blue-50 font-semibold' : ''
                                        }`}
                                >
                                    {opcion.usuario}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-400 italic">Sin resultados</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
