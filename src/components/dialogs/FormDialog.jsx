import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

const FormDialog = ({
  open, onClose, onSubmit,
  title, subtitle,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  loading = false,
  maxWidth = 'sm',
  children,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
    <DialogTitle sx={{ pb: subtitle ? 0.5 : 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>{title}</Typography>
          {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ mt: -0.5, mr: -0.5 }}><CloseIcon fontSize="small" /></IconButton>
      </Box>
    </DialogTitle>
    <DialogContent sx={{ pt: '16px !important' }}>
      {children}
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
      <Button variant="outlined" color="inherit" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
      <Button variant="contained" onClick={onSubmit} disabled={loading}
        startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}>
        {loading ? 'Saving...' : submitLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default FormDialog;
