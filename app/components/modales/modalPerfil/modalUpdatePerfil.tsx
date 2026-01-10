import { createPerfil, updatePerfil } from "@/app/lib/actions"
import { AddPerfil } from "@/types/modalPerfil"
import { useState } from "react"

export const ModalUpdatePerfil = ({
  mode,
  perfil,
  onSuccess,
  onClose,
}: AddPerfil) => {

  const isEdit = mode === "edit"

  const [nombrePerfil, setNombrePerfil] = useState(
    perfil?.nombrePerfil ?? ""
  )
  const [errorRegister, setErrorRegister] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorRegister(null)

    if (!nombrePerfil.trim()) {
      setErrorRegister("El nombre es obligatorio")
      return
    }

    try {
      setLoading(true)

      if (isEdit && perfil) {
        const result = await updatePerfil(perfil.idPerfil, nombrePerfil)
        if (!result.ok) {
          setErrorRegister(result.message)
          // onClose()          
          return
        }
        onClose()
      } else {
        const result = await createPerfil(nombrePerfil)
        if (!result.ok) {
          setErrorRegister(result.message)
          // onClose()
          return
        }
        onClose()
      }

      onSuccess()
    } catch (error) {
      setErrorRegister("Ocurrió un error al guardar el perfil")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-3 lg:mx-0">
        <h2 className="text-xl font-bold mb-4 text-secondary">
          {isEdit ? "Editar Perfil" : "Crear Nuevo Perfil"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={nombrePerfil}
              onChange={(e) => setNombrePerfil(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              placeholder="Ingrese el nombre del perfil"
            />
          </div>

          {errorRegister && (
            <p className="text-red-500 text-sm mb-2">{errorRegister}</p>
          )}

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-button text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Enviar"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
