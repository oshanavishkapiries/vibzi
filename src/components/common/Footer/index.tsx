import Image from "next/image";

// Footer data stored in a JSON object
const footerData = {
    logo: {
      text: "vibzi.",
      subText: "\u00A9 2024 Voyage Vibes (PVT) LTD"
    },
    links: [
      {
        section: "Company",
        items: [
          { label: "About Us", href: "/about" },
          { label: "Contact Us", href: "/contact" }
        ]
      },
      {
        section: "Legal",
        items: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" }
        ]
      },
      {
        section: "Support",
        items: [
          { label: "Help Center", href: "/help" },
          { label: "FAQs", href: "/faqs" }
        ]
      }
    ]
  };
  
  export default function Footer() {
    return (
      <footer className="w-full bg-muted border-t border-gray-200 py-3 px-[60px]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
          <Image src={'/logo/logo-rbg.png'} alt='logo' width={400} height={150} className='w-16' />
            <p className="text-sm text-gray-600">{footerData.logo.subText}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            {footerData.links.map((section) => (
              <div key={section.section} className="text-center md:text-left">
                <h3 className="text-md font-semibold text-gray-700 mb-2">{section.section}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-teal-900 transition"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }
  