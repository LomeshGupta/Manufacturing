import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const LineChartWidget = ({ title, subtitle, series, categories, height = 220, loading = false, colors }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: theme.typography.fontFamily,
      animations: { enabled: true, speed: 600 },
      sparkline: { enabled: false },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    colors: colors || [theme.palette.error.main],
    stroke: { curve: 'smooth', width: 2.5 },
    markers: { size: 4, strokeWidth: 0, hover: { size: 6 } },
    xaxis: {
      categories,
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '0.75rem' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '0.75rem' } },
    },
    grid: { borderColor: theme.palette.divider, strokeDashArray: 4, padding: { left: 8, right: 8 } },
    legend: { show: false },
    tooltip: { theme: isDark ? 'dark' : 'light', style: { fontSize: '12px' } },
    dataLabels: { enabled: false },
  };

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={1}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>{title}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
      </Box>
      {loading ? (
        <Skeleton variant="rounded" height={height} />
      ) : (
        <ReactApexChart options={options} series={series} type="line" height={height} />
      )}
    </Paper>
  );
};

export default LineChartWidget;
