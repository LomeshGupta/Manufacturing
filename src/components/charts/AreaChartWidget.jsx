import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const AreaChartWidget = ({ title, subtitle, series, categories, height = 280, loading = false }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const options = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: theme.typography.fontFamily,
      animations: { enabled: true, speed: 600 },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.02,
        stops: [0, 95, 100],
      },
    },
    stroke: { curve: 'smooth', width: 2.5 },
    xaxis: {
      categories,
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '0.75rem' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '0.75rem' } },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
      padding: { left: 8, right: 8 },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: theme.palette.text.secondary },
      fontSize: '12px',
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      style: { fontSize: '12px' },
    },
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
        <ReactApexChart options={options} series={series} type="area" height={height} />
      )}
    </Paper>
  );
};

export default AreaChartWidget;
