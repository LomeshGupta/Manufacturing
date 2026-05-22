import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ICONS = { error: ErrorOutlineIcon, warning: WarningAmberOutlinedIcon, info: InfoOutlinedIcon, success: CheckCircleOutlineIcon };

const AlertCard = ({ title, message, severity = 'warning', timestamp, action }) => {
  const theme = useTheme();
  const color = theme.palette[severity]?.main || theme.palette.warning.main;
  const Icon = ICONS[severity] || WarningAmberOutlinedIcon;
  return (
    <Paper sx={{ p: 2, borderRadius: '12px', border: `1px solid ${alpha(color, 0.3)}`, bgcolor: alpha(color, 0.04) }} elevation={0}>
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: alpha(color, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon sx={{ fontSize: '1rem', color }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.25 }}>
            <Typography variant="subtitle2" fontWeight={700}>{title}</Typography>
            {timestamp && <Typography variant="caption" color="text.disabled">{timestamp}</Typography>}
          </Box>
          <Typography variant="body2" color="text.secondary">{message}</Typography>
          {action && <Box sx={{ mt: 1 }}>{action}</Box>}
        </Box>
      </Box>
    </Paper>
  );
};

export default AlertCard;
