import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';

const ShiftSummaryCard = ({ data, loading = false }) => {
  const theme = useTheme();

  if (loading || !data) {
    return (
      <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
        <Skeleton variant="text" width="50%" height={28} />
        <Skeleton variant="rounded" height={80} sx={{ mt: 2 }} />
      </Paper>
    );
  }

  const outputPct = Math.round((data.outputToday / data.targetToday) * 100);
  const workerPct = Math.round((data.activeWorkers / data.totalWorkers) * 100);

  const metrics = [
    {
      icon: <AccessTimeIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />,
      label: 'Current Shift',
      value: data.currentShift,
      color: theme.palette.primary.main,
    },
    {
      icon: <GroupOutlinedIcon sx={{ fontSize: '1rem', color: 'success.main' }} />,
      label: 'Active Workers',
      value: `${data.activeWorkers} / ${data.totalWorkers}`,
      pct: workerPct,
      color: theme.palette.success.main,
    },
    {
      icon: <SpeedOutlinedIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />,
      label: 'Output vs Target',
      value: `${data.outputToday} / ${data.targetToday} units`,
      pct: outputPct,
      color: outputPct >= 80 ? theme.palette.success.main : theme.palette.warning.main,
    },
  ];

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>Shift Summary</Typography>
          <Typography variant="caption" color="text.secondary">Today's performance</Typography>
        </Box>
        <Chip
          label="Live"
          size="small"
          sx={{
            height: 20,
            fontSize: '0.65rem',
            fontWeight: 700,
            bgcolor: alpha(theme.palette.success.main, 0.12),
            color: theme.palette.success.main,
            borderRadius: '6px',
            '&::before': { content: '"●  "', fontSize: '0.5rem' },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {metrics.map((m, i) => (
          <Box key={i}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: m.pct !== undefined ? 0.75 : 0 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '7px',
                  bgcolor: alpha(m.color, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {m.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  {m.label}
                </Typography>
                <Typography variant="body2" fontWeight={700}>{m.value}</Typography>
              </Box>
              {m.pct !== undefined && (
                <Typography variant="body2" fontWeight={800} sx={{ color: m.color }}>
                  {m.pct}%
                </Typography>
              )}
            </Box>
            {m.pct !== undefined && (
              <LinearProgress
                variant="determinate"
                value={Math.min(m.pct, 100)}
                sx={{
                  ml: 4.5,
                  bgcolor: alpha(m.color, 0.12),
                  '& .MuiLinearProgress-bar': { bgcolor: m.color },
                }}
              />
            )}
            {i < metrics.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ShiftSummaryCard;
