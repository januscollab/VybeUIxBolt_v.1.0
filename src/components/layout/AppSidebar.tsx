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
import { useCategories, useComponents, useComponent } from "@/hooks/useStaticDesignSystem";

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
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);
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

  // Handle component navigation and category expansion
  useEffect(() => {
    // Direct component navigation
    const componentPathMatch = location.pathname.match(/^\/component\/(.+)$/);
    const componentSlug = componentPathMatch ? componentPathMatch[1] : null;
    
    // Hash navigation within category pages
    const hashComponentSlug = location.hash ? location.hash.replace('#', '') : null;
    
    // Find the active component
    const activeSlug = componentSlug || hashComponentSlug;
    const component = activeSlug ? allComponents?.find(comp => comp.slug === activeSlug) : null;
    
    if (component) {
      setActiveComponentId(component.id);
      
      // Expand the category containing this component
      const category = categories?.find(cat => cat.id === component.category_id);
      if (category && !expandedCategories.includes(category.id)) {
        setExpandedCategories(prev => [...prev, category.id]);
      }
    } else {
      setActiveComponentId(null);
    }
  }, [location.pathname, location.hash, allComponents, categories]);

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
                        <div className="flex items-center w-full">
                          <SidebarMenuButton 
                            asChild 
                            isActive={isActive} 
                            className="flex-1 justify-start py-2 min-h-[40px]"
                          >
                            <Link to={`/category/${category.slug}`} className="flex items-center gap-3">
                              <Icon className="h-4 w-4 flex-shrink-0" />
                              <div className="text-sm font-medium">{category.name}</div>
                            </Link>
                          </SidebarMenuButton>
                          {getFilteredComponents(category.id).length > 0 && (
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 ml-1 hover:bg-accent"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
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
                          <SidebarMenuSub className="mt-2 mb-2">
                            {getFilteredComponents(category.id).map((component) => {
                              const isComponentActive = location.pathname === `/component/${component.slug}`;
                              return (
                                <SidebarMenuSubItem key={component.id}>
                                  <SidebarMenuSubButton 
                                    asChild 
                                    isActive={isComponentActive || activeComponentId === component.id}
                                  >
                                    <Link 
                                      to={
                                        location.pathname.startsWith('/category/') 
                                          ? `${location.pathname}#${component.slug}` 
                                          : `/component/${component.slug}`
                                      }
                                    >
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

      <SidebarFooter className="border-t border-border p-4 bg-background">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="flex-1 justify-start h-8" asChild>
            <Link to="/documentation" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Docs</span>
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}