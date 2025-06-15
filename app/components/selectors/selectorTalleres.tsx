'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { fetchAllTalleres } from '@/app/lib/actions'

type Opcion = {
    idTaller: string
    nombreTaller: string
}

interface SelectorTalleresProps {
    onTallerSelect: (idTaller: string,) => void;
    selectedTallerId?: string;
}

export default function SelectorTalleres({ onTallerSelect, selectedTallerId }: SelectorTalleresProps) {
    const [talleres, setTalleres] = useState<Opcion[]>([])
    const [selected, setSelected] = useState<Opcion | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const selectorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (selectedTallerId === '') {
            setSelected(null);
        }
    }, [selectedTallerId]);

    // Cargar talleres desde el backend
    useEffect(() => {
        async function cargarTalleres() {
            try {
                const data = await fetchAllTalleres()
                const opcionesFormateadas: Opcion[] = [
                    { idTaller: '', nombreTaller: 'Selecciona un taller' }, // 👈 Placeholder
                    ...data.map((taller: any) => ({
                        idTaller: taller.idTaller,
                        nombreTaller: `${taller.nombreTaller}`,
                    })),
                ]
                setTalleres(opcionesFormateadas)
                setSelected(opcionesFormateadas[0])
            } catch (error) {
                console.error('Error al cargar los talleres:', error)
            }
        }
        cargarTalleres()
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

    const filteredOptions = talleres.filter((opcion) =>
        opcion.nombreTaller.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="relative w-72" ref={selectorRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-300 rounded-xl shadow-sm pl-4 pr-10 py-2 text-left cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
            >
                <span className="text-gray-700">{selected?.nombreTaller ?? 'Selecciona un taller'}</span>
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
                            placeholder="Buscar talleres..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Opciones filtradas */}
                    <ul className="max-h-60 overflow-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opcion) => (
                                <li
                                    key={opcion.idTaller}
                                    onClick={() => {
                                        setSelected(opcion)
                                        if (opcion.idTaller) {
                                            onTallerSelect(opcion.idTaller)
                                        }
                                        setIsOpen(false)
                                        setSearchTerm('')
                                    }}
                                    className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${selected?.idTaller === opcion.idTaller ? 'bg-blue-50 font-semibold' : ''
                                        }`}
                                >
                                    {opcion.nombreTaller}
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
