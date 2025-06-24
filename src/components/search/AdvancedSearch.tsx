
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";
import { useCategories, useComponents } from "@/hooks/useStaticDesignSystem";

interface AdvancedSearchProps {
  onSearch: (query: string, filters: any) => void;
  onClearFilters: () => void;
}

export function AdvancedSearch({ onSearch, onClearFilters }: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [includeExperimental, setIncludeExperimental] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const { data: categories } = useCategories();
  const { data: allComponents } = useComponents();

  const handleSearch = () => {
    const filters = {
      category: selectedCategory,
      status: selectedStatus,
      experimental: includeExperimental,
    };

    let filteredComponents = allComponents || [];

    // Apply search query
    if (searchQuery) {
      filteredComponents = filteredComponents.filter(component =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.slug.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      const category = categories?.find(c => c.slug === selectedCategory);
      if (category) {
        filteredComponents = filteredComponents.filter(c => c.category_id === category.id);
      }
    }

    // Apply status filter
    if (selectedStatus) {
      filteredComponents = filteredComponents.filter(c => c.status === selectedStatus);
    }

    // Apply experimental filter
    if (!includeExperimental) {
      filteredComponents = filteredComponents.filter(c => !c.is_experimental);
    }

    setResults(filteredComponents);
    onSearch(searchQuery, filters);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedStatus("");
    setIncludeExperimental(false);
    setResults([]);
    onClearFilters();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Component Search
          </CardTitle>
          <CardDescription>
            Search and filter components across the design system with advanced criteria.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search-query">Search Query</Label>
              <Input
                id="search-query"
                placeholder="Component name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="deprecated">Deprecated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="experimental"
                  checked={includeExperimental}
                  onCheckedChange={(checked) => setIncludeExperimental(checked as boolean)}
                />
                <Label htmlFor="experimental" className="text-sm">
                  Include experimental
                </Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Components
            </Button>
            <Button variant="outline" onClick={handleClear} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>

          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Search Results</h3>
                <Badge variant="secondary">{results.length} components found</Badge>
              </div>
              <div className="grid gap-3">
                {results.map((component) => (
                  <Card key={component.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{component.name}</h4>
                        {component.description && (
                          <p className="text-sm text-muted-foreground">{component.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
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
                          <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent">
                            Experimental
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
