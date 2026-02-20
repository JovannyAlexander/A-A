import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'A&A — Alexa y Arianna | Accesorios, Maquillaje y Joyas',
  description: 'A&A by Alexa y Arianna. Accesorios, maquillaje y joyas. Contáctanos por WhatsApp.',
  icons: {
    icon: '/logo-icon.svg',
    apple: '/logo-icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="overflow-x-hidden" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden min-h-screen flex flex-col`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 w-full min-w-0">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
