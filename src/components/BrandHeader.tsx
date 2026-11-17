import { useEffect, useState } from 'react'

function isKitchenOpen() {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes() < 22 * 60 + 30
}

export function BrandHeader() {
  const [kitchenOpen, setKitchenOpen] = useState(isKitchenOpen)

  useEffect(() => {
    const timer = window.setInterval(() => setKitchenOpen(isKitchenOpen()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#inicio" aria-label="Praga Quart, inicio">
        <img className="brand-mark" src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" />
        <span className="brand-copy"><strong>PRAGA <i>QUART</i></strong><small>CERVECERÍA · DESDE 2012</small></span>
      </a>
      <nav className="header-nav" aria-label="Navegación principal">
        <a href="#carta">La carta</a><a href="#casa">Nuestra casa</a>
      </nav>
      <a className="header-note" href="#carta">
        <span className={`status-dot${kitchenOpen ? '' : ' closed'}`} />
        Cocina {kitchenOpen ? 'abierta' : 'cerrada'}
        {kitchenOpen && <b>hasta las 22:30</b>}
      </a>
    </header>
  )
}
