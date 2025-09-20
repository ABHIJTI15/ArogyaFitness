import SubscriptionPlans from '../SubscriptionPlans';

export default function SubscriptionPlansExample() {
  return (
    <SubscriptionPlans 
      currentPlan="free"
      onPlanSelect={(planId) => {
        console.log(`Plan selected: ${planId}`);
        alert(`You selected the ${planId} plan!`);
      }}
    />
  );
}