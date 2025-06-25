
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories, useComponents } from "@/hooks/useStaticDesignSystem";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";
import { Search, Palette, Code, Zap, Users } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: allComponents, isLoading: componentsLoading } = useComponents();
  const { brandName } = useLocalDesignSystem();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredComponents = allComponents.filter(component =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalComponents = allComponents.length;
  const stableComponents = allComponents.filter(c => c.status === 'stable').length;
  const experimentalComponents = allComponents.filter(c => c.is_experimental).length;

  if (categoriesLoading || componentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="text-primary">VybeUI</span>{" "}
            <span className="text-foreground">Design System</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive collection of reusable components, design tokens, and guidelines 
            to build consistent, accessible, and beautiful user interfaces.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button size="lg" variant="outline" onClick={() => navigate('/components')}>
            <Palette className="mr-2 h-5 w-5" />
            Explore Components
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{totalComponents}</div>
              <p className="text-sm text-muted-foreground">Total Components</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-success">{stableComponents}</div>
              <p className="text-sm text-muted-foreground">Production Ready</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-warning">{experimentalComponents}</div>
              <p className="text-sm text-muted-foreground">Experimental</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Discover Components
          </CardTitle>
          <CardDescription>
            Search through our comprehensive component library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search components, categories, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      {searchQuery === "" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Categories</h2>
            <Button variant="outline" onClick={() => navigate('/components')}>
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/category/${category.slug}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    {category.is_experimental && (
                      <Badge variant="secondary">Experimental</Badge>
                    )}
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {category.component_count} components
                    </span>
                    <Button variant="secondary" size="sm">
                      Explore →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-6">
          {filteredCategories.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCategories.map((category) => (
                  <Card 
                    key={category.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/category/${category.slug}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{category.name}</CardTitle>
                        {category.is_experimental && (
                          <Badge variant="secondary" className="text-xs">Experimental</Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {filteredComponents.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredComponents.map((component) => (
                  <Card 
                    key={component.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/component/${component.slug}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{component.name}</CardTitle>
                        <Badge 
                          variant={component.status === 'stable' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {component.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{component.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {filteredCategories.length === 0 && filteredComponents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      {/* Features Section */}
      {searchQuery === "" && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Why Choose {brandName}?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Optimized components built with performance in mind
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Code className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Developer Friendly</CardTitle>
                <CardDescription>
                  TypeScript support, excellent DX, and comprehensive docs
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Accessible</CardTitle>
                <CardDescription>
                  WCAG compliant components that work for everyone
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
