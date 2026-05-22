import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const getStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const STRENGTH_CONFIG = [
  { label: 'Too short', color: 'error' },
  { label: 'Weak', color: 'error' },
  { label: 'Fair', color: 'warning' },
  { label: 'Good', color: 'info' },
  { label: 'Strong', color: 'success' },
];

const PasswordStrengthBar = ({ password }) => {
  const strength = getStrength(password);
  const cfg = STRENGTH_CONFIG[Math.min(strength, 4)];

  if (!password) return null;
  return (
    <Box sx={{ mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={(strength / 4) * 100}
        color={cfg.color}
        sx={{ borderRadius: 4, height: 5 }}
      />
      <Typography variant="caption" color={`${cfg.color}.main`} fontWeight={600} sx={{ mt: 0.5, display: 'block' }}>
        {cfg.label}
      </Typography>
    </Box>
  );
};

const ResetPasswordPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, loading, authError, clearAuthError } = useAuth();

  const token = searchParams.get('token') || 'mock-reset-token';

  const [form, setForm] = useState({ password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => () => clearAuthError(), []);

  const validate = () => {
    const errs = {};
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Minimum 8 characters';
    else if (getStrength(form.password) < 2) errs.password = 'Password is too weak';
    if (!form.confirm) errs.confirm = 'Please confirm your password';
    else if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
    if (authError) clearAuthError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await resetPassword(token, form.password);
    if (result.success) setDone(true);
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
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

              <Box
                sx={{
                  width: 56, height: 56, borderRadius: '14px',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
                }}
              >
                <LockOutlinedIcon sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
              </Box>

              <Typography variant="h5" fontWeight={700} gutterBottom>Set new password</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Must be at least 8 characters with a mix of letters and numbers.
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

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <TextField
                    label="New Password"
                    type={showPwd ? 'text' : 'password'}
                    fullWidth
                    autoFocus
                    value={form.password}
                    onChange={handleChange('password')}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon fontSize="small" color={errors.password ? 'error' : 'action'} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowPwd((p) => !p)} edge="end">
                            {showPwd ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <PasswordStrengthBar password={form.password} />
                </Box>

                <TextField
                  label="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  fullWidth
                  value={form.confirm}
                  onChange={handleChange('confirm')}
                  error={Boolean(errors.confirm)}
                  helperText={errors.confirm}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" color={errors.confirm ? 'error' : 'action'} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowConfirm((p) => !p)} edge="end">
                          {showConfirm ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                        </IconButton>
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
                      Resetting...
                    </Box>
                  ) : 'Reset Password'}
                </Button>
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
                  <CheckCircleOutlineIcon sx={{ fontSize: '2.2rem', color: 'success.main' }} />
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>Password reset!</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Your password has been updated. You can now sign in with your new credentials.
                </Typography>
                <Button variant="contained" fullWidth size="large" onClick={() => navigate('/login')} sx={{ py: 1.5, fontWeight: 700 }}>
                  Sign In Now
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
};

export default ResetPasswordPage;
