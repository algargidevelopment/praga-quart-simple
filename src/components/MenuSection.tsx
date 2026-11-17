import type { Category, Product, Subcategory } from '../data/menu'
import { ProductCard } from './ProductCard'
import { useState } from 'react'

const productImages = import.meta.glob<string>('../assets/products/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

type Props = { category: Category; subcategories: Subcategory[]; products: Product[] }

export function MenuSection({ category, subcategories, products }: Props) {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(() => new Set())
  const sections = subcategories.map((subcategory) => ({
    subcategory,
    products: products.filter((product) => product.subcategoryId === subcategory.id),
  })).filter((section) => section.products.length > 0)

  return (
    <section className="menu-section" aria-label={category.name}>
      {category.note && <p className="service-note"><span>✳</span> {category.note}</p>}
      {sections.map(({ subcategory, products: sectionProducts }, sectionIndex) => (
        <section className="subcategory" key={subcategory.id}>
          <button className="subcategory-heading" type="button" aria-expanded={!collapsedSections.has(subcategory.id)} aria-controls={`subcategory-products-${subcategory.id}`}
            onClick={() => setCollapsedSections((current) => {
              const next = new Set(current)
              if (next.has(subcategory.id)) next.delete(subcategory.id)
              else next.add(subcategory.id)
              return next
            })}>
            <span className="section-number">{String(sectionIndex + 1).padStart(2, '0')}</span>
            <h2>{subcategory.name}</h2>
            <span className="heading-rule" />
            <span className="subcategory-chevron" aria-hidden="true" />
          </button>
          {!collapsedSections.has(subcategory.id) && <div className="product-grid" id={`subcategory-products-${subcategory.id}`}>{sectionProducts.map((product) => {
            const photo = product.imagePath ? productImages[`../assets/${product.imagePath}`] : undefined
            return <ProductCard key={product.id} product={product} photo={photo} />
          })}</div>}
        </section>
      ))}
    </section>
  )
}
