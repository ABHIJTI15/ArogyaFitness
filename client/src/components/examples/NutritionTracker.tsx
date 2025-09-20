import NutritionTracker from '../NutritionTracker';

export default function NutritionTrackerExample() {
  return (
    <NutritionTracker 
      onEntryAdd={(entry) => {
        console.log('Food entry added:', entry);
      }}
    />
  );
}