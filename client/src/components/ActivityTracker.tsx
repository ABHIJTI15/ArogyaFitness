import { useState, useEffect } from "react";
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
  Activity, 
  Timer,
  Zap,
  Target,
  TrendingUp,
  Play,
  Pause,
  Square,
  Dumbbell,
  Heart,
  Footprints,
  Share2,
  Video,
  Users,
  Trophy,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkoutEntry {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports';
  duration: number; // in minutes
  calories: number;
  intensity: 'low' | 'medium' | 'high';
  date: Date;
  notes?: string;
}

interface ActivityTrackerProps {
  onActivityAdd?: (activity: WorkoutEntry) => void;
}

// todo: remove mock functionality
const mockActivities: WorkoutEntry[] = [
  {
    id: '1',
    name: 'Morning Run',
    type: 'cardio',
    duration: 30,
    calories: 350,
    intensity: 'medium',
    date: new Date(),
    notes: 'Great pace, felt energized'
  },
  {
    id: '2',
    name: 'Weight Training',
    type: 'strength',
    duration: 45,
    calories: 280,
    intensity: 'high',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    notes: 'Upper body focus'
  },
  {
    id: '3',
    name: 'Yoga Session',
    type: 'flexibility',
    duration: 60,
    calories: 180,
    intensity: 'low',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

const activityTypes = [
  { value: 'cardio', label: 'Cardio', icon: Heart, color: 'bg-red-500' },
  { value: 'strength', label: 'Strength', icon: Dumbbell, color: 'bg-blue-500' },
  { value: 'flexibility', label: 'Flexibility', icon: Activity, color: 'bg-green-500' },
  { value: 'sports', label: 'Sports', icon: Target, color: 'bg-purple-500' }
];

const intensityLevels = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
];

// todo: remove mock functionality
const quickWorkouts = [
  { name: '10-min HIIT', type: 'cardio', duration: 10, estimatedCalories: 120 },
  { name: 'Push-ups & Squats', type: 'strength', duration: 15, estimatedCalories: 90 },
  { name: 'Morning Stretch', type: 'flexibility', duration: 15, estimatedCalories: 60 },
  { name: '5-min Walk', type: 'cardio', duration: 5, estimatedCalories: 25 }
];

export default function ActivityTracker({ onActivityAdd }: ActivityTrackerProps) {
  const [activities, setActivities] = useState<WorkoutEntry[]>(mockActivities);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showVideoGuide, setShowVideoGuide] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [newActivity, setNewActivity] = useState({
    name: '',
    type: 'cardio' as const,
    duration: 0,
    calories: 0,
    intensity: 'medium' as const,
    notes: ''
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Timer functionality
  const startTimer = () => {
    setIsTimerRunning(true);
    console.log('Timer started');
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    console.log('Timer paused');
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setNewActivity(prev => ({ ...prev, duration: Math.floor(timerSeconds / 60) }));
    setTimerSeconds(0);
    console.log('Timer stopped');
  };

  // Calculate weekly stats
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const thisWeekActivities = activities.filter(activity => activity.date >= weekStart);
  
  const weeklyStats = {
    totalWorkouts: thisWeekActivities.length,
    totalDuration: thisWeekActivities.reduce((sum, activity) => sum + activity.duration, 0),
    totalCalories: thisWeekActivities.reduce((sum, activity) => sum + activity.calories, 0),
    avgDuration: thisWeekActivities.length > 0 
      ? Math.round(thisWeekActivities.reduce((sum, activity) => sum + activity.duration, 0) / thisWeekActivities.length)
      : 0
  };

  const addActivity = () => {
    if (!newActivity.name.trim()) return;

    const activity: WorkoutEntry = {
      id: Date.now().toString(),
      name: newActivity.name,
      type: newActivity.type,
      duration: newActivity.duration,
      calories: newActivity.calories,
      intensity: newActivity.intensity,
      date: new Date(),
      notes: newActivity.notes
    };

    setActivities(prev => [activity, ...prev]);
    setNewActivity({
      name: '',
      type: 'cardio',
      duration: 0,
      calories: 0,
      intensity: 'medium',
      notes: ''
    });
    setIsAddingActivity(false);
    onActivityAdd?.(activity);
    console.log('Activity added:', activity.name);
  };

  const startQuickWorkout = (workout: typeof quickWorkouts[0]) => {
    setNewActivity({
      name: workout.name,
      type: workout.type as any,
      duration: workout.duration,
      calories: workout.estimatedCalories,
      intensity: 'medium',
      notes: ''
    });
    setIsAddingActivity(true);
    console.log(`Quick workout selected: ${workout.name}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-accent font-bold text-foreground">Activity Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Track your workouts and stay active every day
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <Dialog open={isAddingActivity} onOpenChange={setIsAddingActivity}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-activity">
                <Plus className="w-4 h-4 mr-2" />
                Log Workout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log New Activity</DialogTitle>
                <DialogDescription>
                  Record your workout details and track your progress
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label>Activity Name</Label>
                  <Input
                    value={newActivity.name}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Morning Run, Yoga Session"
                    data-testid="input-activity-name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Activity Type</Label>
                    <Select
                      value={newActivity.type}
                      onValueChange={(value: any) => setNewActivity(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger data-testid="select-activity-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {activityTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Intensity</Label>
                    <Select
                      value={newActivity.intensity}
                      onValueChange={(value: any) => setNewActivity(prev => ({ ...prev, intensity: value }))}
                    >
                      <SelectTrigger data-testid="select-intensity">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {intensityLevels.map(level => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Timer Section */}
                <div className="border rounded-lg p-4 bg-accent/20">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium">Workout Timer</Label>
                    <div className="text-2xl font-mono font-bold">
                      {formatTime(timerSeconds)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={startTimer}
                      disabled={isTimerRunning}
                      data-testid="button-start-timer"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={pauseTimer}
                      disabled={!isTimerRunning}
                      data-testid="button-pause-timer"
                    >
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={stopTimer}
                      disabled={timerSeconds === 0}
                      data-testid="button-stop-timer"
                    >
                      <Square className="w-4 h-4 mr-1" />
                      Stop
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={newActivity.duration || ''}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, duration: +e.target.value }))}
                      data-testid="input-duration"
                    />
                  </div>
                  <div>
                    <Label>Calories Burned</Label>
                    <Input
                      type="number"
                      value={newActivity.calories || ''}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, calories: +e.target.value }))}
                      data-testid="input-calories-burned"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Notes (optional)</Label>
                  <Input
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="How did it feel? Any notes about the workout?"
                    data-testid="input-activity-notes"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingActivity(false)}>
                  Cancel
                </Button>
                <Button onClick={addActivity} disabled={!newActivity.name.trim()} data-testid="button-save-activity">
                  Save Activity
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Workouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Start</CardTitle>
            <CardDescription>Start a pre-defined workout routine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickWorkouts.map((workout, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col space-y-1 hover-elevate"
                  onClick={() => startQuickWorkout(workout)}
                  data-testid={`button-quick-workout-${index}`}
                >
                  <Zap className="w-5 h-5" />
                  <span className="text-xs font-medium">{workout.name}</span>
                  <span className="text-xs text-muted-foreground">{workout.duration}min</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-weekly-workouts">
              {weeklyStats.totalWorkouts}
            </div>
            <p className="text-xs text-muted-foreground mt-1">workouts completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-weekly-duration">
              {formatDuration(weeklyStats.totalDuration)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">active time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-weekly-calories">
              {weeklyStats.totalCalories}
            </div>
            <p className="text-xs text-muted-foreground mt-1">calories burned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-avg-duration">
              {weeklyStats.avgDuration}m
            </div>
            <p className="text-xs text-muted-foreground mt-1">per workout</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest workouts and activities</CardDescription>
          </CardHeader>
          <CardContent>
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => {
                  const activityType = activityTypes.find(type => type.value === activity.type);
                  const intensityLevel = intensityLevels.find(level => level.value === activity.intensity);
                  
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                      data-testid={`activity-${activity.id}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg ${activityType?.color} flex items-center justify-center`}>
                          {activityType && <activityType.icon className="w-6 h-6 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{formatDuration(activity.duration)}</span>
                            <span>{activity.calories} cal</span>
                            <Badge variant="outline" className={intensityLevel?.color}>
                              {intensityLevel?.label}
                            </Badge>
                          </div>
                          {activity.notes && (
                            <p className="text-sm text-muted-foreground mt-1 italic">
                              "{activity.notes}"
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {activity.date.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Footprints className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No activities yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start tracking your workouts to see your progress
                </p>
                <Button onClick={() => setIsAddingActivity(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Log Your First Activity
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}