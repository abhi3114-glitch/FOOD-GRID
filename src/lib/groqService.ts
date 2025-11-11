// Groq AI Service for FOOD-GRID platform using llama-3.1-8b-instant
import Groq from "groq-sdk";

interface AIResponse {
  response: string;
  suggestions?: string[];
  confidence?: number;
}

interface CropContext {
  soilType: string;
  farmSize: string;
  location: string;
  season: string;
}

interface QueryContext {
  soilType?: string;
  location?: string;
  [key: string]: string | undefined;
}

class GroqService {
  private static instance: GroqService;
  private groq: Groq | null = null;
  private isInitialized = false;

  private constructor() {
    this.initialize();
  }

  private initialize() {
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (apiKey && apiKey !== 'gsk_your_actual_groq_api_key_here') {
        this.groq = new Groq({
          apiKey: apiKey,
          dangerouslyAllowBrowser: true
        });
        this.isInitialized = true;
        console.log('Groq AI initialized successfully');
      } else {
        console.warn('Groq API key not configured. Using fallback responses.');
      }
    } catch (error) {
      console.error('Failed to initialize Groq:', error);
    }
  }

  static getInstance(): GroqService {
    if (!GroqService.instance) {
      GroqService.instance = new GroqService();
    }
    return GroqService.instance;
  }

  async queryAI(query: string, context?: QueryContext): Promise<AIResponse> {
    if (!this.isInitialized || !this.groq) {
      return this.getFallbackResponse(query, context);
    }

    try {
      const systemPrompt = `You are an expert agricultural AI advisor for the FOOD-GRID platform in India. 
Provide practical, actionable advice for farmers in Karnataka. Focus on:
- Crop recommendations based on soil and climate
- Market insights and pricing
- Weather-based farming guidance
- Pest and disease management
- Soil health and fertilization
- Government schemes and subsidies
- Nutrition planning with local produce

Context: ${context ? JSON.stringify(context) : 'General query'}

Respond in a clear, structured format with specific recommendations. Use Indian Rupees (₹) for prices.`;

      const completion = await this.groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      });

      const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

      return {
        response,
        confidence: 0.9,
        suggestions: this.generateSuggestions(query)
      };
    } catch (error) {
      console.error('Groq API Error:', error);
      return this.getFallbackResponse(query, context);
    }
  }

  async getCropRecommendation(context: CropContext): Promise<AIResponse> {
    const query = `Recommend 3 suitable crops for:
- Soil Type: ${context.soilType}
- Farm Size: ${context.farmSize}
- Location: ${context.location}
- Season: ${context.season}

For each crop, provide:
1. Expected yield per acre
2. Water requirements
3. Current market demand and price in ₹
4. Why it's suitable for this soil/climate`;

    return this.queryAI(query, context);
  }

  async getMarketInsights(crop: string, location: string): Promise<AIResponse> {
    const query = `Provide current market analysis for ${crop} in ${location}:
1. Price trends (last 30 days) in ₹
2. Demand forecast for next 3 months
3. Best selling periods
4. Storage recommendations
5. Action items for farmers`;

    return this.queryAI(query, { location });
  }

  async getWeatherAdvisory(location: string): Promise<AIResponse> {
    const query = `Provide a 7-day farming advisory for ${location}:
1. Expected weather conditions
2. Farming activities to DO
3. Farming activities to AVOID
4. Pest and disease alerts
5. Week-ahead strategy`;

    return this.queryAI(query, { location });
  }

  async getPestControl(crop: string, symptoms: string): Promise<AIResponse> {
    const query = `Diagnose and recommend pest control for ${crop}:
Symptoms: ${symptoms}

Provide:
1. Likely pest/disease identification
2. Organic control methods
3. Chemical alternatives (if needed)
4. Prevention tips for future`;

    return this.queryAI(query);
  }

  async getSoilManagement(soilType: string): Promise<AIResponse> {
    const query = `Provide soil health management guide for ${soilType}:
1. Nutrient management (organic and chemical)
2. Soil improvement strategies
3. pH management
4. Micronutrient deficiency signs
5. Cost-effective amendments`;

    return this.queryAI(query, { soilType });
  }

  async getNutritionPlan(householdSize: number, preferences: string[]): Promise<AIResponse> {
    const query = `Create a weekly nutrition plan for household of ${householdSize}:
Preferences: ${preferences.join(', ')}

Include:
1. Daily meal suggestions with local crops
2. Nutrient breakdown
3. Estimated costs in ₹
4. Shopping list
5. Health benefits`;

    return this.queryAI(query);
  }

  async getGovernmentSchemes(): Promise<AIResponse> {
    const query = `List active government schemes for farmers in Karnataka:
1. PM-KISAN and direct benefit schemes
2. Crop insurance programs
3. Loan and credit facilities
4. Subsidy programs
5. How to apply for each`;

    return this.queryAI(query);
  }

  private getFallbackResponse(query: string, context?: QueryContext): AIResponse {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('crop') && lowerQuery.includes('recommend')) {
      return {
        response: this.getCropRecommendationFallback(context),
        confidence: 0.7,
        suggestions: this.generateSuggestions(query)
      };
    }

    if (lowerQuery.includes('market') || lowerQuery.includes('price')) {
      return {
        response: this.getMarketInsightFallback(),
        confidence: 0.7,
        suggestions: this.generateSuggestions(query)
      };
    }

    if (lowerQuery.includes('weather')) {
      return {
        response: this.getWeatherAdvisoryFallback(),
        confidence: 0.7,
        suggestions: this.generateSuggestions(query)
      };
    }

    return {
      response: `I understand your question about "${query}". For the best AI-powered responses, please configure your Groq API key in the .env file.

In the meantime, here are some general recommendations:
1. Assess your current crop status and soil conditions
2. Consider seasonal factors and market demand
3. Connect with your local micro-hub for support

Would you like specific guidance on crops, markets, or farming techniques?`,
      confidence: 0.5,
      suggestions: this.generateSuggestions(query)
    };
  }

  private getCropRecommendationFallback(context?: QueryContext): string {
    return `**Top 3 Crop Recommendations** (Configure Groq API for AI-powered insights)

**1. Ragi (Finger Millet)** - 95% Match
- Expected Yield: 2.5 tons/acre
- Water: Low (drought resistant)
- Market: ₹35-40/kg, High demand
- Why: Excellent for red sandy loam, nutritious, strong local demand

**2. Groundnut** - 88% Match
- Expected Yield: 1.8 tons/acre
- Water: Medium
- Market: ₹50-55/kg, Stable
- Why: Good soil compatibility, reliable market

**3. Green Gram** - 82% Match
- Expected Yield: 0.8 tons/acre
- Water: Low
- Market: ₹80-90/kg, High demand
- Why: Nitrogen fixing, improves soil health

💡 **Tip**: Add your Groq API key to get personalized AI recommendations!`;
  }

  private getMarketInsightFallback(): string {
    return `**Market Analysis** (Configure Groq API for real-time insights)

**Price Trends (Sample Data):**
- Ragi: ₹35-40/kg (↑ 8%)
- Vegetables: ₹15-25/kg (stable)
- Pulses: ₹80-95/kg (↑ 12%)

**Recommendations:**
1. Lock in prices for 60% of harvest
2. Store 40% for price increases
3. Grade carefully - Grade A gets 20-30% premium

💡 **Tip**: Enable Groq AI for live market predictions!`;
  }

  private getWeatherAdvisoryFallback(): string {
    return `**Weather Advisory** (Configure Groq API for accurate forecasts)

**General Guidance:**
- Monitor local weather daily
- Plan operations around rainfall
- Avoid pesticide application during rain
- Ensure proper drainage

💡 **Tip**: Add Groq API key for AI-powered weather advisories!`;
  }

  private generateSuggestions(query: string): string[] {
    return [
      "What crops suit my soil type?",
      "Show current market prices",
      "Weather forecast for farming"
    ];
  }
}

export const groqService = GroqService.getInstance();