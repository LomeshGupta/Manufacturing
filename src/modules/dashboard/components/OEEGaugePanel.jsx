import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const OEEGaugePanel = ({ oeeBreakdown = [], loading = false }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const overallOEE = oeeBreakdown.length
    ? ((oeeBreakdown.reduce((acc, b) => acc * (b.value / 100), 1)) * 100).toFixed(1)
    : 0;

  const gaugeOptions = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
      fontFamily: theme.typography.fontFamily,
      animations: { enabled: true, speed: 800 },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    plotOptions: {
      radialBar: {
        startAngle: -130,
        endAngle: 130,
        hollow: { size: '60%', background: 'transparent' },
        track: { background: isDark ? '#1E293B' : '#F1F5F9', strokeWidth: '100%', margin: 6 },
        dataLabels: {
          name: { show: true, fontSize: '13px', color: theme.palette.text.secondary, offsetY: 30 },
          value: {
            show: true,
            fontSize: '28px',
            fontWeight: 800,
            color: theme.palette.text.primary,
            offsetY: -10,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    colors: [theme.palette.primary.main],
    labels: ['Overall OEE'],
    stroke: { lineCap: 'round' },
  };

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={1}>
      <Typography variant="h6" fontWeight={700}>OEE Performance</Typography>
      <Typography variant="caption" color="text.secondary">Availability × Performance × Quality</Typography>

      {loading ? (
        <Skeleton variant="circular" width={200} height={200} sx={{ mx: 'auto', mt: 3 }} />
      ) : (
        <Box sx={{ mt: 1 }}>
          <ReactApexChart
            options={gaugeOptions}
            series={[parseFloat(overallOEE)]}
            type="radialBar"
            height={220}
          />
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Skeleton variant="circular" width={10} height={10} />
                <Skeleton variant="text" width="100%" />
              </Box>
            ))
          : oeeBreakdown.map((item) => (
              <Box key={item.name}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color, flexShrink: 0 }} />
                    <Typography variant="body2" fontWeight={500}>{item.name}</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={700} sx={{ color: item.color }}>
                    {item.value}%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 5,
                    borderRadius: '4px',
                    bgcolor: alpha(item.color, 0.15),
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${item.value}%`,
                      bgcolor: item.color,
                      borderRadius: '4px',
                      transition: 'width 1s ease',
                    }}
                  />
                </Box>
              </Box>
            ))}
      </Box>
    </Paper>
  );
};

export default OEEGaugePanel;
