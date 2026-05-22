import { useNavigate, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const SidebarItem = ({ item, collapsed, depth = 0 }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = pathname === item.path ||
    (item.path && item.path !== '/' && pathname.startsWith(item.path + '/')) ||
    (item.path && pathname === item.path);

  const Icon = item.icon;

  const button = (
    <ListItemButton
      onClick={() => navigate(item.path)}
      selected={isActive}
      sx={{
        minHeight: 40,
        borderRadius: '10px',
        px: collapsed ? 1.25 : depth > 0 ? 1.75 : 1.5,
        mx: 1,
        mb: 0.5,
        justifyContent: collapsed ? 'center' : 'flex-start',
        transition: 'all 0.18s ease',
        '&.Mui-selected': {
          bgcolor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.primary.main,
          '& .MuiListItemIcon-root': { color: theme.palette.primary.main },
          '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.16) },
        },
        '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.05) },
      }}
    >
      {Icon && (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: collapsed ? 0 : 1.5,
            color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
            '& svg': { fontSize: depth > 0 ? '1rem' : '1.2rem' },
          }}
        >
          <Icon />
        </ListItemIcon>
      )}
      {!collapsed && (
        <>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: depth > 0 ? '0.8125rem' : '0.875rem',
              fontWeight: isActive ? 700 : 500,
              noWrap: true,
            }}
          />
          {isActive && <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'primary.main', ml: 1, flexShrink: 0 }} />}
        </>
      )}
    </ListItemButton>
  );

  return collapsed ? (
    <Tooltip title={item.title} placement="right" arrow>{button}</Tooltip>
  ) : button;
};

export default SidebarItem;
