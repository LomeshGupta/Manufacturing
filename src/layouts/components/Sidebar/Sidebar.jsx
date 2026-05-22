import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarGroup from './SidebarGroup';
import { SIDEBAR_CONFIG } from '../../../data/sidebar.config';
import { useAuth } from '../../../context/AuthContext';

export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_COLLAPSED_WIDTH = 72;

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const theme = useTheme();
  const { user } = useAuth();

  const filteredConfig = SIDEBAR_CONFIG.filter(
    (item) => !item.roles || item.roles.includes(user?.role)
  );

  const drawerStyles = {
    width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
      boxSizing: 'border-box',
      border: 'none',
      bgcolor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
      }),
      overflowX: 'hidden',
    },
  };

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SidebarLogo collapsed={collapsed} />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          py: 1,
          '&::-webkit-scrollbar': { width: '4px' },
        }}
      >
        <List disablePadding>
          {filteredConfig.map((item) => {
            if (item.type === 'divider') {
              return <Divider key={item.id} sx={{ my: 1, mx: 2 }} />;
            }
            if (item.children) {
              return (
                <SidebarGroup key={item.id} item={item} collapsed={collapsed} />
              );
            }
            return (
              <SidebarItem key={item.id} item={item} collapsed={collapsed} />
            );
          })}
        </List>
      </Box>

      <Box
        sx={{
          p: 1,
          borderTop: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
        }}
      >
        <IconButton onClick={onToggle} size="small">
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer variant="permanent" sx={{ ...drawerStyles, display: { xs: 'none', md: 'block' } }}>
        {content}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            bgcolor: theme.palette.background.paper,
            border: 'none',
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
};

export default Sidebar;
