import { productionMock } from '../data/mock/production.mock';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (d, ms = 350) => new Promise((r) => setTimeout(() => r(d), ms));

export const bomApi = {
  getBOMs: (filters = {}) => {
    if (USE_MOCK) {
      let data = [...productionMock.boms];
      if (filters.status && filters.status !== 'All') data = data.filter(b => b.status === filters.status);
      if (filters.search) { const s = filters.search.toLowerCase(); data = data.filter(b => b.product.toLowerCase().includes(s) || b.id.toLowerCase().includes(s)); }
      return delay({ boms: data, total: data.length });
    }
  },
  getBOM: (id) => USE_MOCK ? delay(productionMock.boms.find(b => b.id === id)) : null,
  explodeBOM: (id, qty = 1) => {
    if (USE_MOCK) {
      const bom = productionMock.boms.find(b => b.id === id);
      if (!bom) return delay(null);
      const lines = bom.components.map(c => ({
        ...c,
        requiredQty: c.qty * qty,
        scrapQty: (c.qty * qty * c.scrap) / 100,
        totalQty: c.qty * qty * (1 + c.scrap / 100),
      }));
      return delay({ bom, qty, lines });
    }
  },
  createBOM: (data) => USE_MOCK ? delay({ id: `BOM-${Date.now()}`, status: 'draft', ...data }) : null,
  updateBOM: (id, data) => USE_MOCK ? delay({ id, ...data }) : null,
};
