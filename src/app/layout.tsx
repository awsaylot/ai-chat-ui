import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neural Interface v2.1",
  description: "Cyberpunk AI Terminal - DeepSeek Neural Network",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-green-400 antialiased">
        {children}
      </body>
    </html>
  );
}