import { Product } from '@/types/product'
import { formatPrice } from '@/lib/products'
import { FaWhatsapp, FaStar } from 'react-icons/fa'

export default function ProductCard({ product }: { product: Product }) {
  const msg = encodeURIComponent(`Hola, me interesa: ${product.name}\nPrecio: ${formatPrice(product.price)}\nStock: ${product.stock}`)
  const openWhatsApp = () => window.open(`https://wa.me/${product.whatsappNumber.replace('+', '')}?text=${msg}`, '_blank')
  const stockClass = product.stock > 10 ? 'text-green-600 bg-green-100' : product.stock > 5 ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all min-w-0 w-full">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
        {product.featured && (
          <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <FaStar className="text-xs" /> Destacado
          </div>
        )}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 sm:p-5 min-w-0">
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${stockClass}`}>
          {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
        </span>
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mt-2 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{product.description}</p>
        <p className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
          {formatPrice(product.price)}
        </p>
        <button type="button" onClick={openWhatsApp} disabled={product.stock === 0}
          className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${product.stock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'}`}>
          <FaWhatsapp className="text-xl" /> {product.stock === 0 ? 'Agotado' : 'Consultar por WhatsApp'}
        </button>
      </div>
    </div>
  )
}
