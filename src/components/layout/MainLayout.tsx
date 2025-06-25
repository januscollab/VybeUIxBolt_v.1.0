
import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toggle } from "@/components/ui/toggle";
import { AppSidebar } from "./AppSidebar";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";
import { useLayoutView } from "@/hooks/useLayoutView";
import { Monitor, Smartphone } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { brandName, logoUrl } = useLocalDesignSystem();
  const { isDesignSystemView, toggleViewMode } = useLayoutView();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="border-b px-6 py-4 flex justify-between items-center bg-background sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground" />
              <div className="flex items-center gap-3">
                {logoUrl && (
                  <img 
                    src={logoUrl} 
                    alt="Logo" 
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <h1 className="text-xl font-semibold">{brandName} Design System</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Toggle
                pressed={!isDesignSystemView}
                onPressedChange={toggleViewMode}
                className="flex items-center gap-2 px-3"
                title={!isDesignSystemView ? "Switch to Design System View (80%)" : "Switch to Full Width View"}
              >
                {!isDesignSystemView ? (
                  <>
                    <Monitor className="h-4 w-4" />
                    <span className="hidden sm:inline">100%</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4" />
                    <span className="hidden sm:inline">80%</span>
                  </>
                )}
              </Toggle>
            </div>
          </header>
          
          {/* Content wrapper with conditional width */}
          <div className="flex-1">
            {isDesignSystemView ? (
              <div className="w-full flex justify-center">
                <div className="w-full max-w-[80%] px-6 py-6">
                  {children}
                </div>
              </div>
            ) : (
              <div className="flex-1 p-6">
                {children}
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
