
import React from 'react';
import { LocalDesignSystemProvider } from '@/hooks/useLocalDesignSystem';
import { useSearchParams } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams();
  const viewMode = searchParams.get('view') === '80' ? 80 : 100;

  return (
    <div className="min-h-screen bg-background">
      <LocalDesignSystemProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            
            <SidebarInset className="flex-1">
              {/* Header */}
              <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-14 items-center px-4 lg:px-6 gap-4">
                  <SidebarTrigger />

                  <div className="flex-1" />

                  <div className="flex items-center gap-2">
                    {/* View Toggle */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                      <span className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                        viewMode === 80 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground'
                      }`}>
                        80%
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                        viewMode === 100 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground'
                      }`}>
                        100%
                      </span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Content Area */}
              <div className="flex-1 overflow-hidden">
                <div className={`h-full transition-all duration-300 ${
                  viewMode === 80 ? 'max-w-[80%] mx-auto' : 'w-full'
                }`}>
                  <div className="h-full overflow-y-auto">
                    <div className="p-6">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </LocalDesignSystemProvider>
    </div>
  );
}
