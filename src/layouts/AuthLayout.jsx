import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURES = [
  { icon: '🏭', title: 'Shop Floor Intelligence', desc: 'Real-time machine status, OEE tracking, and shift management.' },
  { icon: '📦', title: 'Smart Inventory Control', desc: 'Live stock levels, material shortage alerts, and MRP suggestions.' },
  { icon: '🔍', title: 'Full Traceability', desc: 'Batch and serial tracking from raw material to finished goods.' },
  { icon: '📊', title: 'Production Analytics', desc: 'Planned vs actual, rejection trends, and vendor performance.' },
];

const AuthLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* ── Left panel: Branding (desktop only) ── */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 480,
          flexShrink: 0,
          p: 5,
          position: 'relative',
          overflow: 'hidden',
          background: isDark
            ? `linear-gradient(145deg, #0F172A 0%, #1E1B4B 100%)`
            : `linear-gradient(145deg, #1E3A8A 0%, #1E40AF 60%, #EA580C 100%)`,
        }}
      >
        {/* Noise / texture overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Decorative blobs */}
        <Box sx={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: alpha('#F97316', 0.15), filter: 'blur(60px)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', bgcolor: alpha('#3B82F6', 0.15), filter: 'blur(50px)', pointerEvents: 'none' }} />

        {/* Logo */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 44, height: 44, borderRadius: '12px',
                bgcolor: alpha('#fff', 0.15),
                border: `1px solid ${alpha('#fff', 0.25)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>S</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.1 }}>
                SmartERP
              </Typography>
              <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.75rem' }}>
                Manufacturing Intelligence
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              color: '#fff',
              fontWeight: 800,
              fontSize: '2rem',
              lineHeight: 1.25,
              mt: 4,
              mb: 1.5,
            }}
          >
            India's Smart<br />Factory OS
          </Typography>
          <Typography sx={{ color: alpha('#fff', 0.7), fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: 340 }}>
            End-to-end manufacturing ERP built for Indian industries — from automotive to pharma, FMCG to electronics.
          </Typography>
        </Box>

        {/* Feature list */}
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: '12px',
                  bgcolor: alpha('#fff', 0.07),
                  border: `1px solid ${alpha('#fff', 0.1)}`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Typography sx={{ fontSize: '1.25rem', lineHeight: 1, mt: '1px' }}>{f.icon}</Typography>
                <Box>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', mb: 0.25 }}>
                    {f.title}
                  </Typography>
                  <Typography sx={{ color: alpha('#fff', 0.65), fontSize: '0.8rem', lineHeight: 1.5 }}>
                    {f.desc}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Footer note */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography sx={{ color: alpha('#fff', 0.45), fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} SmartERP · Built for Indian Manufacturing
          </Typography>
        </Box>
      </Box>

      {/* ── Right panel: Auth form ── */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle background gradient */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 70% 30%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 55%),
                         radial-gradient(ellipse at 20% 80%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default AuthLayout;
