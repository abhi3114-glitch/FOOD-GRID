# FOOD-GRID MVP Development Plan

## Overview
Building an intelligent food ecosystem platform with farmer advisory, micro-hub management, regional dashboards, and nutrition planning.

## Design System
- Earth tones: greens (#2D5016, #4A7C2C), browns (#8B4513, #D2691E), warm neutrals
- Clean typography, farm photography
- Mobile-first, high-clarity UI
- No emojis, minimal graphics

## Core Files to Create (8 files max)

### 1. src/pages/Index.tsx
- Landing page with platform overview
- Role-based navigation (Farmer, Hub Operator, Planner, Household)
- Quick stats dashboard
- Earth-tone hero section with farm imagery

### 2. src/pages/FarmerDashboard.tsx
- Farm registration and profile
- Crop advisory with soil-based recommendations
- Season planning calendar
- Harvest window forecasts
- Weather integration display

### 3. src/pages/MicroHubDashboard.tsx
- Intake logging interface
- Storage capacity monitoring
- Grading and quality control
- Dispatch scheduling
- Inventory tracking

### 4. src/pages/PlannerDashboard.tsx
- Regional demand-supply monitoring
- Crisis alerts and intervention tools
- District-level metrics
- Forecasting visualizations
- Multi-hub overview

### 5. src/pages/NutritionPlanner.tsx
- Household nutrition planning
- Seasonal local sourcing recommendations
- Nutrition score tracking
- Meal planning with local produce

### 6. src/components/AIAdvisor.tsx
- Chat interface for AI advisory
- Contextual guidance system
- Document retrieval interface
- Farm-specific recommendations

### 7. src/lib/mockData.ts
- Sample farmer data
- Crop recommendations
- Hub inventory data
- Regional statistics
- Nutrition data

### 8. src/components/StatsCard.tsx
- Reusable stats display component
- KPI visualization
- Metric cards for dashboards

## Key Features Per File
- Role-based routing and access
- Real-time data displays (mocked)
- Mobile-responsive forms
- Clean agricultural aesthetic
- Traceability and reporting views

## Implementation Priority
1. Landing page with navigation
2. Farmer dashboard (core user)
3. Micro-hub management
4. Planner dashboard
5. Nutrition planner
6. AI advisor component
7. Mock data and utilities
8. Stats components

## Technical Notes
- Use Tailwind for styling (earth tones)
- shadcn/ui components for forms, cards, tables
- React Router for navigation
- Mock data for MVP demonstration
- Chart components for visualizations
- Mobile-first responsive design