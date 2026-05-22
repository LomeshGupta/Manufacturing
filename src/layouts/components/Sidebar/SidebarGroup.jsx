import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SidebarItem from './SidebarItem';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarGroup = ({ item, collapsed }) => {
  const theme = useTheme();
  const location = useLocation();

  const isAnyChildActive = item.children?.some(
    (child) => location.pathname === child.path || location.pathname.startsWith(child.path)
  );

  const [open, setOpen] = useState(isAnyChildActive);
  const Icon = item.icon;

  const handleToggle = () => setOpen((prev) => !prev);

  const groupButton = (
    <ListItemButton
      onClick={handleToggle}
      sx={{
        minHeight: 44,
        borderRadius: '10px',
        px: collapsed ? 1.25 : 1.5,
        mx: 1,
        mb: 0.5,
        justifyContent: collapsed ? 'center' : 'flex-start',
        bgcolor: isAnyChildActive
          ? alpha(theme.palette.primary.main, 0.08)
          : 'transparent',
        '&:hover': {
          bgcolor: alpha(theme.palette.text.primary, 0.05),
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: collapsed ? 0 : 1.5,
          color: isAnyChildActive
            ? theme.palette.primary.main
            : theme.palette.text.secondary,
          '& svg': { fontSize: '1.25rem' },
        }}
      >
        <Icon />
      </ListItemIcon>
      {!collapsed && (
        <>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: isAnyChildActive ? 600 : 500,
              noWrap: true,
            }}
          />
          <Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
            {open ? <ExpandLessIcon sx={{ fontSize: '1rem' }} /> : <ExpandMoreIcon sx={{ fontSize: '1rem' }} />}
          </Box>
        </>
      )}
    </ListItemButton>
  );

  return (
    <>
      {collapsed ? (
        <Tooltip title={item.title} placement="right" arrow>
          {groupButton}
        </Tooltip>
      ) : (
        groupButton
      )}

      {!collapsed && (
        <Collapse in={open} timeout={200} unmountOnExit>
          <List disablePadding sx={{ pl: 1.5 }}>
            <AnimatePresence>
              {open &&
                item.children.map((child, idx) => (
                  <motion.div
                    key={child.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ delay: idx * 0.04, duration: 0.18 }}
                  >
                    <SidebarItem item={child} collapsed={false} depth={1} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarGroup;
