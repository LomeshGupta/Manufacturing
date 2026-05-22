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
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { qcApi } from '../../api/qc.api';
import { formatDate } from '../../utils/formatters';
import useDebounce from '../../hooks/useDebounce';

const TYPE_LABELS = { incoming: 'Incoming', 'in-process': 'In-Process', final: 'Final', outgoing: 'Outgoing' };
const TYPE_COLORS = { incoming: 'info', 'in-process': 'warning', final: 'primary', outgoing: 'secondary' };
const STATUSES = ['All', 'passed', 'failed', 'pending'];
const TYPES = ['All', 'incoming', 'in-process', 'final'];

const InspectionsPage = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [type, setType] = useState('All');
  const dSearch = useDebounce(search, 300);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      qcApi.getInspections({ search: dSearch, status, type }),
      qcApi.getSummary(),
    ]).then(([res, sum]) => {
      setRows(res.inspections);
      setSummary(sum);
      setLoading(false);
    });
  }, [dSearch, status, type]);

  const columns = [
    { field: 'id', headerName: 'Inspection ID', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{v}</Typography> },
    { field: 'date', headerName: 'Date', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'ref', headerName: 'Reference', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" color="secondary.main">{v}</Typography> },
    { field: 'type', headerName: 'Type', renderCell: (v) => <Chip label={TYPE_LABELS[v] || v} size="small" color={TYPE_COLORS[v] || 'default'} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} /> },
    { field: 'item', headerName: 'Item', minWidth: 180, renderCell: (v, row) => <Box><Typography variant="body2" fontWeight={600}>{v}</Typography><Typography variant="caption" color="text.secondary">{row.batch}</Typography></Box> },
    { field: 'qty', headerName: 'Inspected', align: 'right' },
    { field: 'passed', headerName: 'Passed', align: 'right', renderCell: (v) => <Typography variant="body2" fontWeight={700} color="success.main">{v}</Typography> },
    { field: 'rejected', headerName: 'Rejected', align: 'right', renderCell: (v) => <Typography variant="body2" fontWeight={700} color={v > 0 ? 'error.main' : 'text.secondary'}>{v}</Typography> },
    { field: 'inspector', headerName: 'Inspector' },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={v} /> },
  ];

  const kpis = summary ? [
    { label: 'Total Inspected', value: summary.totalQty.toLocaleString('en-IN'), color: 'primary.main' },
    { label: 'Passed', value: summary.totalPassed.toLocaleString('en-IN'), color: 'success.main' },
    { label: 'Rejected', value: summary.totalRejected.toLocaleString('en-IN'), color: 'error.main' },
    { label: 'Pass Rate', value: `${((summary.totalPassed / summary.totalQty) * 100).toFixed(1)}%`, color: 'success.main' },
  ] : [];

  return (
    <Box>
      <PageHeader
        title="QC Inspections"
        subtitle="Incoming, in-process and final quality inspections"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Quality Control' }, { label: 'Inspections' }]}
        actions={<Button variant="contained" startIcon={<AddIcon />} size="small">New Inspection</Button>}
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
          <TextField size="small" placeholder="Search by item, batch, ID..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            sx={{ minWidth: 260 }} />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" onChange={(e) => setType(e.target.value)}>
              {TYPES.map((t) => <MenuItem key={t} value={t}>{t === 'All' ? 'All Types' : TYPE_LABELS[t]}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((s) => <MenuItem key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <DataTable columns={columns} rows={rows} loading={loading} keyField="id" />
    </Box>
  );
};

export default InspectionsPage;
