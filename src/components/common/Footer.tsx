import Image from "next/image";
import Link from "next/link";

const footerData = {
  brand: {
    description: "© 2024 Voyage Vibes (PVT) LTD",
    logo: "/logo/logo-rbg.png", 
  },
  sections: [
    {
      title: "",
      links: [
        { label: "About Us", url: "#" },
        { label: "Careers", url: "#" },
        { label: "Privacy Policy", url: "#" },
        { label: "Terms of Service", url: "#" },
      ],
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container px-5 mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo Section */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Link href="/">
            <Image
              src={footerData.brand.logo}
              alt="Voyage Vibes Logo"
              width={150}
              height={50}
              className="mx-auto w-[90px]"
            />
          </Link>
        </div>

        {/* Links and Description Section */}
        <div className="text-center md:text-right">
          <p className="text-sm mb-4">{footerData.brand.description}</p>
          <ul className="flex justify-center md:justify-end space-x-4">
            {footerData.sections[0].links.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="text-sm text-gray-600 hover:text-gray-800 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
