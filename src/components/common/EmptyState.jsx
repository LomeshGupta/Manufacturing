import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

const EmptyState = ({
  icon: Icon = InboxOutlinedIcon,
  title = 'No data found',
  description = '',
  actionLabel = '',
  onAction = null,
  compact = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: compact ? 4 : 8,
        px: 3,
      }}
    >
      <Box
        sx={{
          width: compact ? 52 : 72,
          height: compact ? 52 : 72,
          borderRadius: compact ? '14px' : '20px',
          bgcolor: alpha(theme.palette.text.secondary, 0.07),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Icon sx={{ fontSize: compact ? '1.5rem' : '2rem', color: 'text.disabled' }} />
      </Box>
      <Typography variant={compact ? 'subtitle2' : 'h6'} fontWeight={700} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.disabled" sx={{ maxWidth: 320, mb: onAction ? 2.5 : 0 }}>
          {description}
        </Typography>
      )}
      {onAction && actionLabel && (
        <Button variant="contained" size="small" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
