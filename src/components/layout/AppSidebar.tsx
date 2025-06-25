import { useState, useEffect } from "react";
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
  ChevronUp,
  Edit,
  X,
  Book
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
import { useCategories, useComponents } from "@/hooks/useStaticDesignSystem";

const categoryIcons = {
  'foundations': Palette,
  'core-ui': Layers,
  'navigation': Navigation,
  'content-layout': Layout,
  'forms': FileText,
  'feedback': MessageSquare,
  'rich-text-editor': Edit,
  'experimental': Beaker,
};

export function AppSidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const { data: categories, isLoading } = useCategories();
  const { data: allComponents } = useComponents();

  // Auto-expand category when on category page
  useEffect(() => {
    const pathMatch = location.pathname.match(/^\/category\/(.+)$/);
    if (pathMatch) {
      const categorySlug = pathMatch[1];
      const category = categories?.find(cat => cat.slug === categorySlug);
      if (category && !expandedCategories.includes(category.id)) {
        setExpandedCategories(prev => [...prev, category.id]);
      }
    }
  }, [location.pathname, categories, expandedCategories]);

  const getCategoryComponents = (categoryId: string) => {
    return allComponents?.filter(component => component.category_id === categoryId) || [];
  };

  // Enhanced search: filter both categories and components
  const searchQueryLower = searchQuery.toLowerCase();
  
  const filteredCategories = categories?.filter(category => {
    // Search in category name
    if (category.name.toLowerCase().includes(searchQueryLower)) return true;
    
    // Search in category components
    const categoryComponents = getCategoryComponents(category.id);
    return categoryComponents.some(component => 
      component.name.toLowerCase().includes(searchQueryLower) ||
      component.description?.toLowerCase().includes(searchQueryLower) ||
      component.slug.toLowerCase().includes(searchQueryLower)
    );
  });

  const getFilteredComponents = (categoryId: string) => {
    const categoryComponents = getCategoryComponents(categoryId);
    if (!searchQuery) return categoryComponents;
    
    return categoryComponents.filter(component =>
      component.name.toLowerCase().includes(searchQueryLower) ||
      component.description?.toLowerCase().includes(searchQueryLower) ||
      component.slug.toLowerCase().includes(searchQueryLower)
    );
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="border-b border-border p-4 bg-background">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Palette className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">VybeUI</h2>
            <p className="text-xs text-muted-foreground">Design Language System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 bg-background">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
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
            <SidebarGroupLabel className="mb-2">Categories</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {filteredCategories?.map((category) => {
                  const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Layers;
                  const isActive = location.pathname === `/category/${category.slug}`;
                  const isExpanded = expandedCategories.includes(category.id);
                  
                  return (
                    <SidebarMenuItem key={category.id}>
                      <Collapsible open={isExpanded} onOpenChange={() => toggleCategory(category.id)}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton 
                            asChild 
                            isActive={isActive} 
                            className="w-full justify-between py-2 min-h-[40px]"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleCategory(category.id);
                            }}
                          >
                            <div className="flex items-center justify-between w-full cursor-pointer">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                <div className="text-sm font-medium">{category.name}</div>
                              </div>
                              {getFilteredComponents(category.id).length > 0 && (
                                <div className="ml-2 flex-shrink-0">
                                  {isExpanded ? (
                                    <ChevronUp className="h-3 w-3" />
                                  ) : (
                                    <ChevronDown className="h-3 w-3" />
                                  )}
                                </div>
                              )}
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="mt-2 mb-2">
                            {getFilteredComponents(category.id).map((component) => {
                              const isComponentActive = location.pathname === `/component/${component.slug}`;
                              return (
                                <SidebarMenuSubItem key={component.id}>
                                  <SidebarMenuSubButton asChild isActive={isComponentActive}>
                                    <Link to={`/component/${component.slug}`}>
                                      <span>{component.name}</span>
                                      {component.is_experimental && (
                                        <span className="ml-auto text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded">EXP</span>
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

      <SidebarFooter className="border-t border-border p-4 bg-background space-y-3">
        <div className="flex flex-col gap-2">
          <Button variant="ghost" size="sm" className="justify-start h-8" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="justify-start h-8" asChild>
            <a href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Documentation</span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center border-t pt-3">
          VybeUI v1.0.0
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
