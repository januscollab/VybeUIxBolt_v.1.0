import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";
import { useCategories } from "@/hooks/useDesignSystem";

interface SearchFilters {
  categories: string[];
  status: string[];
  isExperimental?: boolean;
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  onClearFilters: () => void;
}

export function AdvancedSearch({ onSearch, onClearFilters }: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    status: [],
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const { data: categories } = useCategories();

  const handleSearch = () => {
    onSearch(searchQuery, filters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const updateFilters = (type: keyof SearchFilters, value: string, checked: boolean) => {
    setFilters(prev => {
      const currentValues = Array.isArray(prev[type]) ? prev[type] as string[] : [];
      
      if (checked) {
        return {
          ...prev,
          [type]: [...currentValues, value]
        };
      } else {
        return {
          ...prev,
          [type]: currentValues.filter(v => v !== value)
        };
      }
    });
  };

  const clearAllFilters = () => {
    setFilters({ categories: [], status: [] });
    setSearchQuery("");
    onClearFilters();
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.status.length > 0 || filters.isExperimental !== undefined;
  const totalFilters = filters.categories.length + filters.status.length + (filters.isExperimental !== undefined ? 1 : 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Components
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search components, categories, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
            />
          </div>
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {totalFilters > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalFilters}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Filters</h4>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Categories Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Categories</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {categories?.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={filters.categories.includes(category.id)}
                          onCheckedChange={(checked) =>
                            updateFilters('categories', category.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {['stable', 'beta', 'alpha', 'draft'].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={filters.status.includes(status)}
                          onCheckedChange={(checked) =>
                            updateFilters('status', status, checked as boolean)
                          }
                        />
                        <Label htmlFor={`status-${status}`} className="text-sm capitalize">
                          {status}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experimental Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Type</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="experimental"
                      checked={filters.isExperimental === true}
                      onCheckedChange={(checked) =>
                        setFilters(prev => ({
                          ...prev,
                          isExperimental: checked ? true : undefined
                        }))
                      }
                    />
                    <Label htmlFor="experimental" className="text-sm">
                      Experimental only
                    </Label>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.categories.map((categoryId) => {
              const category = categories?.find(c => c.id === categoryId);
              return category ? (
                <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                  {category.name}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilters('categories', categoryId, false)}
                  />
                </Badge>
              ) : null;
            })}
            {filters.status.map((status) => (
              <Badge key={status} variant="secondary" className="flex items-center gap-1">
                {status}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilters('status', status, false)}
                />
              </Badge>
            ))}
            {filters.isExperimental && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Experimental
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setFilters(prev => ({ ...prev, isExperimental: undefined }))}
                />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}