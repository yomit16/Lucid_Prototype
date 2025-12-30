import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "react-hot-toast" // Import Toaster
import { Toaster as ShadcnToaster } from "@/components/ui/toaster"
import ErrorReporterInit from '@/components/ErrorReporterInit'
import LucidAssistant from '@/components/LucidAssistant'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lucid Learning Platform",
  description: "AI-powered learning and development platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Keep a consistent background across the app matching the learner dashboard */}
      <body className="antialiased bg-gradient-to-br from-green-50 to-blue-100 min-h-screen">
        <AuthProvider>
          <ErrorReporterInit />
          <LucidAssistant />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
