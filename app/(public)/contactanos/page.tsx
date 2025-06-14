import Image from "next/image";

function Content() {
    return (
        <div className="flew fw-full flex flex-col-reverse lg:flex-row justify-center min-h-screen">
            <div className="w-full lg:w-3/4 bg-primary">
                {/* izquierda */}
                <Image className="hidden lg:block absolute left-0 top-[10%] xl:top-[15%] 2xl:top-[10%]" src="/assets/frames/frame.png" width="103" height="98" alt="" priority />
                <Image className="hidden lg:block absolute left-0 top-[60%] xl:top-[80%] 2xl:top-[70%]" src="/assets/frames/frame.png" width="103" height="98" alt="" priority />

                {/* Medio */}
                <Image className="hidden lg:block absolute left-1/2 2xl:left-[57%] top-[60%] xl:top-[70%] 2xl:top-[50%]" src="/assets/frames/frame.png" width="103" height="98" alt="" priority />

                {/* Derecha */}
                <Image className="hidden lg:block absolute right-0 top-[10%] xl:top-[15%] 2xl:top-[10%]" src="/assets/frames/frame.png" width="103" height="98" alt="" priority />
                <Image className="hidden lg:block absolute right-0 top-[40%] xl:top-[60%] 2xl:top-[60%]" src="/assets/frames/frame.png" width="103" height="98" alt="" priority />

                <div className="flex justify-center mx-6 lg:mx-0">
                    <div className="w-full lg:w-1/2 py-10 lg:py-28">

                        <div className="text-white">
                            <h1 className="font-bold text-xl lg:text-3xl">Ponte en contacto</h1>
                            <h1 className="font-bold text-lg lg:text-3xl">con nosotros</h1>
                        </div>

                        <div className="flex flex-row items-center pt-10">
                            <div className="text-terciary w-16 h-16 rounded-full bg-terciary bg-opacity-10 flex items-center">
                                <div className="mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="pl-7">
                                <div className="text-white font-bold text-lg">
                                    Correo
                                </div>
                                <div className="text-white font-medium text-base">
                                    Ponte100@gmail.com
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row items-center pt-10">
                            <div className="text-terciary w-16 h-16 rounded-full bg-terciary bg-opacity-10 flex items-center">
                                <div className="mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="pl-7">
                                <div className="text-white font-bold text-lg">
                                    Celular
                                </div>
                                <a href="tel:+51933123949" className="text-white font-medium text-base">
                                    +51 933 123 949
                                </a>
                            </div>
                        </div>

                        <div className="pt-10">
                            <div className="py-4 ">
                                <h1 className="text-white text-lg font-bold">Siguenos:</h1>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-white w-12 h-12 rounded-full bg-terciary bg-opacity-5 flex items-center">
                                    <a href="https://www.facebook.com/share/1BnJ3MjZq4/?mibextid=wwXIfr" target="_blank" className="mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="pl-6">
                                    <div className="text-white w-12 h-12 rounded-full bg-terciary bg-opacity-5 flex items-center">
                                        <a href="https://www.instagram.com/metodoponte100?igsh=MW51ZDdudXVtbDRtcg==" target="_blank" className="mx-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="px-6">
                                    <div className="text-white w-12 h-12 rounded-full bg-terciary bg-opacity-5 flex items-center">
                                        <a href="https://www.tiktok.com/@metodoponte100?_t=ZM-8wgHyUnBF9Z&_r=1" target="_blank" className="mx-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
                                                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-white w-12 h-12 rounded-full bg-terciary bg-opacity-5 flex items-center">
                                        <a href="https://x.com/metodoponte100?s=21&t=HprwhaRQY8eCCTUjoNO7RA" target="_blank" className="mx-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/4 bg-white">
                <div className="w.full mx-6 lg:w-[450px] lg:-left-12 lg:-ml-56 bg-white border-gray-300 border my-10 lg:my-20 rounded-2xl">
                    <form className="p-10">
                        <div className="py-4">
                            <label className="text-button text-xl font-bold"> Déjanos un mensaje</label>
                        </div>
                        <div className="mb-5">
                            <label className="mb-2 block text-primary font-bold">Nombre</label>
                            <input className="h-[60px] w-full rounded-lg border border-gray-200 text-primary  focus:outline-none focus:border-button px-2" type="text" id="name" placeholder="Ingrese su nombre" />
                        </div>
                        <div className="form-group mb-5">
                            <label className="mb-2 block text-primary font-bold">Correo electrónico</label>
                            <input className="h-[60px] w-full rounded-lg border border-gray-200 text-primary focus:outline-none focus:border-button px-2" type="text" id="email" placeholder="Ingrese su correo " />
                        </div>
                        <div className="form-group mb-5">
                            <label className="mb-2 block text-primary font-bold">Paquetes</label>
                            <select name="reason" id="reason" className="h-[60px] w-full rounded-lg border border-gray-200  pr-10">
                                <option value="">Selecciona </option>
                                <option value="plan1">Productos Individuales</option>
                                <option value="plan2">Paquete Personalizado</option>
                                <option value="plan3">Paquete básico</option>
                                <option value="plan4">Paquete estándar</option>
                                <option value="plan5">Paquete medium</option>
                                <option value="plan6">Paquete gold</option>
                                <option value="plan7">Paquete platinium</option>
                                <option value="plan8">Paquete premium</option>
                            </select>
                        </div>
                        <div className="form-group mb-5">
                            <label className="mb-2 block text-primary font-bold">Mensaje</label>
                            <textarea className="w-full rounded-[0.5rem] border border-gray-200 text-primary h-24 focus:outline-none focus:border-button px-2" id="message" cols={30} rows={10}></textarea>
                        </div>
                        <input className="h-12 px-8 py-2 text-sm leading-9 cursor-pointer rounded-lg text-center font-medium text-white bg-button2 btn-primary block w-1/2" type="submit" value="Enviar Mensaje" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default function contactanos() {
    return (
        <>
            <Content />
        </>
    )
}