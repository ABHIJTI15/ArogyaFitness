import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Check, 
  Flame, 
  Calendar,
  Target,
  TrendingUp,
  MoreHorizontal,
  Edit,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  targetCount: number;
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
  completedThisWeek: number;
  category: string;
  color: string;
}

interface HabitTrackerProps {
  onHabitUpdate?: (habitId: string, completed: boolean) => void;
}

// todo: remove mock functionality
const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: '10 minutes of mindfulness',
    frequency: 'daily',
    targetCount: 1,
    currentStreak: 12,
    longestStreak: 25,
    completedToday: true,
    completedThisWeek: 6,
    category: 'Mindfulness',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Drink 8 Glasses of Water',
    description: 'Stay hydrated throughout the day',
    frequency: 'daily',
    targetCount: 8,
    currentStreak: 7,
    longestStreak: 15,
    completedToday: false,
    completedThisWeek: 5,
    category: 'Health',
    color: 'bg-cyan-500'
  },
  {
    id: '3',
    name: 'Evening Walk',
    description: '30 minute walk after dinner',
    frequency: 'daily',
    targetCount: 1,
    currentStreak: 5,
    longestStreak: 18,
    completedToday: false,
    completedThisWeek: 4,
    category: 'Exercise',
    color: 'bg-green-500'
  },
  {
    id: '4',
    name: 'Weekly Yoga Class',
    description: 'Attend yoga session',
    frequency: 'weekly',
    targetCount: 2,
    currentStreak: 3,
    longestStreak: 8,
    completedToday: false,
    completedThisWeek: 1,
    category: 'Exercise',
    color: 'bg-purple-500'
  }
];

const categories = ['Health', 'Exercise', 'Mindfulness', 'Nutrition', 'Productivity'];
const colors = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
  'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-cyan-500'
];

export default function HabitTracker({ onHabitUpdate }: HabitTrackerProps) {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabit, setNewHabit] = useState<{
    name: string;
    description: string;
    frequency: 'daily' | 'weekly';
    category: string;
    color: string;
  }>({
    name: '',
    description: '',
    frequency: 'daily',
    category: 'Health',
    color: 'bg-blue-500'
  });

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const completed = !habit.completedToday;
        console.log(`Habit ${habit.name} marked as ${completed ? 'completed' : 'incomplete'}`);
        onHabitUpdate?.(habitId, completed);
        
        return {
          ...habit,
          completedToday: completed,
          currentStreak: completed ? habit.currentStreak + 1 : Math.max(0, habit.currentStreak - 1),
          completedThisWeek: completed ? habit.completedThisWeek + 1 : Math.max(0, habit.completedThisWeek - 1)
        };
      }
      return habit;
    }));
  };

  const addHabit = () => {
    if (!newHabit.name.trim()) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      description: newHabit.description,
      frequency: newHabit.frequency,
      targetCount: newHabit.frequency === 'daily' ? 1 : 2,
      currentStreak: 0,
      longestStreak: 0,
      completedToday: false,
      completedThisWeek: 0,
      category: newHabit.category,
      color: newHabit.color
    };

    setHabits(prev => [...prev, habit]);
    setNewHabit({
      name: '',
      description: '',
      frequency: 'daily',
      category: 'Health',
      color: 'bg-blue-500'
    });
    setIsAddingHabit(false);
    console.log('New habit added:', habit.name);
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    console.log(`Habit deleted: ${habitId}`);
  };

  const getWeeklyProgress = (habit: Habit) => {
    if (habit.frequency === 'daily') {
      return (habit.completedThisWeek / 7) * 100;
    }
    return (habit.completedThisWeek / habit.targetCount) * 100;
  };

  const completedToday = habits.filter(h => h.completedToday).length;
  const totalHabits = habits.length;

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-accent font-bold text-foreground">Habit Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Build lasting habits for a healthier lifestyle
          </p>
        </div>
        
        <Dialog open={isAddingHabit} onOpenChange={setIsAddingHabit}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-habit">
              <Plus className="w-4 h-4 mr-2" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Habit</DialogTitle>
              <DialogDescription>
                Add a new healthy habit to track daily or weekly
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="habit-name">Habit Name</Label>
                <Input
                  id="habit-name"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Morning Exercise"
                  data-testid="input-habit-name"
                />
              </div>
              <div>
                <Label htmlFor="habit-description">Description</Label>
                <Input
                  id="habit-description"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the habit"
                  data-testid="input-habit-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Frequency</Label>
                  <Select 
                    value={newHabit.frequency} 
                    onValueChange={(value: 'daily' | 'weekly') => 
                      setNewHabit(prev => ({ ...prev, frequency: value }))
                    }
                  >
                    <SelectTrigger data-testid="select-habit-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={newHabit.category} 
                    onValueChange={(value) => setNewHabit(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger data-testid="select-habit-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Color</Label>
                <div className="flex space-x-2 mt-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${color} ${
                        newHabit.color === color ? 'ring-2 ring-offset-2 ring-primary' : ''
                      }`}
                      onClick={() => setNewHabit(prev => ({ ...prev, color }))}
                      data-testid={`color-${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingHabit(false)}>
                Cancel
              </Button>
              <Button onClick={addHabit} disabled={!newHabit.name.trim()} data-testid="button-save-habit">
                Create Habit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-today-progress">
              {completedToday}/{totalHabits}
            </div>
            <Progress value={(completedToday / totalHabits) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              habits completed today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streaks</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-streaks">
              {habits.reduce((sum, habit) => sum + habit.currentStreak, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              days across all habits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-best-streak">
              {Math.max(...habits.map(h => h.longestStreak), 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              longest streak achieved
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Habits List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Habits</CardTitle>
            <CardDescription>
              Track your daily and weekly habits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence>
              {habits.map((habit) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 rounded-lg border transition-all hover-elevate ${
                    habit.completedToday 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-card'
                  }`}
                  data-testid={`habit-card-${habit.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Completion Toggle */}
                      <button
                        onClick={() => toggleHabit(habit.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          habit.completedToday
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-muted-foreground hover:border-primary'
                        }`}
                        data-testid={`button-toggle-habit-${habit.id}`}
                      >
                        {habit.completedToday && <Check className="w-3 h-3" />}
                      </button>

                      {/* Habit Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${habit.color}`} />
                          <h3 className={`font-medium ${habit.completedToday ? 'line-through text-muted-foreground' : ''}`}>
                            {habit.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {habit.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {habit.description}
                        </p>
                        
                        {/* Progress */}
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              This week: {habit.completedThisWeek}/{habit.frequency === 'daily' ? 7 : habit.targetCount}
                            </span>
                            <span className="text-muted-foreground">
                              {Math.round(getWeeklyProgress(habit))}%
                            </span>
                          </div>
                          <Progress value={getWeeklyProgress(habit)} className="h-1" />
                        </div>
                      </div>
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="flex items-center space-x-1 text-orange-500">
                          <Flame className="w-4 h-4" />
                          <span className="font-bold">{habit.currentStreak}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">current</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-bold">{habit.longestStreak}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">best</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteHabit(habit.id)}
                        className="text-destructive hover:text-destructive"
                        data-testid={`button-delete-habit-${habit.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {habits.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No habits yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start building healthy habits by adding your first one
                </p>
                <Button onClick={() => setIsAddingHabit(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Habit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}