import { useState } from "react";
import { 
  Palette, 
  Layers, 
  Navigation, 
  Layout, 
  FileText, 
  MessageSquare, 
  Beaker, 
  Search,
  Home,
  Github,
  ExternalLink
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useDesignSystem";

const categoryIcons = {
  'foundations': Palette,
  'core-ui': Layers,
  'navigation': Navigation,
  'content-layout': Layout,
  'forms': FileText,
  'feedback': MessageSquare,
  'experimental': Beaker,
};

export function AppSidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: categories, isLoading } = useCategories();

  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Palette className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">DLS</h2>
            <p className="text-xs text-muted-foreground">Design Language System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isLoading && (
          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredCategories?.map((category) => {
                  const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Layers;
                  const isActive = location.pathname === `/category/${category.slug}`;
                  
                  return (
                    <SidebarMenuItem key={category.id}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={`/category/${category.slug}`}>
                          <Icon className="h-4 w-4" />
                          <span>{category.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          v1.0.0 • Built with Lovable
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}