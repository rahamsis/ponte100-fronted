"use client"

import { useState, useEffect, useCallback } from "react"
import Input from "@/app/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { fetchTemas } from "@/app/lib/actions"
import { Search, X } from "lucide-react"

interface Tema {
  idTema: string
  tema: string
}

interface SelectorOneProps {
  onThemeSelect: (themeId: string) => void
  className?: string
}

const SelectorOne = ({ onThemeSelect, className = "" }: SelectorOneProps) => {
  const [temas, setTemas] = useState<Tema[]>([])
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [selectedTema, setSelectedTema] = useState<Tema | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Obtener temas al montar el componente
  useEffect(() => {
    const loadTemas = async () => {
      try {
        setIsLoading(true)
        const data = await fetchTemas()
        setTemas(data)
      } catch (err) {
        setError("Error al cargar los temas")
        console.error("Error obteniendo los temas:", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadTemas()
  }, [])

  // Filtrar temas basados en la búsqueda
  const filteredTemas = useCallback(() => {
    if (!query) return temas
    return temas.filter(tema => 
      tema.tema.toLowerCase().includes(query.toLowerCase().trim())
    )
  }, [query, temas])

  // Manejar cambio en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (e.target.value === "") {
      setSelectedTema(null)
    }
  }

  // Seleccionar un tema
  const handleSelectTema = (tema: Tema) => {
    setSelectedTema(tema)
    setQuery(tema.tema)
    setIsFocused(false)
    onThemeSelect(tema.idTema)
  }

  // Limpiar selección
  const clearSelection = () => {
    setQuery("")
    setSelectedTema(null)
    setIsFocused(true)
    onThemeSelect("")
  }

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.2 },
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 }
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  }

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-12 ${className}`}>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-center text-red-500 p-4 ${className}`}>
        {error}
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar tema..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full h-12 pl-3 pr-10 text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            {query ? (
              <button
                onClick={clearSelection}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            ) : (
              <Search size={18} className="text-gray-400" />
            )}
          </div>
        </div>

        <AnimatePresence>
          {isFocused && !selectedTema && (
            <motion.div
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {filteredTemas().length > 0 ? (
                <motion.ul className="max-h-60 overflow-y-auto">
                  {filteredTemas().map(tema => (
                    <motion.li
                      key={tema.idTema}
                      variants={itemVariants}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleSelectTema(tema)}
                    >
                      <span className="text-gray-800">{tema.tema}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div 
                  className="px-4 py-2 text-gray-500 text-center"
                  variants={itemVariants}
                >
                  No se encontraron temas
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SelectorOne