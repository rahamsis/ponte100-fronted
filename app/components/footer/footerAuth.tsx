import { Heart } from "lucide-react"

export default function FooterAuth() {
    return (

        <footer className="bg-black py-4 px-4 md:px-6 w-full border-t">
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">


                    <p className=" lg:ml-36 text-white text-sm text-center flex flex-row">
                        &copy; {new Date().getFullYear()} <span className="flex flex-row">Método Ponte 100<span className="text-xs">TM</span>. Todos los derechos reservados.</span>
                    </p>
                    <div className="flex items-center text-sm text-white">
                        Diseñado con <Heart className="h-4 w-4 mx-1 text-red-500" /> por Rahamsis CG.
                    </div>

                    {/* <div className="text-white text-sm text-center md:text-left">
                        <div>
                            <h3 className="text-lg font-semibold">
                                <div className="flex text-2xl">PONTE100
                                    <span className=" top-0  text-base">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-r-circle" viewBox="0 0 16 16">
                                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h3.11c1.71 0 2.741.973 2.741 2.46 0 1.138-.667 1.94-1.495 2.24L11.5 12H9.98L8.52 8.924H6.836V12H5.5zm1.335 1.09v2.777h1.549c.995 0 1.573-.463 1.573-1.36 0-.913-.596-1.417-1.537-1.417z" />
                                        </svg>
                                    </span>
                                </div>
                            </h3>
                            <p className="text-white text-xs">MÉTODO DE ESTUDIO</p>
                        </div>
                        <div className="pt-6">
                        <p>&copy; {new Date().getFullYear()} Ponte100. Todos los derechos reservados.</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/nosotros" className="text-white hover:text-white">
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/contactanos" className="text-white hover:text-white">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="relative">
                        <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
                        <p className="text-white">Email: info@ponte100.com</p>
                        <a className="text-white" href="tel:+51933123949">Teléfono: +51 933 123 949</a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}