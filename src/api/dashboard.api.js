import { dashboardMock } from '../data/mock/dashboard.mock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

const mockDelay = (data, ms = 300) =>
  new Promise((res) => setTimeout(() => res(data), ms));

export const getDashboardKPIs = () =>
  USE_MOCK ? mockDelay(dashboardMock.kpis) : Promise.reject('API not implemented');

export const getProductionTrend = () =>
  USE_MOCK ? mockDelay(dashboardMock.productionTrend) : Promise.reject('API not implemented');

export const getOEEBreakdown = () =>
  USE_MOCK ? mockDelay(dashboardMock.oeeBreakdown) : Promise.reject('API not implemented');

export const getMachineStatus = () =>
  USE_MOCK ? mockDelay(dashboardMock.machineStatus) : Promise.reject('API not implemented');

export const getMaterialAlerts = () =>
  USE_MOCK ? mockDelay(dashboardMock.materialAlerts) : Promise.reject('API not implemented');

export const getRecentProductionOrders = () =>
  USE_MOCK ? mockDelay(dashboardMock.recentProductionOrders) : Promise.reject('API not implemented');

export const getInventorySummary = () =>
  USE_MOCK ? mockDelay(dashboardMock.inventorySummary) : Promise.reject('API not implemented');

export const getWarehouseUtilization = () =>
  USE_MOCK ? mockDelay(dashboardMock.warehouseUtilization) : Promise.reject('API not implemented');

export const getVendorPerformance = () =>
  USE_MOCK ? mockDelay(dashboardMock.vendorPerformance) : Promise.reject('API not implemented');

export const getQualitySummary = () =>
  USE_MOCK ? mockDelay(dashboardMock.qualitySummary) : Promise.reject('API not implemented');

export const getShiftSummary = () =>
  USE_MOCK ? mockDelay(dashboardMock.shiftSummary) : Promise.reject('API not implemented');
