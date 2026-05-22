import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const STATUS_MAP = {
  active: { label: 'Active', color: 'success' },
  inactive: { label: 'Inactive', color: 'default' },
  pending: { label: 'Pending', color: 'warning' },
  approved: { label: 'Approved', color: 'success' },
  rejected: { label: 'Rejected', color: 'error' },
  'in-progress': { label: 'In Progress', color: 'info' },
  completed: { label: 'Completed', color: 'success' },
  cancelled: { label: 'Cancelled', color: 'error' },
  draft: { label: 'Draft', color: 'default' },
  critical: { label: 'Critical', color: 'error' },
  warning: { label: 'Warning', color: 'warning' },
  running: { label: 'Running', color: 'success' },
  stopped: { label: 'Stopped', color: 'error' },
  idle: { label: 'Idle', color: 'warning' },
};

const StatusBadge = ({ status, size = 'small' }) => {
  const theme = useTheme();
  const config = STATUS_MAP[status] || { label: status, color: 'default' };

  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        height: 22,
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.03em',
        borderRadius: '6px',
        bgcolor: config.color !== 'default'
          ? alpha(theme.palette[config.color]?.main || '#999', 0.12)
          : alpha(theme.palette.text.primary, 0.08),
        color: config.color !== 'default'
          ? theme.palette[config.color]?.main
          : theme.palette.text.secondary,
      }}
    />
  );
};

export default StatusBadge;
