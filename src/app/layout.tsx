import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Support.ai",
  description: "the chatbot that you can embed in your website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
     <Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={3000}
          theme="light"
        />
        <Script
        src="https://ai-customer-support-chatbot-mauve.vercel.app/chatBot.js"
        data-owner-id="usr_148106828457181448"
        strategy="lazyOnload"
      />
      </body>
      
    </html>
  );
}
