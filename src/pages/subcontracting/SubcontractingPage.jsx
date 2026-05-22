import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const MOCK_SUBCON = [
  { id: 'SC-2024-0041', vendor: 'Precision Parts Co.', service: 'Surface Grinding', item: 'Drive Shaft 32mm', qty: 100, sent: 100, received: 60, dueDate: '2024-04-20', totalValue: 48000, status: 'in-progress' },
  { id: 'SC-2024-0040', vendor: 'HeatTech Pvt. Ltd.', service: 'Heat Treatment', item: 'Gearbox Housing A1', qty: 200, sent: 200, received: 200, dueDate: '2024-04-15', totalValue: 72000, status: 'completed' },
  { id: 'SC-2024-0039', vendor: 'Electrocoat Systems', service: 'Powder Coating', item: 'Bracket Assembly X4', qty: 500, sent: 250, received: 0, dueDate: '2024-04-25', totalValue: 37500, status: 'in-progress' },
  { id: 'SC-2024-0038', vendor: 'Precision Parts Co.', service: 'CNC Turning', item: 'Spindle Assembly S7', qty: 80, sent: 0, received: 0, dueDate: '2024-04-28', totalValue: 96000, status: 'pending' },
];

const VENDORS = [
  { name: 'Precision Parts Co.', services: 'Grinding, CNC Turning', orders: 12, onTime: 88, city: 'Pune' },
  { name: 'HeatTech Pvt. Ltd.', services: 'Heat Treatment', orders: 8, onTime: 95, city: 'Nashik' },
  { name: 'Electrocoat Systems', services: 'Powder Coating, Plating', orders: 6, onTime: 82, city: 'Aurangabad' },
];

const SubcontractingPage = () => {
  const theme = useTheme();

  const totalValue = MOCK_SUBCON.reduce((a, s) => a + s.totalValue, 0);
  const active = MOCK_SUBCON.filter((s) => s.status === 'in-progress').length;

  return (
    <Box>
      <PageHeader
        title="Subcontracting"
        subtitle="Manage outsourced operations and vendor returns"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Subcontracting' }]}
        actions={<Button variant="contained" startIcon={<AddIcon />} size="small">New Subcon Order</Button>}
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Orders', value: MOCK_SUBCON.length, color: 'primary.main' },
          { label: 'Active', value: active, color: 'warning.main' },
          { label: 'Total Value', value: formatCurrency(totalValue), color: 'secondary.main' },
          { label: 'Vendors', value: VENDORS.length, color: 'success.main' },
        ].map((k, i) => (
          <Grid item xs={6} md={3} key={k.label}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Paper sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                <Typography variant="h5" fontWeight={800} sx={{ color: k.color }}>{k.value}</Typography>
                <Typography variant="caption" color="text.secondary">{k.label}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }} elevation={1}>
            <Box sx={{ p: 2.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" fontWeight={700}>Subcontracting Orders</Typography>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Order', 'Vendor', 'Service', 'Item', 'Progress', 'Due', 'Value', 'Status'].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.04em', py: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_SUBCON.map((sc) => {
                  const pct = sc.sent > 0 ? Math.round((sc.received / sc.sent) * 100) : 0;
                  return (
                    <TableRow key={sc.id} sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover td': { bgcolor: alpha(theme.palette.text.primary, 0.02) } }}>
                      <TableCell><Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{sc.id}</Typography></TableCell>
                      <TableCell><Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 140 }}>{sc.vendor}</Typography></TableCell>
                      <TableCell><Chip label={sc.service} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 600 }} /></TableCell>
                      <TableCell><Typography variant="body2" noWrap sx={{ maxWidth: 140 }}>{sc.item}</Typography></TableCell>
                      <TableCell sx={{ minWidth: 120 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">{sc.received}/{sc.sent}</Typography>
                          <Typography variant="caption" fontWeight={700}>{pct}%</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={pct}
                          sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), '& .MuiLinearProgress-bar': { bgcolor: pct === 100 ? 'success.main' : 'primary.main' } }} />
                      </TableCell>
                      <TableCell><Typography variant="body2">{formatDate(sc.dueDate)}</Typography></TableCell>
                      <TableCell><Typography variant="body2" fontWeight={700}>{formatCurrency(sc.totalValue)}</Typography></TableCell>
                      <TableCell><StatusBadge status={sc.status} /></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }} elevation={1}>
            <Box sx={{ p: 2.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" fontWeight={700}>Subcon Vendors</Typography>
            </Box>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {VENDORS.map((v, i) => (
                <motion.div key={v.name} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <Box sx={{ p: 2, borderRadius: '12px', bgcolor: alpha(theme.palette.primary.main, 0.03), border: `1px solid ${theme.palette.divider}` }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                      <Typography variant="subtitle2" fontWeight={700}>{v.name}</Typography>
                      <Chip label={`${v.onTime}% on-time`} size="small" color={v.onTime >= 90 ? 'success' : 'warning'} sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700 }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block">{v.services}</Typography>
                    <Typography variant="caption" color="text.disabled">{v.city} · {v.orders} orders</Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubcontractingPage;
