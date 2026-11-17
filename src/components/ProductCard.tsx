import type { Product } from '../data/menu'

type Props = { product: Product; photo?: string }

export function ProductCard({ product, photo }: Props) {
  const firstPrice = product.formats[0]
  const displayPrice = firstPrice
    ? `${product.formats.length > 1 ? 'Desde ' : ''}${firstPrice.price.toFixed(2)} €`
    : 'Consultar'

  return (
    <article className={`product-card ${photo ? 'has-photo' : 'no-photo'}`}>
      {photo && (
        <div className="product-photo">
          <img src={photo} alt="" loading="lazy" decoding="async" width="640" height="360" />
          <div className="product-photo-overlay">
            <strong className="photo-price">{displayPrice}</strong>
            <div className="photo-caption">
              <span>PRAGA · SELECCIÓN</span>
              <h3>{product.name}</h3>
              {product.description && <p>{product.description}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="product-detail">
        {!photo && <>
          <div className="product-title-line"><h3>{product.name}</h3><span className="leader" /><strong className="product-price">{displayPrice}</strong></div>
          {product.description && <p className="product-description">{product.description}</p>}
        </>}
        {product.formats.length > 1 && <div className="product-formats">{product.formats.map((format) => <span key={format.name}>{format.name}<b>{format.price.toFixed(2)} €</b></span>)}</div>}
        {product.formats.length === 1 && firstPrice && <span className="format-note">{firstPrice.name}</span>}
      </div>
    </article>
  )
}
