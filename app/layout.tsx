import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "PowerFit Pune | Premium Gym & Fitness Destination",
    template: "%s | PowerFit Pune"
  },
  description: "Pune's elite premium fitness gym. Featuring imported Strength equipment, high-intensity CrossFit arena, certified coaches, and custom diets. Book your free session today!",
  keywords: ["gym in pune", "best fitness club pune", "crossfit pune", "pune gym trainer", "powerfit pune"],
  authors: [{ name: "PowerFit Pune" }],
  openGraph: {
    title: "PowerFit Pune | Premium Gym & Fitness Destination",
    description: "Pune's elite premium fitness gym. Featuring imported Strength equipment, high-intensity CrossFit arena, certified coaches, and custom diets.",
    type: "website",
    locale: "en_IN",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f3f4f6] font-sans">
        <AnnouncementBar />
        <Navbar />
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-x-hidden">
          {children}
        </div>
        <WhatsAppButton />
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
