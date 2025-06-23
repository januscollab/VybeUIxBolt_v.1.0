
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { DesignSystemProvider } from "@/hooks/useDesignSystem.tsx";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ComponentPage from "./pages/ComponentPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import AuditPage from "./pages/AuditPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/auth/AuthPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DesignSystemProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
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
            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/audit" element={
              <MainLayout>
                <AuditPage />
              </MainLayout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DesignSystemProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
