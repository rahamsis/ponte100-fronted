export interface SubmenuItem {
    idSubmenu: string
    nombreSubmenu: string
    rutaSubmenu?: string
    iconSubmenu?: string
}

export interface MenuItem {
    idMenu: string
    nombre: string
    ruta?: string
    icon?: string
    otrasRutas?: string[]
    submenu?: SubmenuItem[]
}