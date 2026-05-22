import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from 'framer-motion';
import PageHeader from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { ROLE_PERMISSIONS } from '../../utils/permissions';

const ROLE_COLOR = {
  admin: 'error',
  manager: 'primary',
  operator: 'success',
  store: 'warning',
  purchase: 'secondary',
  production: 'info',
  qc: 'success',
  maintenance: 'warning',
  engineer: 'secondary',
};

const ProfilePage = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const roleColor = ROLE_COLOR[user?.role] || 'default';
  const permissions = ROLE_PERMISSIONS[user?.role] || [];

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({ name: user?.name || '', email: user?.email || '' });
    setEditing(false);
  };

  return (
    <Box>
      <PageHeader
        title="My Profile"
        subtitle="Manage your account information and preferences"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Profile' }]}
        actions={
          !editing ? (
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={() => setEditing(true)}
              size="small"
            >
              Edit Profile
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" color="inherit" startIcon={<CloseOutlinedIcon />} onClick={handleCancel} size="small">
                Cancel
              </Button>
              <Button variant="contained" startIcon={<SaveOutlinedIcon />} onClick={handleSave} size="small">
                Save Changes
              </Button>
            </Box>
          )
        }
      />

      {saved && (
        <Alert severity="success" sx={{ mb: 2.5, borderRadius: '12px' }} icon={<CheckCircleOutlineIcon />}>
          Profile updated successfully.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* ── Left: Avatar card ── */}
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <Paper sx={{ p: 3.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, textAlign: 'center' }} elevation={1}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2.5 }}>
                <Avatar
                  sx={{
                    width: 88,
                    height: 88,
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #F97316, #EA580C)',
                    boxShadow: '0 8px 24px rgba(249,115,22,0.32)',
                  }}
                >
                  {initials}
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    border: `2px solid ${theme.palette.background.paper}`,
                  }}
                />
              </Box>

              <Typography variant="h6" fontWeight={700}>{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{user?.email}</Typography>

              <Chip
                label={user?.role?.toUpperCase()}
                color={roleColor}
                size="small"
                sx={{ fontWeight: 700, fontSize: '0.7rem', height: 24 }}
              />

              <Divider sx={{ my: 2.5 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'left' }}>
                {[
                  { icon: <BusinessOutlinedIcon fontSize="small" />, label: 'Company', value: user?.company },
                  { icon: <FactoryOutlinedIcon fontSize="small" />, label: 'Plant', value: user?.plant },
                ].map((row) => (
                  <Box key={row.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ color: 'text.secondary', display: 'flex' }}>{row.icon}</Box>
                    <Box>
                      <Typography variant="caption" color="text.disabled" display="block">{row.label}</Typography>
                      <Typography variant="body2" fontWeight={600}>{row.value}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* ── Right: Details + permissions ── */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Account Details */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }}>
              <Paper sx={{ p: 3, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                <Typography variant="h6" fontWeight={700} gutterBottom>Account Details</Typography>
                <Divider sx={{ mb: 2.5 }} />

                {editing ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        fullWidth
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, color: 'text.secondary', display: 'flex' }}>
                              <BadgeOutlinedIcon fontSize="small" />
                            </Box>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, color: 'text.secondary', display: 'flex' }}>
                              <EmailOutlinedIcon fontSize="small" />
                            </Box>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Role" fullWidth value={user?.role} disabled helperText="Role is managed by your administrator" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Company" fullWidth value={user?.company} disabled />
                    </Grid>
                  </Grid>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {[
                      { label: 'Full Name', value: form.name, icon: <BadgeOutlinedIcon fontSize="small" /> },
                      { label: 'Email Address', value: form.email, icon: <EmailOutlinedIcon fontSize="small" /> },
                      { label: 'Role', value: user?.role, icon: <SecurityOutlinedIcon fontSize="small" /> },
                      { label: 'Company', value: user?.company, icon: <BusinessOutlinedIcon fontSize="small" /> },
                      { label: 'Plant', value: user?.plant, icon: <FactoryOutlinedIcon fontSize="small" /> },
                    ].map((row) => (
                      <Box
                        key={row.label}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          py: 1.5,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          '&:last-child': { borderBottom: 0 },
                        }}
                      >
                        <Box sx={{ color: 'text.disabled', display: 'flex', flexShrink: 0 }}>{row.icon}</Box>
                        <Typography variant="body2" color="text.secondary" sx={{ width: 140, flexShrink: 0 }}>
                          {row.label}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>{row.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Paper>
            </motion.div>

            {/* Module Permissions */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.16 }}>
              <Paper sx={{ p: 3, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <SecurityOutlinedIcon sx={{ color: 'text.secondary', fontSize: '1.1rem' }} />
                  <Typography variant="h6" fontWeight={700}>Module Access</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2.5 }}>
                  Permissions granted to your <strong>{user?.role}</strong> role
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {permissions.includes('*') ? (
                    <Chip
                      label="Full System Access (Admin)"
                      color="error"
                      icon={<SecurityOutlinedIcon />}
                      sx={{ fontWeight: 700 }}
                    />
                  ) : (
                    permissions.map((perm) => (
                      <Chip
                        key={perm}
                        label={perm.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          height: 26,
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                          color: theme.palette.primary.main,
                        }}
                      />
                    ))
                  )}
                </Box>
              </Paper>
            </motion.div>

            {/* Security */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.22 }}>
              <Paper sx={{ p: 3, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                <Typography variant="h6" fontWeight={700} gutterBottom>Security</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Password</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last changed: Never (demo mode)
                    </Typography>
                  </Box>
                  <Button variant="outlined" size="small" onClick={() => {}}>
                    Change Password
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
