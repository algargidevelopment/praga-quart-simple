export function MenuHero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-grain" />
      <div className="hero-copy">
        <p className="eyebrow">CERVECERÍA · DESDE 2012</p>
        <h1>Buen beber. <em>Mejor estar.</em></h1>
        <p className="hero-description">Cervezas, algo rico y buena compañía.</p>
        <a className="hero-link" href="#carta">Ver la carta <span>↓</span></a>
      </div>
      <div className="hero-stamp" aria-label="Tradición y buena cerveza">
        <span className="stamp-top">CERVEZA · AMIGOS</span><strong>DESDE<br />1998</strong><span className="stamp-bottom">PRAGA QUART · CERVECERÍA</span>
      </div>
    </section>
  )
}
