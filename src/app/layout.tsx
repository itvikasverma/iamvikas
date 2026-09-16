import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandCenter from "@/components/CommandCenter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vikas Verma | AI/ML Engineer",
  description: "Portfolio of Vikas Verma, AI/ML Engineer specializing in Generative AI, LLMs, and RAG.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-900 text-slate-50 antialiased overflow-x-hidden`} suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CommandCenter />
      </body>
    </html>
  );
}
