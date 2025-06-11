import { useParams } from "react-router-dom";
import { useComponents, useCategories } from "@/hooks/useDesignSystem";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileCode, Figma } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: categories } = useCategories();
  const { data: components, isLoading } = useComponents(slug);
  
  const category = categories?.find(c => c.slug === slug);
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-muted-foreground">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">{category.description}</p>
        )}
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{components?.length || 0} components</Badge>
          {category.slug === 'experimental' && (
            <Badge variant="outline" className="border-orange-500 text-orange-600">
              Experimental
            </Badge>
          )}
        </div>
      </div>

      {components && components.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <Card key={component.id} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{component.name}</CardTitle>
                    {component.description && (
                      <CardDescription>{component.description}</CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge
                      variant={
                        component.status === 'stable' ? 'default' :
                        component.status === 'review' ? 'secondary' :
                        component.status === 'deprecated' ? 'destructive' :
                        'outline'
                      }
                      className="text-xs"
                    >
                      {component.status}
                    </Badge>
                    {component.is_experimental && (
                      <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                        Experimental
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {component.variants && component.variants.length > 0 && (
                    <span>{component.variants.length} variants</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link to={`/component/${component.slug}`}>
                      View Details
                    </Link>
                  </Button>
                  
                  <div className="flex gap-1">
                    {component.figma_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={component.figma_url} target="_blank" rel="noopener noreferrer">
                          <Figma className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {component.storybook_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={component.storybook_url} target="_blank" rel="noopener noreferrer">
                          <FileCode className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            No components yet
          </h2>
          <p className="text-muted-foreground">
            Components for this category are coming soon.
          </p>
        </div>
      )}
    </div>
  );
}