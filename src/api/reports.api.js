const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (d, ms = 500) => new Promise((r) => setTimeout(() => r(d), ms));

const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

export const reportsApi = {
  getProductionReport: () => USE_MOCK ? delay({
    trend: MONTHS.map((m, i) => ({ month: m, planned: 100 + i * 5, actual: 90 + i * 4 + Math.round(Math.random() * 8), efficiency: 85 + i * 0.8 })),
    summary: { totalOrders: 487, completed: 431, inProgress: 36, pending: 20, overallEfficiency: 88.5 },
  }) : null,

  getInventoryReport: () => USE_MOCK ? delay({
    valueTrend: MONTHS.map((m, i) => ({ month: m, value: 38000000 + i * 700000 })),
    byCategory: [
      { category: 'Raw Material', value: 18400000, items: 142 },
      { category: 'Finished Goods', value: 12100000, items: 38 },
      { category: 'WIP', value: 9200000, items: 24 },
      { category: 'Consumables', value: 2300000, items: 44 },
    ],
    turnover: 4.2,
    lowStockItems: 9,
  }) : null,

  getQCReport: () => USE_MOCK ? delay({
    passRateTrend: MONTHS.map((m, i) => ({ month: m, passRate: 94 + (i % 3) * 0.7 })),
    rejectionByReason: [
      { reason: 'Dimensional deviation', count: 34 },
      { reason: 'Surface finish', count: 28 },
      { reason: 'Material defect', count: 19 },
      { reason: 'Corrosion', count: 12 },
      { reason: 'Other', count: 8 },
    ],
    summary: { totalInspected: 4820, passed: 4631, rejected: 189, passRate: 96.1 },
  }) : null,

  getProcurementReport: () => USE_MOCK ? delay({
    spendTrend: MONTHS.map((m, i) => ({ month: m, spend: 800000 + i * 50000 + Math.round(Math.random() * 100000) })),
    byVendor: [
      { vendor: 'Tata Steel Ltd.', spend: 1840000, orders: 24, onTime: 94 },
      { vendor: 'Bharat Forge', spend: 1240000, orders: 18, onTime: 88 },
      { vendor: 'Sundaram Fasteners', spend: 620000, orders: 32, onTime: 91 },
      { vendor: 'Minda Industries', spend: 380000, orders: 11, onTime: 76 },
      { vendor: 'Lumax Auto', spend: 280000, orders: 9, onTime: 83 },
    ],
    summary: { totalSpend: 4360000, totalOrders: 94, avgOnTime: 88.4 },
  }) : null,
};
