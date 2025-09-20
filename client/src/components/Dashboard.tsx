import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Activity, 
  Target, 
  Utensils, 
  Calendar,
  TrendingUp,
  Award,
  MessageCircle,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

// todo: remove mock functionality
const mockData = {
  user: { name: "Alex Johnson", streak: 7 },
  todayStats: {
    steps: 8540,
    stepGoal: 10000,
    calories: 1850,
    calorieGoal: 2000,
    water: 6,
    waterGoal: 8,
    sleep: 7.5,
    sleepGoal: 8
  },
  habits: [
    { id: 1, name: "Morning Meditation", completed: true, streak: 12 },
    { id: 2, name: "Drink Water", completed: true, streak: 7 },
    { id: 3, name: "Evening Walk", completed: false, streak: 5 },
    { id: 4, name: "Read Health Article", completed: false, streak: 3 }
  ],
  recentActivities: [
    { id: 1, type: "Workout", name: "Morning Yoga", duration: "30 min", time: "7:00 AM" },
    { id: 2, type: "Meal", name: "Protein Smoothie", calories: 280, time: "8:30 AM" },
    { id: 3, type: "Walk", name: "Lunch Break Walk", duration: "15 min", time: "12:30 PM" }
  ]
};

interface DashboardProps {
  userName?: string;
  onChatOpen?: () => void;
  onQuickLog?: (type: string) => void;
}

export default function Dashboard({ userName = mockData.user.name, onChatOpen, onQuickLog }: DashboardProps) {
  const [selectedHabit, setSelectedHabit] = useState<number | null>(null);

  const toggleHabit = (habitId: number) => {
    console.log(`Toggling habit ${habitId}`);
    setSelectedHabit(selectedHabit === habitId ? null : habitId);
  };

  const quickActions = [
    { icon: Utensils, label: "Log Meal", action: () => onQuickLog?.("meal") },
    { icon: Activity, label: "Add Workout", action: () => onQuickLog?.("workout") },
    { icon: Heart, label: "Log Vitals", action: () => onQuickLog?.("vitals") },
    { icon: MessageCircle, label: "AI Assistant", action: onChatOpen }
  ];

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6 space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-accent font-bold text-foreground">
            Good morning, {userName}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            You're on a {mockData.user.streak}-day streak! Keep it up!
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <Badge variant="secondary" className="px-3 py-1">
            <Award className="w-4 h-4 mr-1" />
            {mockData.user.streak} Day Streak
          </Badge>
          <Button onClick={onChatOpen} data-testid="button-ai-chat">
            <MessageCircle className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-20 flex flex-col space-y-2 hover-elevate"
                  onClick={action.action}
                  data-testid={`button-quick-${action.label.toLowerCase().replace(' ', '-')}`}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Steps Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-steps-count">
              {mockData.todayStats.steps.toLocaleString()}
            </div>
            <Progress 
              value={(mockData.todayStats.steps / mockData.todayStats.stepGoal) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Goal: {mockData.todayStats.stepGoal.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-calories-count">
              {mockData.todayStats.calories}
            </div>
            <Progress 
              value={(mockData.todayStats.calories / mockData.todayStats.calorieGoal) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Goal: {mockData.todayStats.calorieGoal}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-water-count">
              {mockData.todayStats.water} / {mockData.todayStats.waterGoal}
            </div>
            <Progress 
              value={(mockData.todayStats.water / mockData.todayStats.waterGoal) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">glasses</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-sleep-count">
              {mockData.todayStats.sleep}h
            </div>
            <Progress 
              value={(mockData.todayStats.sleep / mockData.todayStats.sleepGoal) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Goal: {mockData.todayStats.sleepGoal}h
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Habits and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Habits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Today's Habits
                <Button size="sm" variant="outline" data-testid="button-add-habit">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors hover-elevate ${
                    habit.completed 
                      ? 'bg-primary/10 border-primary/20' 
                      : 'bg-card hover:bg-accent'
                  }`}
                  onClick={() => toggleHabit(habit.id)}
                  data-testid={`habit-${habit.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        habit.completed 
                          ? 'bg-primary border-primary' 
                          : 'border-muted-foreground'
                      }`}
                    >
                      {habit.completed && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${habit.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {habit.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {habit.streak} day streak
                      </p>
                    </div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest health activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.recentActivities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-card border hover-elevate"
                  data-testid={`activity-${activity.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {activity.type === 'Workout' && <Activity className="w-5 h-5 text-primary" />}
                      {activity.type === 'Meal' && <Utensils className="w-5 h-5 text-primary" />}
                      {activity.type === 'Walk' && <Target className="w-5 h-5 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {'duration' in activity ? activity.duration : `${activity.calories} cal`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}