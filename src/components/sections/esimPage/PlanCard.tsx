import React, { useState } from "react";
import { Globe, ArrowDownUp, Calendar, Tag } from "lucide-react";
import PlanDetailsDialog from "./PlanDetailsDialog";
import OptimizedImage from "@/components/common/OptimizedImage";

interface PlanCardProps {
  plan: any;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div
        className="bg-primary rounded-lg mt-8 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative">
          <div className="absolute top-4 left-4 z-10">
            <h3 className="text-xl font-medium text-white">
              {plan?.packageName}
            </h3>
          </div>
          <div className="absolute -top-6 right-4 z-10">
            <div className="w-[120px] h-[60px]">
              <OptimizedImage
                src={plan?.imageUrl || "/placeholder.webp"}
                alt={plan.id}
              />
            </div>
          </div>
        </div>

        <div className="p-4 pt-16 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-white/20">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-white" />
              <span className="text-white font-medium">COVERAGE</span>
            </div>
            <span className="text-white">{plan.coverage}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-white/20">
            <div className="flex items-center gap-2">
              <ArrowDownUp className="w-5 h-5 text-white" />
              <span className="text-white font-medium">DATA</span>
            </div>
            <span className="text-white">{plan?.packageDetails?.data}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-white/20">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-white" />
              <span className="text-white font-medium">VALIDITY</span>
            </div>
            <span className="text-white">{plan?.validity}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-white/20">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-white" />
              <span className="text-white font-medium">PRICE</span>
            </div>
            <span className="text-white">
              {plan?.price}&nbsp;{plan?.currency}
            </span>
          </div>

          <div className="w-full py-3 text-center bg-white text-primary font-medium rounded-md">
            BUY NOW
          </div>
        </div>
      </div>

      <PlanDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        plan={plan}
      />
    </>
  );
};

export default PlanCard;
