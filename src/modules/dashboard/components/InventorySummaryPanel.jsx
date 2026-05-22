import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { formatCurrency, formatNumber } from '../../../utils/formatters';

const CATEGORY_COLORS = {
  'Raw Material': '#1E40AF',
  'WIP': '#F97316',
  'Finished Goods': '#16A34A',
  'Consumables': '#EAB308',
};

const InventorySummaryPanel = ({ data = [], loading = false }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={1}>
      <Typography variant="h6" fontWeight={700} gutterBottom>Inventory Summary</Typography>
      <Typography variant="caption" color="text.secondary">Valuation by category</Typography>

      <Box sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Box key={i}>
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="rounded" height={6} sx={{ my: 0.75 }} />
                <Skeleton variant="text" width="30%" />
              </Box>
            ))
          : data.map((item) => {
              const color = CATEGORY_COLORS[item.category] || theme.palette.primary.main;
              return (
                <Box key={item.category}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
                      <Typography variant="body2" fontWeight={600}>{item.category}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={700}>{formatCurrency(item.value)}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.utilization}
                    sx={{
                      mb: 0.75,
                      bgcolor: alpha(color, 0.12),
                      '& .MuiLinearProgress-bar': { bgcolor: color },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatNumber(item.items)} items
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.utilization}% utilization
                    </Typography>
                  </Box>
                </Box>
              );
            })}
      </Box>

      {!loading && data.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" fontWeight={600} color="text.secondary">Total Value</Typography>
            <Typography variant="body2" fontWeight={800} color="primary.main">
              {formatCurrency(data.reduce((acc, d) => acc + d.value, 0))}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default InventorySummaryPanel;
