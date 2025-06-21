import { Button } from "@/components/ui/button";
import { Pencil, RotateCw, Settings } from "lucide-react";

const BudgetSummary = () => {
  return (
    <div className="rounded-xl bg-secondary p-4 space-y-2">
      <div className="relative h-2 w-full rounded-full bg-gray-200">
        <div
          className="absolute top-0 left-0 h-2 rounded-full bg-primary"
          style={{ width: `20%` }}
        ></div>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex-shrink-0">
          <p className="text-xs text-muted-foreground">Current Expenses</p>
          <p className="text-2xl font-bold text-foreground">LKR 100,000</p>
        </div>
        <p className="text-xs text-muted-foreground text-right flex-shrink-0">
          Budget LKR 1,000,000
        </p>
      </div>

      <div className="flex justify-between items-center pt-2 flex-wrap gap-2">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background border-gray-300 w-8 h-8"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background border-gray-300 w-8 h-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background border-gray-300 w-8 h-8"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-6">
          Settle Up
        </Button>
      </div>
    </div>
  );
};
export default BudgetSummary;
