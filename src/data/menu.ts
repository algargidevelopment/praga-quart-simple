import categoriesCsv from './categories.csv?raw'
import subcategoriesCsv from './subcategories.csv?raw'
import productsCsv from './products.csv?raw'
import formatsCsv from './product_formats.csv?raw'

export type Category = { id: string; name: string; icon: string; note: string; sortOrder: number }
export type Subcategory = { id: string; categoryId: string; name: string; sortOrder: number }
export type Format = { name: string; price: number; sortOrder: number }
export type Product = {
  id: string; subcategoryId: string; name: string; description: string; imagePath: string
  sortOrder: number; active: boolean; formats: Format[]
}

function parseCsv(source: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i]
    if (char === '"' && source[i + 1] === '"' && quoted) { cell += '"'; i += 1 }
    else if (char === '"') quoted = !quoted
    else if (char === ',' && !quoted) { row.push(cell); cell = '' }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && source[i + 1] === '\n') i += 1
      row.push(cell); cell = ''
      if (row.some((value) => value.trim())) rows.push(row)
      row = []
    } else cell += char
  }
  if (cell || row.length) { row.push(cell); rows.push(row) }
  return rows
}

function records(source: string): Record<string, string>[] {
  const [header, ...rows] = parseCsv(source)
  return rows.map((row) => Object.fromEntries(header.map((key, index) => [key.trim(), (row[index] ?? '').trim()])))
}

const formatRecords = records(formatsCsv)
const formatsByProduct = new Map<string, Format[]>()
for (const row of formatRecords) {
  const formats = formatsByProduct.get(row.product_id) ?? []
  formats.push({ name: row.name, price: Number(row.price), sortOrder: Number(row.sort_order) })
  formatsByProduct.set(row.product_id, formats)
}

export const categories: Category[] = records(categoriesCsv).map((row) => ({
  id: row.id, name: row.name, icon: row.icon, note: row.note, sortOrder: Number(row.sort_order),
})).sort((a, b) => a.sortOrder - b.sortOrder)

export const subcategories: Subcategory[] = records(subcategoriesCsv).map((row) => ({
  id: row.id, categoryId: row.category_id, name: row.name, sortOrder: Number(row.sort_order),
})).sort((a, b) => a.sortOrder - b.sortOrder)

export const products: Product[] = records(productsCsv)
  .filter((row) => row.active === 'true')
  .map((row) => ({
    id: row.id, subcategoryId: row.subcategory_id, name: row.name, description: row.description,
    imagePath: row.image_path, sortOrder: Number(row.sort_order), active: row.active === 'true',
    formats: (formatsByProduct.get(row.id) ?? []).sort((a, b) => a.sortOrder - b.sortOrder),
  })).sort((a, b) => a.sortOrder - b.sortOrder)

