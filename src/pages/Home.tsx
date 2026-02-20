import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { getProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import Hero from '@/components/Hero'
import CategoryFilter from '@/components/CategoryFilter'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setProducts(getProducts())
    setFilteredProducts(getProducts())
    setLoading(false)
  }, [])

  useEffect(() => {
    if (selectedCategory === 'todos') setFilteredProducts(products)
    else setFilteredProducts(products.filter((p) => p.category === selectedCategory))
  }, [selectedCategory, products])

  const featured = products.filter((p) => p.featured)

  return (
    <div className="animate-fadeIn w-full min-w-0 overflow-x-hidden">
      <Hero />
      {featured.length > 0 && (
        <section className="py-12 sm:py-16 px-4 w-full min-w-0">
          <div className="max-w-7xl mx-auto w-full min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Productos Destacados</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featured.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section id="catalogo" className="py-12 sm:py-16 px-4 bg-white/50 w-full min-w-0">
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Catálogo Completo</span>
          </h2>
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          {loading ? (
            <div className="text-center py-16 min-h-[200px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-600">Cargando productos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg sm:text-xl text-gray-600">No hay productos en esta categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
