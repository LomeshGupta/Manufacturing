import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const LoadingScreen = ({ message = 'Loading...' }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2.5,
        bgcolor: 'background.default',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
      >
        {/* Logo mark */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', lineHeight: 1 }}>S</Typography>
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress
            size={42}
            thickness={3}
            sx={{ color: alpha(theme.palette.primary.main, 0.15) }}
            variant="determinate"
            value={100}
          />
          <CircularProgress
            size={42}
            thickness={3}
            color="primary"
            sx={{ position: 'absolute' }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {message}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default LoadingScreen;
