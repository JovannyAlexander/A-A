'use client'

import { useState, FormEvent } from 'react'
import { FaLock, FaUser, FaSignInAlt } from 'react-icons/fa'

type Props = {
  onSuccess: () => void
}

export default function AdminLogin({ onSuccess }: Props) {
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!password.trim()) {
      setError('Ingresa la contraseña.')
      return
    }
    setLoading(true)
    const { login } = await import('@/lib/auth')
    const ok = login(user.trim() || 'admin', password)
    setLoading(false)
    if (ok) {
      onSuccess()
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative h-16 w-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="A&A" width={64} height={64} className="object-contain w-16 h-16" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Panel Administrador</h1>
            <p className="text-purple-100 text-sm mt-1">Inicia sesión para continuar</p>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div>
              <label htmlFor="user" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Usuario
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="user"
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoComplete="username"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoComplete="current-password"
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-70 transition"
            >
              <FaSignInAlt /> {loading ? 'Verificando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
        <p className="text-center text-gray-500 text-xs mt-4">
          Por defecto usuario <strong>admin</strong> y contraseña <strong>admin</strong>. En producción configura <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_ADMIN_USER</code> y <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_ADMIN_PASSWORD</code>.
        </p>
      </div>
    </div>
  )
}
