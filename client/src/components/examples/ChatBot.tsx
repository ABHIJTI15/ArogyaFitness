import ChatBot from '../ChatBot';

export default function ChatBotExample() {
  return (
    <div className="min-h-screen bg-background p-4">
      <ChatBot 
        isOpen={true}
        onClose={() => console.log('Chat closed')}
      />
    </div>
  );
}