// app/layout.tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkClientProvider } from "./ClerkClientProvider"; // Import the new component

const bricolage = Bricolage_Grotesque({
    variable: "--font-bricolage",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Converso",
    description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
        {/* Wrap everything in the new client provider */}
        <ClerkClientProvider>
            <Navbar/>
            {children}
        </ClerkClientProvider>
        </body>
        </html>
    );
}
