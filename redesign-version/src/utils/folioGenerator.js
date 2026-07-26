// MILLA ABOGADOS — Folio Generator. Formato: FOLIO-YYYYMMDD-XXXX garantizando unicidad.
const generatedFolios = new Set();

export function generateFolio() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const chars = '0123456789ABCDEF';
  let folio = '';
  do {
    let randomStr = '';
    for (let i = 0; i < 4; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    folio = `FOLIO-${dateStr}-${randomStr}`;
  } while (generatedFolios.has(folio));
  generatedFolios.add(folio);
  return folio;
}
