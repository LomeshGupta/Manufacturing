export const APP_NAME = import.meta.env.VITE_APP_NAME || 'SmartERP';

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  STORE: 'store',
  PURCHASE: 'purchase',
  PRODUCTION: 'production',
  QC: 'qc',
  MAINTENANCE: 'maintenance',
  ENGINEER: 'engineer',
};

export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  DISPLAY_TIME: 'DD MMM YYYY, hh:mm A',
  API: 'YYYY-MM-DD',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};
