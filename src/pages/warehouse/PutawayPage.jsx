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

const PutawayPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    warehouseApi.getPutawayOrders().then((d) => { setOrders(d); setLoading(false); });
  }, []);

  const handleComplete = async () => {
    await warehouseApi.completePutaway(confirm.id);
    setOrders((p) => p.map((o) => o.id === confirm.id ? { ...o, status: 'completed' } : o));
    setConfirm(null);
  };

  const columns = [
    { field: 'id', headerName: 'Putaway ID', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{v}</Typography> },
    { field: 'date', headerName: 'Date', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'grn', headerName: 'GRN Ref', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="secondary.main">{v}</Typography> },
    { field: 'item', headerName: 'Item', minWidth: 180, renderCell: (v) => <Typography variant="body2" fontWeight={600}>{v}</Typography> },
    { field: 'qty', headerName: 'Qty', align: 'right', renderCell: (v, row) => <Typography variant="body2" fontWeight={600}>{v} {row.uom}</Typography> },
    { field: 'suggestedBin', headerName: 'Suggested Bin', renderCell: (v) => <Typography variant="caption" fontFamily="monospace">{v}</Typography> },
    { field: 'assignedTo', headerName: 'Assigned To' },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={v} /> },
    {
      field: 'actions', headerName: '', sortable: false, renderCell: (_, row) =>
        row.status === 'pending' || row.status === 'in-progress'
          ? <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); setConfirm(row); }}>Complete</Button>
          : null,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Put Away Orders"
        subtitle="GRN items awaiting bin placement"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Warehouse' }, { label: 'Put Away' }]}
      />
      <DataTable columns={columns} rows={orders} loading={loading} keyField="id" />
      <ConfirmDialog
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        onConfirm={handleComplete}
        title="Complete Putaway"
        message={`Mark ${confirm?.id} as completed? Stock will be added to bin ${confirm?.suggestedBin}.`}
        confirmLabel="Complete"
        severity="info"
      />
    </Box>
  );
};

export default PutawayPage;
