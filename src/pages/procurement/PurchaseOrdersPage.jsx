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
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { procurementApi } from '../../api/procurement.api';
import { formatCurrency, formatDate } from '../../utils/formatters';
import useDebounce from '../../hooks/useDebounce';
import { useTheme } from '@mui/material/styles';

const STATUSES = ['All', 'draft', 'approved', 'sent', 'partially-received', 'received', 'cancelled'];

const PurchaseOrdersPage = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const dSearch = useDebounce(search, 300);

  useEffect(() => {
    setLoading(true);
    procurementApi.getPurchaseOrders({ search: dSearch, status }).then((r) => { setOrders(r.orders); setLoading(false); });
  }, [dSearch, status]);

  const columns = [
    { field: 'id', headerName: 'PO Number', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{v}</Typography> },
    { field: 'vendor', headerName: 'Vendor', minWidth: 180, renderCell: (v) => <Typography variant="body2" fontWeight={600}>{v}</Typography> },
    { field: 'date', headerName: 'PO Date', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'expectedDate', headerName: 'Expected', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'items', headerName: 'Items', align: 'right' },
    { field: 'totalValue', headerName: 'Value', align: 'right', renderCell: (v) => <Typography variant="body2" fontWeight={700}>{formatCurrency(v)}</Typography> },
    { field: 'plant', headerName: 'Plant' },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={v} /> },
  ];

  const totals = orders.reduce((a, o) => a + o.totalValue, 0);

  return (
    <Box>
      <PageHeader
        title="Purchase Orders"
        subtitle="Track and manage all procurement orders"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Procurement' }, { label: 'Purchase Orders' }]}
        actions={<Button variant="contained" startIcon={<AddIcon />} size="small">New PO</Button>}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }}>
        <TextField size="small" placeholder="Search PO or vendor..." value={search} onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }} sx={{ minWidth: 260 }} />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <MenuItem key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</MenuItem>)}
          </Select>
        </FormControl>
        <Box sx={{ flex: 1 }} />
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" fontWeight={800} color="primary.main">{formatCurrency(totals)}</Typography>
          <Typography variant="caption" color="text.secondary">Total ({orders.length} orders)</Typography>
        </Box>
      </Box>
      <DataTable columns={columns} rows={orders} loading={loading} keyField="id" />
    </Box>
  );
};

export default PurchaseOrdersPage;
