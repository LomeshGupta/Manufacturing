import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
              background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', mb: 3,
            }}
          >
            <SearchOffOutlinedIcon sx={{ fontSize: '2.2rem', color: 'secondary.main' }} />
          </Box>

          <Typography
            variant="h1"
            fontWeight={900}
            sx={{
              fontSize: { xs: '4rem', sm: '5rem' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              lineHeight: 1,
            }}
          >
            404
          </Typography>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>

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

export default NotFoundPage;
