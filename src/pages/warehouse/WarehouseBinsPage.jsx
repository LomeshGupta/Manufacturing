import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import PageHeader from '../../components/common/PageHeader';
import { warehouseApi } from '../../api/warehouse.api';

const STATUS_COLORS = { occupied: 'primary', empty: 'success', low: 'warning', blocked: 'error' };

const BinCard = ({ bin, idx }) => {
  const theme = useTheme();
  const pct = Math.round((bin.used / bin.capacity) * 100);
  const color = theme.palette[STATUS_COLORS[bin.status] || 'primary']?.main;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.03 }}>
      <Tooltip title={bin.item ? `${bin.item} — ${bin.used}/${bin.capacity} ${bin.uom}` : 'Empty bin'} placement="top">
        <Paper sx={{ p: 1.5, borderRadius: '10px', border: `1px solid ${bin.status === 'empty' ? theme.palette.divider : alpha(color, 0.3)}`, cursor: 'pointer', '&:hover': { boxShadow: theme.shadows[3] } }} elevation={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" fontFamily="monospace" fontWeight={700}>{bin.id.split('/')[1]}</Typography>
            <Chip label={bin.status} size="small" color={STATUS_COLORS[bin.status] || 'default'} sx={{ height: 16, fontSize: '0.6rem', fontWeight: 700 }} />
          </Box>
          <LinearProgress variant="determinate" value={pct} sx={{ mb: 0.5, height: 4, borderRadius: 2, bgcolor: alpha(color, 0.12), '& .MuiLinearProgress-bar': { bgcolor: color } }} />
          <Typography variant="caption" color="text.secondary" noWrap display="block" sx={{ fontSize: '0.65rem' }}>
            {bin.item || 'Empty'} · {pct}%
          </Typography>
        </Paper>
      </Tooltip>
    </motion.div>
  );
};

const WarehouseBinsPage = () => {
  const theme = useTheme();
  const [warehouses, setWarehouses] = useState([]);
  const [bins, setBins] = useState([]);
  const [selectedWH, setSelectedWH] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    warehouseApi.getWarehouses().then((d) => { setWarehouses(d); setSelectedWH(d[0]?.id || ''); });
  }, []);

  useEffect(() => {
    if (!selectedWH) return;
    setLoading(true);
    warehouseApi.getBins(selectedWH).then((d) => { setBins(d); setLoading(false); });
  }, [selectedWH]);

  const wh = warehouses.find((w) => w.id === selectedWH);
  const utilPct = wh ? Math.round((wh.used / wh.capacity) * 100) : 0;

  return (
    <Box>
      <PageHeader
        title="Bin Locations"
        subtitle="Visual bin-level inventory map"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Warehouse' }, { label: 'Bins' }]}
      />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 240 }}>
          <InputLabel>Warehouse</InputLabel>
          <Select value={selectedWH} label="Warehouse" onChange={(e) => setSelectedWH(e.target.value)}>
            {warehouses.map((w) => <MenuItem key={w.id} value={w.id}>{w.name}</MenuItem>)}
          </Select>
        </FormControl>
        {wh && (
          <Paper sx={{ p: 2, borderRadius: '12px', border: `1px solid ${theme.palette.divider}`, display: 'flex', gap: 3 }} elevation={0}>
            {[
              { label: 'Total Bins', value: wh.bins },
              { label: 'Capacity', value: `${wh.capacity} ${wh.unit}` },
              { label: 'Used', value: `${wh.used} ${wh.unit}` },
              { label: 'Utilization', value: `${utilPct}%` },
            ].map((m) => (
              <Box key={m.label}>
                <Typography variant="h6" fontWeight={800}>{m.value}</Typography>
                <Typography variant="caption" color="text.secondary">{m.label}</Typography>
              </Box>
            ))}
          </Paper>
        )}
      </Box>

      <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Bin Map — {wh?.name}</Typography>
        {loading ? (
          <Typography color="text.secondary">Loading bins...</Typography>
        ) : (
          <Grid container spacing={1.5}>
            {bins.map((bin, i) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={bin.id}>
                <BinCard bin={bin} idx={i} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default WarehouseBinsPage;
