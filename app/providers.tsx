// app/providers.tsx
// 'use client'

// import { SessionProvider } from "next-auth/react"

// export function Providers({ children }: { children: React.ReactNode }) {
//     return <SessionProvider>{children}</SessionProvider>
// }

'use client'

import { SessionProvider } from "next-auth/react"
import { createContext, useContext, useState } from "react"

// Creamos el contexto del sidebar
const SidebarContext = createContext<{
    isOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    showHeaderContent: boolean
} | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showHeaderContent, setShowHeaderContent] = useState(true)

    const toggleSidebar = () => {
        setShowHeaderContent(!isOpen) // si se va a abrir, ocultamos el header
        setIsOpen(!isOpen)
    }
    const closeSidebar = () => {
        setIsOpen(false)
        setShowHeaderContent(true) // al cerrar, mostramos el header
    }

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar, showHeaderContent }}>
            {children}
        </SidebarContext.Provider>
    )
}

// Hook para usar el contexto
export function useSidebar() {
    const context = useContext(SidebarContext)
    if (!context) throw new Error("useSidebar must be used within SidebarProvider")
    return context
}

// Ahora tu provider que combina ambos
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </SessionProvider>
    )
}