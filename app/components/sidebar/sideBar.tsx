"use client"

/* eslint-disable */


import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, X, Bell } from "lucide-react"
import { cn } from "@/app/lib/utils/cn"
import { getMainMenu } from "@/app/lib/actions"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { House, NotebookPen, ChartSpline, TvMinimalPlay, ScrollText } from "lucide-react"
import { useSidebar } from "@/app/providers"

type SubmenuItem = {
  nombreSubMenu: string
  hrefSubMenu?: string
  iconSubMenu?: string
  estadoSubMenu: string
}

type MenuItem = {
  idMenu: string
  nombre: string
  ruta?: string
  icon?: string
  otrasRutas?: string[]
  submenu?: SubmenuItem[]
}

// const ICON_MAP: Record<string, React.ComponentType<any>> = {
//   inicio: House,
//   actividades: NotebookPen,
//   progreso: ChartSpline,
//   temario: ScrollText,
//   videos: TvMinimalPlay
// }

const mainMenu = [
  {
    idMenu: "MN0001",
    nombre: "Inicio",
    ruta: "/inicio",
    icon: "inicio",
    otrasRutas: ["/inicio"]
  },
  {
    idMenu: "MN0002",
    nombre: "Actividades",
    ruta: "/actividades",
    icon: "actividades",
    otrasRutas: ["/actividades","/talleres-de-estudio", "/despierta-tu-inteligencia", "/control-de-habilidades", "/practica-un-tema", 
      "/primera-practica", "/primer-simulacro", "/preguntas-fallidas", "/examenes-no-repetidos"]
  },
  {
    idMenu: "MN0003",
    nombre: "Progreso",
    ruta: "/progreso",
    icon: "progreso",
    otrasRutas: ["/progreso"]
  },
  {
    idMenu: "MN0004",
    nombre: "Temario",
    ruta: "/temario",
    icon: "temario",
    otrasRutas: ["/temario"]
  },
  {
    idMenu: "MN0005",
    nombre: "Videos",
    ruta: "/videos",
    icon: "videos",
    otrasRutas: ["/videos"]
  },
]

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar()
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  // detectar si estamos en version mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize() // Inicializar al montar
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ productos: false })
  // const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar menú con caché básica
  // const loadMenu = useCallback(async () => {
  //   try {
  //     setLoading(true)
  //     const cachedMenu = sessionStorage.getItem('menuCache')

  //     if (cachedMenu) {
  //       setMenuItems(JSON.parse(cachedMenu))
  //       return
  //     }

  //     const data = await getMainMenu()
  //     setMenuItems(data)
  //     sessionStorage.setItem('menuCache', JSON.stringify(data))
  //   } catch (err) {
  //     console.error("Error loading menu:", err)
  //     setError("Error al cargar el menú")
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     loadMenu()
  //   }
  // }, [status, loadMenu])

  const closeAllMenus = useCallback(() => {
    setOpenMenus({})
  }, [])

  const toggleMenu = useCallback((title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
    setIsSidebarOpen(true)
  }, [])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
    closeAllMenus()
  }, [closeAllMenus])

  const renderMenuItem = useCallback((item: MenuItem, index: number) => {
    // const isActive = `/${item.ruta}` === pathname
    const rutas = Array.isArray(item.otrasRutas) ? item.otrasRutas : [`${item.otrasRutas}`];
    const isActive = rutas.some((ruta) => pathname.startsWith(ruta));
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isSubmenuOpen = openMenus[item.nombre]
    const hasActiveChild = item.submenu?.some(sub => sub.hrefSubMenu === pathname)
    const highlightParent = (hasSubmenu && hasActiveChild && isSidebarOpen) || (isActive && !hasSubmenu)

    // const IconComponent = item.icon ? ICON_MAP[item.icon] : null

    return (
      <div key={`${item.idMenu}-${index}`} className="mb-1">
        {item.ruta && !hasSubmenu ? (
          <Link
            href={item.ruta}
            onClick={() => {
              closeAllMenus()
              if (isMobile) closeSidebar()
            }}
            className={cn(
              "flex items-center gap-3 mx-6 py-2 text-sm font-medium transition-colors",
              isActive ? "text-white" : "text-gray-500 hover:text-white",
              isOpen ? "flex-row py-5" : "flex-col border-b border-gray-500"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <div className={`shrink-0 p-1 ${isOpen ? "" : "rounded-md bg-white bg-opacity-30"}`}>
              {/* {IconComponent && <IconComponent size={20} />} */}
              {
                item.icon === "inicio" ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                  </svg> :
                  item.icon === "actividades" ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-check-fill" viewBox="0 0 16 16">
                      <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                    </svg> :
                    item.icon === "progreso" ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clipboard2-pulse-fill" viewBox="0 0 16 16">
                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                        <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M9.98 5.356 11.372 10h.128a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.479-.356l-.94-3.135-1.092 5.096a.5.5 0 0 1-.968.039L6.383 8.85l-.936 1.873A.5.5 0 0 1 5 11h-.5a.5.5 0 0 1 0-1h.191l1.362-2.724a.5.5 0 0 1 .926.08l.94 3.135 1.092-5.096a.5.5 0 0 1 .968-.039Z" />
                      </svg> :
                      item.icon === "temario" ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z" />
                        </svg> :
                        item.icon === "videos" ?
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-collection-play-fill" viewBox="0 0 16 16">
                            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437" />
                          </svg> :
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-highlights" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-8 5v1H4.5a.5.5 0 0 0-.093.009A7 7 0 0 1 3.1 13zm0-1H2.255a7 7 0 0 1-.581-1H8zm-6.71-2a7 7 0 0 1-.22-1H8v1zM1 8q0-.51.07-1H8v1zm.29-2q.155-.519.384-1H8v1zm.965-2q.377-.54.846-1H8v1zm2.137-2A6.97 6.97 0 0 1 8 1v1z" />
                          </svg>
              }
            </div>
            <span className={cn("transition-opacity", !isSidebarOpen && "opacity-0 hidden md:block md:opacity-0")}>
              {item.nombre}
            </span>
          </Link>
        ) : (
          <>
            <button
              onClick={() => toggleMenu(item.nombre)}
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                highlightParent ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
              aria-expanded={isSubmenuOpen}
              aria-controls={`submenu-${item.idMenu}`}
            >
              <div className="flex items-center gap-3">
                <span className={cn("ml-2 transition-opacity", !isSidebarOpen && "opacity-0 hidden md:block md:opacity-0")}>
                  {item.nombre}
                </span>
              </div>
              {hasSubmenu && (
                <div className={cn("transition-opacity", !isSidebarOpen && "opacity-0 hidden md:block md:opacity-0")}>
                  {isSubmenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
              )}
            </button>

            {hasSubmenu && isSubmenuOpen && (
              <div
                id={`submenu-${item.idMenu}`}
                className={cn("ml-4 pl-2 mt-1", !isSidebarOpen && "hidden md:block")}
                aria-hidden={!isSubmenuOpen}
              >
                {item.submenu?.map((subItem, subIndex) => {
                  const isSubActive = subItem.hrefSubMenu === pathname
                  return (
                    <Link
                      key={`${subItem.nombreSubMenu}-${subIndex}`}
                      href={subItem.hrefSubMenu || "#"}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isSubActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                      aria-current={isSubActive ? "page" : undefined}
                    >
                      <div className="shrink-0">2</div>
                      <span className={cn("ml-2 transition-opacity", !isSidebarOpen && "opacity-0 hidden md:block md:opacity-0")}>
                        {subItem.nombreSubMenu}
                      </span>
                    </Link>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    )
  }, [pathname, openMenus, isSidebarOpen, isOpen, closeAllMenus, toggleMenu])

  // Evitar renderizado si está en la página de bienvenida
  if (pathname.startsWith("/bienvenida")) return null

  // Estados de carga y error
  // if (loading) return (
  //   <div className="fixed inset-y-0 left-0 z-50 w-16 bg-primary flex items-center justify-center">
  //     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  //   </div>
  // )

  if (error) return (
    <div className="fixed inset-y-0 left-0 z-50 w-16 bg-primary flex items-center justify-center text-white p-2">
      Error
    </div>
  )

  return (
    <>
      {/* Versión Desktop */}
      <div className="hidden lg:block">
        <div className={cn("fixed inset-y-0 left-0 z-50 flex flex-col bg-primary transition-all duration-500 ease-in-out")}>
          <div className="flex items-center justify-between h-[67px] mx-auto pt-8">
            <Image
              src="/assets/logo2.png"
              height={60}
              width={60}
              alt="Logo"
              className="h-auto"
              priority
            />
          </div>
          <nav className="flex-1 px-2 pt-8 overflow-y-auto">
            {mainMenu.map(renderMenuItem)}
          </nav>
        </div>
      </div>

      {/* Versión Mobile */}
      <div className="lg:hidden">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
        <aside
          className={`fixed top-0 left-0 h-full bg-primary shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0 w-9/12" : "-translate-x-full"}`}
          aria-hidden={!isOpen}
        >
          <X
            onClick={closeSidebar}
            className="w-10 h-10 absolute top-4 left-4 text-white hover:text-gray-900 cursor-pointer"
            aria-label="Cerrar menú"
          />

          <div className="absolute right-10 top-16 bg-white p-3 rounded-full">
            <Bell aria-hidden="true" />
          </div>

          <div className="flex flex-col items-center justify-center pt-12 mt-8">
            {session?.user?.image ? (
              <div className="relative w-28 h-28">
                <Image
                  className="rounded-full object-cover border-2 border-green-700 w-full h-full"
                  src={session.user.image}
                  width={150}
                  height={150}
                  alt="Foto de perfil"
                />
              </div>
            ) : (
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-gray-500 text-xl">👤</span>
              </div>
            )}
            <span className="pt-5 text-white text-xl">Perfil</span>
          </div>

          <nav className="flex-1 mx-8 pt-8 mt-8 border-t border-gray-500 overflow-y-auto">
            {mainMenu.map(renderMenuItem)}
          </nav>
        </aside>
      </div>
    </>
  )
}