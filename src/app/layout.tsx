import type { Metadata } from "next";
//import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import ReduxProvider from "./(root)/reduxProvider";
import { Toaster } from "sonner";
import AWSProvider from "@/components/common/authProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://vibzi.co"),
  title: "Vibzi - Plan your next trip now",
  description:
    "Vibzi is a travel planning platform dedicated to helping travelers discover the best experiences, restaurants, and hidden gems at their destinations. With a customer-driven approach, we continuously enhance and add new features based on user feedback, ensuring that our app meets the evolving needs of modern travelers. Our goal is to provide personalized, intuitive solutions that make every journey seamless and unforgettable.",
  keywords:
    "Vibzi, vibzi, vibe, travel aggregator, travel, voyage vibes, Voyage Vibes, Voyage Vibes (PVT) LTD, voyage vibes pvt ltd, vibzi.co, VIBZI, travel, travel software solutions, travel booking software platform, travel booking software platform, vacation, viator, trip planner, travel app, best software for travel, travel, software, startup",
  icons: [
    {
      rel: "icon",
      url: "/favicon/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-right" />
        <ReduxProvider>
          <AWSProvider>{children}</AWSProvider>
        </ReduxProvider>
      </body>
      {/*<GoogleAnalytics gaId="G-QVML00G8X9" />*/}
    </html>
  );
}
