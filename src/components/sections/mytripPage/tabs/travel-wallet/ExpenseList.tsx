import ExpenseItem from "./ExpenseItem";


const expenses = [
  {
    date: "May 13",
    title: "Flight Tickets",
    details: "You lent LKR 200,000",
    amount: "LKR 300,000",
    paidBy: "You Paid",
    splits: [],
  },
  {
    date: "May 12",
    title: "Hotel Bookings",
    details: "You borrowed LKR 100,000",
    amount: "LKR 150,000",
    paidBy: "Ravindu Paid",
    splits: [],
  },
  {
    date: "May 12",
    title: "Foods",
    details: "You were not involved",
    amount: "LKR 150,000",
    paidBy: "Ravindu Paid",
    splits: [],
  },
  {
    date: "May 13",
    title: "Internal Flight Tickets",
    details: "You lent LKR 200,000",
    amount: "LKR 300,000",
    paidBy: "You Paid",
    splits: [
      { name: "Ravindu", amount: "LKR 100,000" },
      { name: "Janith", amount: "LKR 100,000" },
    ],
  },
];

const ExpenseList = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Expenses</h2>
      <div className="space-y-6">
        {expenses.map((expense, index) => (
          <ExpenseItem key={index} {...expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
