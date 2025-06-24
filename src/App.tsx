
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { LocalDesignSystemProvider } from "@/hooks/useLocalDesignSystem";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ComponentPage from "./pages/ComponentPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import DocumentationPage from "./pages/DocumentationPage";
import AuditPage from "./pages/AuditPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocalDesignSystemProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <MainLayout>
                <Index />
              </MainLayout>
            } />
            <Route path="/category/:slug" element={
              <MainLayout>
                <CategoryPage />
              </MainLayout>
            } />
            <Route path="/component/:slug" element={
              <MainLayout>
                <ComponentPage />
              </MainLayout>
            } />
            <Route path="/analytics" element={
              <MainLayout>
                <AnalyticsPage />
              </MainLayout>
            } />
            <Route path="/documentation" element={
              <MainLayout>
                <DocumentationPage />
              </MainLayout>
            } />
            <Route path="/audit" element={
              <MainLayout>
                <AuditPage />
              </MainLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocalDesignSystemProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
