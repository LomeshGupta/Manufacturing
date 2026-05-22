import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const AccessDenied = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper
        sx={{ p: 6, textAlign: 'center', maxWidth: 400, borderRadius: '20px', border: `1px solid ${theme.palette.divider}` }}
        elevation={2}
      >
        <Box
          sx={{
            width: 64, height: 64, borderRadius: '16px',
            bgcolor: alpha(theme.palette.error.main, 0.1),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mx: 'auto', mb: 3,
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: '1.8rem', color: 'error.main' }} />
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom>Access Denied</Typography>
        <Typography variant="body2" color="text.secondary">
          You don't have permission to view this page. Contact your administrator.
        </Typography>
      </Paper>
    </Box>
  );
};

const RoleRoute = ({ children, allowedRoles = [], redirectTo = null }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.length) return children;
  if (allowedRoles.includes(user?.role)) return children;
  if (redirectTo) return <Navigate to={redirectTo} replace />;
  return <AccessDenied />;
};

export default RoleRoute;
