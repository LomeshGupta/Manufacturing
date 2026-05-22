import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const STATUS_CONFIG = {
  running: { label: 'Running', color: 'success' },
  stopped: { label: 'Stopped', color: 'error' },
  idle: { label: 'Idle', color: 'warning' },
};

const MachineCard = ({ machine, delay }) => {
  const theme = useTheme();
  const cfg = STATUS_CONFIG[machine.status] || STATUS_CONFIG.idle;
  const statusColor = theme.palette[cfg.color]?.main;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Paper
        sx={{
          p: 2,
          borderRadius: '14px',
          border: `1px solid ${machine.status === 'stopped' ? alpha(theme.palette.error.main, 0.3) : theme.palette.divider}`,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
        elevation={1}
      >
        {/* Status indicator strip */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            bgcolor: statusColor,
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, mt: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                bgcolor: alpha(statusColor, 0.12),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MemoryOutlinedIcon sx={{ fontSize: '1rem', color: statusColor }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} noWrap sx={{ maxWidth: 130 }}>
                {machine.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">{machine.type}</Typography>
            </Box>
          </Box>
          <Chip
            label={cfg.label}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 700,
              bgcolor: alpha(statusColor, 0.12),
              color: statusColor,
              borderRadius: '6px',
            }}
          />
        </Box>

        {machine.status === 'stopped' && machine.alert && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mb: 1.5,
              p: 1,
              borderRadius: '8px',
              bgcolor: alpha(theme.palette.error.main, 0.08),
            }}
          >
            <WarningAmberIcon sx={{ fontSize: '0.875rem', color: 'error.main' }} />
            <Typography variant="caption" color="error.main" fontWeight={600}>
              {machine.alert}
            </Typography>
          </Box>
        )}

        {machine.status === 'running' && (
          <>
            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">OEE</Typography>
                <Typography variant="caption" fontWeight={700} color={machine.oee >= 80 ? 'success.main' : 'warning.main'}>
                  {machine.oee}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={machine.oee}
                sx={{
                  bgcolor: alpha(statusColor, 0.12),
                  '& .MuiLinearProgress-bar': { bgcolor: machine.oee >= 80 ? 'success.main' : 'warning.main' },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Operator</Typography>
                <Typography variant="caption" fontWeight={600}>{machine.operator}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary" display="block">Uptime</Typography>
                <Typography variant="caption" fontWeight={600}>{machine.uptime}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary" display="block">Job</Typography>
              <Typography variant="caption" fontWeight={600} color="primary.main">{machine.job}</Typography>
            </Box>
          </>
        )}

        {machine.status === 'idle' && (
          <Typography variant="caption" color="text.disabled">No active job assigned</Typography>
        )}
      </Paper>
    </motion.div>
  );
};

const MachineStatusGrid = ({ machines = [], loading = false }) => {
  const theme = useTheme();

  const running = machines.filter((m) => m.status === 'running').length;
  const stopped = machines.filter((m) => m.status === 'stopped').length;
  const idle = machines.filter((m) => m.status === 'idle').length;

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>Machine Status</Typography>
          <Typography variant="caption" color="text.secondary">Live shop floor view</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[
            { label: `${running} Running`, color: 'success' },
            { label: `${stopped} Stopped`, color: 'error' },
            { label: `${idle} Idle`, color: 'warning' },
          ].map((s) => (
            <Chip
              key={s.label}
              label={s.label}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 700,
                bgcolor: alpha(theme.palette[s.color]?.main, 0.1),
                color: theme.palette[s.color]?.main,
                borderRadius: '6px',
              }}
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Skeleton variant="rounded" height={140} sx={{ borderRadius: '14px' }} />
              </Grid>
            ))
          : machines.map((machine, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={machine.id}>
                <MachineCard machine={machine} delay={idx * 0.05} />
              </Grid>
            ))}
      </Grid>
    </Paper>
  );
};

export default MachineStatusGrid;
