import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const SIDEBAR_CONFIG = [
  {
    id: 'dashboard', title: 'Dashboard', icon: DashboardOutlinedIcon,
    path: '/dashboard', roles: ['admin','manager','operator','store','purchase','production','qc','maintenance','engineer'],
  },
  {
    id: 'master', title: 'Master Data', icon: LibraryBooksOutlinedIcon,
    roles: ['admin','manager'],
    children: [
      { id: 'items',     title: 'Items & Materials', path: '/master-data/items' },
      { id: 'uom',       title: 'Unit of Measure',   path: '/master-data/uom' },
      { id: 'customers', title: 'Customers',          path: '/master-data/customers' },
      { id: 'vendors',   title: 'Vendors',            path: '/master-data/vendors' },
    ],
  },
  {
    id: 'inventory', title: 'Inventory', icon: Inventory2OutlinedIcon,
    roles: ['admin','manager','store'],
    children: [
      { id: 'stock-ledger',  title: 'Stock Ledger',    path: '/inventory/stock-ledger' },
      { id: 'adjustments',   title: 'Adjustments',     path: '/inventory/adjustments' },
      { id: 'transfers',     title: 'Stock Transfers',  path: '/inventory/transfers' },
    ],
  },
  {
    id: 'warehouse', title: 'Warehousing', icon: WarehouseOutlinedIcon,
    roles: ['admin','manager','store'],
    children: [
      { id: 'bins',    title: 'Bin Locations', path: '/warehouse/bins' },
      { id: 'putaway', title: 'Put Away',       path: '/warehouse/putaway' },
      { id: 'picking', title: 'Picking',        path: '/warehouse/picking' },
    ],
  },
  {
    id: 'procurement', title: 'Procurement', icon: ShoppingCartOutlinedIcon,
    roles: ['admin','manager','purchase'],
    children: [
      { id: 'po',    title: 'Purchase Orders', path: '/procurement/purchase-orders' },
      { id: 'grn',   title: 'GRN',             path: '/procurement/grn' },
      { id: 'bills', title: 'Vendor Bills',    path: '/procurement/vendor-bills' },
    ],
  },
  {
    id: 'bom', title: 'BOM Management', icon: AccountTreeOutlinedIcon,
    roles: ['admin','manager','engineer'],
    children: [
      { id: 'bom-list',      title: 'Bill of Materials', path: '/bom/list' },
      { id: 'bom-explosion', title: 'BOM Explosion',     path: '/bom/explosion' },
    ],
  },
  {
    id: 'production', title: 'Production', icon: PrecisionManufacturingOutlinedIcon,
    roles: ['admin','manager','production','engineer'],
    children: [
      { id: 'prod-orders', title: 'Production Orders', path: '/production/orders' },
      { id: 'planning',    title: 'Planning',           path: '/production/planning' },
      { id: 'mrp',         title: 'MRP Engine',         path: '/production/mrp' },
      { id: 'routing',     title: 'Routing',            path: '/production/routing' },
    ],
  },
  {
    id: 'shopfloor', title: 'Shop Floor', icon: FactoryOutlinedIcon,
    roles: ['admin','manager','operator','production'],
    children: [
      { id: 'workcenters', title: 'Work Centers', path: '/shop-floor/workcenters' },
      { id: 'operations',  title: 'Operations',   path: '/shop-floor/operations' },
    ],
  },
  {
    id: 'qc', title: 'Quality Control', icon: VerifiedOutlinedIcon,
    roles: ['admin','manager','qc'],
    children: [
      { id: 'inspections', title: 'Inspections', path: '/qc/inspections' },
      { id: 'rejections',  title: 'Rejections',  path: '/qc/rejections' },
    ],
  },
  {
    id: 'maintenance', title: 'Maintenance', icon: BuildOutlinedIcon,
    roles: ['admin','manager','maintenance'],
    children: [
      { id: 'machines',  title: 'Machines',   path: '/maintenance/machines' },
      { id: 'schedules', title: 'Schedules',  path: '/maintenance/schedules' },
    ],
  },
  {
    id: 'traceability', title: 'Traceability', icon: QrCodeScannerOutlinedIcon,
    path: '/traceability', roles: ['admin','manager','qc'],
  },
  {
    id: 'subcontracting', title: 'Subcontracting', icon: HandshakeOutlinedIcon,
    path: '/subcontracting', roles: ['admin','manager','purchase'],
  },
  {
    id: 'reports', title: 'Reports & Analytics', icon: BarChartOutlinedIcon,
    path: '/reports', roles: ['admin','manager'],
  },
  { id: 'divider-1', type: 'divider' },
  {
    id: 'users', title: 'User Management', icon: GroupOutlinedIcon,
    path: '/users', roles: ['admin'],
  },
  {
    id: 'settings', title: 'Settings', icon: SettingsOutlinedIcon,
    path: '/settings', roles: ['admin'],
  },
];
