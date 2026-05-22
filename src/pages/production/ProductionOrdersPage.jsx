import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { productionApi } from '../../api/production.api';
import { formatDate } from '../../utils/formatters';
import useDebounce from '../../hooks/useDebounce';

const STATUSES = ['All', 'pending', 'in-progress', 'completed', 'cancelled'];

const ProductionOrdersPage = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const dSearch = useDebounce(search, 300);

  useEffect(() => {
    setLoading(true);
    productionApi.getProductionOrders({ search: dSearch, status }).then((r) => { setOrders(r.orders); setLoading(false); });
  }, [dSearch, status]);

  const columns = [
    { field: 'id', headerName: 'MO Number', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{v}</Typography> },
    { field: 'product', headerName: 'Product', minWidth: 180, renderCell: (v) => <Typography variant="body2" fontWeight={600}>{v}</Typography> },
    { field: 'bom', headerName: 'BOM', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="text.secondary">{v}</Typography> },
    { field: 'qty', headerName: 'Qty', align: 'right' },
    {
      field: 'completedQty', headerName: 'Progress', minWidth: 140, sortable: false,
      renderCell: (v, row) => {
        const pct = row.qty > 0 ? Math.round((v / row.qty) * 100) : 0;
        return (
          <Box sx={{ minWidth: 120 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">{v}/{row.qty}</Typography>
              <Typography variant="caption" fontWeight={700}>{pct}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={pct}
              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), '& .MuiLinearProgress-bar': { bgcolor: pct === 100 ? 'success.main' : 'primary.main' } }} />
          </Box>
        );
      },
    },
    { field: 'rejectedQty', headerName: 'Rejected', align: 'right', renderCell: (v) => <Typography variant="body2" color={v > 0 ? 'error.main' : 'text.secondary'} fontWeight={v > 0 ? 700 : 400}>{v}</Typography> },
    { field: 'workcenter', headerName: 'Work Center', renderCell: (v) => <Typography variant="caption" fontFamily="monospace">{v}</Typography> },
    { field: 'startDate', headerName: 'Start', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'endDate', headerName: 'Due', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={v} /> },
  ];

  return (
    <Box>
      <PageHeader
        title="Production Orders"
        subtitle="Manufacturing orders, progress tracking, and completion"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Production' }, { label: 'Orders' }]}
        actions={<Button variant="contained" startIcon={<AddIcon />} size="small">New MO</Button>}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }}>
        <TextField size="small" placeholder="Search orders or product..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
          sx={{ minWidth: 260 }} />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <MenuItem key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <DataTable columns={columns} rows={orders} loading={loading} keyField="id" />
    </Box>
  );
};

export default ProductionOrdersPage;
