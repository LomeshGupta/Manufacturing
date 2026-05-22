import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { forgotPassword, loading, authError, clearAuthError } = useAuth();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => () => clearAuthError(), []);

  const validate = () => {
    if (!email) { setEmailError('Email is required'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setEmailError('Enter a valid email address'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await forgotPassword(email);
    if (result.success) setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Paper
        elevation={0}
        sx={{
          width: { xs: '92vw', sm: 420 },
          p: { xs: 3, sm: 4.5 },
          borderRadius: '24px',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[5],
        }}
      >
        {/* Back link */}
        <Box sx={{ mb: 3 }}>
          <Link
            component={RouterLink}
            to="/login"
            color="text.secondary"
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: 'fit-content', fontSize: '0.875rem', fontWeight: 600 }}
          >
            <ArrowBackIcon sx={{ fontSize: '1rem' }} />
            Back to Sign In
          </Link>
        </Box>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Icon */}
              <Box
                sx={{
                  width: 56, height: 56, borderRadius: '14px',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
                }}
              >
                <EmailOutlinedIcon sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
              </Box>

              <Typography variant="h5" fontWeight={700} gutterBottom>Forgot your password?</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                No problem. Enter your registered email and we'll send a secure reset link.
              </Typography>

              <AnimatePresence>
                {authError && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <Alert severity="error" onClose={clearAuthError} sx={{ mb: 2.5, borderRadius: '10px' }}>
                      {authError}
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  autoFocus
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(''); clearAuthError(); }}
                  error={Boolean(emailError)}
                  helperText={emailError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon fontSize="small" color={emailError ? 'error' : 'action'} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ py: 1.5, fontWeight: 700 }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CircularProgress size={18} color="inherit" thickness={5} />
                      Sending link...
                    </Box>
                  ) : 'Send Reset Link'}
                </Button>
              </Box>

              <Box
                sx={{
                  mt: 3, p: 2, borderRadius: '10px',
                  bgcolor: alpha(theme.palette.info.main, 0.06),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.15)}`,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Try: <strong>admin@smarterp.in</strong> or <strong>manager@smarterp.in</strong>
                </Typography>
              </Box>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Box
                  sx={{
                    width: 72, height: 72, borderRadius: '20px',
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mx: 'auto', mb: 3,
                  }}
                >
                  <MarkEmailReadOutlinedIcon sx={{ fontSize: '2rem', color: 'success.main' }} />
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>Check your inbox</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  We've sent a password reset link to
                </Typography>
                <Typography variant="body2" fontWeight={700} color="primary.main" sx={{ mb: 3 }}>
                  {email}
                </Typography>
                <Typography variant="caption" color="text.disabled" display="block" sx={{ mb: 3 }}>
                  Link expires in 30 minutes. Check your spam folder if you don't see it.
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => { setSent(false); setEmail(''); }}
                  sx={{ mb: 1.5 }}
                >
                  Try a different email
                </Button>
                <Button variant="contained" fullWidth onClick={() => navigate('/login')}>
                  Back to Sign In
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
};

export default ForgotPasswordPage;
