// app/layout.tsx — Root layout, Clerk provider, global fonts, metadata

import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Promptra",
  description: "Generate production-grade vibe coding prompts instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} h-full antialiased`}
      >
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
    (function() {
      const theme = localStorage.getItem('theme') || 'light';
      document.documentElement.classList.toggle('dark', 
        theme === 'dark');
    })();
  `
            }}
          />
        </head>
        <body className="bg-[var(--bg)]">
          <Navbar />
          {children}
          <Toaster position="bottom-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
