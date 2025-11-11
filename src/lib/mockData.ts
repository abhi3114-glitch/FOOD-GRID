// Mock data for FOOD-GRID platform

export const farmerProfile = {
  id: "F001",
  name: "Rajesh Kumar",
  location: "Mandya District, Karnataka",
  farmSize: "5 acres",
  soilType: "Red Sandy Loam",
  coordinates: { lat: 12.5244, lng: 76.8951 }
};

export const cropRecommendations = [
  {
    crop: "Ragi (Finger Millet)",
    season: "Kharif 2025",
    suitability: 95,
    expectedYield: "2.5 tons/acre",
    marketDemand: "High",
    waterRequirement: "Low",
    reason: "Excellent match for red sandy loam, drought resistant, high local demand"
  },
  {
    crop: "Groundnut",
    season: "Kharif 2025",
    suitability: 88,
    expectedYield: "1.8 tons/acre",
    marketDemand: "Medium",
    waterRequirement: "Medium",
    reason: "Good soil compatibility, stable market prices"
  },
  {
    crop: "Green Gram",
    season: "Rabi 2025-26",
    suitability: 82,
    expectedYield: "0.8 tons/acre",
    marketDemand: "High",
    waterRequirement: "Low",
    reason: "Nitrogen fixing, improves soil health, good rotation crop"
  }
];

export const hubInventory = [
  {
    id: "INV001",
    crop: "Tomatoes",
    quantity: "2,450 kg",
    grade: "A",
    farmerId: "F023",
    intakeDate: "2025-11-07",
    storageTemp: "4°C",
    status: "In Storage"
  },
  {
    id: "INV002",
    crop: "Onions",
    quantity: "5,800 kg",
    grade: "B",
    farmerId: "F045",
    intakeDate: "2025-11-06",
    storageTemp: "Room Temp",
    status: "Ready for Dispatch"
  },
  {
    id: "INV003",
    crop: "Potatoes",
    quantity: "3,200 kg",
    grade: "A",
    farmerId: "F012",
    intakeDate: "2025-11-08",
    storageTemp: "8°C",
    status: "In Storage"
  }
];

export const regionalStats = {
  totalFarmers: 1247,
  activeHubs: 8,
  monthlyVolume: "145 tons",
  wasteReduction: "23%",
  avgFarmerIncome: "+18%",
  nutritionScore: 7.2,
  priceStability: "92%",
  forecastAccuracy: "87%"
};

export const demandSupplyData = [
  { district: "Mandya", demand: 850, supply: 920, gap: 70, status: "Surplus" },
  { district: "Mysuru", demand: 1200, supply: 1050, gap: -150, status: "Deficit" },
  { district: "Hassan", demand: 650, supply: 680, gap: 30, status: "Balanced" },
  { district: "Tumakuru", demand: 980, supply: 750, gap: -230, status: "Critical" }
];

export const nutritionPlan = {
  householdSize: 4,
  weeklyPlan: [
    {
      day: "Monday",
      crops: ["Ragi", "Spinach", "Tomatoes"],
      nutrients: "Iron, Calcium, Vitamin C",
      localSource: "Mandya Hub",
      cost: "₹180"
    },
    {
      day: "Tuesday",
      crops: ["Rice", "Beans", "Carrots"],
      nutrients: "Protein, Fiber, Vitamin A",
      localSource: "Mandya Hub",
      cost: "₹165"
    },
    {
      day: "Wednesday",
      crops: ["Jowar", "Cabbage", "Onions"],
      nutrients: "Fiber, Vitamin K, Antioxidants",
      localSource: "Hassan Hub",
      cost: "₹145"
    }
  ],
  nutritionScore: 8.1,
  monthlySavings: "₹450"
};

export const weatherForecast = {
  current: {
    temp: "28°C",
    humidity: "65%",
    rainfall: "0mm",
    condition: "Partly Cloudy"
  },
  weekly: [
    { day: "Mon", temp: "29°C", rain: "0mm", icon: "sun" },
    { day: "Tue", temp: "27°C", rain: "5mm", icon: "cloud" },
    { day: "Wed", temp: "26°C", rain: "12mm", icon: "rain" },
    { day: "Thu", temp: "28°C", rain: "2mm", icon: "cloud" },
    { day: "Fri", temp: "30°C", rain: "0mm", icon: "sun" }
  ],
  advisory: "Light to moderate rainfall expected mid-week. Delay pesticide application. Good conditions for transplanting."
};

export const alerts = [
  {
    id: "A001",
    type: "Critical",
    district: "Tumakuru",
    message: "Demand-supply gap exceeding 20%. Immediate intervention required.",
    timestamp: "2025-11-09 08:30"
  },
  {
    id: "A002",
    type: "Warning",
    district: "Mysuru",
    message: "Storage capacity at 85%. Plan dispatch or expand storage.",
    timestamp: "2025-11-09 07:15"
  },
  {
    id: "A003",
    type: "Info",
    district: "Mandya",
    message: "New farmer cluster onboarded. 45 farmers added.",
    timestamp: "2025-11-08 16:20"
  }
];