import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatsCard from "@/components/StatsCard";
import { nutritionPlan } from "@/lib/mockData";
import { 
  ArrowLeft, 
  Apple,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NutritionPlanner() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white border-b border-red-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-red-600 to-pink-700 rounded-lg flex items-center justify-center">
                <Apple className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Nutrition Planning</h1>
                <p className="text-sm text-gray-600">Household Meal Planning with Local Produce</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Household Info */}
        <Card className="mb-6 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-gray-900">Your Nutrition Plan</CardTitle>
                <CardDescription className="mt-2">
                  Household Size: {nutritionPlan.householdSize} members
                </CardDescription>
              </div>
              <Badge className="bg-green-700 text-lg px-4 py-2">
                Score: {nutritionPlan.nutritionScore}/10
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard
            title="Nutrition Score"
            value={`${nutritionPlan.nutritionScore}/10`}
            icon={Apple}
            trend="up"
            trendValue="+0.8 vs last month"
          />
          <StatsCard
            title="Monthly Savings"
            value={nutritionPlan.monthlySavings}
            icon={DollarSign}
            description="vs market prices"
            trend="up"
          />
          <StatsCard
            title="Local Sourcing"
            value="95%"
            icon={MapPin}
            description="From nearby hubs"
            trend="up"
          />
        </div>

        {/* Weekly Meal Plan */}
        <Card className="mb-6 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-gray-900">Weekly Meal Plan</CardTitle>
                <CardDescription>Seasonal, locally-sourced nutrition</CardDescription>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <Calendar className="h-4 w-4 mr-2" />
                Customize Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Crops / Ingredients</TableHead>
                  <TableHead>Key Nutrients</TableHead>
                  <TableHead>Local Source</TableHead>
                  <TableHead className="text-right">Est. Cost</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nutritionPlan.weeklyPlan.map((day) => (
                  <TableRow key={day.day}>
                    <TableCell className="font-medium">{day.day}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {day.crops.map((crop, index) => (
                          <Badge key={index} variant="outline" className="border-green-700 text-green-700">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{day.nutrients}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-red-600" />
                        <span className="text-sm">{day.localSource}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{day.cost}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                        Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Nutrition Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-gray-900">Nutrition Insights</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Seasonal Advantage</h4>
                <p className="text-sm text-gray-700">
                  Current season offers excellent availability of iron-rich crops like Ragi and Spinach. 
                  Your plan maximizes these nutrients at 30% lower cost than off-season.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Nutrient Balance</h4>
                <p className="text-sm text-gray-700">
                  Your weekly plan provides balanced macronutrients and covers 85% of recommended 
                  daily micronutrient intake for a family of 4.
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-gray-900 mb-2">Local Impact</h4>
                <p className="text-sm text-gray-700">
                  By sourcing locally, you're supporting 12 farmers in your district and reducing 
                  food miles by 85% compared to market purchases.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="text-gray-900">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Apple className="h-4 w-4 mr-2" />
                Place Weekly Order
              </Button>
              <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Month Plan
              </Button>
              <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                <TrendingUp className="h-4 w-4 mr-2" />
                Track Nutrition Progress
              </Button>
              <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                <MapPin className="h-4 w-4 mr-2" />
                Find Nearby Hubs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}