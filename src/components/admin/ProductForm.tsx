import { useState, useEffect } from 'react'
import { Product, Category } from '@/types/product'
import { FaSave, FaTimes } from 'react-icons/fa'
import { WHATSAPP_NUMBER } from '@/lib/whatsapp'

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: 'joyas', label: 'Joyas', emoji: '💎' },
  { value: 'maquillaje', label: 'Maquillaje', emoji: '💄' },
  { value: 'accesorios', label: 'Accesorios', emoji: '👒' },
  { value: 'otros', label: 'Otros', emoji: '✨' },
]

export default function ProductForm({ product, onSave, onCancel }: {
  product: Product | null
  onSave: (data: Omit<Product, 'id' | 'createdAt'> | Product) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'joyas' as Category,
    image: '',
    whatsappNumber: WHATSAPP_NUMBER,
    featured: false,
  })

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: String(product.price),
        stock: String(product.stock),
        category: product.category,
        image: product.image,
        whatsappNumber: product.whatsappNumber,
        featured: !!product.featured,
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock, 10) }
    if (product) onSave({ ...product, ...data })
    else onSave(data)
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{product ? 'Editar producto' : 'Nuevo producto'}</h2>
      <p className="text-gray-600 text-sm mb-6">{product ? 'Modifica los datos' : 'Completa el formulario'}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="Ej: Anillo de plata" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría *</label>
            <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500">
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Precio (COP) *</label>
            <input type="number" required min={0} step={1000} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Stock *</label>
            <input type="number" required min={0} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp (con código país) *</label>
            <input type="text" required value={form.whatsappNumber} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder={WHATSAPP_NUMBER} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="feat" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 text-purple-600 rounded" />
            <label htmlFor="feat" className="text-sm font-semibold text-gray-700">Destacado</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción *</label>
          <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="Describe el producto..." />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">URL de imagen *</label>
          <input type="url" required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="https://..." />
          {form.image && (
            <div className="mt-2 w-full h-40 rounded-lg overflow-hidden border border-gray-200">
              <img src={form.image} alt="Vista previa" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=No+disponible' }} />
            </div>
          )}
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            <FaSave /> {product ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 flex items-center gap-2">
            <FaTimes /> Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
