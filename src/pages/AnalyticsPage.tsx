
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import { ExportImportManager } from "@/components/export/ExportImportManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download } from "lucide-react";

const AnalyticsPage = () => {
  const handleSearch = (query: string, filters: any) => {
    console.log("Search:", query, filters);
    // Search functionality can be implemented to filter static data
  };

  const handleClearFilters = () => {
    console.log("Clear filters");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tools</h1>
        <p className="text-muted-foreground mt-2">
          Advanced tools for managing your design system.
        </p>
      </div>

      <Tabs defaultValue="search" className="space-y-6">
        <TabsList>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Advanced Search
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export/Import
          </TabsTrigger>
        </TabsList>

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
