
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocalDesignSystemProvider } from '@/hooks/useLocalDesignSystem';
import { useSearchParams } from 'react-router-dom';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const viewMode = searchParams.get('view') === '80' ? 80 : 100;

  return (
    <div className="min-h-screen bg-background">
      <LocalDesignSystemProvider>
        <div className="min-h-screen flex w-full">
          {/* Sidebar */}
          <aside className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-border bg-card`}>
            {/* Sidebar content */}
            <div className="py-4 px-3">
              <h1 className="font-bold text-lg">Vybe UI</h1>
              <p className="text-sm text-muted-foreground">Design System Playground</p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 items-center px-4 lg:px-6 gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <Menu className="h-4 w-4" />
                </Button>

                <div className="flex-1" />

                <div className="flex items-center gap-2">
                  {/* View Toggle - No hover/interactive states */}
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
          </main>
        </div>
      </LocalDesignSystemProvider>
    </div>
  );
}
