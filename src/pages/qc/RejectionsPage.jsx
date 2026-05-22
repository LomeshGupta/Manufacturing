import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { qcApi } from '../../api/qc.api';
import { formatDate } from '../../utils/formatters';

const ACTION_COLORS = { 'Return to vendor': 'warning', 'Scrap': 'error', 'Rework': 'info', 'Use as-is': 'success' };

const RejectionsPage = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    qcApi.getRejections().then((d) => { setRows(d); setLoading(false); });
  }, []);

  const handleApprove = async () => {
    await qcApi.updateRejection(confirm.id, { status: 'approved' });
    setRows((p) => p.map((r) => r.id === confirm.id ? { ...r, status: 'approved' } : r));
    setConfirm(null);
  };

  const columns = [
    { field: 'id', headerName: 'Rejection ID', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="error.main">{v}</Typography> },
    { field: 'date', headerName: 'Date', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'qcRef', headerName: 'QC Ref', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="primary.main">{v}</Typography> },
    { field: 'item', headerName: 'Item', minWidth: 180, renderCell: (v, row) => <Box><Typography variant="body2" fontWeight={600}>{v}</Typography><Typography variant="caption" color="text.secondary">{row.batch}</Typography></Box> },
    { field: 'qty', headerName: 'Qty', align: 'right', renderCell: (v) => <Typography variant="body2" fontWeight={700} color="error.main">{v}</Typography> },
    { field: 'reason', headerName: 'Rejection Reason', minWidth: 200, wrap: true },
    {
      field: 'action', headerName: 'Disposition',
      renderCell: (v) => <Chip label={v} size="small" color={ACTION_COLORS[v] || 'default'} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />,
    },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={v} /> },
    {
      field: 'actions', headerName: '', sortable: false,
      renderCell: (_, row) => row.status === 'pending'
        ? <Button size="small" variant="outlined" color="success" onClick={(e) => { e.stopPropagation(); setConfirm(row); }}>Approve</Button>
        : null,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="QC Rejections"
        subtitle="Rejected items and their disposition actions"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Quality Control' }, { label: 'Rejections' }]}
      />
      <DataTable columns={columns} rows={rows} loading={loading} keyField="id" />
      <ConfirmDialog
        open={Boolean(confirm)} onClose={() => setConfirm(null)} onConfirm={handleApprove}
        title="Approve Rejection Disposition"
        message={`Approve disposition "${confirm?.action}" for ${confirm?.qty} units of ${confirm?.item}?`}
        confirmLabel="Approve" severity="warning"
      />
    </Box>
  );
};

export default RejectionsPage;
