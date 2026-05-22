import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'primary', elevation = 1 }) => {
  const theme = useTheme();
  const c = theme.palette[color]?.main || theme.palette.primary.main;
  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={elevation}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
        {Icon && (
          <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: alpha(c, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon sx={{ fontSize: '1.2rem', color: c }} />
          </Box>
        )}
      </Box>
      <Typography variant="h4" fontWeight={800} sx={{ color: c, lineHeight: 1.1 }}>{value}</Typography>
      <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>{title}</Typography>
      {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
    </Paper>
  );
};

export default StatCard;
