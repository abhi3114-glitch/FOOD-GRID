import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import StatsCard from "@/components/StatsCard";
import { regionalStats, demandSupplyData, alerts } from "@/lib/mockData";
import { 
  ArrowLeft, 
  BarChart3,
  TrendingUp,
  Users,
  Package,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlannerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-200 shadow-sm">
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
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Regional Planning Dashboard</h1>
                <p className="text-sm text-gray-600">Karnataka State - Multi-District View</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Alerts Section */}
        <div className="mb-6 space-y-3">
          {alerts.map((alert) => (
            <Alert 
              key={alert.id}
              className={
                alert.type === "Critical" 
                  ? "border-red-500 bg-red-50" 
                  : alert.type === "Warning"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-blue-500 bg-blue-50"
              }
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="flex items-center gap-2">
                <Badge className={
                  alert.type === "Critical" 
                    ? "bg-red-700" 
                    : alert.type === "Warning"
                    ? "bg-yellow-700"
                    : "bg-blue-700"
                }>
                  {alert.type}
                </Badge>
                {alert.district}
              </AlertTitle>
              <AlertDescription className="mt-2">
                {alert.message}
                <span className="text-xs text-gray-600 ml-2">• {alert.timestamp}</span>
              </AlertDescription>
              <Button 
                size="sm" 
                className="mt-3 bg-gray-900 hover:bg-gray-800"
              >
                Take Action
              </Button>
            </Alert>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            title="Forecast Accuracy"
            value={regionalStats.forecastAccuracy}
            icon={BarChart3}
            description="AI prediction accuracy"
          />
        </div>

        {/* Demand-Supply Analysis */}
        <Card className="mb-6 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-gray-900">District-Level Demand-Supply Analysis</CardTitle>
            <CardDescription>Real-time monitoring across all districts (in tons)</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>District</TableHead>
                  <TableHead className="text-right">Demand</TableHead>
                  <TableHead className="text-right">Supply</TableHead>
                  <TableHead className="text-right">Gap</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demandSupplyData.map((district) => (
                  <TableRow key={district.district}>
                    <TableCell className="font-medium">{district.district}</TableCell>
                    <TableCell className="text-right">{district.demand}</TableCell>
                    <TableCell className="text-right">{district.supply}</TableCell>
                    <TableCell className="text-right">
                      <span className={district.gap > 0 ? "text-green-700" : "text-red-700"}>
                        {district.gap > 0 ? "+" : ""}{district.gap}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          district.status === "Surplus" 
                            ? "bg-green-700" 
                            : district.status === "Deficit"
                            ? "bg-red-700"
                            : district.status === "Critical"
                            ? "bg-red-900"
                            : "bg-blue-700"
                        }
                      >
                        {district.status === "Surplus" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {district.status === "Deficit" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {district.status === "Critical" && <XCircle className="h-3 w-3 mr-1" />}
                        {district.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={
                          district.status === "Critical"
                            ? "border-red-700 text-red-700 hover:bg-red-50"
                            : "border-blue-700 text-blue-700 hover:bg-blue-50"
                        }
                      >
                        {district.status === "Critical" ? "Intervene" : "View Details"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-gray-900">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Farmer Income Increase</span>
                <span className="text-lg font-bold text-green-700">{regionalStats.avgFarmerIncome}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Nutrition Score</span>
                <span className="text-lg font-bold text-blue-700">{regionalStats.nutritionScore}/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Price Stability</span>
                <span className="text-lg font-bold text-indigo-700">{regionalStats.priceStability}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Active Hubs</span>
                <span className="text-lg font-bold text-amber-700">{regionalStats.activeHubs}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-gray-900">Intervention Tools</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <Button className="w-full bg-blue-700 hover:bg-blue-800">
                Generate Forecast Report
              </Button>
              <Button className="w-full bg-indigo-700 hover:bg-indigo-800">
                Plan Reserve Distribution
              </Button>
              <Button className="w-full bg-purple-700 hover:bg-purple-800">
                Optimize Hub Network
              </Button>
              <Button className="w-full bg-pink-700 hover:bg-pink-800">
                Crisis Response Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}