import { Product } from '@/types/product'
import { formatPrice } from '@/lib/products'
import { FaEdit, FaTrash } from 'react-icons/fa'

const catEmoji: Record<string, string> = { joyas: '💎', maquillaje: '💄', accesorios: '👒', otros: '✨' }

export default function AdminProductList({ products, onEdit, onDelete }: { products: Product[]; onEdit: (p: Product) => void; onDelete: (id: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Productos ({products.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-purple-50 border-b border-gray-200">
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Imagen</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Producto</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Categoría</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Precio</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Stock</th>
              <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-purple-50/50">
                <td className="px-3 py-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="font-semibold text-gray-900 text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{p.description}</div>
                </td>
                <td className="px-3 py-3">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">{catEmoji[p.category] || '✨'} {p.category}</span>
                </td>
                <td className="px-3 py-3 text-sm font-bold text-purple-600">{formatPrice(p.price)}</td>
                <td className="px-3 py-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.stock > 10 ? 'bg-green-100 text-green-800' : p.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{p.stock} ud</span>
                </td>
                <td className="px-3 py-3 text-right">
                  <button type="button" onClick={() => onEdit(p)} className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg" title="Editar"><FaEdit /></button>
                  <button type="button" onClick={() => onDelete(p.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg ml-1" title="Eliminar"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
