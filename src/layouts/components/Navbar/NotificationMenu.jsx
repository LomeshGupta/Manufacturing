import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useNotification } from '../../../context/NotificationContext';

const TYPE_COLORS = {
  warning: 'warning',
  error: 'error',
  info: 'info',
  success: 'success',
};

const NotificationMenu = () => {
  const theme = useTheme();
  const [anchor, setAnchor] = useState(null);
  const { notifications, unreadCount, markAllRead, markRead } = useNotification();

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
        <Badge badgeContent={unreadCount} color="error" max={9}>
          <NotificationsOutlinedIcon fontSize="small" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 360, maxHeight: 480, borderRadius: '16px', mt: 1, overflow: 'hidden' },
        }}
      >
        <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Notifications</Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={markAllRead} sx={{ fontSize: '0.75rem' }}>
              Mark all read
            </Button>
          )}
        </Box>
        <Divider />
        <List disablePadding sx={{ maxHeight: 380, overflowY: 'auto' }}>
          {notifications.map((n) => (
            <ListItem
              key={n.id}
              alignItems="flex-start"
              onClick={() => markRead(n.id)}
              sx={{
                px: 2.5,
                py: 1.5,
                cursor: 'pointer',
                bgcolor: n.read ? 'transparent' : alpha(theme.palette.primary.main, 0.04),
                '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.04) },
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Chip
                      label={n.type}
                      color={TYPE_COLORS[n.type]}
                      size="small"
                      sx={{ height: 18, fontSize: '0.6rem', textTransform: 'uppercase' }}
                    />
                    <Typography variant="subtitle2" fontWeight={n.read ? 400 : 600} noWrap>
                      {n.title}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8125rem' }}>
                      {n.message}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {n.time}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default NotificationMenu;
