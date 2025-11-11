import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import AIAdvisor from "@/components/AIAdvisor";
import { regionalStats } from "@/lib/mockData";
import { 
  Sprout, 
  Warehouse, 
  BarChart3, 
  Apple,
  TrendingUp,
  Users,
  Package,
  Shield,
  Sparkles,
  Brain,
  Zap
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Farmer Portal",
      description: "AI-powered crop advisory, season planning, and harvest forecasts",
      icon: Sprout,
      path: "/farmer",
      color: "from-green-600 to-green-700"
    },
    {
      title: "Micro-Hub Operations",
      description: "Intake, storage, grading, and dispatch management",
      icon: Warehouse,
      path: "/hub",
      color: "from-amber-600 to-amber-700"
    },
    {
      title: "Regional Planning",
      description: "AI-driven demand-supply monitoring and intervention tools",
      icon: BarChart3,
      path: "/planner",
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "Nutrition Planning",
      description: "AI-optimized household nutrition with seasonal local sourcing",
      icon: Apple,
      path: "/nutrition",
      color: "from-red-600 to-red-700"
    }
  ];

  const aiFeatures = [
    {
      title: "Intelligent Crop Recommendations",
      description: "AI analyzes soil type, climate, and market demand to suggest optimal crops",
      icon: Brain
    },
    {
      title: "Real-Time Market Insights",
      description: "Price trends, demand forecasts, and best selling periods powered by AI",
      icon: TrendingUp
    },
    {
      title: "Weather-Based Advisories",
      description: "AI-generated farming guidance based on 7-day weather forecasts",
      icon: Zap
    },
    {
      title: "Pest & Disease Management",
      description: "AI-powered diagnosis and organic/chemical treatment recommendations",
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FOOD-GRID</h1>
                <p className="text-xs text-gray-600">AI-Powered Food Ecosystem Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">AI ENABLED</span>
              </div>
              <Shield className="h-4 w-4 text-green-700" />
              <span className="text-sm text-gray-700">Mandya District</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-green-700" />
            <h2 className="text-4xl font-bold text-gray-900">
              AI-Powered Agriculture Intelligence
            </h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            A coordinated, self-optimizing food system delivering food security, 
            nutritional quality, and farmer prosperity through real-time data and advanced AI.
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="border-green-200 bg-gradient-to-br from-white to-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatsCard
            title="Total Farmers"
            value={regionalStats.totalFarmers.toLocaleString()}
            icon={Users}
            trend="up"
            trendValue="+12% this month"
          />
          <StatsCard
            title="Monthly Volume"
            value={regionalStats.monthlyVolume}
            icon={Package}
            trend="up"
            trendValue="+8% vs last month"
          />
          <StatsCard
            title="Waste Reduction"
            value={regionalStats.wasteReduction}
            icon={TrendingUp}
            trend="up"
            trendValue="Target: 30%"
          />
          <StatsCard
            title="AI Accuracy"
            value={regionalStats.forecastAccuracy}
            icon={Brain}
            description="Forecast precision"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* AI Advisor - Featured */}
          <div className="lg:col-span-2">
            <AIAdvisor />
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <Card className="border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Sparkles className="h-5 w-5 text-green-700" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Crop recommendations based on soil & climate</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Market price predictions & demand forecasts</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Weather-based farming advisories</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Pest & disease diagnosis with solutions</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Soil health & fertilizer guidance</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Government schemes & subsidy info</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Nutrition planning with local produce</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-gray-900">Platform Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Farmer Income</span>
                  <span className="text-sm font-bold text-green-700">+18%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Nutrition Score</span>
                  <span className="text-sm font-bold text-blue-700">7.2/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Price Stability</span>
                  <span className="text-sm font-bold text-indigo-700">92%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <Card 
              key={role.path}
              className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-green-200"
              onClick={() => navigate(role.path)}
            >
              <CardHeader>
                <div className={`h-12 w-12 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center mb-3`}>
                  <role.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">{role.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-green-700 hover:bg-green-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(role.path);
                  }}
                >
                  Access Portal
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-green-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Brain className="h-4 w-4 text-green-700" />
              FOOD-GRID Platform - AI-Powered Phase 1 Pilot | Mandya District, Karnataka
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Active Hubs: {regionalStats.activeHubs}</span>
              <span>•</span>
              <span>AI Accuracy: {regionalStats.forecastAccuracy}</span>
              <span>•</span>
              <span>Price Stability: {regionalStats.priceStability}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}