import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import PageHeader from '../../components/common/PageHeader';
import KPICard from '../../components/cards/KPICard';
import AreaChartWidget from '../../components/charts/AreaChartWidget';
import BarChartWidget from '../../components/charts/BarChartWidget';

import MachineStatusGrid from '../../modules/dashboard/components/MachineStatusGrid';
import MaterialAlertsPanel from '../../modules/dashboard/components/MaterialAlertsPanel';
import ProductionOrdersTable from '../../modules/dashboard/components/ProductionOrdersTable';
import OEEGaugePanel from '../../modules/dashboard/components/OEEGaugePanel';
import InventorySummaryPanel from '../../modules/dashboard/components/InventorySummaryPanel';
import VendorPerformancePanel from '../../modules/dashboard/components/VendorPerformancePanel';
import ShiftSummaryCard from '../../modules/dashboard/components/ShiftSummaryCard';
import QualitySummaryCard from '../../modules/dashboard/components/QualitySummaryCard';

import {
  getDashboardKPIs,
  getProductionTrend,
  getOEEBreakdown,
  getMachineStatus,
  getMaterialAlerts,
  getRecentProductionOrders,
  getInventorySummary,
  getVendorPerformance,
  getQualitySummary,
  getShiftSummary,
} from '../../api/dashboard.api';
import { useAuth } from '../../context/AuthContext';

const ICON_MAP = {
  PrecisionManufacturing: <PrecisionManufacturingOutlinedIcon />,
  Inventory2: <Inventory2OutlinedIcon />,
  TrendingUp: <TrendingUpIcon />,
  Verified: <VerifiedOutlinedIcon />,
  WarningAmber: <WarningAmberOutlinedIcon />,
  LocalShipping: <LocalShippingOutlinedIcon />,
};

const DashboardPage = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const [kpis, setKpis] = useState([]);
  const [productionTrend, setProductionTrend] = useState([]);
  const [oeeBreakdown, setOeeBreakdown] = useState([]);
  const [machines, setMachines] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [quality, setQuality] = useState(null);
  const [shift, setShift] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [k, pt, oee, m, al, ord, inv, v, q, s] = await Promise.all([
        getDashboardKPIs(),
        getProductionTrend(),
        getOEEBreakdown(),
        getMachineStatus(),
        getMaterialAlerts(),
        getRecentProductionOrders(),
        getInventorySummary(),
        getVendorPerformance(),
        getQualitySummary(),
        getShiftSummary(),
      ]);
      setKpis(k.map((kpi) => ({ ...kpi, iconComponent: ICON_MAP[kpi.icon] })));
      setProductionTrend(pt);
      setOeeBreakdown(oee);
      setMachines(m);
      setAlerts(al);
      setOrders(ord);
      setInventory(inv);
      setVendors(v);
      setQuality(q);
      setShift(s);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const productionSeries = [
    { name: 'Planned', data: productionTrend.map((d) => d.planned) },
    { name: 'Actual', data: productionTrend.map((d) => d.actual) },
  ];
  const productionCategories = productionTrend.map((d) => d.month);

  const efficiencySeries = [{ name: 'Efficiency %', data: productionTrend.map((d) => d.efficiency) }];

  const warehouseSeries = [
    { name: 'Used', data: [3420, 2880, 980] },
    { name: 'Available', data: [1580, 1120, 1020] },
  ];

  return (
    <Box>
      <PageHeader
        title={`Good morning, ${user?.name?.split(' ')[0]} 👋`}
        subtitle={`${user?.company} — ${user?.plant} · Live manufacturing intelligence`}
      />

      {/* ── Row 1: KPI Cards ── */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
                <KPICard loading />
              </Grid>
            ))
          : kpis.map((kpi, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={kpi.id}>
                <KPICard kpi={kpi} delay={idx * 0.07} />
              </Grid>
            ))}
      </Grid>

      {/* ── Row 2: Production Trend + OEE Gauge ── */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={8}>
          <AreaChartWidget
            title="Production Trend"
            subtitle="Planned vs Actual — last 6 months"
            series={productionSeries}
            categories={productionCategories}
            loading={loading}
            height={290}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <OEEGaugePanel oeeBreakdown={oeeBreakdown} loading={loading} />
        </Grid>
      </Grid>

      {/* ── Row 3: Shift Summary + Quality + Inventory ── */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <ShiftSummaryCard data={shift} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <QualitySummaryCard data={quality} loading={loading} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InventorySummaryPanel data={inventory} loading={loading} />
        </Grid>
      </Grid>

      {/* ── Row 4: Machine Status Grid ── */}
      <Box sx={{ mb: 2.5 }}>
        <MachineStatusGrid machines={machines} loading={loading} />
      </Box>

      {/* ── Row 5: Material Alerts + Efficiency Chart ── */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={7}>
          <MaterialAlertsPanel alerts={alerts} loading={loading} />
        </Grid>
        <Grid item xs={12} md={5}>
          <BarChartWidget
            title="Efficiency Trend"
            subtitle="Monthly production efficiency %"
            series={efficiencySeries}
            categories={productionCategories}
            loading={loading}
            height={280}
            colors={[theme.palette.success.main]}
          />
        </Grid>
      </Grid>

      {/* ── Row 6: Production Orders Table ── */}
      <Box sx={{ mb: 2.5 }}>
        <ProductionOrdersTable orders={orders} loading={loading} />
      </Box>

      {/* ── Row 7: Warehouse + Vendor ── */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={5}>
          <BarChartWidget
            title="Warehouse Utilization"
            subtitle="Used vs available capacity (sqft)"
            series={warehouseSeries}
            categories={['WH-01 Raw Mat.', 'WH-02 FG', 'WH-03 Spares']}
            loading={loading}
            height={280}
            colors={[theme.palette.primary.main, alpha(theme.palette.primary.main, 0.2)]}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <VendorPerformancePanel vendors={vendors} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  );
};

// needed for alpha in the page
import { alpha } from '@mui/material/styles';

export default DashboardPage;
