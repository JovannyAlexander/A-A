import { Link, useLocation } from 'react-router-dom'
import { FaUserCog } from 'react-icons/fa'

const linkBase = 'px-4 py-2 rounded-lg font-medium'
const linkInactive = 'text-gray-700 hover:bg-pink-50'
const linkActive = 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === ''
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow sticky top-0 z-50 border-b border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="flex justify-between items-center h-14 sm:h-16 gap-2">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink">
            <img src="/logo.svg" alt="A&amp;A" width={40} height={40} className="object-contain w-10 h-10" />
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">A&amp;A</span>
              <span className="text-[10px] text-gray-500 hidden sm:block">Alexa y Arianna</span>
            </div>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/" className={`${linkBase} ${isHome ? linkActive : linkInactive}`}>Inicio</Link>
            <Link to="/admin" className={`${linkBase} flex items-center gap-2 ${isAdmin ? linkActive : linkInactive}`}>
              <FaUserCog /> Administrador
            </Link>
          </div>
          <Link to="/admin" className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-pink-50" aria-label="Admin">
            <FaUserCog className="text-xl" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
