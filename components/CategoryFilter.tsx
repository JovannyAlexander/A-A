'use client'

const categories = [
  { id: 'todos', name: 'Todos', emoji: '🛍️' },
  { id: 'joyas', name: 'Joyas', emoji: '💎' },
  { id: 'maquillaje', name: 'Maquillaje', emoji: '💄' },
  { id: 'accesorios', name: 'Accesorios', emoji: '👒' },
  { id: 'otros', name: 'Otros', emoji: '✨' },
]

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: string
  onCategoryChange: (id: string) => void
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onCategoryChange(cat.id)}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all whitespace-nowrap ${
            selectedCategory === cat.id
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-pink-50 shadow-md'
          }`}
        >
          <span className="mr-1.5">{cat.emoji}</span> {cat.name}
        </button>
      ))}
    </div>
  )
}
