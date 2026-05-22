import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { inventoryApi } from '../../api/inventory.api';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import useDebounce from '../../hooks/useDebounce';

const CATEGORY_COLORS = {
  'Raw Material': 'primary', 'Finished Goods': 'success', 'WIP': 'warning', 'Consumable': 'info',
};

const StockLedgerPage = () => {
  const theme = useTheme();
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const dSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const [res, sum, cats] = await Promise.all([
        inventoryApi.getItems({ search: dSearch, category, lowStock: lowStockOnly }),
        inventoryApi.getSummary(),
        inventoryApi.getCategories(),
      ]);
      setItems(res.items);
      setSummary(sum);
      setCategories(cats);
      setLoading(false);
    };
    fetch();
  }, [dSearch, category, lowStockOnly]);

  const columns = [
    { field: 'id', headerName: 'Item Code', width: 120, renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{v}</Typography> },
    { field: 'name', headerName: 'Item Name', minWidth: 200, wrap: true, renderCell: (v) => <Typography variant="body2" fontWeight={600}>{v}</Typography> },
    { field: 'category', headerName: 'Category', renderCell: (v) => <Chip label={v} size="small" color={CATEGORY_COLORS[v] || 'default'} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} /> },
    { field: 'uom', headerName: 'UOM', width: 70 },
    {
      field: 'stock', headerName: 'Stock', align: 'right',
      renderCell: (v, row) => (
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" fontWeight={700} color={v <= row.reorderLevel ? 'error.main' : 'text.primary'}>{formatNumber(v)}</Typography>
          {v <= row.reorderLevel && <Typography variant="caption" color="error.main" display="block" lineHeight={1}>Low stock</Typography>}
        </Box>
      ),
    },
    {
      field: 'reorderLevel', headerName: 'Stock vs Reorder', minWidth: 140, sortable: false,
      renderCell: (v, row) => (
        <Box sx={{ minWidth: 120 }}>
          <LinearProgress variant="determinate" value={Math.min((row.stock / Math.max(v, 1)) * 100, 100)}
            sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1), '& .MuiLinearProgress-bar': { bgcolor: row.stock <= v ? 'error.main' : 'success.main' } }} />
          <Typography variant="caption" color="text.secondary">Reorder: {formatNumber(v)}</Typography>
        </Box>
      ),
    },
    { field: 'unitCost', headerName: 'Unit Cost', align: 'right', renderCell: (v) => <Typography variant="body2">{formatCurrency(v)}</Typography> },
    { field: 'totalValue', headerName: 'Total Value', align: 'right', renderCell: (v) => <Typography variant="body2" fontWeight={700}>{formatCurrency(v)}</Typography> },
    { field: 'location', headerName: 'Location', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="text.secondary">{v}</Typography> },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={v} /> },
  ];

  const kpis = [
    { label: 'Total Items', value: formatNumber(summary?.totalItems || 0), color: 'primary.main' },
    { label: 'Total Value', value: formatCurrency(summary?.totalValue || 0), color: 'secondary.main' },
    { label: 'Low Stock', value: summary?.lowStock || 0, color: 'warning.main' },
    { label: 'Out of Stock', value: summary?.outOfStock || 0, color: 'error.main' },
  ];

  return (
    <Box>
      <PageHeader
        title="Stock Ledger"
        subtitle="Real-time inventory levels across all locations"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Inventory' }, { label: 'Stock Ledger' }]}
        actions={<Button variant="contained" startIcon={<AddIcon />} size="small">Add Item</Button>}
      />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpis.map((k) => (
          <Grid item xs={6} md={3} key={k.label}>
            <Paper sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
              <Typography variant="h5" fontWeight={800} sx={{ color: k.color }}>{k.value}</Typography>
              <Typography variant="caption" color="text.secondary">{k.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Paper sx={{ p: 2, borderRadius: '12px', border: `1px solid ${theme.palette.divider}`, mb: 2 }} elevation={0}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField size="small" placeholder="Search by name or code..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            sx={{ minWidth: 240 }} />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          <Chip label="Low Stock Only" variant={lowStockOnly ? 'filled' : 'outlined'}
            color={lowStockOnly ? 'error' : 'default'}
            onClick={() => setLowStockOnly((p) => !p)}
            icon={<FilterListIcon sx={{ fontSize: '1rem !important' }} />}
            sx={{ fontWeight: 600 }} />
        </Box>
      </Paper>
      <DataTable columns={columns} rows={items} loading={loading} keyField="id" defaultRowsPerPage={25} />
    </Box>
  );
};

export default StockLedgerPage;
