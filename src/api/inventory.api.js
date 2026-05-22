import { inventoryMock } from '../data/mock/inventory.mock';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (d, ms = 350) => new Promise((r) => setTimeout(() => r(d), ms));

export const inventoryApi = {
  getItems: (filters = {}) => {
    if (USE_MOCK) {
      let data = [...inventoryMock.items];
      if (filters.category && filters.category !== 'All') data = data.filter(i => i.category === filters.category);
      if (filters.search) { const s = filters.search.toLowerCase(); data = data.filter(i => i.name.toLowerCase().includes(s) || i.id.toLowerCase().includes(s)); }
      if (filters.lowStock) data = data.filter(i => i.stock <= i.reorderLevel);
      return delay({ items: data, total: data.length });
    }
  },
  getItem: (id) => USE_MOCK ? delay(inventoryMock.items.find(i => i.id === id)) : null,
  getMovements: () => USE_MOCK ? delay(inventoryMock.movements) : null,
  getSummary: () => USE_MOCK ? delay(inventoryMock.summary) : null,
  getCategories: () => USE_MOCK ? delay(inventoryMock.categories) : null,
  createItem: (data) => USE_MOCK ? delay({ ...data, id: `RM-${Date.now()}` }) : null,
  updateItem: (id, data) => USE_MOCK ? delay({ id, ...data }) : null,
  deleteItem: (id) => USE_MOCK ? delay({ success: true, id }) : null,
  createAdjustment: (data) => USE_MOCK ? delay({ id: `ADJ-${Date.now()}`, ...data }) : null,
  createTransfer: (data) => USE_MOCK ? delay({ id: `TR-${Date.now()}`, ...data }) : null,
};
