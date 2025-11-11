import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  trend,
  trendValue 
}: StatsCardProps) {
  const getTrendColor = () => {
    if (trend === "up") return "text-green-700";
    if (trend === "down") return "text-red-700";
    return "text-gray-700";
  };

  return (
    <Card className="border-l-4 border-l-green-700 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-green-700" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
        {trend && trendValue && (
          <p className={`text-xs mt-1 font-medium ${getTrendColor()}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
}