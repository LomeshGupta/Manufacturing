import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const ComingSoon = ({ module = 'This Module' }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper
        sx={{
          p: 6,
          textAlign: 'center',
          maxWidth: 420,
          borderRadius: '20px',
          border: `1px solid ${theme.palette.divider}`,
        }}
        elevation={2}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '18px',
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <ConstructionOutlinedIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {module}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This module is being built in upcoming phases. Stay tuned.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ComingSoon;
