import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Background } from '@/components/Background'
import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KAI',
  description: 'Plataforma educativa para generar recursos personalizados con inteligencia artificial',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} grid min-h-[100dvh] grid-rows-[auto_1fr_auto]`}>
        <Background />

        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
