import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { maintenanceApi } from '../../api/maintenance.api';
import { formatDate } from '../../utils/formatters';

const PRIORITY_COLORS = { critical: 'error', high: 'warning', medium: 'info', low: 'success' };
const TYPE_LABELS = { preventive: 'Preventive', corrective: 'Corrective', predictive: 'Predictive' };
const PRIORITIES = ['All', 'critical', 'high', 'medium', 'low'];
const STATUSES_FILTER = ['All', 'scheduled', 'in-progress', 'pending', 'completed'];

const SchedulesPage = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priority, setPriority] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    setLoading(true);
    maintenanceApi.getSchedules({ priority, status: statusFilter }).then((d) => { setRows(d); setLoading(false); });
  }, [priority, statusFilter]);

  const handleComplete = async () => {
    await maintenanceApi.completeSchedule(confirm.id);
    setRows((p) => p.map((r) => r.id === confirm.id ? { ...r, status: 'completed' } : r));
    setConfirm(null);
  };

  const columns = [
    { field: 'id', headerName: 'Schedule ID', renderCell: (v) => <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{v}</Typography> },
    { field: 'machine', headerName: 'Machine', minWidth: 160, renderCell: (v) => <Typography variant="body2" fontWeight={600}>{v}</Typography> },
    { field: 'type', headerName: 'Type', renderCell: (v) => <Chip label={TYPE_LABELS[v] || v} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} /> },
    { field: 'description', headerName: 'Description', minWidth: 220, wrap: true },
    { field: 'scheduledDate', headerName: 'Scheduled', renderCell: (v) => <Typography variant="body2">{formatDate(v)}</Typography> },
    { field: 'technician', headerName: 'Technician' },
    { field: 'estimatedHours', headerName: 'Est. Hours', align: 'right', renderCell: (v) => <Typography variant="body2">{v}h</Typography> },
    { field: 'priority', headerName: 'Priority', renderCell: (v) => <Chip label={v} size="small" color={PRIORITY_COLORS[v] || 'default'} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, textTransform: 'capitalize' }} /> },
    { field: 'status', headerName: 'Status', renderCell: (v) => <StatusBadge status={v} /> },
    {
      field: 'actions', headerName: '', sortable: false,
      renderCell: (_, row) => ['scheduled', 'in-progress', 'pending'].includes(row.status)
        ? <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); setConfirm(row); }}>Complete</Button>
        : null,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Maintenance Schedules"
        subtitle="Preventive and corrective maintenance tracking"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Maintenance' }, { label: 'Schedules' }]}
        actions={<Button variant="contained" startIcon={<AddIcon />} size="small">New Schedule</Button>}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: '12px', border: `1px solid ${theme.palette.divider}` }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Priority</InputLabel>
          <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((p) => <MenuItem key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
            {STATUSES_FILTER.map((s) => <MenuItem key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <DataTable columns={columns} rows={rows} loading={loading} keyField="id" />
      <ConfirmDialog
        open={Boolean(confirm)} onClose={() => setConfirm(null)} onConfirm={handleComplete}
        title="Complete Maintenance" message={`Mark "${confirm?.description}" on ${confirm?.machine} as completed?`}
        confirmLabel="Mark Complete" severity="info"
      />
    </Box>
  );
};

export default SchedulesPage;
