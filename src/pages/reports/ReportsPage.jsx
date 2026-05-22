import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PageHeader from '../../components/common/PageHeader';
import AreaChartWidget from '../../components/charts/AreaChartWidget';
import BarChartWidget from '../../components/charts/BarChartWidget';
import DonutChartWidget from '../../components/charts/DonutChartWidget';
import LineChartWidget from '../../components/charts/LineChartWidget';
import { reportsApi } from '../../api/reports.api';
import { formatCurrency, formatPercent } from '../../utils/formatters';

const ReportsPage = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [production, setProduction] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [qcReport, setQcReport] = useState(null);
  const [procurement, setProcurement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      reportsApi.getProductionReport(),
      reportsApi.getInventoryReport(),
      reportsApi.getQCReport(),
      reportsApi.getProcurementReport(),
    ]).then(([p, i, q, pr]) => {
      setProduction(p); setInventory(i); setQcReport(q); setProcurement(pr);
      setLoading(false);
    });
  }, []);

  const TABS = ['Production', 'Inventory', 'Quality', 'Procurement'];

  return (
    <Box>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Cross-module manufacturing intelligence and trend analysis"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Reports & Analytics' }]}
      />

      <Paper sx={{ mb: 3, borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }} elevation={0}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2, '& .MuiTab-root': { fontWeight: 600, fontSize: '0.875rem', minHeight: 48 } }}>
          {TABS.map((t) => <Tab key={t} label={t} />)}
        </Tabs>
      </Paper>

      {/* ── Production ── */}
      {tab === 0 && (
        <Grid container spacing={2.5}>
          {production?.summary && (
            <>
              {[
                { label: 'Total Orders', value: production.summary.totalOrders, color: 'primary.main' },
                { label: 'Completed', value: production.summary.completed, color: 'success.main' },
                { label: 'In Progress', value: production.summary.inProgress, color: 'warning.main' },
                { label: 'Efficiency', value: `${production.summary.overallEfficiency}%`, color: 'secondary.main' },
              ].map((k) => (
                <Grid item xs={6} md={3} key={k.label}>
                  <Paper sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                    <Typography variant="h5" fontWeight={800} sx={{ color: k.color }}>{k.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{k.label}</Typography>
                  </Paper>
                </Grid>
              ))}
            </>
          )}
          <Grid item xs={12} md={8}>
            <AreaChartWidget title="Production Trend" subtitle="Planned vs Actual — last 7 months"
              series={[{ name: 'Planned', data: production?.trend.map(d => d.planned) || [] }, { name: 'Actual', data: production?.trend.map(d => d.actual) || [] }]}
              categories={production?.trend.map(d => d.month) || []}
              loading={loading} height={300} />
          </Grid>
          <Grid item xs={12} md={4}>
            <BarChartWidget title="Monthly Efficiency %" subtitle="Production efficiency trend"
              series={[{ name: 'Efficiency', data: production?.trend.map(d => d.efficiency) || [] }]}
              categories={production?.trend.map(d => d.month) || []}
              loading={loading} height={300} colors={[theme.palette.success.main]} />
          </Grid>
        </Grid>
      )}

      {/* ── Inventory ── */}
      {tab === 1 && (
        <Grid container spacing={2.5}>
          {inventory?.byCategory && (
            <>
              <Grid item xs={12} md={8}>
                <AreaChartWidget title="Inventory Value Trend" subtitle="Total valuation — last 7 months"
                  series={[{ name: 'Value (₹)', data: inventory.valueTrend.map(d => d.value) }]}
                  categories={inventory.valueTrend.map(d => d.month)}
                  loading={loading} height={300} />
              </Grid>
              <Grid item xs={12} md={4}>
                <DonutChartWidget title="Value by Category"
                  series={inventory.byCategory.map(c => c.value)}
                  labels={inventory.byCategory.map(c => c.category)}
                  colors={[theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main, theme.palette.info.main]}
                  centerLabel="Total" centerValue={formatCurrency(inventory.byCategory.reduce((a, c) => a + c.value, 0))}
                  loading={loading} height={300} />
              </Grid>
            </>
          )}
        </Grid>
      )}

      {/* ── Quality ── */}
      {tab === 2 && (
        <Grid container spacing={2.5}>
          {qcReport?.summary && (
            <>
              {[
                { label: 'Total Inspected', value: qcReport.summary.totalInspected.toLocaleString('en-IN'), color: 'primary.main' },
                { label: 'Passed', value: qcReport.summary.passed.toLocaleString('en-IN'), color: 'success.main' },
                { label: 'Rejected', value: qcReport.summary.rejected.toLocaleString('en-IN'), color: 'error.main' },
                { label: 'Pass Rate', value: `${qcReport.summary.passRate}%`, color: 'success.main' },
              ].map((k) => (
                <Grid item xs={6} md={3} key={k.label}>
                  <Paper sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                    <Typography variant="h5" fontWeight={800} sx={{ color: k.color }}>{k.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{k.label}</Typography>
                  </Paper>
                </Grid>
              ))}
              <Grid item xs={12} md={7}>
                <LineChartWidget title="Pass Rate Trend" subtitle="Monthly QC pass rate %"
                  series={[{ name: 'Pass Rate %', data: qcReport.passRateTrend.map(d => d.passRate) }]}
                  categories={qcReport.passRateTrend.map(d => d.month)}
                  loading={loading} height={280} colors={[theme.palette.success.main]} />
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>Rejection by Reason</Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', py: 1.5 }}>Reason</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', py: 1.5 }}>Count</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', py: 1.5 }}>Share</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {qcReport.rejectionByReason.map((r) => {
                        const total = qcReport.rejectionByReason.reduce((a, x) => a + x.count, 0);
                        return (
                          <TableRow key={r.reason} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                            <TableCell><Typography variant="body2">{r.reason}</Typography></TableCell>
                            <TableCell align="right"><Typography variant="body2" fontWeight={700} color="error.main">{r.count}</Typography></TableCell>
                            <TableCell align="right"><Typography variant="body2">{((r.count / total) * 100).toFixed(0)}%</Typography></TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      )}

      {/* ── Procurement ── */}
      {tab === 3 && (
        <Grid container spacing={2.5}>
          {procurement?.summary && (
            <>
              {[
                { label: 'Total Spend', value: formatCurrency(procurement.summary.totalSpend), color: 'primary.main' },
                { label: 'Total Orders', value: procurement.summary.totalOrders, color: 'secondary.main' },
                { label: 'Avg On-Time', value: `${procurement.summary.avgOnTime}%`, color: 'success.main' },
              ].map((k) => (
                <Grid item xs={12} md={4} key={k.label}>
                  <Paper sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                    <Typography variant="h5" fontWeight={800} sx={{ color: k.color }}>{k.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{k.label}</Typography>
                  </Paper>
                </Grid>
              ))}
              <Grid item xs={12} md={7}>
                <BarChartWidget title="Monthly Spend Trend" subtitle="Procurement spend — last 7 months"
                  series={[{ name: 'Spend (₹)', data: procurement.spendTrend.map(d => d.spend) }]}
                  categories={procurement.spendTrend.map(d => d.month)}
                  loading={loading} height={280} colors={[theme.palette.secondary.main]} />
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>Spend by Vendor</Typography>
                  {procurement.byVendor.map((v) => (
                    <Box key={v.vendor} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.25, borderBottom: `1px solid ${theme.palette.divider}`, '&:last-child': { borderBottom: 0 } }}>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{v.vendor}</Typography>
                        <Typography variant="caption" color="text.secondary">{v.orders} orders</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" fontWeight={700}>{formatCurrency(v.spend)}</Typography>
                        <Chip label={`${v.onTime}% on-time`} size="small" color={v.onTime >= 90 ? 'success' : 'warning'} sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700 }} />
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default ReportsPage;
