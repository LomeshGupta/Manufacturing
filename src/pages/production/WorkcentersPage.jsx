import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PageHeader from '../../components/common/PageHeader';
import { productionApi } from '../../api/production.api';

const STATUS_COLOR = { running: 'success', stopped: 'error', idle: 'warning' };

const WorkcenterCard = ({ wc, idx }) => {
  const theme = useTheme();
  const sc = STATUS_COLOR[wc.status] || 'default';
  const color = theme.palette[sc]?.main;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
      <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${wc.status === 'stopped' ? alpha(color, 0.4) : theme.palette.divider}`, height: '100%', position: 'relative', overflow: 'hidden' }} elevation={1}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, bgcolor: color }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, mt: 0.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: alpha(color, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MemoryOutlinedIcon sx={{ color, fontSize: '1.1rem' }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>{wc.name}</Typography>
              <Typography variant="caption" color="text.secondary">{wc.type}</Typography>
            </Box>
          </Box>
          <Chip label={wc.status} size="small" color={sc} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
        </Box>

        {wc.issue && (
          <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', p: 1, borderRadius: '8px', bgcolor: alpha(color, 0.08), mb: 1.5 }}>
            <WarningAmberIcon sx={{ fontSize: '0.875rem', color }} />
            <Typography variant="caption" color="error.main" fontWeight={600}>{wc.issue}</Typography>
          </Box>
        )}

        {wc.status === 'running' && (
          <>
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Utilization</Typography>
                <Typography variant="caption" fontWeight={700} color={wc.utilization >= 80 ? 'success.main' : 'warning.main'}>{wc.utilization}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={wc.utilization}
                sx={{ bgcolor: alpha(color, 0.12), '& .MuiLinearProgress-bar': { bgcolor: wc.utilization >= 80 ? 'success.main' : 'warning.main' } }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box><Typography variant="caption" color="text.secondary" display="block">Operator</Typography><Typography variant="caption" fontWeight={600}>{wc.operator}</Typography></Box>
              <Box sx={{ textAlign: 'right' }}><Typography variant="caption" color="text.secondary" display="block">Current Job</Typography><Typography variant="caption" fontWeight={600} color="primary.main">{wc.currentJob}</Typography></Box>
            </Box>
          </>
        )}
        {wc.status === 'idle' && <Typography variant="caption" color="text.disabled">No active job assigned</Typography>}
      </Paper>
    </motion.div>
  );
};

const WorkcentersPage = () => {
  const theme = useTheme();
  const [workcenters, setWorkcenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productionApi.getWorkcenters().then((d) => { setWorkcenters(d); setLoading(false); });
  }, []);

  const running = workcenters.filter((w) => w.status === 'running').length;
  const stopped = workcenters.filter((w) => w.status === 'stopped').length;
  const idle = workcenters.filter((w) => w.status === 'idle').length;

  return (
    <Box>
      <PageHeader
        title="Work Centers"
        subtitle="Live machine and station status across the shop floor"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Production' }, { label: 'Work Centers' }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        {[{ label: `${running} Running`, color: 'success' }, { label: `${stopped} Stopped`, color: 'error' }, { label: `${idle} Idle`, color: 'warning' }].map((s) => (
          <Chip key={s.label} label={s.label} color={s.color} size="small" sx={{ fontWeight: 700 }} />
        ))}
      </Box>
      <Grid container spacing={2.5}>
        {loading ? Array.from({ length: 6 }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: 160 }} elevation={1}><LinearProgress /></Paper>
          </Grid>
        )) : workcenters.map((wc, i) => (
          <Grid item xs={12} sm={6} md={4} key={wc.id}><WorkcenterCard wc={wc} idx={i} /></Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkcentersPage;
