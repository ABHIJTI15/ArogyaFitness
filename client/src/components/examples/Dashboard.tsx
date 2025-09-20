import Dashboard from '../Dashboard';

export default function DashboardExample() {
  return (
    <Dashboard 
      userName="Alex Johnson"
      onChatOpen={() => console.log('Opening AI chat')}
      onQuickLog={(type) => console.log(`Quick logging: ${type}`)}
    />
  );
}