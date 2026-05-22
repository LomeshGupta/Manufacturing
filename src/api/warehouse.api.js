import { warehouseMock } from '../data/mock/warehouse.mock';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (d, ms = 350) => new Promise((r) => setTimeout(() => r(d), ms));

export const warehouseApi = {
  getWarehouses: () => USE_MOCK ? delay(warehouseMock.warehouses) : null,
  getBins: (warehouseId) => USE_MOCK ? delay(warehouseId ? warehouseMock.bins.filter(b => b.warehouse === warehouseId) : warehouseMock.bins) : null,
  getPutawayOrders: () => USE_MOCK ? delay(warehouseMock.putawayOrders) : null,
  getPickingOrders: () => USE_MOCK ? delay(warehouseMock.pickingOrders) : null,
  completePutaway: (id) => USE_MOCK ? delay({ success: true, id }) : null,
  completePicking: (id) => USE_MOCK ? delay({ success: true, id }) : null,
};
