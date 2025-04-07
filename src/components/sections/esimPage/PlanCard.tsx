import React from 'react';
import { Globe, ArrowDownUp, Calendar, Tag, Phone, MessageSquare } from 'lucide-react';
import Image from 'next/image';

interface PlanCardProps {
  plan: {
    name: string;
    image: string;
    coverage: string;
    data: string;
    calls?: string;
    texts?: string;
    validity: string;
    price: string;
  };
  type: 'data' | 'combo';
}

const PlanCard = ({ plan, type }: PlanCardProps) => {
  return (
    <div className="bg-[#FFD699] rounded-lg mt-8">
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-xl font-medium">{plan.name}</h3>
        </div>
        <div className="absolute -top-6 right-4 z-10">
          <Image
            src={"/placeholder.webp"}
            alt={plan.name}
            width={120}
            height={60}
            className="rounded-lg w-full h-full"
          />
        </div>
      </div>

      <div className="p-4 pt-16 space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>COVERAGE</span>
          </div>
          <span>{plan.coverage}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-black/10">
          <div className="flex items-center gap-2">
            <ArrowDownUp className="w-5 h-5" />
            <span>DATA</span>
          </div>
          <span>{plan.data}</span>
        </div>

        {type === 'combo' && (
          <>
            <div className="flex items-center justify-between py-2 border-b border-black/10">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>CALLS</span>
              </div>
              <span>{plan.calls}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-black/10">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>TEXTS</span>
              </div>
              <span>{plan.texts}</span>
            </div>
          </>
        )}

        <div className="flex items-center justify-between py-2 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>VALIDITY</span>
          </div>
          <span>{plan.validity}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            <span>PRICE</span>
          </div>
          <span>{plan.price}</span>
        </div>

        <button className="w-full py-3 text-center border border-gray-800 rounded-md hover:bg-black/5 transition-colors">
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default PlanCard; 