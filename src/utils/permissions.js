export const PERMISSIONS = {
  ALL: '*',
  DASHBOARD: 'dashboard',
  MASTER_DATA: 'master-data',
  INVENTORY: 'inventory',
  WAREHOUSE: 'warehouse',
  PROCUREMENT: 'procurement',
  BOM: 'bom',
  PRODUCTION: 'production',
  SHOP_FLOOR: 'shop-floor',
  QC: 'qc',
  MAINTENANCE: 'maintenance',
  TRACEABILITY: 'traceability',
  SUBCONTRACTING: 'subcontracting',
  REPORTS: 'reports',
  USERS: 'users',
  SETTINGS: 'settings',
};

export const ROLE_PERMISSIONS = {
  admin: ['*'],
  manager: [
    'dashboard', 'master-data', 'inventory', 'warehouse',
    'procurement', 'bom', 'production', 'shop-floor',
    'qc', 'maintenance', 'traceability', 'subcontracting', 'reports',
  ],
  operator: ['dashboard', 'shop-floor', 'production'],
  store: ['dashboard', 'inventory', 'warehouse'],
  purchase: ['dashboard', 'procurement', 'subcontracting'],
  production: ['dashboard', 'production', 'shop-floor', 'bom'],
  qc: ['dashboard', 'qc', 'traceability'],
  maintenance: ['dashboard', 'maintenance'],
  engineer: ['dashboard', 'bom', 'production', 'routing'],
};

export const canAccess = (user, permission) => {
  if (!user) return false;
  const perms = ROLE_PERMISSIONS[user.role] || [];
  return perms.includes('*') || perms.includes(permission);
};
