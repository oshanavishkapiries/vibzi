import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-[60px] aspect-video">
                <Image
                  src="/logo/logo-rbg.png"
                  alt="Voyage Vibes Logo"
                  fill
                  className="object-contain grayscale"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/careers"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Contact/Social Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.pinterest.com/vibzi_co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Image
                  src="/logo/p.png"
                  alt="pinterest"
                  width={20}
                  height={20}
                />
                <span className="sr-only">Pinterest</span>
              </Link>

              <Link
                href="https://www.instagram.com/vibzi.co?igsh=d2xqemo1ZTEzOGYx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Image
                  src="/logo/i.png"
                  alt="pinterest"
                  width={20}
                  height={20}
                />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/vibzi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Image src="/logo/li.png" alt="link" width={20} height={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@vibzi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Image src="/logo/t.png" alt="tiktok" width={20} height={20} />
                <span className="sr-only">TikTok</span>
              </Link>
              <Link
                href="https://web.facebook.com/profile.php?id=61572182182556"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Image
                  src="/logo/f.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2025 Voyage Vibes
          </p>
        </div>
      </div>
    </footer>
  );
}
