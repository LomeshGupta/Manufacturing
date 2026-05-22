import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import PageHeader from '../../components/common/PageHeader';
import { productionApi } from '../../api/production.api';
import { formatNumber } from '../../utils/formatters';

const URGENCY_CONFIG = {
  critical: { color: 'error', label: 'Critical' },
  high: { color: 'warning', label: 'High' },
  medium: { color: 'info', label: 'Medium' },
  low: { color: 'success', label: 'Low' },
};

const MRPPage = () => {
  const theme = useTheme();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    productionApi.getMRPSuggestions().then((d) => { setSuggestions(d); setLoading(false); });
  }, []);

  const handleRunMRP = async () => {
    setRunning(true);
    await new Promise((r) => setTimeout(r, 1800));
    setRunning(false);
  };

  return (
    <Box>
      <PageHeader
        title="MRP Engine"
        subtitle="Material requirements planning — automated shortage detection and PO suggestions"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Production' }, { label: 'MRP Engine' }]}
        actions={
          <Button variant="contained" onClick={handleRunMRP} disabled={running}
            startIcon={running ? <AutorenewIcon sx={{ animation: 'spin 1s linear infinite', '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } } }} /> : <AutorenewIcon />}>
            {running ? 'Running MRP...' : 'Run MRP'}
          </Button>
        }
      />

      {running && <Alert severity="info" sx={{ mb: 2, borderRadius: '10px' }}>MRP engine is calculating requirements across all BOMs and production orders...</Alert>}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Suggestions', value: suggestions.length, color: 'primary.main' },
          { label: 'Critical Items', value: suggestions.filter((s) => s.urgency === 'critical').length, color: 'error.main' },
          { label: 'High Priority', value: suggestions.filter((s) => s.urgency === 'high').length, color: 'warning.main' },
          { label: 'Medium Priority', value: suggestions.filter((s) => s.urgency === 'medium').length, color: 'info.main' },
        ].map((k) => (
          <Grid item xs={6} md={3} key={k.label}>
            <Paper sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
              <Typography variant="h4" fontWeight={800} sx={{ color: k.color }}>{k.value}</Typography>
              <Typography variant="caption" color="text.secondary">{k.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {loading ? Array.from({ length: 4 }).map((_, i) => (
          <Paper key={i} sx={{ p: 2.5, borderRadius: '14px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
            <LinearProgress />
          </Paper>
        )) : suggestions.map((s, i) => {
          const cfg = URGENCY_CONFIG[s.urgency] || {};
          const urgColor = theme.palette[cfg.color]?.main;
          const coveragePct = Math.min(Math.round((s.currentStock / s.requiredQty) * 100), 100);
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Paper sx={{ p: 2.5, borderRadius: '14px', border: `1px solid ${s.urgency === 'critical' ? alpha(urgColor, 0.4) : theme.palette.divider}`, bgcolor: s.urgency === 'critical' ? alpha(urgColor, 0.02) : 'background.paper' }} elevation={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '9px', bgcolor: alpha(urgColor, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <WarningAmberOutlinedIcon sx={{ fontSize: '1.1rem', color: urgColor }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>{s.item}</Typography>
                      <Typography variant="caption" color="text.secondary" fontFamily="monospace">{s.itemId}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip label={cfg.label} size="small" color={cfg.color} sx={{ fontWeight: 700, height: 22, fontSize: '0.7rem' }} />
                    <Chip label={`Lead: ${s.leadDays}d`} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.7rem' }} />
                  </Box>
                </Box>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 0.75 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">Coverage: {coveragePct}%</Typography>
                        <Typography variant="caption" color="text.secondary">{formatNumber(s.currentStock)} / {formatNumber(s.requiredQty)} required</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={coveragePct}
                        sx={{ bgcolor: alpha(urgColor, 0.12), '& .MuiLinearProgress-bar': { bgcolor: urgColor } }} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary" display="block">Suggested PO from <strong>{s.vendor}</strong></Typography>
                    <Typography variant="body2" fontWeight={700} color="primary.main">{formatNumber(s.suggestedPOQty)} units</Typography>
                  </Grid>
                  <Grid item xs={12} md={2} sx={{ textAlign: { md: 'right' } }}>
                    <Button size="small" variant="contained" startIcon={<ShoppingCartOutlinedIcon />}>Create PO</Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default MRPPage;
