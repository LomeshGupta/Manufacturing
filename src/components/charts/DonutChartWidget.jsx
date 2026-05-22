import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const DonutChartWidget = ({ title, subtitle, series, labels, colors, centerLabel, centerValue, height = 280, loading = false }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const options = {
    chart: {
      type: 'donut',
      background: 'transparent',
      fontFamily: theme.typography.fontFamily,
      animations: { enabled: true, speed: 600 },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    colors: colors || [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main, theme.palette.warning.main],
    labels,
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            name: { show: true, fontSize: '13px', color: theme.palette.text.secondary, offsetY: 4 },
            value: { show: true, fontSize: '22px', fontWeight: 800, color: theme.palette.text.primary, offsetY: -4 },
            total: {
              show: true,
              label: centerLabel || 'Total',
              fontSize: '12px',
              color: theme.palette.text.secondary,
              formatter: () => centerValue || '',
            },
          },
        },
      },
    },
    legend: {
      position: 'bottom',
      labels: { colors: theme.palette.text.secondary },
      fontSize: '12px',
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      style: { fontSize: '12px' },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
  };

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={1}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6" fontWeight={700}>{title}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
      </Box>
      {loading ? (
        <Skeleton variant="circular" width={height} height={height} sx={{ mx: 'auto' }} />
      ) : (
        <ReactApexChart options={options} series={series} type="donut" height={height} />
      )}
    </Paper>
  );
};

export default DonutChartWidget;
