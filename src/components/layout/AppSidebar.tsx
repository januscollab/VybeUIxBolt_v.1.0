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
  ExternalLink,
  ChevronDown,
  ChevronUp
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useCategories, useComponents } from "@/hooks/useDesignSystem";

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
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const { data: categories, isLoading } = useCategories();
  const { data: allComponents } = useComponents();

  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getCategoryComponents = (categoryId: string) => {
    return allComponents?.filter(component => component.category_id === categoryId) || [];
  };

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
                  const isExpanded = expandedCategories.includes(category.id);
                  const categoryComponents = getCategoryComponents(category.id);
                  
                  return (
                    <SidebarMenuItem key={category.id}>
                      <Collapsible open={isExpanded} onOpenChange={() => toggleCategory(category.id)}>
                        <div className="flex items-center">
                          <SidebarMenuButton asChild isActive={isActive} className="flex-1">
                            <Link to={`/category/${category.slug}`}>
                              <Icon className="h-4 w-4" />
                              <span>{category.name}</span>
                            </Link>
                          </SidebarMenuButton>
                          {categoryComponents.length > 0 && (
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-sidebar-accent"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-3 w-3" />
                                ) : (
                                  <ChevronDown className="h-3 w-3" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          )}
                        </div>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {categoryComponents.map((component) => {
                              const isComponentActive = location.pathname === `/component/${component.slug}`;
                              return (
                                <SidebarMenuSubItem key={component.id}>
                                  <SidebarMenuSubButton asChild isActive={isComponentActive}>
                                    <Link to={`/component/${component.slug}`}>
                                      <span>{component.name}</span>
                                      {component.is_experimental && (
                                        <span className="ml-auto text-xs text-orange-600">EXP</span>
                                      )}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
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
            <a href="https://github.com/januscollab/janus-design-system" target="_blank" rel="noopener noreferrer">
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