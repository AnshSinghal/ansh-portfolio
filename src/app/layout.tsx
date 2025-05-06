import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";
import GlobalBackgroundWrapper from "@/components/GlobalBackgroundWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ansh Singhal | AI/ML Engineer",
  description: "Portfolio of Ansh Singhal, a specialized AI/ML Engineer showcasing projects, skills, and experience in artificial intelligence and machine learning.",
  keywords: ["Ansh Singhal", "AI Engineer", "ML Engineer", "Machine Learning", "Artificial Intelligence", "Data Science", "Portfolio"],
  authors: [{ name: "Ansh Singhal" }],
  creator: "Ansh Singhal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <ThemeProvider>
          {/* Full-screen 3D background effect */}
          <GlobalBackgroundWrapper />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
