import Link from "next/link"
import Image from "next/image";

function Footer3() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
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
            <div>
              <div className="pt-6 text-white hidden md:block">
                <p>&copy; {new Date().getFullYear()} Ponte100. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {/* <li>
                <Link href="/actividades" className="text-white hover:text-white">
                  Actividades Académicas
                </Link>
              </li> */}
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
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-white">Email: info@ponte100.com</p>
            <a className="text-white" href="tel:+51933123949">Teléfono: +51 933 123 949</a>
            {/* <p className="text-white" >juegos xd</p> */}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-white lg:hidden">
          <p>&copy; {new Date().getFullYear()} Ponte100. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function Footer1() {
  return (
    <footer className="footer-section-wrapper bg-white print:hidden">
      <div className="container max-w-screen-x mx-auto md:px-6 pt-[56px]">
        <div className="w-full flex flex-col items-center mb-[50px]">
          <div className="mb-[40px]">
            <a href="/">
              <Image width="152" height="36" src="/assets/logo.svg" alt="logo" />
            </a>
          </div>
          <div className="w-full h-[1px] bg-[#E9E9E9]"></div>
        </div>

        <div className="lg:flex justify-between mb-[50px]">
          <div className="lg:w-[424px]  ml-0 w-full mb-10 lg:mb-0">
            <h1 className="text-[18] font-medium text-[#2F2F2F] mb-5">About Us</h1>
            <p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">
              We know there are a lot of threa developers our but we pride into
              a firm in the industry.
            </p>
          </div>
          <div className="flex-1 lg:flex">
            <div className="lg:w-1/3 w-full mb-10 lg:mb-0">
              <div className="mb-5">
                <h6 className="text-[18] font-medium text-[#2F2F2F]">Feature</h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-4 ">
                  <li>
                    <a href="/about">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        About Us
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/terms-condition">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Terms Condition
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/all-products">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Best Products
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-medium text-[#2F2F2F]">
                    General Links
                  </h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <a href="/blogs">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Blog
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/tracking-order">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Tracking Order
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/become-saller">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Become Seller
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-medium text-[#2F2F2F]">Helpful</h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <a href="/flash-sale">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Flash Sale
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/faq">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          FAQ
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/about">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Support
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
          <div className="flex lg:space-x-5 justify-between items-center mb-3">
            <div className="flex space-x-5 items-center">
              <a href="#">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="fill-current text-qgray hover:text-qblack"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.1016 4.90039C12.6538 4.90039 13.1016 4.45268 13.1016 3.90039C13.1016 3.34811 12.6538 2.90039 12.1016 2.90039C11.5493 2.90039 11.1016 3.34811 11.1016 3.90039C11.1016 4.45268 11.5493 4.90039 12.1016 4.90039Z"></path>
                  <path d="M8 12C5.8 12 4 10.2 4 8C4 5.8 5.8 4 8 4C10.2 4 12 5.8 12 8C12 10.2 10.2 12 8 12ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6Z"></path>
                  <path d="M12 16H4C1.9 16 0 14.1 0 12V4C0 1.9 1.9 0 4 0H12C14.1 0 16 1.9 16 4V12C16 14.1 14.1 16 12 16ZM4 2C3.1 2 2 3.1 2 4V12C2 13 3 14 4 14H12C12.9 14 14 12.9 14 12V4C14 3.1 12.9 2 12 2H4Z"></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  className="fill-current text-qgray hover:text-qblack"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z"></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  className="fill-current text-qgray hover:text-qblack"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.8 2.8C15.6 1.5 15 0.6 13.6 0.4C11.4 8.9407e-08 8 0 8 0C8 0 4.6 8.9407e-08 2.4 0.4C1 0.6 0.3 1.5 0.2 2.8C0 4.1 0 6 0 6C0 6 0 7.9 0.2 9.2C0.4 10.5 1 11.4 2.4 11.6C4.6 12 8 12 8 12C8 12 11.4 12 13.6 11.6C15 11.3 15.6 10.5 15.8 9.2C16 7.9 16 6 16 6C16 6 16 4.1 15.8 2.8ZM6 9V3L11 6L6 9Z"></path>
                </svg>
              </a>
            </div>
            <span className="sm:text-base text-[10px] text-qgray font-light">
              ©2022
              <a
                href="https://quomodosoft.com/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-qblack mx-1"
              >
                Quomodosoft
              </a>
              All rights reserved
            </span>
          </div>
          <div className="">
            <a href="#">
              <Image
                width="318"
                height="28"
                src="/assets/payment-getways.png"
                alt="payment-getways"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Footer2() {
  return (
    <footer className="footer bg-theme-light/50">
      <div className="mx-auto max-w-[1202px]  px-3">
        <div className="flex flex-wrap mt-0 gx-5 pb-10 pt-[52px]">
          <div className="px-6 w-full mt-12 md:w-1/2 lg:w-1/4">
            <a href="index.html">
              <Image src="/assets/logo.png" height={20} width={50} alt="Logo" style={{ height: 'auto' }} priority />
            </a>
            <p className="mt-6 text-sm text-gray-500">
              Expertos en pulir pisos para devolverles su brillo original. Transformamos
              tus espacios con habilidad y dedicación. ¡Pisos pulidos, vida renovada al instante!
            </p>
          </div>
          <div className="px-6 w-full mt-12 md:w-1/2 lg:w-1/4">
            <h6 className="mb-8 font-semibold">Redes sociales</h6>
            <p className="text-sm text-gray-500">terrazoymarmol@gmail.com</p>
            <ul className="-ml-2 mt-2  md:mt-4 lg:mt-6">
              <li className="inline-block m-2 leading-1">
                <a className="text-sm inline-flex w-11 h-11 items-center justify-center rounded-full bg-white text-center" href="#">
                  <svg width="19" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.1056 10.4495C19.1056 5.09642 15 0.759277 9.9327 0.759277C4.86539 0.759277 0.759766 5.09642 0.759766 10.4495C0.759766 15.2946 4.08865 19.3191 8.49018 20.0224V13.2627H6.15996V10.4495H8.49018V8.33951C8.49018 5.91696 9.85872 4.54939 11.93 4.54939C12.9657 4.54939 14.0013 4.74476 14.0013 4.74476V7.12823H12.8547C11.7081 7.12823 11.3382 7.87063 11.3382 8.65209V10.4495H13.8904L13.4835 13.2627H11.3382V20.0224C15.7398 19.3191 19.1056 15.2946 19.1056 10.4495Z" fill="#222222"></path>
                  </svg>
                </a>
              </li>
              <li className="inline-block m-2 leading-1">
                <a className="text-sm inline-flex w-11 h-11 items-center justify-center rounded-full bg-white text-center" href="#">
                  <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3308 3.92621C17.0129 3.42889 17.6269 2.83209 18.1044 2.13583C17.4904 2.40108 16.7742 2.60001 16.0579 2.66632C16.8083 2.2353 17.354 1.5722 17.6269 0.743317C16.9447 1.14118 16.1603 1.43958 15.3758 1.60535C14.6937 0.909093 13.7728 0.51123 12.7496 0.51123C10.7714 0.51123 9.16837 2.06952 9.16837 3.99252C9.16837 4.25777 9.20248 4.52301 9.27069 4.78825C6.3034 4.62247 3.64307 3.22995 1.86952 1.14118C1.56256 1.63851 1.39202 2.2353 1.39202 2.8984C1.39202 4.09199 2.00595 5.15296 2.99504 5.7829C2.41523 5.74975 1.83541 5.61713 1.35792 5.35189V5.38504C1.35792 7.07596 2.58576 8.46847 4.22289 8.80002C3.95003 8.86633 3.60897 8.93265 3.302 8.93265C3.06326 8.93265 2.85862 8.89949 2.61987 8.86633C3.06326 10.2589 4.39342 11.2535 5.96233 11.2867C4.73449 12.215 3.19968 12.7786 1.52845 12.7786C1.22149 12.7786 0.948636 12.7455 0.675781 12.7123C2.24469 13.707 4.12057 14.2706 6.16698 14.2706C12.7496 14.2706 16.3308 8.99896 16.3308 4.39039C16.3308 4.22461 16.3308 4.09199 16.3308 3.92621Z" fill="#222222"></path>
                  </svg>
                </a>
              </li>
              <li className="inline-block m-2 leading-1">
                <a className="text-sm inline-flex w-11 h-11 items-center justify-center rounded-full bg-white text-center" href="#">
                  <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.56609 15.2704V5.45315H0.948103V15.2704H4.56609ZM2.73764 4.1398C3.90474 4.1398 4.83841 3.31895 4.83841 2.33394C4.83841 1.38176 3.90474 0.59375 2.73764 0.59375C1.60945 0.59375 0.675781 1.38176 0.675781 2.33394C0.675781 3.31895 1.60945 4.1398 2.73764 4.1398ZM18.0654 15.2704H18.1044V9.8857C18.1044 7.259 17.4041 5.22331 13.7472 5.22331C11.9966 5.22331 10.8295 6.04415 10.3237 6.79933H10.2848V5.45315H6.82246V15.2704H10.4404V10.411C10.4404 9.13053 10.7128 7.91568 12.5801 7.91568C14.4475 7.91568 14.4864 9.36036 14.4864 10.5095V15.2704H18.0654Z" fill="#222222"></path>
                  </svg>
                </a>
              </li>
              <li className="inline-block m-2 leading-1">
                <a className="text-sm inline-flex w-11 h-11 items-center justify-center rounded-full bg-white text-center" href="#">
                  <svg width="19" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3829 10.554C15.4875 10.0381 15.5573 9.48523 15.5573 8.9324C15.5573 4.76772 12.3483 1.37701 8.40687 1.37701C7.88367 1.37701 7.36047 1.45072 6.87215 1.56129C6.20943 1.00846 5.37231 0.676758 4.50031 0.676758C2.33775 0.676758 0.59375 2.55639 0.59375 4.80458C0.59375 5.76282 0.87279 6.64735 1.39599 7.34761C1.29135 7.86359 1.22159 8.41642 1.22159 8.9324C1.22159 13.1339 4.43055 16.5246 8.37199 16.5246C8.89518 16.5246 9.41838 16.4509 9.9067 16.3404C10.5694 16.8932 11.4065 17.188 12.2785 17.188C14.4411 17.188 16.1851 15.3453 16.1851 13.0602C16.22 12.1388 15.9061 11.2543 15.3829 10.554ZM8.61615 13.9447C6.31407 13.9447 4.39567 12.8759 4.39567 11.5491C4.39567 10.9595 4.70959 10.4066 5.44207 10.4066C6.52335 10.4066 6.62799 12.0651 8.51151 12.0651C9.3835 12.0651 9.97646 11.6597 9.97646 11.1069C9.97646 10.4066 9.41838 10.2961 8.51151 10.0749C6.34895 9.48523 4.39567 9.2641 4.39567 6.86849C4.39567 4.65716 6.45359 3.84633 8.19759 3.84633C10.116 3.84633 12.0693 4.65716 12.0693 5.91024C12.0693 6.53679 11.6856 7.08962 11.0229 7.08962C10.0462 7.08962 10.0113 5.83653 8.40687 5.83653C7.49999 5.83653 6.94191 6.09452 6.94191 6.68421C6.94191 7.38446 7.67439 7.45818 9.34862 7.90044C10.7787 8.23214 12.5227 8.85869 12.5227 10.7383C12.5227 12.9128 10.5345 13.9447 8.61615 13.9447Z" fill="#222222"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="px-6 w-full mt-12 md:w-1/2 lg:w-1/4">
            <h6 className="mb-8 font-semibold">Enlaces Rápidos</h6>
            <ul>
              <li>
                <a className="text-sm text-gray-500" href="/nosotros">Nosotros</a>
              </li>
              <li>
                <a className="text-sm text-gray-500" href="/questions">Preguntas</a>
              </li>
              <li>
                <a className="text-sm text-gray-500" href="/blog">Blog</a>
              </li>
              <li>
                <a className="text-sm text-gray-500" href="/contactanos">Contactanos</a>
              </li>
            </ul>
          </div>
          <div className="px-6 w-full mt-12 md:w-1/2 lg:w-1/4">
            <h6 className="mb-8 font-semibold">Ubicación &amp; Contacto</h6>
            <p className="text-sm text-gray-500">-</p>
            <p className="text-sm text-gray-500">(+51) 993-541-316</p>
          </div>
        </div>
      </div>
      <div className="mx-auto px-3 max-w-[1440px]">
        <div className="footer-copyright mx-auto border-t border-border pb-10 pt-7 text-center">
          <p className="text-sm text-gray-500 mx-3 lg:mx-0">Diseñado por <a href="https://www.facebook.com/profile.php?id=100007722019176" target="_blank">Rahamsis CG</a> | Distribuido por <a href="#" target="_blank">SysSoftIntegra</a></p>

        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <>
      <Footer3 />
    </>
  );
}