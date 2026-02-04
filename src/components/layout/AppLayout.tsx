import { ReactNode, createContext, useContext, useState } from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar - Fixed */}
        <DesktopSidebar />
        
        {/* Main Content Area - Dynamically adjusts to sidebar width */}
        <div 
          className={cn(
            "min-h-screen transition-all duration-300",
            // On mobile: no margin
            // On desktop: margin based on sidebar state
            collapsed ? "md:ml-20" : "md:ml-64"
          )}
        >
          {/* Content with bottom padding for mobile nav */}
          <main className="min-h-screen pb-20 md:pb-0">
            {children}
          </main>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </div>
    </SidebarContext.Provider>
  );
}