import Link from "next/link";

const MiniFooter = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 py-3 px-4 bg-background border-t">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link
            href="/careers"
            className="hover:text-primary transition-colors"
          >
            Careers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiniFooter;
