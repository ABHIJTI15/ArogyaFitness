import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Theme Toggle Test</h1>
        <p className="text-muted-foreground">Click the button to switch between light and dark modes</p>
        <ThemeToggle />
      </div>
    </div>
  );
}