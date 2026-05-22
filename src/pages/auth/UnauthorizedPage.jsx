import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const UnauthorizedPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
            maxWidth: 460,
            borderRadius: '24px',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[4],
          }}
        >
          <Box
            sx={{
              width: 80, height: 80, borderRadius: '22px',
              background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.15)}, ${alpha(theme.palette.error.main, 0.05)})`,
              border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', mb: 3,
            }}
          >
            <GppBadOutlinedIcon sx={{ fontSize: '2.2rem', color: 'error.main' }} />
          </Box>

          <Typography variant="overline" color="error.main" fontWeight={700} display="block" sx={{ mb: 1 }}>
            403 — Access Denied
          </Typography>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Not Authorized
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            You don't have permission to access this resource.
          </Typography>
          {user && (
            <Typography variant="caption" color="text.disabled" display="block" sx={{ mb: 3 }}>
              Signed in as <strong>{user.name}</strong> ({user.role})
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              startIcon={<HomeOutlinedIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default UnauthorizedPage;
