import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "item-1",
    question: "What is Vibzi?",
    answer:
      "Vibzi is a travel platform that aggregates experiences across Asia-Pacific destinations. We compile options from trusted platforms to make travel planning effortless and efficient.",
  },
  {
    id: "item-2",
    question: "Is it safe to book through Vibzi?",
    answer:
      "Yes, Vibzi redirects you to the original platform for booking. We work only with trusted partners to ensure a secure and reliable booking experience.",
  },
  {
    id: "item-3",
    question: "What destinations are covered by Vibzi?",
    answer:
      "Vibzi specializes in Asia-Pacific destinations, offering a comprehensive range of experiences in popular and hidden gem locations across the region.",
  },
  {
    id: "item-4",
    question: "What if I need to cancel or modify my booking?",
    answer:
      "Since Vibzi redirects you to the original booking platform, you’ll need to follow their cancellation and modification policies.",
  },
  {
    id: "item-5",
    question: "Does Vibzi charge a service fee?",
    answer:
      "No, Vibzi does not charge users any additional fees. The prices you see on our platform are the same as those offered by our partner platforms.",
  },
  {
    id: "item-6",
    question: "What types of experiences can I find on Vibzi?",
    answer:
      "From guided tours and adventure activities to culinary classes and cultural experiences, Vibzi offers a diverse array of options to make your trip unforgettable.",
  },
  {
    id: "item-7",
    question: "Can I customize my search on Vibzi?",
    answer:
      "Absolutely! You can filter your search by destination, type of activity, price range, and more to find the perfect options for your travel needs.",
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
