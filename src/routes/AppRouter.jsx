import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from '../components/common/LoadingScreen';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';

// ── Auth ──
const LoginPage          = lazy(() => import('../pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const ResetPasswordPage  = lazy(() => import('../pages/auth/ResetPasswordPage'));
const UnauthorizedPage   = lazy(() => import('../pages/auth/UnauthorizedPage'));
const NotFoundPage       = lazy(() => import('../pages/auth/NotFoundPage'));

// ── Core ──
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const ProfilePage   = lazy(() => import('../pages/profile/ProfilePage'));

// ── Inventory ──
const StockLedgerPage    = lazy(() => import('../pages/inventory/StockLedgerPage'));
const StockMovementsPage = lazy(() => import('../pages/inventory/StockMovementsPage'));

// ── Warehouse ──
const WarehouseBinsPage = lazy(() => import('../pages/warehouse/WarehouseBinsPage'));
const PutawayPage       = lazy(() => import('../pages/warehouse/PutawayPage'));
const PickingPage       = lazy(() => import('../pages/warehouse/PickingPage'));

// ── Procurement ──
const PurchaseOrdersPage = lazy(() => import('../pages/procurement/PurchaseOrdersPage'));
const GRNPage            = lazy(() => import('../pages/procurement/GRNPage'));
const VendorBillsPage    = lazy(() => import('../pages/procurement/VendorBillsPage'));

// ── BOM ──
const BOMListPage      = lazy(() => import('../pages/bom/BOMListPage'));
const BOMExplosionPage = lazy(() => import('../pages/bom/BOMExplosionPage'));

// ── Production ──
const ProductionOrdersPage = lazy(() => import('../pages/production/ProductionOrdersPage'));
const MRPPage              = lazy(() => import('../pages/production/MRPPage'));
const WorkcentersPage      = lazy(() => import('../pages/production/WorkcentersPage'));

// ── QC ──
const InspectionsPage = lazy(() => import('../pages/qc/InspectionsPage'));
const RejectionsPage  = lazy(() => import('../pages/qc/RejectionsPage'));

// ── Maintenance ──
const MachinesPage  = lazy(() => import('../pages/maintenance/MachinesPage'));
const SchedulesPage = lazy(() => import('../pages/maintenance/SchedulesPage'));

// ── Other modules ──
const TraceabilityPage    = lazy(() => import('../pages/traceability/TraceabilityPage'));
const SubcontractingPage  = lazy(() => import('../pages/subcontracting/SubcontractingPage'));
const ReportsPage         = lazy(() => import('../pages/reports/ReportsPage'));
const SettingsPage        = lazy(() => import('../pages/settings/SettingsPage'));
const UsersPage           = lazy(() => import('../pages/users/UsersPage'));

// ── Fallback placeholder ──
const ComingSoon = lazy(() => import('../components/common/ComingSoon'));

const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* ── Public: Auth ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login"           element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password"  element={<ResetPasswordPage />} />
        </Route>

        {/* ── Standalone error pages ── */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/404"          element={<NotFoundPage />} />

        {/* ── Private: Main app ── */}
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>

          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile"   element={<ProfilePage />} />

          {/* Master Data — placeholder Phase 8 */}
          <Route path="/master-data/*" element={
            <RoleRoute allowedRoles={['admin', 'manager']}>
              <ComingSoon module="Master Data" />
            </RoleRoute>
          } />

          {/* Inventory */}
          <Route path="/inventory/stock-ledger"  element={<RoleRoute allowedRoles={['admin','manager','store']}><StockLedgerPage /></RoleRoute>} />
          <Route path="/inventory/adjustments"   element={<RoleRoute allowedRoles={['admin','manager','store']}><StockMovementsPage /></RoleRoute>} />
          <Route path="/inventory/transfers"     element={<RoleRoute allowedRoles={['admin','manager','store']}><StockMovementsPage /></RoleRoute>} />

          {/* Warehouse */}
          <Route path="/warehouse/bins"    element={<RoleRoute allowedRoles={['admin','manager','store']}><WarehouseBinsPage /></RoleRoute>} />
          <Route path="/warehouse/putaway" element={<RoleRoute allowedRoles={['admin','manager','store']}><PutawayPage /></RoleRoute>} />
          <Route path="/warehouse/picking" element={<RoleRoute allowedRoles={['admin','manager','store']}><PickingPage /></RoleRoute>} />

          {/* Procurement */}
          <Route path="/procurement/purchase-orders" element={<RoleRoute allowedRoles={['admin','manager','purchase']}><PurchaseOrdersPage /></RoleRoute>} />
          <Route path="/procurement/grn"             element={<RoleRoute allowedRoles={['admin','manager','purchase','store']}><GRNPage /></RoleRoute>} />
          <Route path="/procurement/vendor-bills"    element={<RoleRoute allowedRoles={['admin','manager','purchase']}><VendorBillsPage /></RoleRoute>} />

          {/* BOM */}
          <Route path="/bom/list"      element={<RoleRoute allowedRoles={['admin','manager','engineer']}><BOMListPage /></RoleRoute>} />
          <Route path="/bom/explosion" element={<RoleRoute allowedRoles={['admin','manager','engineer','production']}><BOMExplosionPage /></RoleRoute>} />

          {/* Production */}
          <Route path="/production/orders"  element={<RoleRoute allowedRoles={['admin','manager','production','engineer']}><ProductionOrdersPage /></RoleRoute>} />
          <Route path="/production/planning" element={<RoleRoute allowedRoles={['admin','manager','production']}><ProductionOrdersPage /></RoleRoute>} />
          <Route path="/production/mrp"     element={<RoleRoute allowedRoles={['admin','manager','production','engineer']}><MRPPage /></RoleRoute>} />
          <Route path="/production/routing" element={<RoleRoute allowedRoles={['admin','manager','engineer']}><WorkcentersPage /></RoleRoute>} />

          {/* Shop Floor */}
          <Route path="/shop-floor/workcenters" element={<RoleRoute allowedRoles={['admin','manager','operator','production']}><WorkcentersPage /></RoleRoute>} />
          <Route path="/shop-floor/operations"  element={<RoleRoute allowedRoles={['admin','manager','operator','production']}><ProductionOrdersPage /></RoleRoute>} />

          {/* QC */}
          <Route path="/qc/inspections" element={<RoleRoute allowedRoles={['admin','manager','qc']}><InspectionsPage /></RoleRoute>} />
          <Route path="/qc/rejections"  element={<RoleRoute allowedRoles={['admin','manager','qc']}><RejectionsPage /></RoleRoute>} />

          {/* Maintenance */}
          <Route path="/maintenance/machines"   element={<RoleRoute allowedRoles={['admin','manager','maintenance']}><MachinesPage /></RoleRoute>} />
          <Route path="/maintenance/schedules"  element={<RoleRoute allowedRoles={['admin','manager','maintenance']}><SchedulesPage /></RoleRoute>} />

          {/* Standalone modules */}
          <Route path="/traceability"   element={<RoleRoute allowedRoles={['admin','manager','qc']}><TraceabilityPage /></RoleRoute>} />
          <Route path="/subcontracting" element={<RoleRoute allowedRoles={['admin','manager','purchase']}><SubcontractingPage /></RoleRoute>} />
          <Route path="/reports"        element={<RoleRoute allowedRoles={['admin','manager']}><ReportsPage /></RoleRoute>} />
          <Route path="/users"          element={<RoleRoute allowedRoles={['admin']}><UsersPage /></RoleRoute>} />
          <Route path="/settings"       element={<RoleRoute allowedRoles={['admin']}><SettingsPage /></RoleRoute>} />

        </Route>

        {/* ── Catch-all ── */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
