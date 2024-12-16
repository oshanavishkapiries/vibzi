
import type { Metadata } from "next";
import "./globals.css";


import ReduxProvider from "./(root)/reduxProvider";

export const metadata: Metadata = {
  title: "VIBZI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
