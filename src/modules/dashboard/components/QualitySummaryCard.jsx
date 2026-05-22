import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';

const QualitySummaryCard = ({ data, loading = false }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const sparkOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent',
      sparkline: { enabled: true },
      fontFamily: theme.typography.fontFamily,
      animations: { enabled: true, speed: 500 },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    colors: [theme.palette.error.main],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      x: { show: true },
      y: { title: { formatter: () => 'Rejections:' } },
    },
  };

  if (loading || !data) {
    return (
      <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
        <Skeleton variant="text" width="50%" height={28} />
        <Skeleton variant="rounded" height={100} sx={{ mt: 2 }} />
      </Paper>
    );
  }

  const stats = [
    { label: 'Inspected', value: data.inspected, icon: <HourglassEmptyOutlinedIcon sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />, color: theme.palette.text.secondary },
    { label: 'Passed', value: data.passed, icon: <CheckCircleOutlineIcon sx={{ fontSize: '1.1rem', color: 'success.main' }} />, color: theme.palette.success.main },
    { label: 'Rejected', value: data.rejected, icon: <CancelOutlinedIcon sx={{ fontSize: '1.1rem', color: 'error.main' }} />, color: theme.palette.error.main },
    { label: 'Pending', value: data.pendingInspection, icon: <HourglassEmptyOutlinedIcon sx={{ fontSize: '1.1rem', color: 'warning.main' }} />, color: theme.palette.warning.main },
  ];

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>Quality Control</Typography>
          <Typography variant="caption" color="text.secondary">This month's inspection summary</Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h5" fontWeight={800} color="success.main">{data.passRate}%</Typography>
          <Typography variant="caption" color="text.secondary">Pass Rate</Typography>
        </Box>
      </Box>

      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        {stats.map((s) => (
          <Grid item xs={6} key={s.label}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: '10px',
                bgcolor: alpha(s.color, 0.06),
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {s.icon}
              <Box>
                <Typography variant="h6" fontWeight={800} sx={{ color: s.color, lineHeight: 1 }}>
                  {s.value.toLocaleString('en-IN')}
                </Typography>
                <Typography variant="caption" color="text.secondary">{s.label}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
        Rejection Trend (6 months)
      </Typography>
      <ReactApexChart
        options={{
          ...sparkOptions,
          xaxis: { categories: data.rejectionTrend.map((r) => r.month) },
        }}
        series={[{ name: 'Rejections', data: data.rejectionTrend.map((r) => r.rejections) }]}
        type="bar"
        height={80}
      />
    </Paper>
  );
};

export default QualitySummaryCard;
