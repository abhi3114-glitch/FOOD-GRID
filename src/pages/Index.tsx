import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import AIAdvisor from "@/components/AIAdvisor";
import LanguageToggle from "@/components/LanguageToggle";
import { regionalStats } from "@/lib/mockData";
import { useLanguage } from "@/hooks/useLanguage";
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
  const { t } = useLanguage();

  const roles = [
    {
      title: t('role.farmer'),
      description: t('role.farmer.desc'),
      icon: Sprout,
      path: "/farmer",
      color: "from-green-600 to-green-700"
    },
    {
      title: t('role.hub'),
      description: t('role.hub.desc'),
      icon: Warehouse,
      path: "/hub",
      color: "from-amber-600 to-amber-700"
    },
    {
      title: t('role.planner'),
      description: t('role.planner.desc'),
      icon: BarChart3,
      path: "/planner",
      color: "from-blue-600 to-blue-700"
    },
    {
      title: t('role.nutrition'),
      description: t('role.nutrition.desc'),
      icon: Apple,
      path: "/nutrition",
      color: "from-red-600 to-red-700"
    }
  ];

  const aiFeatures = [
    {
      title: t('ai.cropRecommendations'),
      description: t('ai.cropRecommendations.desc'),
      icon: Brain
    },
    {
      title: t('ai.marketInfo'),
      description: t('ai.marketInfo.desc'),
      icon: TrendingUp
    },
    {
      title: t('ai.weatherAdvice'),
      description: t('ai.weatherAdvice.desc'),
      icon: Zap
    },
    {
      title: t('ai.pestManagement'),
      description: t('ai.pestManagement.desc'),
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sprout className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('app.title')}</h1>
                <p className="text-xs text-gray-600 hidden sm:block">{t('app.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2 sm:px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">{t('app.aiEnabled')}</span>
              </div>
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-700" />
              <span className="text-xs sm:text-sm text-gray-700">{t('app.district')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 sm:py-12">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-green-700" />
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
              {t('hero.title')}
            </h2>
          </div>
          <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
            {t('hero.description')}
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="border-green-200 bg-gradient-to-br from-white to-green-50">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h3>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-12">
          <StatsCard
            title={t('stats.totalFarmers')}
            value={regionalStats.totalFarmers.toLocaleString()}
            icon={Users}
            trend="up"
            trendValue={`+12% ${t('stats.thisMonth')}`}
          />
          <StatsCard
            title={t('stats.monthlyVolume')}
            value={regionalStats.monthlyVolume}
            icon={Package}
            trend="up"
            trendValue={`+8% ${t('stats.fromLastMonth')}`}
          />
          <StatsCard
            title={t('stats.wasteReduction')}
            value={regionalStats.wasteReduction}
            icon={TrendingUp}
            trend="up"
            trendValue={`${t('stats.target')}: 30%`}
          />
          <StatsCard
            title={t('stats.aiAccuracy')}
            value={regionalStats.forecastAccuracy}
            icon={Brain}
            description={t('stats.forecastAccuracy')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-12">
          {/* AI Advisor - Featured */}
          <div className="lg:col-span-2">
            <AIAdvisor />
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <Card className="border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                <CardTitle className="flex items-center gap-2 text-gray-900 text-base">
                  <Sparkles className="h-4 w-4 text-green-700" />
                  {t('ai.capabilities')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700">{t('ai.cap.soilBased')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700">{t('ai.cap.marketForecast')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700">{t('ai.cap.weatherBased')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700">{t('ai.cap.pestDiagnosis')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700">{t('ai.cap.soilHealth')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700">{t('ai.cap.govSchemes')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700">{t('ai.cap.nutritionPlan')}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="p-4">
                <CardTitle className="text-gray-900 text-base">{t('impact.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-700">{t('impact.farmerIncome')}</span>
                  <span className="text-xs sm:text-sm font-bold text-green-700">+18%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-700">{t('impact.nutritionScore')}</span>
                  <span className="text-xs sm:text-sm font-bold text-blue-700">7.2/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-700">{t('impact.priceStability')}</span>
                  <span className="text-xs sm:text-sm font-bold text-indigo-700">92%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {roles.map((role) => (
            <Card 
              key={role.path}
              className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-green-200"
              onClick={() => navigate(role.path)}
            >
              <CardHeader className="p-4">
                <div className={`h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center mb-3`}>
                  <role.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-base sm:text-lg">{role.title}</CardTitle>
                <CardDescription className="text-gray-600 text-xs sm:text-sm">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button 
                  className="w-full bg-green-700 hover:bg-green-800 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(role.path);
                  }}
                >
                  {t('role.accessPortal')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-green-200 mt-8 sm:mt-16">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 text-center sm:text-left">
              <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-green-700 flex-shrink-0" />
              {t('footer.platform')}
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <span>{t('footer.activeHubs')}: {regionalStats.activeHubs}</span>
              <span className="hidden sm:inline">•</span>
              <span>{t('footer.aiAccuracy')}: {regionalStats.forecastAccuracy}</span>
              <span className="hidden sm:inline">•</span>
              <span>{t('footer.priceStability')}: {regionalStats.priceStability}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}