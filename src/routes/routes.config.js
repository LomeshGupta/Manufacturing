// Centralized route definitions — all lazy-loaded
// Used by AppRouter.jsx

export const ROUTE_PATHS = {
  ROOT: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',

  // Master Data
  MASTER_ITEMS: '/master-data/items',
  MASTER_UOM: '/master-data/uom',
  MASTER_CUSTOMERS: '/master-data/customers',
  MASTER_VENDORS: '/master-data/vendors',

  // Inventory
  INVENTORY_LEDGER: '/inventory/stock-ledger',
  INVENTORY_ADJUSTMENTS: '/inventory/adjustments',
  INVENTORY_TRANSFERS: '/inventory/transfers',

  // Warehouse
  WAREHOUSE_BINS: '/warehouse/bins',
  WAREHOUSE_PUTAWAY: '/warehouse/putaway',
  WAREHOUSE_PICKING: '/warehouse/picking',

  // Procurement
  PROCUREMENT_PO: '/procurement/purchase-orders',
  PROCUREMENT_GRN: '/procurement/grn',
  PROCUREMENT_BILLS: '/procurement/vendor-bills',

  // BOM
  BOM_LIST: '/bom/list',
  BOM_EXPLOSION: '/bom/explosion',

  // Production
  PRODUCTION_ORDERS: '/production/orders',
  PRODUCTION_PLANNING: '/production/planning',
  PRODUCTION_MRP: '/production/mrp',
  PRODUCTION_ROUTING: '/production/routing',

  // Shop Floor
  SHOPFLOOR_WORKCENTERS: '/shop-floor/workcenters',
  SHOPFLOOR_OPERATIONS: '/shop-floor/operations',

  // QC
  QC_INSPECTIONS: '/qc/inspections',
  QC_REJECTIONS: '/qc/rejections',

  // Maintenance
  MAINTENANCE_MACHINES: '/maintenance/machines',
  MAINTENANCE_SCHEDULES: '/maintenance/schedules',

  TRACEABILITY: '/traceability',
  SUBCONTRACTING: '/subcontracting',
  REPORTS: '/reports',
  USERS: '/users',
  SETTINGS: '/settings',
};
