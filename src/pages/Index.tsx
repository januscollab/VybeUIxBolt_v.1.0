
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCategories, useComponents, useDesignSystem } from "@/hooks/useStaticDesignSystem";
import { CategoryCardSkeleton } from "@/components/ui/loading-skeleton";
import { Palette, Layers, Navigation, Layout, FileText, MessageSquare, Beaker, ExternalLink, Github, BookOpen, Edit } from "lucide-react";

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

const Index = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: allComponents } = useComponents();
  const { brandName, logoUrl } = useDesignSystem();

  const totalComponents = allComponents?.length || 0;
  const stableComponents = allComponents?.filter(c => c.status === 'stable').length || 0;
  const experimentalComponents = allComponents?.filter(c => c.is_experimental).length || 0;

  const displayName = brandName || 'Design Language System';

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="flex justify-center mb-6">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={`${displayName} Logo`}
              className="h-16 w-auto max-w-[200px] object-contain"
            />
          ) : (
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center">
              <Palette className="h-8 w-8 text-primary-foreground" />
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{displayName}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive design system built for rapid product development. 
          Explore our components, tokens, and patterns based on modern design principles.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild size="sm">
            <a href="https://github.com/januscollab/janus-design-system" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/category/foundations">
              <BookOpen className="h-4 w-4 mr-2" />
              Get Started
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">{totalComponents}</CardTitle>
            <CardDescription>Total Components</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">{stableComponents}</CardTitle>
            <CardDescription>Stable Components</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">{experimentalComponents}</CardTitle>
            <CardDescription>Experimental Components</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Component Categories</h2>
        {categoriesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category) => {
              const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Layers;
              const categoryComponents = allComponents?.filter(c => c.category_id === category.id) || [];
              
              return (
                <Card key={category.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {categoryComponents.length} components
                          </Badge>
                          {category.slug === 'experimental' && (
                            <Badge variant="outline" className="text-xs border-accent text-accent">
                              Experimental
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/category/${category.slug}`}>
                        Explore Category
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Getting Started */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>For Designers</CardTitle>
              <CardDescription>
                Access our complete design tokens and foundational elements for consistent design.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/category/foundations">
                  View Design Tokens
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Developers</CardTitle>
              <CardDescription>
                Explore our component library with interactive examples and code snippets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/category/core-ui">
                  Browse Components
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
