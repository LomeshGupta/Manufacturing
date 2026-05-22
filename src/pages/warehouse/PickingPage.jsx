import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { warehouseApi } from '../../api/warehouse.api';
import { formatDate } from '../../utils/formatters';

const PickingPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    warehouseApi.getPickingOrders().then((d) => { setOrders(d); setLoading(false); });
  }, []);

  const handleComplete = async () => {
    await warehouseApi.completePicking(confirm.id);
    setOrders((p) => p.map((o) => o.id === confirm.id ? { ...o, status: 'completed' } : o));
    setConfirm(null);
  };

  const columns = [
    { field: 'id', headerName: 'Pick ID', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{v}</Typography> },
    { field: 'date', headerName: 'Date', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'ref', headerName: 'Reference', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="secondary.main">{v}</Typography> },
    { field: 'item', headerName: 'Item', minWidth: 180, renderCell: (v) => <Typography variant="body2" fontWeight={600}>{v}</Typography> },
    { field: 'qty', headerName: 'Qty', align: 'right', renderCell: (v, row) => <Typography variant="body2" fontWeight={600}>{v} {row.uom}</Typography> },
    { field: 'bin', headerName: 'From Bin', renderCell: (v) => <Typography variant="caption" fontFamily="monospace">{v}</Typography> },
    { field: 'assignedTo', headerName: 'Assigned To' },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={v} /> },
    {
      field: 'actions', headerName: '', sortable: false, renderCell: (_, row) =>
        row.status !== 'completed'
          ? <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); setConfirm(row); }}>Complete</Button>
          : null,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Picking Orders"
        subtitle="Material pick requests for production and dispatch"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Warehouse' }, { label: 'Picking' }]}
      />
      <DataTable columns={columns} rows={orders} loading={loading} keyField="id" />
      <ConfirmDialog
        open={Boolean(confirm)} onClose={() => setConfirm(null)} onConfirm={handleComplete}
        title="Complete Picking" message={`Mark ${confirm?.id} as picked from bin ${confirm?.bin}?`}
        confirmLabel="Confirm Picked" severity="info"
      />
    </Box>
  );
};

export default PickingPage;
