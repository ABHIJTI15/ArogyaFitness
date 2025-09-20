import ActivityTracker from '../ActivityTracker';

export default function ActivityTrackerExample() {
  return (
    <ActivityTracker 
      onActivityAdd={(activity) => {
        console.log('Activity added:', activity);
      }}
    />
  );
}