import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const MaterialAlertsPanel = ({ alerts = [], loading = false }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: alpha(theme.palette.error.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WarningAmberOutlinedIcon sx={{ fontSize: '1rem', color: 'error.main' }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>Material Shortage Alerts</Typography>
            <Typography variant="caption" color="text.secondary">Items below reorder level</Typography>
          </Box>
        </Box>
        <Button size="small" endIcon={<OpenInNewIcon sx={{ fontSize: '0.875rem !important' }} />} sx={{ fontSize: '0.75rem' }}>
          View MRP
        </Button>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {['Item', 'SKU', 'Current', 'Reorder', 'Gap', 'Severity'].map((h) => (
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
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}><Skeleton variant="text" width="80%" /></TableCell>
                    ))}
                  </TableRow>
                ))
              : alerts.map((alert) => {
                  const pct = Math.round((alert.current / alert.reorder) * 100);
                  const isCritical = alert.severity === 'critical';
                  const severityColor = isCritical ? theme.palette.error.main : theme.palette.warning.main;
                  return (
                    <TableRow
                      key={alert.id}
                      sx={{
                        '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.03) },
                        bgcolor: isCritical ? alpha(theme.palette.error.main, 0.03) : 'transparent',
                      }}
                    >
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 160 }}>
                          {alert.item}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">{alert.plant}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary" fontFamily="monospace">
                          {alert.sku}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} color={severityColor}>
                          {alert.current} {alert.unit}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {alert.reorder} {alert.unit}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: 100 }}>
                        <Box>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(pct, 100)}
                            sx={{
                              mb: 0.5,
                              bgcolor: alpha(severityColor, 0.15),
                              '& .MuiLinearProgress-bar': { bgcolor: severityColor },
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">{pct}% of reorder</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={alert.severity}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            bgcolor: alpha(severityColor, 0.12),
                            color: severityColor,
                            borderRadius: '6px',
                          }}
                        />
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

export default MaterialAlertsPanel;
