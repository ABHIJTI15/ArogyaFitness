import AuthPage from '../AuthPage';

export default function AuthPageExample() {
  return (
    <AuthPage 
      onAuth={(type, data) => {
        console.log(`Auth ${type} completed:`, data);
        alert(`${type} successful for ${data.email}`);
      }}
    />
  );
}