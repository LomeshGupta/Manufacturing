import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { procurementApi } from '../../api/procurement.api';
import { formatCurrency, formatDate } from '../../utils/formatters';

const VendorBillsPage = () => {
  const theme = useTheme();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    procurementApi.getVendorBills().then((d) => { setBills(d); setLoading(false); });
  }, []);

  const pending = bills.filter((b) => b.status === 'pending').reduce((a, b) => a + b.amount, 0);
  const paid = bills.filter((b) => b.status === 'paid').reduce((a, b) => a + b.amount, 0);

  const columns = [
    { field: 'id', headerName: 'Bill No.', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{v}</Typography> },
    { field: 'vendor', headerName: 'Vendor', minWidth: 180, renderCell: (v) => <Typography variant="body2" fontWeight={600}>{v}</Typography> },
    { field: 'grn', headerName: 'GRN Ref', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="secondary.main">{v}</Typography> },
    { field: 'date', headerName: 'Bill Date', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'dueDate', headerName: 'Due Date', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'amount', headerName: 'Amount', align: 'right', renderCell: (v) => <Typography variant="body2" fontWeight={700}>{formatCurrency(v)}</Typography> },
    { field: 'paymentTerms', headerName: 'Terms' },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={v} /> },
  ];

  return (
    <Box>
      <PageHeader
        title="Vendor Bills"
        subtitle="Track payables and payment status"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Procurement' }, { label: 'Vendor Bills' }]}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {[
          { label: 'Pending Payable', value: formatCurrency(pending), color: theme.palette.warning.main },
          { label: 'Total Paid', value: formatCurrency(paid), color: theme.palette.success.main },
          { label: 'Total Bills', value: bills.length, color: theme.palette.primary.main },
        ].map((m) => (
          <Box key={m.label} sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper', minWidth: 160 }}>
            <Typography variant="h5" fontWeight={800} sx={{ color: m.color }}>{m.value}</Typography>
            <Typography variant="caption" color="text.secondary">{m.label}</Typography>
          </Box>
        ))}
      </Box>
      <DataTable columns={columns} rows={bills} loading={loading} keyField="id" />
    </Box>
  );
};

export default VendorBillsPage;
