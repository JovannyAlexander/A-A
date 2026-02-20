'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaUserCog } from 'react-icons/fa'

const linkBase = 'px-4 py-2 rounded-lg font-medium'
const linkInactive = 'text-gray-700 hover:bg-pink-50'
const linkActive = 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'

export default function Navbar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isHome = mounted && (pathname === '/' || pathname === '' || pathname === null)
  const isAdmin = mounted && pathname != null && String(pathname).startsWith('/admin')

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow sticky top-0 z-50 border-b border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="flex justify-between items-center h-14 sm:h-16 gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink">
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="A&A" width={40} height={40} className="object-contain w-10 h-10" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">A&A</span>
              <span className="text-[10px] text-gray-500 hidden sm:block">Alexa y Arianna</span>
            </div>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/" className={`${linkBase} ${isHome ? linkActive : linkInactive}`}>
              Inicio
            </Link>
            <Link href="/admin/" className={`${linkBase} flex items-center gap-2 ${isAdmin ? linkActive : linkInactive}`}>
              <FaUserCog /> Administrador
            </Link>
          </div>
          <Link href="/admin/" className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-pink-50" aria-label="Admin">
            <FaUserCog className="text-xl" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
