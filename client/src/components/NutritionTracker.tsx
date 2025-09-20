import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Utensils, 
  Apple,
  BarChart3,
  Target,
  Coffee,
  Clock,
  Search,
  Trash2,
  Camera,
  Scan,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NutritionEntry {
  id: string;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  time: string;
}

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

// todo: remove mock functionality
const mockEntries: NutritionEntry[] = [
  {
    id: '1',
    name: 'Greek Yogurt with Berries',
    mealType: 'breakfast',
    calories: 180,
    protein: 15,
    carbs: 20,
    fat: 8,
    fiber: 3,
    time: '8:00 AM'
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    mealType: 'lunch',
    calories: 320,
    protein: 35,
    carbs: 15,
    fat: 12,
    fiber: 8,
    time: '12:30 PM'
  },
  {
    id: '3',
    name: 'Almonds (1 oz)',
    mealType: 'snack',
    calories: 160,
    protein: 6,
    carbs: 6,
    fat: 14,
    fiber: 4,
    time: '3:00 PM'
  }
];

const mockGoals: NutritionGoals = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 67,
  fiber: 25
};

const mealTypes = [
  { value: 'breakfast', label: 'Breakfast', icon: Coffee },
  { value: 'lunch', label: 'Lunch', icon: Utensils },
  { value: 'dinner', label: 'Dinner', icon: Utensils },
  { value: 'snack', label: 'Snack', icon: Apple }
];

// todo: remove mock functionality
const popularFoods = [
  { name: 'Banana (medium)', calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3 },
  { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 4, fiber: 0 },
  { name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 2, fiber: 4 },
  { name: 'Avocado (half)', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 },
  { name: 'Oatmeal (1 cup)', calories: 147, protein: 6, carbs: 25, fat: 3, fiber: 4 }
];

interface NutritionTrackerProps {
  onEntryAdd?: (entry: NutritionEntry) => void;
}

export default function NutritionTracker({ onEntryAdd }: NutritionTrackerProps) {
  const [entries, setEntries] = useState<NutritionEntry[]>(mockEntries);
  const [goals] = useState<NutritionGoals>(mockGoals);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [newEntry, setNewEntry] = useState({
    name: '',
    mealType: 'breakfast' as const,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  });

  const totals = entries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
      fiber: acc.fiber + entry.fiber
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  const addEntry = () => {
    if (!newEntry.name.trim()) return;

    const entry: NutritionEntry = {
      id: Date.now().toString(),
      name: newEntry.name,
      mealType: newEntry.mealType,
      calories: newEntry.calories,
      protein: newEntry.protein,
      carbs: newEntry.carbs,
      fat: newEntry.fat,
      fiber: newEntry.fiber,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setEntries(prev => [...prev, entry]);
    setNewEntry({
      name: '',
      mealType: 'breakfast',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0
    });
    setIsAddingEntry(false);
    onEntryAdd?.(entry);
    console.log('Food entry added:', entry.name);
  };

  const deleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
    console.log(`Food entry deleted: ${entryId}`);
  };

  const selectPopularFood = (food: typeof popularFoods[0]) => {
    setNewEntry(prev => ({
      ...prev,
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      fiber: food.fiber
    }));
  };

  const handleBarcodeScanning = () => {
    setIsScanning(true);
    console.log('Starting barcode scanning...');
    
    // Simulate barcode scanning
    setTimeout(() => {
      setIsScanning(false);
      const scannedFood = {
        name: 'Scanned Product - Protein Bar',
        calories: 210,
        protein: 20,
        carbs: 15,
        fat: 8,
        fiber: 3
      };
      selectPopularFood(scannedFood);
      console.log('Barcode scanned successfully');
    }, 2000);
  };

  const handlePhotoCapture = () => {
    setShowCamera(true);
    console.log('Opening camera for food photo...');
    
    // Simulate photo analysis
    setTimeout(() => {
      setShowCamera(false);
      const analyzedFood = {
        name: 'Photo Analysis - Mixed Salad',
        calories: 150,
        protein: 8,
        carbs: 12,
        fat: 6,
        fiber: 5
      };
      selectPopularFood(analyzedFood);
      console.log('Food photo analyzed successfully');
    }, 3000);
  };

  const filteredFoods = popularFoods.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const groupedEntries = entries.reduce((acc, entry) => {
    if (!acc[entry.mealType]) acc[entry.mealType] = [];
    acc[entry.mealType].push(entry);
    return acc;
  }, {} as Record<string, NutritionEntry[]>);

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-accent font-bold text-foreground">Nutrition Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Track your daily nutrition and reach your health goals
          </p>
        </div>
        
        <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-food">
              <Plus className="w-4 h-4 mr-2" />
              Add Food
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Food Entry</DialogTitle>
              <DialogDescription>
                Search for food or enter nutrition information manually
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="search">Search Foods</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>
              
              <TabsContent value="search" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <Button
                    variant="outline"
                    onClick={handleBarcodeScanning}
                    disabled={isScanning}
                    className="h-16 flex flex-col space-y-1"
                    data-testid="button-barcode-scan"
                  >
                    <Scan className={`w-5 h-5 ${isScanning ? 'animate-pulse' : ''}`} />
                    <span className="text-xs">{isScanning ? 'Scanning...' : 'Scan Barcode'}</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handlePhotoCapture}
                    disabled={showCamera}
                    className="h-16 flex flex-col space-y-1"
                    data-testid="button-photo-capture"
                  >
                    <Camera className={`w-5 h-5 ${showCamera ? 'animate-pulse' : ''}`} />
                    <span className="text-xs">{showCamera ? 'Analyzing...' : 'Take Photo'}</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col space-y-1"
                    data-testid="button-voice-entry"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="text-xs">Voice Entry</span>
                  </Button>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search foods or enter a description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-food-search"
                  />
                </div>
                
                <div className="max-h-60 overflow-y-auto space-y-2">
                  <AnimatePresence>
                    {filteredFoods.map((food, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-3 border rounded-lg cursor-pointer hover-elevate"
                        onClick={() => selectPopularFood(food)}
                        data-testid={`food-option-${index}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium">{food.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <span>{food.calories} cal</span>
                              <span>{food.protein}g protein</span>
                              <span>{food.carbs}g carbs</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            <Zap className="w-3 h-3 mr-1" />
                            {food.calories}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* AI Suggestions */}
                  {searchQuery && filteredFoods.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-3">
                        No exact matches found. Let AI analyze "{searchQuery}"
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Simulate AI analysis
                          const aiFood = {
                            name: `AI Analyzed - ${searchQuery}`,
                            calories: Math.floor(Math.random() * 300) + 100,
                            protein: Math.floor(Math.random() * 20) + 5,
                            carbs: Math.floor(Math.random() * 30) + 10,
                            fat: Math.floor(Math.random() * 15) + 3,
                            fiber: Math.floor(Math.random() * 8) + 2
                          };
                          selectPopularFood(aiFood);
                        }}
                        data-testid="button-ai-analyze"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze with AI
                      </Button>
                    </motion.div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Food Name</Label>
                    <Input
                      value={newEntry.name}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Grilled Chicken"
                      data-testid="input-food-name"
                    />
                  </div>
                  <div>
                    <Label>Meal Type</Label>
                    <select
                      value={newEntry.mealType}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, mealType: e.target.value as any }))}
                      className="w-full h-10 px-3 border border-input bg-background rounded-md"
                      data-testid="select-meal-type"
                    >
                      {mealTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Calories</Label>
                    <Input
                      type="number"
                      value={newEntry.calories || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, calories: +e.target.value }))}
                      data-testid="input-calories"
                    />
                  </div>
                  <div>
                    <Label>Protein (g)</Label>
                    <Input
                      type="number"
                      value={newEntry.protein || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, protein: +e.target.value }))}
                      data-testid="input-protein"
                    />
                  </div>
                  <div>
                    <Label>Carbs (g)</Label>
                    <Input
                      type="number"
                      value={newEntry.carbs || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, carbs: +e.target.value }))}
                      data-testid="input-carbs"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Fat (g)</Label>
                    <Input
                      type="number"
                      value={newEntry.fat || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, fat: +e.target.value }))}
                      data-testid="input-fat"
                    />
                  </div>
                  <div>
                    <Label>Fiber (g)</Label>
                    <Input
                      type="number"
                      value={newEntry.fiber || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, fiber: +e.target.value }))}
                      data-testid="input-fiber"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingEntry(false)}>
                Cancel
              </Button>
              <Button onClick={addEntry} disabled={!newEntry.name.trim()} data-testid="button-save-food">
                Add Food
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Nutrition Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {[
          { label: 'Calories', current: totals.calories, goal: goals.calories, unit: '' },
          { label: 'Protein', current: totals.protein, goal: goals.protein, unit: 'g' },
          { label: 'Carbs', current: totals.carbs, goal: goals.carbs, unit: 'g' },
          { label: 'Fat', current: totals.fat, goal: goals.fat, unit: 'g' },
          { label: 'Fiber', current: totals.fiber, goal: goals.fiber, unit: 'g' }
        ].map((nutrient) => (
          <Card key={nutrient.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{nutrient.label}</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getProgressColor(nutrient.current, nutrient.goal)}`} 
                   data-testid={`text-${nutrient.label.toLowerCase()}-current`}>
                {nutrient.current}{nutrient.unit}
              </div>
              <Progress 
                value={(nutrient.current / nutrient.goal) * 100} 
                className="mt-2" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                Goal: {nutrient.goal}{nutrient.unit}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Meals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {mealTypes.map((mealType) => {
          const mealEntries = groupedEntries[mealType.value] || [];
          const mealCalories = mealEntries.reduce((sum, entry) => sum + entry.calories, 0);
          
          return (
            <Card key={mealType.value}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <mealType.icon className="w-5 h-5" />
                    <CardTitle>{mealType.label}</CardTitle>
                    <Badge variant="secondary">{mealCalories} cal</Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewEntry(prev => ({ ...prev, mealType: mealType.value as any }));
                      setIsAddingEntry(true);
                    }}
                    data-testid={`button-add-${mealType.value}`}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mealEntries.length > 0 ? (
                  <div className="space-y-3">
                    {mealEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 bg-card border rounded-lg hover-elevate"
                        data-testid={`entry-${entry.id}`}
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{entry.name}</h4>
                          <div className="flex space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{entry.calories} cal</span>
                            <span>{entry.protein}g protein</span>
                            <span>{entry.carbs}g carbs</span>
                            <span>{entry.fat}g fat</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{entry.time}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteEntry(entry.id)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-entry-${entry.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Utensils className="w-8 h-8 mx-auto mb-2" />
                    <p>No {mealType.label.toLowerCase()} entries yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </motion.div>
    </div>
  );
}