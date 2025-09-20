import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Import all components
import AuthPage from "@/components/AuthPage";
import Dashboard from "@/components/Dashboard";
import ChatBot from "@/components/ChatBot";
import HabitTracker from "@/components/HabitTracker";
import NutritionTracker from "@/components/NutritionTracker";
import ActivityTracker from "@/components/ActivityTracker";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import ThemeToggle from "@/components/ThemeToggle";
import AppSidebar from "@/components/AppSidebar";
import NotFound from "@/pages/not-found";

// Main App Content
function AppContent() {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  const handleAuth = (type: 'login' | 'register', data: { email: string; password: string; name?: string }) => {
    console.log(`${type} successful:`, data);
    setIsAuthenticated(true);
    setCurrentUser({ 
      name: data.name || 'User', 
      email: data.email 
    });
    setLocation('/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLocation('/');
  };

  if (!isAuthenticated) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": "20rem" } as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar onLogout={handleLogout} currentUser={currentUser} />
        
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center space-x-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <h2 className="text-lg font-accent font-semibold">
                Arogya - Your Fitness Partner
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChatOpen(!isChatOpen)}
                data-testid="button-toggle-chat"
              >
                AI Assistant
              </Button>
              <ThemeToggle />
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Switch>
                  <Route path="/" component={() => <Dashboard userName={currentUser?.name} onChatOpen={() => setIsChatOpen(true)} />} />
                  <Route path="/dashboard" component={() => <Dashboard userName={currentUser?.name} onChatOpen={() => setIsChatOpen(true)} />} />
                  <Route path="/habits" component={() => <HabitTracker />} />
                  <Route path="/nutrition" component={() => <NutritionTracker />} />
                  <Route path="/activities" component={() => <ActivityTracker />} />
                  <Route path="/plans" component={() => <SubscriptionPlans />} />
                  <Route component={NotFound} />
                </Switch>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Chat Overlay */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsChatOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl h-[80vh]"
              >
                <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
