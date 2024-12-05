import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerData = {
    brand: {
        description: "© 2024 Voyage Vibes (PVT) LTD"
    },
    sections: [
        {
            title: "Destinations",
            links: [
                { label: "Europe", url: "#" },
                { label: "Asia", url: "#" },
                { label: "Africa", url: "#" },
                { label: "North America", url: "#" },
                { label: "South America", url: "#" }
            ]
        },
        {
            title: "Travel Tips",
            links: [
                { label: "Packing Guide", url: "#" },
                { label: "Travel Insurance", url: "#" },
                { label: "Best Time to Travel", url: "#" },
                { label: "Travel Documents", url: "#" },
                { label: "Budget Planning", url: "#" }
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About Us", url: "#" },
                { label: "Careers", url: "#" },
                { label: "Press", url: "#" },
                { label: "Privacy Policy", url: "#" },
                { label: "Terms of Service", url: "#" }
            ]
        }
    ],
    socialLinks: [
        { platform: "Facebook", icon: "Facebook", url: "#" },
        { platform: "Instagram", icon: "Instagram", url: "#" },
        { platform: "Twitter", icon: "Twitter", url: "#" }
    ],
    footerText: " 2024 TravelEase. All rights reserved."
};

export default function Footer() {
    return (
        <footer className="bg-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="mb-8 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={'/logo/logo-rbg.png'}
                                alt="logo"
                                width={400}
                                height={150}
                                className="w-16 lg:w-28"
                            />
                        </Link>
                        <p className="mt-4 text-xs sm:text-sm">{footerData.brand.description}</p>
                    </div>
                    {footerData.sections.map((section, idx) => (
                        <div key={idx}>
                            <h3 className="text-base sm:text-lg font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link
                                            href={link.url}
                                            className="text-xs sm:text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 pt-8 border-t border-primary flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs sm:text-sm">{footerData.footerText}</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {footerData.socialLinks.map((social, idx) => (
                            <Link
                                key={idx}
                                href={social.url}
                                className="transition-colors"
                            >
                                <span className="sr-only">{social.platform}</span>
                                {social.icon === "Facebook" && <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />}
                                {social.icon === "Instagram" && <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />}
                                {social.icon === "Twitter" && <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
