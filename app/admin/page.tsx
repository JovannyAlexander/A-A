'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/products'
import { isAuthenticated, logout } from '@/lib/auth'
import AdminProductList from '@/components/admin/AdminProductList'
import ProductForm from '@/components/admin/ProductForm'
import AdminLogin from '@/components/admin/AdminLogin'
import { FaPlus, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa'

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAuth(isAuthenticated())
    setProducts(getProducts())
    setLoading(false)
  }, [])

  const handleLoginSuccess = () => {
    setAuth(true)
  }

  const handleLogout = () => {
    logout()
    setAuth(false)
  }

  const loadProducts = () => {
    setProducts(getProducts())
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleSave = (data: Omit<Product, 'id' | 'createdAt'> | Product) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data)
    } else {
      addProduct(data as Omit<Product, 'id' | 'createdAt'>)
    }
    loadProducts()
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este producto?')) {
      deleteProduct(id)
      loadProducts()
    }
  }

  if (!auth) {
    return <AdminLogin onSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 sm:px-8 py-5 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Panel Administrador</h1>
                <p className="text-purple-100 text-sm sm:text-base mt-1">Gestiona el catálogo A&A</p>
              </div>
              <div className="flex items-center gap-2">
                {!showForm && (
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-white text-purple-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-purple-50 transition shadow-lg flex items-center gap-2"
                  >
                    <FaPlus /> Agregar producto
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-xl font-semibold transition flex items-center gap-2"
                  title="Cerrar sesión"
                >
                  <FaSignOutAlt /> Salir
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-8">
            {showForm ? (
              <ProductForm product={editingProduct} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingProduct(null) }} />
            ) : loading ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="mt-4 text-gray-600">Cargando...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <FaBoxOpen className="text-5xl text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-4">No hay productos</p>
                <button type="button" onClick={handleAdd} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold">
                  Agregar primer producto
                </button>
              </div>
            ) : (
              <AdminProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
