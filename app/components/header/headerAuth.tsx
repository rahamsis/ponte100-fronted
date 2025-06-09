'use client'

/* eslint-disable */

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/app/providers";

import UserMenu from "../userMenu/userMenu";

const HeaderAuth = () => {
    const { isOpen, toggleSidebar, showHeaderContent } = useSidebar()
    
    const pathName = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const [deviceType, setDeviceType] = useState("");

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
        <React.Fragment>
            <nav className={`flex ${menuOpen ? "flex-col" : ""} border border-b-2 justify-between lg:justify-end px-5 py-3 bg-web fixed top-0 left-0 w-full z-40`}>
                <div className={`flex items-center lg:hidden ${menuOpen ? 'items-center mx-auto' : 'block'}`}>
                    <Link className="flex items-center" href="/actividades">
                        <div className="text-[32px] font-bold text-gray-800">
                            {deviceType === "celular" ? (
                                <Image src="/assets/logo.png" height={20} width={40} alt="Logo" style={{ height: 'auto' }} priority />
                            ) : (
                                <Image src="/assets/logo.png" height={60} width={60} alt="Logo" style={{ height: 'auto' }} priority />
                            )}
                        </div>
                        <div className="overflow-hidden ml-2">
                            <span className="font-bold text-lg md:text-4xl text-green-800 font-sans inline-block transition-transform duration-300 ease-in-out">
                                <div className="flex">
                                    PONTE100
                                    <span className="top-0 text-base">
                                    </span>
                                </div>
                                <div className="leading-[1px] md:leading-[10px]">
                                    <span className="text-[9.5px] md:text-sm md:tracking-[0.2rem]">MÉTODO DE ESTUDIO</span>
                                </div>
                            </span>
                        </div>
                    </Link>
                </div>

                <div id="show-button" className={`lg:flex flex-row space-x-4 cursor-pointer hidden mr-14`} >
                    {/* icono notificaciones */}
                    <button className={`text-gray-600 hover:text-green-800`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                    </button>
                    {/* menu usuario */}
                    <div className={`text-center ml-5`}>
                        <UserMenu />
                    </div>
                </div>

                {/* notificaciones, usuario y hamburguesa - moviles */}
                <div id="show-button" className={`order-1 flex space-x-4 cursor-pointer items-center lg:order-1 lg:hidden`} >
                    {/* icono notificaciones */}
                    <button className={`text-gray-600 hover:text-green-800 ${isOpen ? 'hidden' : 'block'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                    </button>
                    {/* menu usuario */}
                    <div className={`text-center ml-5 ${isOpen ? 'hidden' : 'block'}`}>
                        <UserMenu />
                    </div>
                    {/* icono hamburguesa  */}
                    {/* <button onClick={toggleMenu} className="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button> */}
                    <button onClick={toggleSidebar} className="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                </div>

                {/* icono cerrar x  */}
                {/* <div id="hide-button" onClick={toggleMenu}
                    className={`absolute top-4 right-4 cursor-pointer z-50 ${deviceType === "PC" ? "hidden" : ""} ${menuOpen ? 'block' : 'hidden'}`}   
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </div> */}


                {/* Menú de navegación */}
                {/* <ul id="nav-menu" className={`order-2 w-full flex-[0_0_100%] ${deviceType === "PC" ? "hidden" : ""} ${menuOpen ? 'block' : 'hidden'}`}>
                    <li className="text-center">
                        <div className="lg:inline w-72 mx-auto">
                            <Link href="/main" className={`active block p-3 py-2 text-base text-gray-900 ${pathName === '/main' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                onClick={toggleMenu}>
                                Principal
                            </Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="lg:inline w-72 mx-auto">
                            <Link href="/actividades" className={`active block p-3 py-2 text-base text-gray-900 ${pathName === '/actividades' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                onClick={toggleMenu}>
                                Actividades Académicas
                            </Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="lg:inline w-72 mx-auto">
                            <Link href="/nosotros" className={`block p-3 py-2 text-base text-gray-900 ${pathName === '/nosotros' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                onClick={toggleMenu}>
                                Sobre Nosotros
                            </Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="lg:inline w-72 mx-auto">
                            <Link href="/contactanos" className={`block p-3 py-2 text-base text-gray-900 ${pathName === '/contactanos' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                onClick={toggleMenu}>
                                Contacto
                            </Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="lg:inline w-72 mx-auto">
                            <Link href="/libros" className={`block p-3 py-2 text-base text-gray-900 ${pathName === '/libros' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                onClick={toggleMenu}>
                                Material Didactico
                            </Link>
                        </div>
                    </li>

                </ul> */}
            </nav>

        </React.Fragment>

    )
}

export default HeaderAuth;