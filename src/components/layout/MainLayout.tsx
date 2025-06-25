
import { ReactNode, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";
import { AppSidebar } from "./AppSidebar";
import { DesignSystemSettings } from "../design-system/DesignSystemSettings";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";
import { useLayoutView } from "@/hooks/useLayoutView";
import { Settings, Monitor, Smartphone } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { brandName, logoUrl } = useLocalDesignSystem();
  const { isDesignSystemView, toggleViewMode } = useLayoutView();
  const [settingsOpen, setSettingsOpen] = useState(false);

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
              {/* Width Toggle */}
              <Toggle
                pressed={isDesignSystemView}
                onPressedChange={toggleViewMode}
                className="flex items-center gap-2 px-3"
                title={isDesignSystemView ? "Switch to Full Width View" : "Switch to Design System View (80%)"}
              >
                {isDesignSystemView ? (
                  <>
                    <Smartphone className="h-4 w-4" />
                    <span className="hidden sm:inline">80%</span>
                  </>
                ) : (
                  <>
                    <Monitor className="h-4 w-4" />
                    <span className="hidden sm:inline">100%</span>
                  </>
                )}
              </Toggle>

              {/* Settings Panel */}
              <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Design System Settings</SheetTitle>
                    <SheetDescription>
                      Configure layout, fonts, and other design system preferences
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <DesignSystemSettings />
                  </div>
                </SheetContent>
              </Sheet>
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
