import { useEffect, useState } from 'react'
import { BrandHeader } from './components/BrandHeader'
import { CategoryTabs } from './components/CategoryTabs'
import { MenuHero } from './components/MenuHero'
import { MenuSection } from './components/MenuSection'
import { categories, products, subcategories } from './data/menu'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState(() => {
    const savedCategory = window.history.state?.menuCategory
    return categories.some((item) => item.id === savedCategory) ? savedCategory : categories[0]?.id ?? ''
  })
  const category = categories.find((item) => item.id === activeCategory) ?? categories[0]

  useEffect(() => {
    window.history.replaceState({ ...window.history.state, menuCategory: activeCategory }, '', window.location.href)
    const restoreCategory = (event: PopStateEvent) => {
      const previousCategory = event.state?.menuCategory
      setActiveCategory(categories.some((item) => item.id === previousCategory) ? previousCategory : categories[0]?.id ?? '')
    }
    window.addEventListener('popstate', restoreCategory)
    return () => window.removeEventListener('popstate', restoreCategory)
  }, [])

  function selectCategory(id: string) {
    if (id === activeCategory) return
    window.history.pushState({ ...window.history.state, menuCategory: id }, '', window.location.href)
    setActiveCategory(id)
  }

  return (
    <div className="page-shell">
      <div className="topline"><span>UNA CASA PARA DISFRUTAR</span><span>BUENAS BIRRAS · BUENA COMIDA · BUENA COMPAÑÍA</span><span>DESDE 2012</span></div>
      <BrandHeader />
      <main>
        <MenuHero />
        <section className="menu-wrap" id="carta">
          <div className="menu-intro">
            <div><p className="eyebrow dark-eyebrow">LO QUE NOS GUSTA PONER EN LA MESA</p><h2>La carta<span>.</span></h2></div>
            <p className="menu-intro-copy">Un picoteo para abrir boca, una cerveza bien tirada<br className="desktop-break" /> y tiempo para disfrutar. Así de sencillo.</p>
          </div>
          <CategoryTabs categories={categories} activeId={activeCategory} onSelect={selectCategory} />
          {category && <MenuSection key={category.id} category={category} subcategories={subcategories.filter((item) => item.categoryId === category.id)} products={products} />}
          <div className="menu-footnote"><span>✳</span><p>¿Tienes alguna alergia o intolerancia? Consúltanos y te ayudamos.</p><span>✳</span></div>
        </section>
        <section className="house-note" id="casa">
          <div className="house-ornament">✳</div><p className="eyebrow">EL ESPÍRITU DE LA CASA</p><h2>Ven por una.<br /><em>Quédate un rato.</em></h2><p>Mesas de madera, conversaciones sin reloj<br className="desktop-break" /> y siempre algo rico para compartir.</p>
        </section>
      </main>
      <footer className="site-footer"><a className="footer-brand" href="#inicio">PRAGA <i>QUART</i></a><span>BUENAS COSAS, SIN PRISA.</span><a href="#inicio">VOLVER ARRIBA ↑</a></footer>
    </div>
  )
}

export default App
