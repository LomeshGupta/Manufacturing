import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import StarIcon from '@mui/icons-material/Star';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const VendorPerformancePanel = ({ vendors = [], loading = false }) => {
  const theme = useTheme();

  const ratingColor = (r) => {
    if (r >= 4.5) return theme.palette.success.main;
    if (r >= 4.0) return theme.palette.primary.main;
    if (r >= 3.5) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={1}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>Vendor Performance</Typography>
        <Typography variant="caption" color="text.secondary">On-time delivery & quality scores</Typography>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {['Vendor', 'Orders', 'On-Time', 'Quality', 'Rating'].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', borderBottom: `1px solid ${theme.palette.divider}`, whiteSpace: 'nowrap', pb: 1.5 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <TableCell key={j}><Skeleton variant="text" /></TableCell>
                    ))}
                  </TableRow>
                ))
              : vendors.map((v) => {
                  const rc = ratingColor(v.rating);
                  return (
                    <TableRow key={v.vendor} sx={{ '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.03) } }}>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 160 }}>
                          {v.vendor}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">{v.orders}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${v.onTime}%`}
                          size="small"
                          sx={{
                            height: 20, fontSize: '0.7rem', fontWeight: 700,
                            bgcolor: alpha(v.onTime >= 90 ? theme.palette.success.main : theme.palette.warning.main, 0.12),
                            color: v.onTime >= 90 ? theme.palette.success.main : theme.palette.warning.main,
                            borderRadius: '6px',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${v.quality}%`}
                          size="small"
                          sx={{
                            height: 20, fontSize: '0.7rem', fontWeight: 700,
                            bgcolor: alpha(v.quality >= 95 ? theme.palette.success.main : theme.palette.warning.main, 0.12),
                            color: v.quality >= 95 ? theme.palette.success.main : theme.palette.warning.main,
                            borderRadius: '6px',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <StarIcon sx={{ fontSize: '0.875rem', color: rc }} />
                          <Typography variant="body2" fontWeight={700} sx={{ color: rc }}>
                            {v.rating}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default VendorPerformancePanel;
