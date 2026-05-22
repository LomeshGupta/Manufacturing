import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { procurementApi } from '../../api/procurement.api';
import { formatCurrency, formatDate } from '../../utils/formatters';

const GRN_STATUS_MAP = {
  'qc-pending': 'pending', 'qc-passed': 'approved', 'qc-failed': 'rejected', 'stocked': 'completed',
};

const GRNPage = () => {
  const [grns, setGrns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    procurementApi.getGRNs().then((d) => { setGrns(d); setLoading(false); });
  }, []);

  const columns = [
    { field: 'id', headerName: 'GRN No.', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{v}</Typography> },
    { field: 'date', headerName: 'Date', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'po', headerName: 'PO Reference', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="secondary.main">{v}</Typography> },
    { field: 'vendor', headerName: 'Vendor', minWidth: 180, renderCell: (v) => <Typography variant="body2" fontWeight={600}>{v}</Typography> },
    { field: 'items', headerName: 'Items', align: 'right' },
    { field: 'totalValue', headerName: 'Value', align: 'right', renderCell: (v) => <Typography variant="body2" fontWeight={700}>{formatCurrency(v)}</Typography> },
    { field: 'receivedBy', headerName: 'Received By' },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={GRN_STATUS_MAP[v] || v} /> },
  ];

  return (
    <Box>
      <PageHeader
        title="Goods Receipt Notes"
        subtitle="Record and track incoming material receipts"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Procurement' }, { label: 'GRN' }]}
        actions={<Button variant="contained" startIcon={<AddIcon />} size="small">New GRN</Button>}
      />
      <DataTable columns={columns} rows={grns} loading={loading} keyField="id" />
    </Box>
  );
};

export default GRNPage;
