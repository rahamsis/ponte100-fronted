import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  showHeaderContent: boolean;
  setShowHeaderContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeaderContent, setShowHeaderContent] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen);
  const openSidebar = () => {
    setShowHeaderContent(false)
    setIsOpen(true)
  }
  const closeSidebar = () => {
    setShowHeaderContent(true)
    setIsOpen(false)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, openSidebar, closeSidebar, showHeaderContent, setShowHeaderContent, }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
