import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conversation Analysis",
  description: "Real-time argument and counterargument generation per speaker.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
