import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../layouts/components/Navbar/ThemeToggle';
import { authApi } from '../../api/auth.api';

const DEMO_ACCOUNTS = authApi.getMockUsers().map((u) => ({
  label: u.role.charAt(0).toUpperCase() + u.role.slice(1),
  email: u.email,
  password: u.role === 'admin' ? 'admin123' : u.role === 'manager' ? 'manager123' : 'operator123',
  color: u.role === 'admin' ? 'primary' : u.role === 'manager' ? 'secondary' : 'success',
}));

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, authError, clearAuthError, isAuthenticated } = useAuth();

  const [form, setForm] = useState({ email: 'admin@smarterp.in', password: 'admin123' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated]);

  useEffect(() => {
    return () => clearAuthError();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (fieldErrors[field]) setFieldErrors((p) => ({ ...p, [field]: '' }));
    if (authError) clearAuthError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await login(form.email, form.password);
    if (result.success) navigate(from, { replace: true });
  };

  const handleDemoLogin = (account) => {
    setForm({ email: account.email, password: account.password });
    setFieldErrors({});
    clearAuthError();
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
          width: { xs: '92vw', sm: 460 },
          p: { xs: 3, sm: 4.5 },
          borderRadius: '24px',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[5],
          position: 'relative',
        }}
      >
        {/* Theme toggle top-right */}
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <ThemeToggle />
        </Box>

        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box
            sx={{
              width: 46, height: 46, borderRadius: '13px',
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(249,115,22,0.38)',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem', lineHeight: 1 }}>S</Typography>
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800} lineHeight={1.1}>
              Smart<span style={{ color: '#F97316' }}>ERP</span>
            </Typography>
            <Typography variant="caption" color="text.secondary" lineHeight={1}>
              Manufacturing Intelligence Platform
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" fontWeight={700} gutterBottom>Sign in</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Access your manufacturing workspace
        </Typography>

        {/* Auth error */}
        <AnimatePresence>
          {authError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Alert
                severity="error"
                onClose={clearAuthError}
                sx={{ mb: 2.5, borderRadius: '10px', fontSize: '0.875rem' }}
              >
                {authError}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={handleChange('email')}
            error={Boolean(fieldErrors.email)}
            helperText={fieldErrors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon fontSize="small" color={fieldErrors.email ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange('password')}
            error={Boolean(fieldErrors.password)}
            helperText={fieldErrors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" color={fieldErrors.password ? 'error' : 'action'} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowPassword((p) => !p)} edge="end">
                    {showPassword
                      ? <VisibilityOffOutlinedIcon fontSize="small" />
                      : <VisibilityOutlinedIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{ color: 'text.disabled' }}
                />
              }
              label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
            />
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              color="primary"
              underline="hover"
              sx={{ fontWeight: 600 }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            sx={{ py: 1.5, fontSize: '0.9375rem', fontWeight: 700, mt: 0.5 }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CircularProgress size={18} color="inherit" thickness={5} />
                Signing in...
              </Box>
            ) : 'Sign In'}
          </Button>
        </Box>

        {/* Demo accounts */}
        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.disabled" fontWeight={600}>
            DEMO ACCOUNTS
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {DEMO_ACCOUNTS.map((acc) => (
            <Chip
              key={acc.email}
              label={acc.label}
              color={acc.color}
              size="small"
              clickable
              onClick={() => handleDemoLogin(acc)}
              sx={{ fontWeight: 700, fontSize: '0.75rem', height: 28 }}
            />
          ))}
        </Box>

        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: '12px',
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            border: `1px dashed ${alpha(theme.palette.primary.main, 0.25)}`,
          }}
        >
          <Typography variant="caption" color="text.secondary" display="block" fontWeight={600} sx={{ mb: 0.5 }}>
            Click a role above to auto-fill credentials
          </Typography>
          <Typography variant="caption" color="text.disabled" display="block">
            Email: {form.email}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Password: {form.password}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default LoginPage;
