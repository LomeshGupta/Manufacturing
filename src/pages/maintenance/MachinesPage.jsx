import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import PageHeader from '../../components/common/PageHeader';
import { maintenanceApi } from '../../api/maintenance.api';
import { formatDate } from '../../utils/formatters';

const STATUS_COLOR = { running: 'success', stopped: 'error', idle: 'warning' };

const MachineCard = ({ machine, idx }) => {
  const theme = useTheme();
  const sc = STATUS_COLOR[machine.status] || 'default';
  const color = theme.palette[sc]?.main;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} style={{ height: '100%' }}>
      <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${machine.status === 'stopped' ? alpha(color, 0.5) : theme.palette.divider}`, height: '100%', position: 'relative', overflow: 'hidden' }} elevation={1}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, bgcolor: color }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, mt: 0.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: alpha(color, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MemoryOutlinedIcon sx={{ color, fontSize: '1.2rem' }} />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>{machine.name}</Typography>
              <Typography variant="caption" color="text.secondary">{machine.model}</Typography>
            </Box>
          </Box>
          <Chip label={machine.status} size="small" color={sc} sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700 }} />
        </Box>

        {machine.alert && (
          <Alert severity="error" icon={<WarningAmberIcon fontSize="small" />} sx={{ mb: 2, borderRadius: '8px', py: 0.5, fontSize: '0.8rem' }}>
            {machine.alert}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {machine.status === 'running' && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">OEE</Typography>
                <Typography variant="caption" fontWeight={700} color={machine.oee >= 80 ? 'success.main' : 'warning.main'}>{machine.oee}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={machine.oee}
                sx={{ bgcolor: alpha(color, 0.12), '& .MuiLinearProgress-bar': { bgcolor: machine.oee >= 80 ? 'success.main' : 'warning.main' } }} />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="caption" color="text.disabled" display="block">Type</Typography>
              <Typography variant="caption" fontWeight={600}>{machine.type}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.disabled" display="block">Location</Typography>
              <Typography variant="caption" fontWeight={600}>{machine.location}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.disabled" display="block">Downtime (hrs)</Typography>
              <Typography variant="caption" fontWeight={600} color={machine.totalDowntime > 10 ? 'error.main' : 'text.primary'}>{machine.totalDowntime}h</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, p: 1.5, borderRadius: '8px', bgcolor: alpha(theme.palette.text.primary, 0.03), border: `1px solid ${theme.palette.divider}` }}>
            <EventOutlinedIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mt: '1px' }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Last: {formatDate(machine.lastMaintenance)}</Typography>
              <Typography variant="caption" fontWeight={600} color="primary.main">Next: {formatDate(machine.nextMaintenance)}</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

const MachinesPage = () => {
  const theme = useTheme();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    maintenanceApi.getMachines().then((d) => { setMachines(d); setLoading(false); });
  }, []);

  const running = machines.filter((m) => m.status === 'running').length;
  const stopped = machines.filter((m) => m.status === 'stopped').length;
  const avgOEE = machines.filter((m) => m.oee > 0).reduce((a, m, _, arr) => a + m.oee / arr.length, 0).toFixed(1);

  return (
    <Box>
      <PageHeader
        title="Machines"
        subtitle="Equipment register, health status and maintenance schedule"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Maintenance' }, { label: 'Machines' }]}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Machines', value: machines.length, color: 'primary.main' },
          { label: 'Running', value: running, color: 'success.main' },
          { label: 'Stopped', value: stopped, color: 'error.main' },
          { label: 'Avg OEE', value: `${avgOEE}%`, color: 'secondary.main' },
        ].map((m) => (
          <Paper key={m.label} sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}`, minWidth: 130 }} elevation={1}>
            <Typography variant="h5" fontWeight={800} sx={{ color: m.color }}>{m.value}</Typography>
            <Typography variant="caption" color="text.secondary">{m.label}</Typography>
          </Paper>
        ))}
      </Box>
      <Grid container spacing={2.5}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <Grid item xs={12} sm={6} md={4} key={i}><Paper sx={{ height: 220, borderRadius: '16px' }} elevation={1}><LinearProgress /></Paper></Grid>)
          : machines.map((m, i) => <Grid item xs={12} sm={6} md={4} key={m.id}><MachineCard machine={m} idx={i} /></Grid>)}
      </Grid>
    </Box>
  );
};

export default MachinesPage;
