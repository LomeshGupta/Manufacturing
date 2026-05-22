import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { useAuth } from '../../../context/AuthContext';

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

const ProfileMenu = () => {
  const theme = useTheme();
  const [anchor, setAnchor] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const roleColor = ROLE_COLOR[user?.role] || 'default';

  const handleLogout = async () => {
    setLoggingOut(true);
    setAnchor(null);
    await logout();
    navigate('/login', { replace: true });
  };

  const handleNav = (path) => {
    setAnchor(null);
    navigate(path);
  };

  return (
    <>
      <Box
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          p: '4px 8px 4px 4px',
          borderRadius: '10px',
          border: `1px solid ${theme.palette.divider}`,
          transition: 'background 0.15s',
          '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.04) },
        }}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: '0.75rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #F97316, #EA580C)',
          }}
        >
          {initials}
        </Avatar>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="caption" fontWeight={700} display="block" lineHeight={1.2} noWrap sx={{ maxWidth: 100 }}>
            {user?.name?.split(' ')[0]}
          </Typography>
          <Typography variant="caption" color="text.disabled" lineHeight={1} display="block" sx={{ fontSize: '0.65rem' }}>
            {user?.role}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        PaperProps={{
          sx: {
            width: 240,
            borderRadius: '14px',
            mt: 1,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[4],
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User info header */}
        <Box sx={{ px: 2.5, py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                fontSize: '0.9rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #F97316, #EA580C)',
              }}
            >
              {initials}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="subtitle2" fontWeight={700} noWrap>{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary" noWrap display="block">{user?.email}</Typography>
            </Box>
          </Box>
          <Chip
            label={user?.role?.toUpperCase()}
            color={roleColor}
            size="small"
            sx={{ fontWeight: 700, fontSize: '0.65rem', height: 20 }}
          />
          <Typography variant="caption" color="text.disabled" display="block" sx={{ mt: 0.75, fontSize: '0.72rem' }}>
            {user?.plant}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ py: 0.5 }}>
          <MenuItem onClick={() => handleNav('/profile')} sx={{ borderRadius: '8px', mx: 1, my: 0.5, gap: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}><PersonOutlineIcon fontSize="small" /></ListItemIcon>
            <Typography variant="body2" fontWeight={500}>My Profile</Typography>
          </MenuItem>

          {hasRole(['admin']) && (
            <MenuItem onClick={() => handleNav('/settings')} sx={{ borderRadius: '8px', mx: 1, my: 0.5, gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}><SettingsOutlinedIcon fontSize="small" /></ListItemIcon>
              <Typography variant="body2" fontWeight={500}>Settings</Typography>
            </MenuItem>
          )}

          {hasRole(['admin']) && (
            <MenuItem onClick={() => handleNav('/users')} sx={{ borderRadius: '8px', mx: 1, my: 0.5, gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}><SecurityOutlinedIcon fontSize="small" /></ListItemIcon>
              <Typography variant="body2" fontWeight={500}>User Management</Typography>
            </MenuItem>
          )}
        </Box>

        <Divider />

        <Box sx={{ py: 0.5 }}>
          <MenuItem
            onClick={handleLogout}
            disabled={loggingOut}
            sx={{ borderRadius: '8px', mx: 1, my: 0.5, color: 'error.main', gap: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              {loggingOut
                ? <CircularProgress size={16} color="error" />
                : <LogoutIcon fontSize="small" color="error" />}
            </ListItemIcon>
            <Typography variant="body2" fontWeight={500} color="error.main">
              {loggingOut ? 'Signing out...' : 'Sign Out'}
            </Typography>
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
