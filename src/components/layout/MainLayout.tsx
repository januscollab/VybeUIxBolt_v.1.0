
import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";
import { Button } from "@/components/ui/button";
import { Github, FileText } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { brandName, logoUrl } = useLocalDesignSystem();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="border-b px-6 py-4 flex justify-between items-center bg-background">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/januscollab/janus-design-system" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="default" size="sm" asChild>
                <a href="/documentation" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" />
                  Documentation
                </a>
              </Button>
            </div>
          </header>
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
