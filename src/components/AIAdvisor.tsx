import { useState, useRef, useEffect } from "react";
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
      content: "🌾 नमस्ते! मैं आपका FOOD-GRID AI सलाहकार हूं। Groq के llama-3.1-8b-instant मॉडल द्वारा संचालित। मैं आपकी मदद कर सकता हूं:\n\n• मिट्टी और जलवायु के आधार पर फसल की सिफारिशें\n• बाजार मूल्य और मांग पूर्वानुमान\n• मौसम आधारित खेती सलाह\n• कीट और रोग प्रबंधन\n• मिट्टी स्वास्थ्य मार्गदर्शन\n• सरकारी योजनाओं की जानकारी\n• पोषण योजना\n\nआज मैं आपकी कैसे मदद कर सकता हूं?",
      suggestions: [
        "मेरे खेत के लिए फसल सुझाएं",
        "वर्तमान बाजार मूल्य",
        "मौसम सलाह"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiWarning, setShowApiWarning] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      
      if (response.confidence && response.confidence > 0.8) {
        setShowApiWarning(false);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "माफ़ कीजिए, मुझे आपके अनुरोध को संसाधित करने में समस्या हो रही है। कृपया अपने Groq API कॉन्फ़िगरेशन की जांच करें और पुनः प्रयास करें।"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col border-green-200 shadow-lg h-full max-h-[600px]">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-b flex-shrink-0 p-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="truncate">AI कृषि सलाहकार</span>
              <Badge className="bg-yellow-400 text-yellow-900 text-xs whitespace-nowrap">
                GROQ AI
              </Badge>
            </div>
            <p className="text-xs font-normal text-green-100 mt-1">
              वास्तविक समय AI-संचालित कृषि बुद्धिमत्ता
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {showApiWarning && (
          <Alert className="m-3 border-yellow-500 bg-yellow-50 flex-shrink-0">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-xs text-yellow-800">
              <strong>सेटअप आवश्यक:</strong> पूर्ण AI क्षमताओं के लिए <code className="bg-yellow-100 px-1 rounded text-xs">.env</code> फ़ाइल में अपनी Groq API कुंजी जोड़ें।
            </AlertDescription>
          </Alert>
        )}
        
        <ScrollArea className="flex-1 px-3 py-2" ref={scrollAreaRef}>
          <div className="space-y-3 pb-2">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex gap-2 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-2.5 max-w-[85%] break-words ${
                      message.role === "user"
                        ? "bg-green-700 text-white"
                        : "bg-gray-100 text-gray-900 border border-green-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed break-words overflow-wrap-anywhere">
                      {message.content}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="h-7 w-7 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                {message.role === "assistant" && message.suggestions && (
                  <div className="mt-2 ml-9 flex flex-wrap gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5 text-yellow-600 mt-1 flex-shrink-0" />
                    {message.suggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs h-7 px-2 border-green-600 text-green-700 hover:bg-green-50"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-lg p-2.5 bg-gray-100 border border-green-200">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t bg-gradient-to-r from-green-50 to-emerald-50 flex-shrink-0">
          <div className="flex gap-2">
            <Textarea
              placeholder="फसलों, बाजार, मौसम, कीटों, योजनाओं के बारे में पूछें..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-[50px] max-h-[100px] resize-none border-green-300 focus:border-green-600 text-sm"
              rows={2}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-[50px] px-3 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-1.5 text-center">
            Groq llama-3.1-8b-instant द्वारा संचालित • वास्तविक समय AI प्रतिक्रियाएं
          </p>
        </div>
      </CardContent>
    </Card>
  );
}