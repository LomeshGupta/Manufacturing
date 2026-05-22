import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { motion } from 'framer-motion';
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';

const formatValue = (value, unit) => {
  if (unit === 'currency') return formatCurrency(value);
  if (unit === 'percent') return formatPercent(value);
  return formatNumber(value);
};

const DeltaChip = ({ delta, deltaType }) => {
  const theme = useTheme();
  if (deltaType === 'critical') {
    return (
      <Chip
        icon={<ErrorOutlineIcon sx={{ fontSize: '0.75rem !important' }} />}
        label="Critical"
        size="small"
        sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: alpha(theme.palette.error.main, 0.12), color: theme.palette.error.main, borderRadius: '6px' }}
      />
    );
  }
  const isUp = deltaType === 'increase';
  const color = isUp ? theme.palette.success.main : theme.palette.warning.main;
  return (
    <Chip
      icon={isUp
        ? <TrendingUpIcon sx={{ fontSize: '0.75rem !important' }} />
        : <TrendingDownIcon sx={{ fontSize: '0.75rem !important' }} />}
      label={`${isUp ? '+' : '-'}${delta}%`}
      size="small"
      sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: alpha(color, 0.12), color, borderRadius: '6px' }}
    />
  );
};

const KPICard = ({ kpi, loading = false, delay = 0 }) => {
  const theme = useTheme();
  const color = theme.palette[kpi?.color]?.main || theme.palette.primary.main;

  if (loading) {
    return (
      <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
        <Skeleton variant="rounded" width={40} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" height={36} />
        <Skeleton variant="text" width="80%" height={20} />
      </Paper>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Paper
        sx={{
          p: 2.5,
          borderRadius: '16px',
          border: `1px solid ${theme.palette.divider}`,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          '&:hover': { boxShadow: theme.shadows[4], transform: 'translateY(-2px)' },
        }}
        elevation={1}
      >
        {/* Accent bar */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', bgcolor: color, borderRadius: '16px 0 0 16px' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              bgcolor: alpha(color, 0.12),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box component="span" sx={{ fontSize: '1.25rem', color, display: 'flex' }}>
              {kpi.iconComponent}
            </Box>
          </Box>
          <DeltaChip delta={kpi.delta} deltaType={kpi.deltaType} />
        </Box>

        <Typography variant="h4" fontWeight={800} sx={{ color, lineHeight: 1.1, mb: 0.5 }}>
          {formatValue(kpi.value, kpi.unit)}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
          {kpi.title}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default KPICard;
