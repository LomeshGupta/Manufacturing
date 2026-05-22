import { procurementMock } from '../data/mock/procurement.mock';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (d, ms = 350) => new Promise((r) => setTimeout(() => r(d), ms));

export const procurementApi = {
  getPurchaseOrders: (filters = {}) => {
    if (USE_MOCK) {
      let data = [...procurementMock.purchaseOrders];
      if (filters.status && filters.status !== 'All') data = data.filter(p => p.status === filters.status);
      if (filters.search) { const s = filters.search.toLowerCase(); data = data.filter(p => p.id.toLowerCase().includes(s) || p.vendor.toLowerCase().includes(s)); }
      return delay({ orders: data, total: data.length });
    }
  },
  getPOLineItems: (poId) => USE_MOCK ? delay(procurementMock.poLineItems[poId] || []) : null,
  getGRNs: () => USE_MOCK ? delay(procurementMock.grns) : null,
  getVendorBills: () => USE_MOCK ? delay(procurementMock.vendorBills) : null,
  getVendors: () => USE_MOCK ? delay(procurementMock.vendors) : null,
  createPO: (data) => USE_MOCK ? delay({ id: `PO-${Date.now()}`, status: 'draft', ...data }) : null,
  approvePO: (id) => USE_MOCK ? delay({ success: true, id, status: 'approved' }) : null,
  createGRN: (data) => USE_MOCK ? delay({ id: `GRN-${Date.now()}`, ...data }) : null,
};
