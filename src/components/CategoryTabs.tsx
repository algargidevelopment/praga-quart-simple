import type { Category } from '../data/menu'

type Props = { categories: Category[]; activeId: string; onSelect: (id: string) => void }

export function CategoryTabs({ categories, activeId, onSelect }: Props) {
  return (
    <div className="category-tabs" role="tablist" aria-label="Secciones de la carta">
      {categories.map((category) => (
        <button className={activeId === category.id ? 'category-tab active' : 'category-tab'} key={category.id}
          role="tab" aria-selected={activeId === category.id} onClick={() => onSelect(category.id)}>
          <span>{category.icon}</span>{category.name}
        </button>
      ))}
    </div>
  )
}
