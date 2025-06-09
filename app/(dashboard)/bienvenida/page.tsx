'use client';

import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { getGrados } from '../../lib/actions';

interface Grado {
  idGrado: string;
  nombreGrado: string;
}

export default function Bienvenida() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [grados, setGrados] = useState<Grado[]>([]);
  const [selectedGrado, setSelectedGrado] = useState('');

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

  function handleContinue() {
    router.push(`/bienvenida/${selectedGrado}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-12">
      {/* Imagen del escudo */}
      <Image
        src="/images/escudo.png"
        alt="Icono de bienvenida"
        width={80}
        height={80}
        className="mb-4"
      />

      {/* Texto de bienvenida */}
      <h1 className="text-xl font-bold text-center text-button mb-1">
        ¡Te damos la bienvenida, {session?.user?.name}!
      </h1>
      <p className="text-gray-700 text-center mb-8">
        Cuéntame un poco sobre ti para poder fijar tu objetivo.
      </p>

      {/* Selector de rango */}
      <div className="w-full max-w-md lg:max-w-2xl mb-6 lg:mb-24">
        <label htmlFor="idGrado" className="block text-sm font-medium text-primary mb-1">
          ¿Cuál es el grado al que desea ascender?
        </label>
        <select
          id="idGrado"
          value={selectedGrado}
          onChange={(e) => setSelectedGrado(e.target.value)}
          className="block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar</option>
          {grados.map((grado) => (
            <option key={grado.idGrado} value={grado.idGrado}>
              {grado.nombreGrado}
            </option>
          ))}
        </select>
      </div>

      {/* Botón de continuar */}
      <button
        disabled={!selectedGrado}
        onClick={handleContinue}
        className={`px-6 py-2 rounded-md text-white font-semibold transition-colors ${selectedGrado
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-green-200 cursor-not-allowed'
          }`}
      >
        Continuar
      </button>
    </div>
  );
}