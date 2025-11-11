import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/StatsCard";
import AIAdvisor from "@/components/AIAdvisor";
import LanguageToggle from "@/components/LanguageToggle";
import { farmerProfile, cropRecommendations, weatherForecast } from "@/lib/mockData";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  MapPin, 
  Sprout, 
  TrendingUp, 
  Droplets,
  Calendar,
  Cloud,
  Sun,
  CloudRain
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const getWeatherIcon = (icon: string) => {
    switch(icon) {
      case "sun": return <Sun className="h-5 w-5 text-yellow-500" />;
      case "rain": return <CloudRain className="h-5 w-5 text-blue-500" />;
      default: return <Cloud className="h-5 w-5 text-gray-500" />;
    }
  };

  const handlePlanCrop = (cropName: string) => {
    toast.success(t('common.success'), {
      description: `Planning started for ${cropName}`
    });
  };

  const handleQuickAction = (action: string) => {
    toast.info("Action", {
      description: `${action} feature coming soon!`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{t('farmer.title')}</h1>
                  <p className="text-sm text-gray-600">{farmerProfile.name}</p>
                </div>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Farmer Profile */}
        <Card className="mb-6 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-gray-900">{farmerProfile.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4" />
                  {farmerProfile.location}
                </CardDescription>
              </div>
              <Badge className="bg-green-700">{t('farmer.active')}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('farmer.farmSize')}</p>
                <p className="text-lg font-semibold text-gray-900">{farmerProfile.farmSize}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('farmer.soilType')}</p>
                <p className="text-lg font-semibold text-gray-900">{farmerProfile.soilType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('farmer.farmerId')}</p>
                <p className="text-lg font-semibold text-gray-900">{farmerProfile.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('farmer.season')}</p>
                <p className="text-lg font-semibold text-gray-900">Kharif 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather Widget */}
            <Card className="border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Cloud className="h-5 w-5 text-blue-600" />
                  {t('farmer.weather')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  {weatherForecast.weekly.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm font-medium text-gray-700">{day.day}</p>
                      <div className="my-2 flex justify-center">
                        {getWeatherIcon(day.icon)}
                      </div>
                      <p className="text-sm text-gray-900">{day.temp}</p>
                      <p className="text-xs text-blue-600">{day.rain}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>{t('farmer.advisory')}:</strong> {weatherForecast.advisory}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Crop Recommendations */}
            <Card className="border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-gray-900">{t('farmer.cropRecommendations')}</CardTitle>
                <CardDescription>
                  {t('farmer.cropRecommendations.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {cropRecommendations.map((crop, index) => (
                    <div 
                      key={index}
                      className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{crop.crop}</h3>
                          <p className="text-sm text-gray-600">{crop.season}</p>
                        </div>
                        <Badge 
                          className={
                            crop.suitability >= 90 
                              ? "bg-green-700" 
                              : crop.suitability >= 80 
                              ? "bg-yellow-600" 
                              : "bg-gray-600"
                          }
                        >
                          {crop.suitability}% {t('farmer.match')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-700" />
                          <div>
                            <p className="text-xs text-gray-600">{t('farmer.expectedYield')}</p>
                            <p className="text-sm font-medium text-gray-900">{crop.expectedYield}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sprout className="h-4 w-4 text-green-700" />
                          <div>
                            <p className="text-xs text-gray-600">{t('farmer.marketDemand')}</p>
                            <p className="text-sm font-medium text-gray-900">{t(`market.${crop.marketDemand.toLowerCase()}`)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-600">{t('farmer.waterNeed')}</p>
                            <p className="text-sm font-medium text-gray-900">{t(`water.${crop.waterRequirement.toLowerCase()}`)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-amber-600" />
                          <div>
                            <p className="text-xs text-gray-600">{t('farmer.season')}</p>
                            <p className="text-sm font-medium text-gray-900">Kharif</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 bg-green-50 p-2 rounded">
                        <strong>{t('farmer.whyThisCrop')}:</strong> {crop.reason}
                      </p>
                      
                      <Button 
                        className="w-full mt-3 bg-green-700 hover:bg-green-800"
                        onClick={() => handlePlanCrop(crop.crop)}
                      >
                        {t('farmer.planCrop')}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AIAdvisor />
            
            <Card className="border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-gray-900">{t('farmer.quickActions')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <Button 
                  className="w-full bg-green-700 hover:bg-green-800"
                  onClick={() => handleQuickAction(t('farmer.registerCrop'))}
                >
                  {t('farmer.registerCrop')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-green-700 text-green-700 hover:bg-green-50"
                  onClick={() => handleQuickAction(t('farmer.viewPrices'))}
                >
                  {t('farmer.viewPrices')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-green-700 text-green-700 hover:bg-green-50"
                  onClick={() => handleQuickAction(t('farmer.scheduleHarvest'))}
                >
                  {t('farmer.scheduleHarvest')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-green-700 text-green-700 hover:bg-green-50"
                  onClick={() => handleQuickAction(t('farmer.connectHub'))}
                >
                  {t('farmer.connectHub')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}