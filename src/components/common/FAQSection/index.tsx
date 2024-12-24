import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqData = [
    {
      id: "item-1",
      question: "Is it accessible?",
      answer:
        "Yes. The component is built on top of Radix UI primitives and follows WAI-ARIA guidelines for maximum accessibility.",
    },
    {
      id: "item-2",
      question: "Is it styled?",
      answer:
        "Yes. The component comes with default styling using Tailwind CSS and can be fully customized to match your design system.",
    },
    {
      id: "item-3",
      question: "Is it animated?",
      answer:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ];
  
  export default function FAQSection() {
    return (
      <div className="w-full py-8 ">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }
  