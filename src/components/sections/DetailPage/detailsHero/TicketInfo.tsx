import { Clock, Smartphone, FileText } from "lucide-react";

export default function TicketInfo() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-b pb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>4 hours (approx.)</span>
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          <span>Mobile Ticket</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Offered in : English</span>
        </div>
      </div>
    </div>
  );
}
