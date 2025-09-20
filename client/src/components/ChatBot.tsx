import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  User, 
  Send, 
  Heart, 
  Activity, 
  Utensils,
  Target,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatBotProps {
  onClose?: () => void;
  isOpen?: boolean;
}

// todo: remove mock functionality
const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    content: "Hello! I'm your AI health assistant. I'm here to help you with nutrition advice, workout suggestions, habit tracking, and motivation. How can I support your wellness journey today?",
    timestamp: new Date(),
    suggestions: [
      "Help me plan a healthy meal",
      "Suggest a workout routine",
      "Track my progress",
      "Motivate me to exercise"
    ]
  }
];

export default function ChatBot({ onClose, isOpen = true }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickSuggestions = [
    { icon: Utensils, text: "Plan my meals", category: "nutrition" },
    { icon: Activity, text: "Workout ideas", category: "fitness" },
    { icon: Heart, text: "Check health metrics", category: "health" },
    { icon: Target, text: "Set new goals", category: "goals" }
  ];

  const generateBotResponse = (userMessage: string): Message => {
    let response = "";
    let suggestions: string[] = [];

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('meal') || lowerMessage.includes('nutrition') || lowerMessage.includes('food')) {
      response = "Great question about nutrition! Based on your goals, I'd suggest focusing on balanced meals with lean proteins, complex carbs, and plenty of vegetables. Would you like me to suggest a specific meal plan for today?";
      suggestions = ["Yes, plan my meals", "Show healthy recipes", "Track my calories"];
    } else if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('fitness')) {
      response = "Excellent! I love that you're thinking about fitness. For today, I recommend a balanced approach. Are you looking for strength training, cardio, or something more relaxing like yoga?";
      suggestions = ["Strength training", "Cardio workout", "Yoga session", "Quick 15-min routine"];
    } else if (lowerMessage.includes('motivation') || lowerMessage.includes('motivate')) {
      response = "You're already taking the first step by being here! Remember, every small action counts. Your body and mind will thank you for the effort you put in today. What's one small healthy choice you can make right now?";
      suggestions = ["Drink a glass of water", "Take a 5-minute walk", "Do some stretches"];
    } else if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
      response = "Tracking progress is so important! I can see you've been consistent with your habits. Let's look at your recent achievements and set new milestones. What aspect of your health would you like to focus on?";
      suggestions = ["Review my habits", "Set new goals", "Check my stats"];
    } else {
      response = "I'm here to help with all aspects of your health journey! Whether it's nutrition, fitness, habits, or just need some motivation - I've got you covered. What would you like to explore?";
      suggestions = ["Get meal suggestions", "Plan a workout", "Review my progress", "Set health goals"];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    const message = `Help me with ${action}`;
    setInputValue(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl mx-auto h-[600px] flex flex-col"
    >
      <Card className="flex-1 flex flex-col h-full">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Arogya AI Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">Your personal health coach</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                Online
              </Badge>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose} data-testid="button-close-chat">
                  ×
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Quick Actions */}
          <div className="p-4 border-b bg-accent/20">
            <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 flex flex-col items-center gap-1 hover-elevate"
                  onClick={() => handleQuickAction(suggestion.text)}
                  data-testid={`button-quick-${suggestion.category}`}
                >
                  <suggestion.icon className="w-4 h-4" />
                  <span className="text-xs">{suggestion.text}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className={`${message.type === 'bot' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        {message.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-card border'
                    }`}>
                      <p className="text-sm" data-testid={`message-${message.type}-${message.id}`}>
                        {message.content}
                      </p>
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 space-y-1">
                          <p className="text-xs text-muted-foreground mb-2">Suggested actions:</p>
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="mr-2 mb-1 text-xs h-auto py-1"
                              onClick={() => handleSuggestionClick(suggestion)}
                              data-testid={`button-suggestion-${index}`}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-card border rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about nutrition, workouts, habits..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isTyping}
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by AI • Your conversations are private and secure
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}