import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StatusBadge from '../../../components/common/StatusBadge';
import { formatDate } from '../../../utils/formatters';

const ProductionOrdersTable = ({ orders = [], loading = false }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>Recent Production Orders</Typography>
          <Typography variant="caption" color="text.secondary">Active & completed today</Typography>
        </Box>
        <Button size="small" endIcon={<OpenInNewIcon sx={{ fontSize: '0.875rem !important' }} />} sx={{ fontSize: '0.75rem' }}>
          All Orders
        </Button>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {['Order ID', 'Product', 'Qty', 'Progress', 'Work Center', 'Due Date', 'Status'].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', borderBottom: `1px solid ${theme.palette.divider}`, whiteSpace: 'nowrap', pb: 1.5 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}><Skeleton variant="text" width="80%" /></TableCell>
                    ))}
                  </TableRow>
                ))
              : orders.map((order) => {
                  const pct = order.qty > 0 ? Math.round((order.completed / order.qty) * 100) : 0;
                  return (
                    <TableRow
                      key={order.id}
                      sx={{ '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.03) }, cursor: 'pointer' }}
                    >
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography variant="body2" fontWeight={700} color="primary.main" fontFamily="monospace">
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500} noWrap sx={{ maxWidth: 180 }}>
                          {order.product}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{order.qty}</Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: 130 }}>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">{order.completed}/{order.qty}</Typography>
                            <Typography variant="caption" fontWeight={700}>{pct}%</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={pct}
                            sx={{
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: pct === 100 ? 'success.main' : 'primary.main',
                              },
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary" fontFamily="monospace">
                          {order.workcenter}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(order.dueDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
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

export default ProductionOrdersTable;
