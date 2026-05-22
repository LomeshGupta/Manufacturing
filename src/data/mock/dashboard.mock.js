export const dashboardMock = {
  kpis: [
    { id: 'prod_orders', title: 'Production Orders', value: 124, unit: '', delta: 8.2, deltaType: 'increase', color: 'primary', icon: 'PrecisionManufacturing' },
    { id: 'inventory_value', title: 'Inventory Value', value: 42000000, unit: 'currency', delta: 2.1, deltaType: 'increase', color: 'secondary', icon: 'Inventory2' },
    { id: 'oee', title: 'OEE This Month', value: 78.4, unit: 'percent', delta: 3.2, deltaType: 'increase', color: 'success', icon: 'TrendingUp' },
    { id: 'pending_qc', title: 'Pending QC', value: 37, unit: '', delta: 12, deltaType: 'decrease', color: 'warning', icon: 'Verified' },
    { id: 'material_alerts', title: 'Material Alerts', value: 9, unit: '', delta: 0, deltaType: 'critical', color: 'error', icon: 'WarningAmber' },
    { id: 'on_time_delivery', title: 'On-Time Delivery', value: 91.3, unit: 'percent', delta: 1.8, deltaType: 'increase', color: 'success', icon: 'LocalShipping' },
  ],

  productionTrend: [
    { month: 'Nov', planned: 110, actual: 98, efficiency: 89 },
    { month: 'Dec', planned: 120, actual: 108, efficiency: 90 },
    { month: 'Jan', planned: 115, actual: 102, efficiency: 88 },
    { month: 'Feb', planned: 130, actual: 119, efficiency: 91 },
    { month: 'Mar', planned: 125, actual: 116, efficiency: 92 },
    { month: 'Apr', planned: 140, actual: 124, efficiency: 88 },
  ],

  oeeBreakdown: [
    { name: 'Availability', value: 84.2, color: '#1E40AF' },
    { name: 'Performance', value: 79.6, color: '#F97316' },
    { name: 'Quality', value: 92.1, color: '#16A34A' },
  ],

  machineStatus: [
    { id: 'M01', name: 'CNC Machine #1', type: 'CNC', status: 'running', oee: 82, operator: 'Raj Kumar', job: 'MO-2024-1121', uptime: '6h 42m' },
    { id: 'M02', name: 'CNC Machine #2', type: 'CNC', status: 'running', oee: 76, operator: 'Priya Singh', job: 'MO-2024-1122', uptime: '5h 18m' },
    { id: 'M03', name: 'CNC Machine #3', type: 'CNC', status: 'stopped', oee: 0, operator: '—', job: '—', uptime: '0h 0m', alert: 'Spindle bearing failure' },
    { id: 'M04', name: 'Lathe #1', type: 'Lathe', status: 'running', oee: 91, operator: 'Amit Verma', job: 'MO-2024-1118', uptime: '7h 55m' },
    { id: 'M05', name: 'Lathe #2', type: 'Lathe', status: 'idle', oee: 0, operator: '—', job: '—', uptime: '0h 0m' },
    { id: 'M06', name: 'Welding Station #1', type: 'Welding', status: 'running', oee: 88, operator: 'Suresh Nair', job: 'MO-2024-1119', uptime: '4h 30m' },
    { id: 'M07', name: 'Press #1', type: 'Press', status: 'running', oee: 79, operator: 'Deepak Rao', job: 'MO-2024-1120', uptime: '3h 15m' },
    { id: 'M08', name: 'Assembly Line A', type: 'Assembly', status: 'idle', oee: 0, operator: '—', job: '—', uptime: '0h 0m' },
  ],

  materialAlerts: [
    { id: 1, item: 'Steel Rods (40mm)', sku: 'RM-1042', current: 120, reorder: 500, unit: 'kg', severity: 'critical', plant: 'Plant-01' },
    { id: 2, item: 'Aluminium Sheet 3mm', sku: 'RM-2018', current: 80, reorder: 200, unit: 'sheets', severity: 'critical', plant: 'Plant-01' },
    { id: 3, item: 'Bearing 6204', sku: 'RM-3071', current: 45, reorder: 100, unit: 'pcs', severity: 'warning', plant: 'Plant-02' },
    { id: 4, item: 'Hydraulic Oil 46', sku: 'RM-4012', current: 180, reorder: 300, unit: 'ltr', severity: 'warning', plant: 'Plant-01' },
    { id: 5, item: 'M8 Hex Bolts', sku: 'RM-5201', current: 320, reorder: 500, unit: 'pcs', severity: 'warning', plant: 'Plant-02' },
  ],

  recentProductionOrders: [
    { id: 'MO-2024-1123', product: 'Gearbox Housing A1', qty: 500, completed: 500, status: 'completed', workcenter: 'CNC-01', dueDate: '2024-04-18' },
    { id: 'MO-2024-1122', product: 'Drive Shaft 32mm', qty: 200, completed: 148, status: 'in-progress', workcenter: 'CNC-02', dueDate: '2024-04-19' },
    { id: 'MO-2024-1121', product: 'Brake Disc Type-B', qty: 350, completed: 210, status: 'in-progress', workcenter: 'CNC-01', dueDate: '2024-04-20' },
    { id: 'MO-2024-1120', product: 'Bracket Assembly X4', qty: 750, completed: 0, status: 'pending', workcenter: 'PRESS-01', dueDate: '2024-04-22' },
    { id: 'MO-2024-1119', product: 'Frame Weld Set W2', qty: 100, completed: 68, status: 'in-progress', workcenter: 'WELD-01', dueDate: '2024-04-21' },
    { id: 'MO-2024-1118', product: 'Spindle Assembly S7', qty: 60, completed: 60, status: 'completed', workcenter: 'LATHE-01', dueDate: '2024-04-17' },
  ],

  inventorySummary: [
    { category: 'Raw Material', value: 18400000, items: 342, utilization: 68 },
    { category: 'WIP', value: 9200000, items: 87, utilization: 45 },
    { category: 'Finished Goods', value: 12100000, items: 129, utilization: 72 },
    { category: 'Consumables', value: 2300000, items: 218, utilization: 55 },
  ],

  warehouseUtilization: [
    { warehouse: 'WH-01 Raw Material', capacity: 5000, used: 3420, unit: 'sqft' },
    { warehouse: 'WH-02 Finished Goods', capacity: 4000, used: 2880, unit: 'sqft' },
    { warehouse: 'WH-03 Spare Parts', capacity: 2000, used: 980, unit: 'sqft' },
  ],

  vendorPerformance: [
    { vendor: 'Tata Steel Ltd.', onTime: 94, quality: 98, orders: 24, rating: 4.7 },
    { vendor: 'Bharat Forge', onTime: 88, quality: 95, orders: 18, rating: 4.3 },
    { vendor: 'Sundaram Fasteners', onTime: 91, quality: 97, orders: 32, rating: 4.5 },
    { vendor: 'Minda Industries', onTime: 76, quality: 89, orders: 11, rating: 3.8 },
    { vendor: 'Lumax Auto', onTime: 83, quality: 92, orders: 9, rating: 4.1 },
  ],

  qualitySummary: {
    inspected: 4820,
    passed: 4631,
    rejected: 189,
    passRate: 96.1,
    pendingInspection: 37,
    rejectionTrend: [
      { month: 'Nov', rejections: 28 },
      { month: 'Dec', rejections: 22 },
      { month: 'Jan', rejections: 31 },
      { month: 'Feb', rejections: 19 },
      { month: 'Mar', rejections: 24 },
      { month: 'Apr', rejections: 14 },
    ],
  },

  shiftSummary: {
    currentShift: 'Shift A (06:00 – 14:00)',
    activeWorkers: 42,
    totalWorkers: 56,
    outputToday: 312,
    targetToday: 400,
  },
};
