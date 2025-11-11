# FOOD-GRID - AI-Powered Food Ecosystem Platform

An intelligent, decentralized food ecosystem platform that connects farmers, logistics, storage hubs, buyers, nutrition systems, and planning authorities into one coordinated network.

## 🌾 Features

- **AI-Powered Crop Advisory** - Real-time recommendations using Groq's llama-3.1-8b-instant
- **Farmer Dashboard** - Crop planning, weather forecasts, market insights
- **Micro-Hub Operations** - Inventory management, storage monitoring, dispatch scheduling
- **Regional Planning** - Demand-supply analysis, crisis alerts, intervention tools
- **Nutrition Planning** - AI-optimized meal plans with local seasonal produce
- **Interactive AI Advisor** - Chat interface for farming guidance and insights

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **AI Integration**: Groq SDK (llama-3.1-8b-instant)
- **State Management**: React Query
- **Routing**: React Router v6

## 📋 Prerequisites

- Node.js 18+ and pnpm
- Groq API key (get one at [console.groq.com](https://console.groq.com))

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/abhi3114-glitch/FOOD-GRID.git
cd FOOD-GRID
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Groq API Configuration
VITE_GROQ_API_KEY=your_groq_api_key_here

# Application Configuration
VITE_APP_NAME=FOOD-GRID
VITE_APP_ENVIRONMENT=production
```

**Important**: Replace `your_groq_api_key_here` with your actual Groq API key.

4. **Start development server**
```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
pnpm run build
```

The production build will be in the `dist` directory.

## 📁 Project Structure

```
FOOD-GRID/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AIAdvisor.tsx    # AI chat interface
│   │   └── StatsCard.tsx    # Reusable stats component
│   ├── pages/
│   │   ├── Index.tsx        # Landing page
│   │   ├── FarmerDashboard.tsx
│   │   ├── MicroHubDashboard.tsx
│   │   ├── PlannerDashboard.tsx
│   │   └── NutritionPlanner.tsx
│   ├── lib/
│   │   ├── groqService.ts   # Groq AI integration
│   │   ├── mockData.ts      # Sample data
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment template
└── package.json
```

## 🤖 AI Integration

The platform uses Groq's llama-3.1-8b-instant model for:

- Intelligent crop recommendations based on soil, climate, and market data
- Real-time market price analysis and demand forecasting
- Weather-based farming advisories
- Pest and disease diagnosis with treatment recommendations
- Soil health management guidance
- Government schemes and subsidy information
- Nutrition planning with local seasonal produce

### Getting a Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env` file

## 🎨 Design System

- **Color Palette**: Earth tones (greens, browns, warm neutrals)
- **Typography**: Clean, readable fonts
- **Layout**: Mobile-first responsive design
- **Theme**: Agricultural and farm-focused aesthetic

## 📊 Key Metrics

The platform tracks:
- Total farmers onboarded
- Monthly volume handled
- Waste reduction percentage
- Farmer income increase
- Nutrition score improvements
- AI forecast accuracy
- Price stability index

## 🔐 Security

- Environment variables for sensitive data
- `.env` file excluded from git
- API keys never exposed in client code
- Row-level security ready for backend integration

## 🚢 Deployment

The application can be deployed to:
- Vercel (recommended)
- Netlify
- Any static hosting service

Make sure to set environment variables in your hosting platform's dashboard.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GROQ_API_KEY` | Groq API key for AI features | Yes |
| `VITE_APP_NAME` | Application name | No |
| `VITE_APP_ENVIRONMENT` | Environment (development/production) | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

FOOD-GRID Platform - Phase 1 Pilot
Mandya District, Karnataka

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Contact the development team

## 🙏 Acknowledgments

- Groq for AI infrastructure
- shadcn/ui for component library
- MetaGPT for development assistance
- Karnataka Agriculture Department for domain expertise

---

**Built with ❤️ for farmers and food security**