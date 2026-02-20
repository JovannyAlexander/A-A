'use client'

import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa'
import { WHATSAPP_URL } from '@/lib/whatsapp'

const COPYRIGHT_YEAR = 2025

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-900 to-pink-900 text-white mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-12 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="A&A" width={48} height={48} className="object-contain w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">A&A</h3>
                <p className="text-xs text-purple-300">Alexa y Arianna</p>
              </div>
            </div>
            <p className="text-purple-200 text-sm">Tu tienda de confianza. Accesorios, maquillaje y joyas.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-purple-200">
              <li><a href="/" className="hover:text-pink-300">Inicio</a></li>
              <li><a href="/admin/" className="hover:text-pink-300">Administrador</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>
            <div className="space-y-3 text-purple-200">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-300"><FaWhatsapp /> WhatsApp</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-300"><FaInstagram /> Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-300"><FaFacebook /> Facebook</a>
              <a href="mailto:contacto@ayatienda.com" className="flex items-center gap-2 hover:text-pink-300"><FaEnvelope /> Email</a>
            </div>
          </div>
        </div>
        <div className="border-t border-purple-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-purple-300 text-sm">
          <p>&copy; {COPYRIGHT_YEAR} A&A — Alexa y Arianna. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
