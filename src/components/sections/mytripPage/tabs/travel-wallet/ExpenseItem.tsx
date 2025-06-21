interface Split {
  name: string;
  amount: string;
}

interface ExpenseItemProps {
  date: string;
  title: string;
  details: string;
  amount: string;
  paidBy: string;
  splits: Split[];
}

const ExpenseItem = ({
  date,
  title,
  details,
  amount,
  paidBy,
  splits,
}: ExpenseItemProps) => {
  const [month, day] = date.split(" ");

  return (
    <div className="flex items-start space-x-2 sm:space-x-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">{month}</p>
        <p className="text-lg font-semibold">{day}</p>
      </div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{details}</p>
        {splits.length > 0 && (
          <div className="mt-2 pl-4 border-l-2 border-gray-300 space-y-1">
            {splits.map((split, index) => (
              <p key={index} className="text-xs text-muted-foreground">
                {split.name} owes {split.amount}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="text-right">
        <p className="font-semibold">{amount}</p>
        <p className="text-xs text-muted-foreground">{paidBy}</p>
      </div>
    </div>
  );
};

export default ExpenseItem;
