import { ComponentUsageAnalytics } from "@/components/analytics/ComponentUsageAnalytics";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import { ExportImportManager } from "@/components/export/ExportImportManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Search, Download } from "lucide-react";

const AnalyticsPage = () => {
  const handleSearch = (query: string, filters: any) => {
    console.log("Search:", query, filters);
  };

  const handleClearFilters = () => {
    console.log("Clear filters");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics & Tools</h1>
        <p className="text-muted-foreground mt-2">
          Advanced features for managing and analyzing your design system usage.
        </p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Advanced Search
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export/Import
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <ComponentUsageAnalytics />
        </TabsContent>

        <TabsContent value="search">
          <AdvancedSearch onSearch={handleSearch} onClearFilters={handleClearFilters} />
        </TabsContent>

        <TabsContent value="export">
          <ExportImportManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;