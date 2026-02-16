import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorkflowHero from "./pages/WorkflowHero";
import PersonalizationDemo from "./pages/PersonalizationDemo";
import Docs from "./pages/Docs";
import A11yAudit from "./pages/A11yAudit";
import DesignSystem from "./pages/DesignSystem";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workflow-hero" element={<WorkflowHero />} />
          <Route path="/personalization-demo" element={<PersonalizationDemo />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/a11y" element={<A11yAudit />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
