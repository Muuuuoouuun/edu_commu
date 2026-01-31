import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "LUMIERE | Premium Education Insight",
    description: "A curated educational ecosystem.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.variable, playfair.variable, "min-h-screen flex flex-col font-sans bg-background text-text-main selection:bg-accent-rose/30")}>
                <Providers>
                    <Navbar />
                    <main className="flex-1 w-full">
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
