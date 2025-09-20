import HabitTracker from '../HabitTracker';

export default function HabitTrackerExample() {
  return (
    <HabitTracker 
      onHabitUpdate={(habitId, completed) => {
        console.log(`Habit ${habitId} updated: ${completed ? 'completed' : 'incomplete'}`);
      }}
    />
  );
}