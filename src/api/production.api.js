import { productionMock } from '../data/mock/production.mock';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (d, ms = 350) => new Promise((r) => setTimeout(() => r(d), ms));

export const productionApi = {
  getProductionOrders: (filters = {}) => {
    if (USE_MOCK) {
      let data = [...productionMock.productionOrders];
      if (filters.status && filters.status !== 'All') data = data.filter(o => o.status === filters.status);
      if (filters.search) { const s = filters.search.toLowerCase(); data = data.filter(o => o.id.toLowerCase().includes(s) || o.product.toLowerCase().includes(s)); }
      return delay({ orders: data, total: data.length });
    }
  },
  getWorkcenters: () => USE_MOCK ? delay(productionMock.workcenters) : null,
  getMRPSuggestions: () => USE_MOCK ? delay(productionMock.mrpSuggestions) : null,
  createProductionOrder: (data) => USE_MOCK ? delay({ id: `MO-${Date.now()}`, status: 'pending', ...data }) : null,
  updateOrderStatus: (id, status) => USE_MOCK ? delay({ success: true, id, status }) : null,
};
