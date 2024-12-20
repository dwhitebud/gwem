import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/shared/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GWEM - Global Wealth & Estate Management',
  description: 'Comprehensive financial management platform for high net worth individuals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background">
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
