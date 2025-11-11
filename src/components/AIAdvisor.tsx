import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, Bot, User, Sparkles, Lightbulb, AlertCircle } from "lucide-react";
import { groqService } from "@/lib/groqService";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "🌾 Namaste! I'm your FOOD-GRID AI advisor powered by Groq's llama-3.1-8b-instant model. I provide real-time agricultural intelligence for:\n\n• Crop recommendations based on soil and climate\n• Market prices and demand forecasts\n• Weather-based farming advisories\n• Pest and disease management\n• Soil health guidance\n• Government schemes information\n• Nutrition planning\n\nHow can I help you today?",
      suggestions: [
        "Recommend crops for my farm",
        "Current market prices",
        "Weather advisory"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiWarning, setShowApiWarning] = useState(true);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await groqService.queryAI(input);
      
      const assistantMessage: Message = {
        role: "assistant",
        content: response.response,
        suggestions: response.suggestions
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Hide API warning after first successful response
      if (response.confidence && response.confidence > 0.8) {
        setShowApiWarning(false);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I'm having trouble processing your request. Please check your Groq API configuration and try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Card className="h-[600px] flex flex-col border-green-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-b">
        <CardTitle className="flex items-center gap-2">
          <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              AI Farm Advisor
              <Badge className="bg-yellow-400 text-yellow-900 text-xs">
                GROQ LLAMA-3.1-8B
              </Badge>
            </div>
            <p className="text-xs font-normal text-green-100 mt-1">
              Real-time AI-powered agricultural intelligence
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {showApiWarning && (
          <Alert className="m-4 border-yellow-500 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-sm text-yellow-800">
              <strong>Setup Required:</strong> Add your Groq API key to <code className="bg-yellow-100 px-1 rounded">.env</code> file as <code className="bg-yellow-100 px-1 rounded">VITE_GROQ_API_KEY</code> for full AI capabilities.
            </AlertDescription>
          </Alert>
        )}
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[85%] ${
                      message.role === "user"
                        ? "bg-green-700 text-white"
                        : "bg-gray-100 text-gray-900 border border-green-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                {message.role === "assistant" && message.suggestions && (
                  <div className="mt-2 ml-11 flex flex-wrap gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-600 mt-1" />
                    {message.suggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs border-green-600 text-green-700 hover:bg-green-50"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-lg p-3 bg-gray-100 border border-green-200">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce delay-100" />
                    <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask about crops, markets, weather, pests, schemes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="min-h-[60px] resize-none border-green-300 focus:border-green-600"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center">
            Powered by Groq llama-3.1-8b-instant • Real-time AI responses
          </p>
        </div>
      </CardContent>
    </Card>
  );
}