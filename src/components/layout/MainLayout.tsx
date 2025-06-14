import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { DevicePreview } from "./DevicePreview";
import { AdminControls } from "@/components/admin/AdminControls";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { useLocation, Link } from "react-router-dom";
import { useCategories, useComponent, useDesignSystem } from "@/hooks/useDesignSystem";
import { useMemo } from "react";
import { UserMenu } from "@/components/auth/UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { Palette } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const { data: categories } = useCategories();
  const { user } = useAuth();
  const { brandName, logoUrl } = useDesignSystem();
  
  const displayName = brandName || 'Design Language System';
  
  // Parse current route for breadcrumbs
  const breadcrumbs = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const crumbs = [{ name: 'Home', href: '/' }];
    
    if (pathSegments.length > 0) {
      const [type, slug] = pathSegments;
      
      if (type === 'category' && slug) {
        const category = categories?.find(cat => cat.slug === slug);
        if (category) {
          crumbs.push({ name: category.name, href: `/category/${slug}` });
        }
      } else if (type === 'component' && slug) {
        // We'll need to get component data to show proper breadcrumb
        crumbs.push({ name: 'Component', href: `/component/${slug}` });
      }
    }
    
    return crumbs;
  }, [location.pathname, categories]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-3">
                  {logoUrl ? (
                    <img 
                      src={logoUrl} 
                      alt={`${displayName} Logo`}
                      className="h-8 w-auto max-w-[120px] object-contain"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                      <Palette className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <h1 className="text-lg font-semibold">{displayName}</h1>
                </div>
                {breadcrumbs.length > 1 && (
                  <Breadcrumb>
                    <BreadcrumbList>
                      {breadcrumbs.map((crumb, index) => (
                        <BreadcrumbItem key={crumb.href}>
                          {index === breadcrumbs.length - 1 ? (
                            <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                          ) : (
                            <>
                              <BreadcrumbLink asChild>
                                <Link to={crumb.href}>{crumb.name}</Link>
                              </BreadcrumbLink>
                              <BreadcrumbSeparator />
                            </>
                          )}
                        </BreadcrumbItem>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                )}
              </div>
              <div className="flex items-center justify-center flex-1">
                <DevicePreview />
              </div>
              <div className="flex items-center gap-3">
                {user && (
                  <div className="text-sm text-muted-foreground">
                    Welcome, {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                  </div>
                )}
                <UserMenu />
              </div>
            </div>
          </header>
          <div className="flex-1 p-6 overflow-auto">
            {children}
          </div>
        </main>
        <AdminControls />
      </div>
    </SidebarProvider>
  );
}