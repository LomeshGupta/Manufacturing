import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ThemeToggle from './ThemeToggle';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';
import PlantSelector from './PlantSelector';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '../Sidebar/Sidebar';

const Navbar = ({ collapsed, onMobileToggle }) => {
  const theme = useTheme();
  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${sidebarWidth}px)` },
        ml: { md: `${sidebarWidth}px` },
        bgcolor: alpha(theme.palette.background.default, 0.88),
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: '64px !important' }}>
        {/* Mobile menu toggle */}
        <IconButton
          edge="start"
          onClick={onMobileToggle}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: alpha(theme.palette.text.primary, 0.05),
            borderRadius: '10px',
            px: 1.5,
            py: 0.75,
            flex: { xs: 1, md: 'unset' },
            width: { md: 280 },
            '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.08) },
          }}
        >
          <SearchIcon sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
          <InputBase
            placeholder="Search modules, orders..."
            sx={{ fontSize: '0.875rem', flex: 1 }}
          />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <PlantSelector />
          </Box>
          <ThemeToggle />
          <NotificationMenu />
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
