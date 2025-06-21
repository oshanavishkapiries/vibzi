import BudgetSummary from "./travel-wallet/BudgetSummary";
import ExpenseList from "./travel-wallet/ExpenseList";


const TravelWallet = () => {
  return (
    <div className="space-y-6 p-4">
      <BudgetSummary />
      <ExpenseList />
    </div>
  );
};

export default TravelWallet;
