import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const ConfirmDialog = ({
  open, onClose, onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  severity = 'warning',
  loading = false,
}) => {
  const theme = useTheme();
  const colorMap = { warning: 'warning', error: 'error', info: 'primary', success: 'success' };
  const color = theme.palette[colorMap[severity]]?.main || theme.palette.warning.main;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '9px', bgcolor: alpha(color, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <WarningAmberOutlinedIcon sx={{ fontSize: '1.1rem', color }} />
          </Box>
          <Typography variant="h6" fontWeight={700}>{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button variant="outlined" color="inherit" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
        <Button variant="contained" color={colorMap[severity]} onClick={onConfirm} disabled={loading}
          startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}>
          {loading ? 'Processing...' : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
