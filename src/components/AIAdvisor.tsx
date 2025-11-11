import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Sparkles } from "lucide-react";
import { groqService } from "@/lib/groqService";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAdvisor() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const exampleQuestions = [
    t('advisor.example1'),
    t('advisor.example2'),
    t('advisor.example3')
  ];

  const handleSubmit = async () => {
    if (!query.trim()) {
      toast.error(t('common.error'), {
        description: "Please enter a question"
      });
      return;
    }

    const userMessage: Message = { role: "user", content: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await groqService.queryAI(query);
      const assistantMessage: Message = { 
        role: "assistant", 
        content: response.response 
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      toast.success(t('common.success'), {
        description: "AI response received"
      });
    } catch (error) {
      console.error("AI query error:", error);
      toast.error(t('common.error'), {
        description: "Failed to get AI response. Please try again."
      });
      
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please check your Groq API configuration and try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  return (
    <Card className="border-green-200">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Brain className="h-5 w-5 text-green-700" />
          {t('advisor.title')}
        </CardTitle>
        <CardDescription>
          {t('advisor.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Messages */}
        {messages.length > 0 && (
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-green-50 border border-green-200 ml-8"
                    : "bg-blue-50 border border-blue-200 mr-8"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.role === "assistant" && (
                    <Sparkles className="h-4 w-4 text-green-700 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Example Questions */}
        {messages.length === 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {t('advisor.examples')}
            </p>
            <div className="space-y-2">
              {exampleQuestions.map((example, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-green-50 text-xs py-1.5 px-3 border-green-300 text-gray-700 block w-full text-left"
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="space-y-3">
          <Textarea
            placeholder={t('advisor.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="min-h-[80px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !query.trim()}
            className="w-full bg-green-700 hover:bg-green-800"
          >
            {isLoading ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                {t('advisor.thinking')}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {t('advisor.askQuestion')}
              </>
            )}
          </Button>
        </div>

        {/* API Key Notice */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800">
            <strong>Note:</strong> Configure your Groq API key in .env file for full AI functionality.
            See .env.example for details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}