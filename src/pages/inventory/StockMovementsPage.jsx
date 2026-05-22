import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import { inventoryApi } from '../../api/inventory.api';
import { formatDate } from '../../utils/formatters';

const TYPE_CONFIG = {
  receipt: { label: 'Receipt', color: 'success' },
  issue: { label: 'Issue', color: 'primary' },
  adjustment: { label: 'Adjustment', color: 'warning' },
  transfer: { label: 'Transfer', color: 'info' },
};

const StockMovementsPage = () => {
  const theme = useTheme();
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    inventoryApi.getMovements().then((d) => { setMovements(d); setLoading(false); });
  }, []);

  const columns = [
    { field: 'id', headerName: 'Mov. ID', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700}>{v}</Typography> },
    { field: 'date', headerName: 'Date', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'item', headerName: 'Item', minWidth: 180, renderCell: (v, row) => <Box><Typography variant="body2" fontWeight={600}>{v}</Typography><Typography variant="caption" color="text.secondary">{row.itemId}</Typography></Box> },
    { field: 'type', headerName: 'Type', renderCell: (v) => { const c = TYPE_CONFIG[v] || {}; return <Chip label={c.label || v} size="small" color={c.color || 'default'} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />; } },
    { field: 'qty', headerName: 'Qty', align: 'right', renderCell: (v, row) => <Typography variant="body2" fontWeight={700} color={v < 0 ? 'error.main' : 'success.main'}>{v > 0 ? '+' : ''}{v} {row.uom}</Typography> },
    { field: 'ref', headerName: 'Reference', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="primary.main">{v}</Typography> },
    { field: 'location', headerName: 'Location', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="text.secondary">{v}</Typography> },
    { field: 'user', headerName: 'By', renderCell: (v) => <Typography variant="body2">{v}</Typography> },
  ];

  return (
    <Box>
      <PageHeader
        title="Stock Movements"
        subtitle="All inventory receipts, issues, and adjustments"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Inventory' }, { label: 'Movements' }]}
      />
      <DataTable columns={columns} rows={movements} loading={loading} keyField="id" />
    </Box>
  );
};

export default StockMovementsPage;
