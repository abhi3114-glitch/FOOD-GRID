import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import FarmerDashboard from './pages/FarmerDashboard';
import MicroHubDashboard from './pages/MicroHubDashboard';
import PlannerDashboard from './pages/PlannerDashboard';
import NutritionPlanner from './pages/NutritionPlanner';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/hub" element={<MicroHubDashboard />} />
          <Route path="/planner" element={<PlannerDashboard />} />
          <Route path="/nutrition" element={<NutritionPlanner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;