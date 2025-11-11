import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import StatsCard from "@/components/StatsCard";
import { hubInventory } from "@/lib/mockData";
import { 
  ArrowLeft, 
  Warehouse, 
  Package,
  Thermometer,
  TrendingUp,
  Truck,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MicroHubDashboard() {
  const navigate = useNavigate();

  const storageCapacity = 75;
  const totalInventory = "11,450 kg";
  const todayIntake = "2,450 kg";
  const pendingDispatch = "5,800 kg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white border-b border-amber-200 shadow-sm">
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
              <div className="h-10 w-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center">
                <Warehouse className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Micro-Hub Operations</h1>
                <p className="text-sm text-gray-600">Mandya Hub #1</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Inventory"
            value={totalInventory}
            icon={Package}
            description="Across all storage units"
          />
          <StatsCard
            title="Today's Intake"
            value={todayIntake}
            icon={TrendingUp}
            trend="up"
            trendValue="+15% vs yesterday"
          />
          <StatsCard
            title="Pending Dispatch"
            value={pendingDispatch}
            icon={Truck}
            description="Ready for delivery"
          />
          <StatsCard
            title="Storage Capacity"
            value={`${storageCapacity}%`}
            icon={Warehouse}
            trend={storageCapacity > 80 ? "up" : "neutral"}
            trendValue={storageCapacity > 80 ? "Near capacity" : "Available space"}
          />
        </div>

        {/* Storage Capacity Card */}
        <Card className="mb-6 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
            <CardTitle className="text-gray-900">Storage Capacity Monitor</CardTitle>
            <CardDescription>Real-time capacity utilization</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Capacity</span>
                  <span className="text-sm font-semibold text-gray-900">{storageCapacity}%</span>
                </div>
                <Progress value={storageCapacity} className="h-3" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Cold Storage</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">68%</p>
                  <Progress value={68} className="h-2 mt-2" />
                </div>
                
                <div className="border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Warehouse className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Room Temp</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">82%</p>
                  <Progress value={82} className="h-2 mt-2" />
                </div>
                
                <div className="border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Dry Storage</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">55%</p>
                  <Progress value={55} className="h-2 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card className="border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-gray-900">Current Inventory</CardTitle>
                <CardDescription>All items in storage</CardDescription>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700">
                Log New Intake
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Farmer ID</TableHead>
                  <TableHead>Intake Date</TableHead>
                  <TableHead>Storage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hubInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.crop}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <Badge className={item.grade === "A" ? "bg-green-700" : "bg-yellow-600"}>
                        Grade {item.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.farmerId}</TableCell>
                    <TableCell>{item.intakeDate}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Thermometer className="h-3 w-3 text-blue-600" />
                      {item.storageTemp}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          item.status === "Ready for Dispatch" 
                            ? "border-green-700 text-green-700" 
                            : "border-gray-700 text-gray-700"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-amber-600 text-amber-600 hover:bg-amber-50"
                      >
                        {item.status === "Ready for Dispatch" ? "Dispatch" : "View"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="h-8 w-8 text-green-700" />
                <div>
                  <h3 className="font-semibold text-gray-900">Quality Check</h3>
                  <p className="text-sm text-gray-600">Grade and certify intake</p>
                </div>
              </div>
              <Button className="w-full bg-green-700 hover:bg-green-800">
                Start Grading
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Truck className="h-8 w-8 text-blue-700" />
                <div>
                  <h3 className="font-semibold text-gray-900">Schedule Dispatch</h3>
                  <p className="text-sm text-gray-600">Plan delivery routes</p>
                </div>
              </div>
              <Button className="w-full bg-blue-700 hover:bg-blue-800">
                Schedule Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Package className="h-8 w-8 text-amber-700" />
                <div>
                  <h3 className="font-semibold text-gray-900">Inventory Report</h3>
                  <p className="text-sm text-gray-600">Generate detailed report</p>
                </div>
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}