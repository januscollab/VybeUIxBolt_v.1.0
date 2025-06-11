import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, Send, Mic, Image, Paperclip, MoreHorizontal, Copy, 
  ThumbsUp, ThumbsDown, RefreshCw, Sparkles, Zap, Brain,
  MessageSquare, User, Settings, HelpCircle, Code
} from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function AIAssistantComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI assistant. I can help you with design system questions, code examples, best practices, and more. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Show me button variants",
        "How to implement dark mode?",
        "Best practices for forms",
        "Color palette guidelines"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I understand you're asking about " + inputValue + ". Here's a comprehensive response with code examples and best practices...",
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this",
          "Show code example",
          "Alternative approaches",
          "Related concepts"
        ]
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <Badge variant="outline" className="border-purple-500 text-purple-600">
            Experimental
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Intelligent AI assistant for design system guidance, code generation, and best practices.
        </p>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-row items-center space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-purple-100">
                    <Bot className="h-5 w-5 text-purple-600" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Design System AI</CardTitle>
                  <CardDescription>Online • Ready to help</CardDescription>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}>
                      {message.type === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-100">
                            <Bot className="h-4 w-4 text-purple-600" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-[80%] ${
                        message.type === "user" ? "order-1" : ""
                      }`}>
                        <div className={`rounded-lg p-3 ${
                          message.type === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        
                        {message.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.type === "assistant" && (
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {message.type === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-100">
                          <Bot className="h-4 w-4 text-purple-600" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about design systems, components, best practices..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                <Code className="h-4 w-4 mr-2" />
                Generate Component
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Design Review
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Optimize Code
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                <Brain className="h-4 w-4 mr-2" />
                Best Practices
              </Button>
            </CardContent>
          </Card>
          
          {/* Conversation History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-xs h-auto p-2">
                  <MessageSquare className="h-3 w-3 mr-2" />
                  <div className="text-left">
                    <div>Button component variants</div>
                    <div className="text-muted-foreground">2 hours ago</div>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs h-auto p-2">
                  <MessageSquare className="h-3 w-3 mr-2" />
                  <div className="text-left">
                    <div>Form validation patterns</div>
                    <div className="text-muted-foreground">Yesterday</div>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs h-auto p-2">
                  <MessageSquare className="h-3 w-3 mr-2" />
                  <div className="text-left">
                    <div>Dark mode implementation</div>
                    <div className="text-muted-foreground">2 days ago</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Help & Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tips & Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-3 w-3 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Pro Tip</p>
                    <p className="text-muted-foreground">Ask for specific code examples to get better results</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <Sparkles className="h-3 w-3 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">AI Features</p>
                    <p className="text-muted-foreground">Code generation, design reviews, accessibility checks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feature Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>AI Assistant Capabilities</CardTitle>
          <CardDescription>Comprehensive AI-powered features for design system development</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Code Generation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Generate React components, TypeScript interfaces, and CSS styles based on your requirements.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium">Design Review</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Analyze your components for consistency, accessibility, and design system compliance.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">Best Practices</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Get recommendations for component architecture, naming conventions, and optimization.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                <h4 className="font-medium">Performance Optimization</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Identify performance bottlenecks and suggest optimizations for better user experience.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Documentation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Generate comprehensive documentation, examples, and usage guidelines automatically.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-teal-600" />
                <h4 className="font-medium">Migration Assistance</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Help migrate from old design systems or update to new component APIs and patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}