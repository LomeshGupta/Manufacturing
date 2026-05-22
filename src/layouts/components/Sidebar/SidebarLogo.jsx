import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const SidebarLogo = ({ collapsed }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      px: collapsed ? 1 : 2,
      py: 2.5,
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 4px 12px rgba(249,115,22,0.4)',
      }}
    >
      <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>S</Typography>
    </Box>
    {!collapsed && (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Typography variant="h6" noWrap sx={{ fontWeight: 800, lineHeight: 1.1 }}>
          Smart<span style={{ color: '#F97316' }}>ERP</span>
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
          Manufacturing Intelligence
        </Typography>
      </motion.div>
    )}
  </Box>
);

export default SidebarLogo;
