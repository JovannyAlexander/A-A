import { FaShoppingBag, FaStar } from 'react-icons/fa'
import { WHATSAPP_URL } from '@/lib/whatsapp'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 px-4 w-full min-w-0">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-blue-400/20" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10 w-full min-w-0">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6 shadow-lg">
            <FaStar className="text-yellow-500 animate-pulse flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Nuevos productos semanales</span>
          </div>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="A&A" width={128} height={128} className="object-contain drop-shadow-lg w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">A&A</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 font-medium">Alexa y Arianna</p>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 font-medium">Descubre tu estilo único</p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Accesorios, maquillaje y joyas. Contáctanos por WhatsApp para consultas y pedidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <a href="/#catalogo" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
              <FaShoppingBag /> Ver catálogo
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold border-2 border-purple-600 shadow-lg hover:shadow-xl transition-all">
              Contáctanos
            </a>
          </div>
        </div>
        <div className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {['✨ Calidad premium', '💎 Exclusivos', '🚀 Envíos rápidos', '💬 Atención personal'].map((text, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg text-center">
              <p className="text-xs sm:text-sm font-semibold text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
