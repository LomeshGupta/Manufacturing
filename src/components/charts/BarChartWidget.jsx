import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const BarChartWidget = ({ title, subtitle, series, categories, height = 280, horizontal = false, loading = false, colors }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: theme.typography.fontFamily,
      animations: { enabled: true, speed: 600 },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    colors: colors || [theme.palette.primary.main, theme.palette.secondary.light],
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal,
        columnWidth: '52%',
        barHeight: '60%',
      },
    },
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
        <ReactApexChart options={options} series={series} type="bar" height={height} />
      )}
    </Paper>
  );
};

export default BarChartWidget;
