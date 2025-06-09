"use client"

import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function UserMenu() {
  const { data: session, status } = useSession();

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null); // Referencia al menú

  const [deviceType, setDeviceType] = useState("");

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Cierra el menú si el clic fue fuera
      }
    };

    // Agregar el event listener cuando el menú está abierto
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Limpiar el event listener cuando el componente se desmonta o el menú se cierra
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Solo se ejecuta cuando `isOpen` cambia

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();

      if (/mobile|android|iphone|ipod/i.test(userAgent)) {
        setDeviceType('celular');
      } else if (/ipad|tablet/i.test(userAgent) || (width >= 768 && width < 1024)) {
        setDeviceType('tablet');
      } else if (width >= 1024 && width < 1440) {
        setDeviceType('laptop');
      } else {
        setDeviceType('PC');
      }
    };

    detectDevice();

    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  return (
    <div className="relative " ref={menuRef}>
      <div className="flex">
        <button onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-primary hover:text-green-600 transition-colors duration-200 ease-in-out"
        >
          {session?.user?.image?.length != undefined && session?.user?.image?.length > 0 ?
            <div className="relative w-10 h-10">
              <Image
                className="rounded-full object-cover border-2 border-green-700 w-full h-full"
                src={session!.user!.image}
                width={150}
                height={150}
                alt="Foto de perfil"
              />
            </div>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
          }

        </button>
      </div>


      {isOpen && (
        <div className={`absolute ${deviceType === "PC" ? "right-0" : "-right-10"} mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-0`}>
          <div className="">
            {session?.user?.image?.length != undefined && session?.user?.image?.length > 0 ?
              <div className="relative w-16 h-16 mx-auto">
                <Image
                  className="rounded-full object-cover border-2 border-button w-full h-full"
                  src={session!.user!.image}
                  width={60}
                  height={60}
                  alt="Foto de perfil"
                />
              </div>
              :
              <div className="relative w-16 h-16 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-circle mx-auto" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
              </div>
            }
          </div>
          {/* nombre usuario */}
          <div className=" items-center text-center font-bold text-2xl text-button">
            {
              status === "authenticated" && session!.user!.name
            }
          </div>

          <a href="/registro" className="block px-4 py-2 text-sm md:text-xl text-primary hover:bg-blue-100 rounded-md transition-all duration-200 ease-in-out">
            Modificar perfil
          </a>
          <button
            onClick={() => {
              signOut();
              setIsOpen(false);
              // router.push("/");

            }}
            className="block w-full px-4 py-2 text-sm md:text-xl text-primary hover:bg-blue-100 rounded-md transition-all duration-200 ease-in-out"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>

  )
}