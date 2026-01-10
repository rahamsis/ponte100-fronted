import type { MenuItem } from "@/types/menu"

interface MenuRow {
    idMenu: string
    nombre: string
    ruta?: string
    icon?: string
    otrasRutas?: string[] | string

    idSubmenu?: string
    nombreSubmenu?: string 
    rutaSubmenu?: string
    iconSubmenu?: string
}

export const buildMenuTree = (rows: MenuRow[]): MenuItem[] => {
    const map = new Map<string, MenuItem>()

    rows.forEach(row => {
        if (!map.has(row.idMenu)) {
            map.set(row.idMenu, {
                idMenu: row.idMenu,
                nombre: row.nombre,
                ruta: row.ruta,
                otrasRutas: typeof row.otrasRutas === "string" ? JSON.parse(row.otrasRutas) : row.otrasRutas,
                icon: row.icon,
                submenu: []
            })
        }

        if (row.idSubmenu) {
            map.get(row.idMenu)!.submenu!.push({
                idSubmenu: row.idSubmenu,
                nombreSubmenu: row.nombreSubmenu!,
                rutaSubmenu: row.rutaSubmenu ?? undefined,
                iconSubmenu: row.iconSubmenu ?? undefined
            })
        }
    })

    return Array.from(map.values()).map(menu => ({
        ...menu,
        submenu: menu.submenu?.length ? menu.submenu : undefined
    }))
}
