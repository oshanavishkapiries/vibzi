import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Plus,
  ShieldCheck,
  Globe,
  Calendar,
  DollarSign,
  Compass,
} from "lucide-react";

const faqData = [
  {
    id: "faq-1",
    icon: Globe,
    title: "What is Vibzi?",
    sub: null,
    content:
      "Vibzi is a travel platform that aggregates experiences across Asia-Pacific destinations. We compile options from trusted platforms to make travel planning effortless and efficient.",
  },
  {
    id: "faq-2",
    icon: ShieldCheck,
    title: "Is it safe to book through Vibzi?",
    sub: null,
    content:
      "Yes, Vibzi redirects you to the original platform for booking. We work only with trusted partners to ensure a secure and reliable booking experience.",
  },
  {
    id: "faq-3",
    icon: Compass,
    title: "What destinations are covered by Vibzi?",
    sub: null,
    content:
      "Vibzi specializes in Asia-Pacific destinations, offering a comprehensive range of experiences in popular and hidden gem locations across the region.",
  },
  {
    id: "faq-4",
    icon: Calendar,
    title: "What if I need to cancel or modify my booking?",
    sub: null,
    content:
      "Since Vibzi redirects you to the original booking platform, you’ll need to follow their cancellation and modification policies.",
  },
  {
    id: "faq-5",
    icon: DollarSign,
    title: "Does Vibzi charge a service fee?",
    sub: null,
    content:
      "No, Vibzi does not charge users any additional fees. The prices you see on our platform are the same as those offered by our partner platforms.",
  },
];

export default function AccordionDemo() {
  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="faq-1"
      >
        {faqData.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border"
                    aria-hidden="true"
                  >
                    {item.icon && (
                      <item.icon
                        size={16}
                        strokeWidth={2}
                        className="opacity-60"
                      />
                    )}
                  </span>
                  <span className="flex flex-col space-y-1">
                    <span>{item.title}</span>
                    {item.sub && (
                      <span className="text-sm font-normal">{item.sub}</span>
                    )}
                  </span>
                </span>
                <Plus
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="ms-3 pb-2 ps-10 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
