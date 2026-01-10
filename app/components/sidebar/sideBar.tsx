"use client"

/* eslint-disable */


import { useState, useEffect, useCallback, useMemo, use } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, X, Bell } from "lucide-react"
import { cn } from "@/app/lib/utils/cn"
import { MenuItem, SubmenuItem } from "@/types/menu"
import Image from "next/image"
import { useSidebar } from "@/app/providers"
import getSvgIcon from "@/app/lib/utils/icon.helper"
import { buildMenuTree } from "@/helpers/menu.helper"

type Props = {
  session: any; // o Session si tienes el tipo importado
}

export default function Sidebar({ session }: Props) {
  // const mainMenu: MenuItem[] = session.user.menu;
  const mainMenu: MenuItem[] = useMemo(() => {
    if (!session?.user?.menu) return []
    return buildMenuTree(session.user.menu)
  }, [session?.user?.menu])

  const { isOpen, closeSidebar } = useSidebar()
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const renderMenuItem = useCallback((item: MenuItem, index: number) => {
    // const isActive = `/${item.ruta}` === pathname
    const rutas = item.otrasRutas ? Array.isArray(item.otrasRutas) ? item.otrasRutas : JSON.parse(`${item.otrasRutas}`) : [];
    const isActive: boolean = (rutas as string[]).some((ruta: string) => pathname.startsWith(ruta));
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isSubmenuOpen = openMenus[item.nombre]
    const hasActiveChild = item.submenu?.some(sub => sub.rutaSubmenu === pathname)
    const highlightParent = (hasSubmenu && hasActiveChild && isSidebarOpen) || (isActive && !hasSubmenu)

    return (
      <div key={`${item.idMenu}-${index}`} className="mb-1">
        {item.ruta && !hasSubmenu ? (
          <Link
            href={"/" + item.ruta}
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
              <div className="shrink-0" dangerouslySetInnerHTML={{ __html: getSvgIcon(item.icon || "default") }} />
            </div>
            <span className={cn("transition-opacity", !isSidebarOpen && "opacity-0 hidden md:block md:opacity-0")}>
              {item.nombre}
            </span>
          </Link>
        ) : (
          <div className={cn(
            "flex flex-col items-center mx-6",
            !isOpen && "flex-col border-b border-gray-500"
          )}>
            <button
              onClick={() => toggleMenu(item.nombre)}
              className={cn(
                "w-full flex flex-col items-center py-2 text-sm font-medium transition-colors",
                highlightParent
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-white",
                isActive && "text-white",
                isOpen ? "flex-row py-5" : "flex-col"
              )}
              aria-expanded={isSubmenuOpen}
              aria-controls={`submenu-${item.idMenu}`}
            >
              <div className={cn(
                "flex flex-col gap-3 items-center",
                isOpen ? "flex-row" : "flex-col"
              )}>
                <div className={`shrink-0 p-1 ${isOpen ? "" : "rounded-md bg-white bg-opacity-30"}`}>
                  <div
                    className="shrink-0"
                    dangerouslySetInnerHTML={{ __html: getSvgIcon(item.icon || "default") }}
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span
                    className={cn(
                      "whitespace-nowrap transition-opacity duration-200",
                      !isSidebarOpen && "opacity-0 hidden md:block md:opacity-0"
                    )}
                  >
                    {item.nombre}
                  </span>

                  {hasSubmenu && (
                    <span
                      className={cn(
                        "transition-transform duration-200",
                        isSubmenuOpen && "rotate-90"
                      )}
                    >
                      <ChevronRight size={18} />
                    </span>
                  )}
                </div>
              </div>
            </button>

            {hasSubmenu && (
              <div
                id={`submenu-${item.idMenu}`}
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isSubmenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  !isSidebarOpen && "hidden md:block",
                )}
                aria-hidden={!isSubmenuOpen}
              >
                {item.submenu?.map((subItem, subIndex) => {
                  const isSubActive = "/" + subItem.rutaSubmenu === pathname
                  return (
                    <Link
                      key={`${subItem.nombreSubmenu}-${subIndex}`}
                      href={subItem.rutaSubmenu || "#"}
                      className={cn(
                        "flex items-center gap-2 py-2  rounded-md text-sm font-medium transition-colors",
                        isSubActive
                          ? "text-white"
                          : "text-gray-500 hover:text-white"
                      )}
                    >
                      <div
                        className="shrink-0"
                        dangerouslySetInnerHTML={{ __html: getSvgIcon(subItem.iconSubmenu || "default") }}
                      />
                      <span>{subItem.nombreSubmenu}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

        )}
      </div>
    )
  }, [pathname, openMenus, isSidebarOpen, isOpen, closeAllMenus, toggleMenu])

  // Evitar renderizado si está en la página de bienvenida
  if (pathname.startsWith("/bienvenida")) return null

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
          className={`fixed top-0 left-0 h-full bg-primary shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out z-50
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