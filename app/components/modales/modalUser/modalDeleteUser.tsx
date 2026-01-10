import { deleteUsuario } from "@/app/lib/actions"
import { DeleteUsuario } from "@/types/modalUsuario"
import { useState } from "react"

export const ModalDeleteUser = ({
  usuario,
  onSuccess,
  onClose,
  onError,
}: DeleteUsuario) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    const result = await deleteUsuario(usuario!.userId)

    setLoading(false)

    if (!result.ok) {
      onClose()
      onError(result.message)
      return
    }

    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-3 lg:mx-0">
        <div className="flex justify-center pt-2 pb-6 text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
          </svg>
        </div>

        <div className="flex justify-center text-gray-800">
          <p>¿Estás seguro de eliminar el usuario <b>{usuario?.nombre}{" "} {usuario?.apellidos}</b>?</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mt-2">Se eliminará todo lo relacionado al usuario:</p>
          <p className="text-sm text-gray-500 mt-2">- Preguntas fallidas</p>
          <p className="text-sm text-gray-500 mt-2">- Preguntas correctas</p>
          <p className="text-sm text-gray-500 mt-2">- Preguntas sin responder</p>
          <p className="text-sm text-gray-500 mt-2">- Progreso en actividades</p>
          <p className="text-sm text-gray-500 mt-2">- talleres realizados</p>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-button text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>

        <div>
          <p className="text-xs text-red-500 mt-2">Esta acción no se puede deshacer!!.</p>
        </div>
      </div>
    </div>
  )
}
