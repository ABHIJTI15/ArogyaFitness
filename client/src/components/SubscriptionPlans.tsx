import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Crown, 
  Star,
  Zap,
  Heart,
  Bot,
  BarChart3,
  Shield,
  Smartphone,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

// todo: remove mock functionality
const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    description: 'Perfect for getting started with basic health tracking',
    icon: Heart,
    color: 'from-green-500 to-green-600',
    features: [
      'Basic habit tracking',
      'Simple nutrition logging',
      'Activity recording',
      'Basic dashboard',
      'Limited AI chat (5 messages/day)',
      'Mobile app access'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    interval: 'month',
    description: 'Advanced features for serious health enthusiasts',
    icon: Star,
    color: 'from-blue-500 to-blue-600',
    popular: true,
    features: [
      'Unlimited habit tracking',
      'Advanced nutrition analysis',
      'Detailed activity insights',
      'Custom goal setting',
      'Unlimited AI personal assistant',
      'Progress analytics & trends',
      'Export your data',
      'Priority customer support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    interval: 'month',
    description: 'Complete health ecosystem with premium integrations',
    icon: Crown,
    color: 'from-purple-500 to-purple-600',
    features: [
      'Everything in Pro',
      'Wearable device sync',
      'Meal planning with recipes',
      'Workout library & programs',
      'Health coach consultations',
      'Family sharing (up to 4 members)',
      'Advanced biometric tracking',
      'Personalized health reports',
      'API access for developers'
    ]
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    plan: "Pro",
    quote: "Arogya transformed my health journey. The AI assistant is like having a personal coach!",
    rating: 5
  },
  {
    name: "Mike Chen",
    plan: "Premium", 
    quote: "The wearable sync and family sharing features are game-changers for our household.",
    rating: 5
  },
  {
    name: "Emma Davis",
    plan: "Pro",
    quote: "Finally, an app that makes nutrition tracking actually enjoyable and insightful.",
    rating: 5
  }
];

interface SubscriptionPlansProps {
  onPlanSelect?: (planId: string) => void;
  currentPlan?: string;
}

export default function SubscriptionPlans({ onPlanSelect, currentPlan = 'free' }: SubscriptionPlansProps) {
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month');
  
  const handlePlanSelect = (planId: string) => {
    console.log(`Plan selected: ${planId}`);
    onPlanSelect?.(planId);
  };

  const getYearlyPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12 * 0.8; // 20% discount for yearly
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-accent font-bold text-foreground">
            Choose Your Health Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of Arogya with plans designed for every health goal
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <span className={`text-sm ${selectedInterval === 'month' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setSelectedInterval(selectedInterval === 'month' ? 'year' : 'month')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                selectedInterval === 'year' ? 'bg-primary' : 'bg-border'
              }`}
              data-testid="toggle-billing-interval"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  selectedInterval === 'year' ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${selectedInterval === 'year' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {selectedInterval === 'year' && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Save 20%
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => {
            const price = selectedInterval === 'year' ? getYearlyPrice(plan.price) : plan.price;
            const isCurrentPlan = currentPlan === plan.id;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg' : ''} ${isCurrentPlan ? 'ring-2 ring-primary' : ''} hover-elevate`}>
                  <CardHeader className="text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <CardTitle className="text-2xl font-accent">{plan.name}</CardTitle>
                      <CardDescription className="mt-2">{plan.description}</CardDescription>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-4xl font-bold text-foreground">
                        ${price.toFixed(plan.price === 0 ? 0 : 2)}
                        {plan.price > 0 && (
                          <span className="text-lg text-muted-foreground font-normal">
                            /{selectedInterval}
                          </span>
                        )}
                      </div>
                      {selectedInterval === 'year' && plan.price > 0 && (
                        <p className="text-sm text-muted-foreground">
                          ${(plan.price * 12).toFixed(2)} billed annually
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handlePlanSelect(plan.id)}
                      disabled={isCurrentPlan}
                      data-testid={`button-select-${plan.id}`}
                    >
                      {isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Why Choose Arogya?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Bot, title: "AI-Powered", description: "Smart health insights and personalized recommendations" },
                  { icon: BarChart3, title: "Advanced Analytics", description: "Detailed progress tracking and trend analysis" },
                  { icon: Shield, title: "Secure & Private", description: "Your health data is encrypted and protected" },
                  { icon: Smartphone, title: "Cross-Platform", description: "Access your data anywhere, anytime" }
                ].map((feature, index) => (
                  <div key={index} className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-accent font-bold">Loved by Health Enthusiasts</h2>
            <p className="text-muted-foreground mt-2">See what our users are saying about Arogya</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm italic">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                    </div>
                    <Badge variant="outline">{testimonial.plan} User</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <h2 className="text-2xl font-accent font-bold">Questions?</h2>
          <p className="text-muted-foreground">
            Visit our help center or contact our support team for assistance
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" data-testid="button-help-center">
              Help Center
            </Button>
            <Button variant="outline" data-testid="button-contact-support">
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}