import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PageHeader from '../../components/common/PageHeader';
import FormDialog from '../../components/dialogs/FormDialog';
import StatusBadge from '../../components/common/StatusBadge';
import useDebounce from '../../hooks/useDebounce';

const MOCK_USERS = [
  { id: 1, name: 'Arjun Sharma', email: 'admin@smarterp.in', role: 'admin', plant: 'Plant-01 — Pune', lastLogin: '2024-04-18', active: true },
  { id: 2, name: 'Priya Mehta', email: 'manager@smarterp.in', role: 'manager', plant: 'Plant-01 — Pune', lastLogin: '2024-04-18', active: true },
  { id: 3, name: 'Ravi Kumar', email: 'operator@smarterp.in', role: 'operator', plant: 'Plant-02 — Nashik', lastLogin: '2024-04-17', active: true },
  { id: 4, name: 'Suresh Nair', email: 'suresh.nair@smarterp.in', role: 'production', plant: 'Plant-01 — Pune', lastLogin: '2024-04-16', active: true },
  { id: 5, name: 'Kavita Singh', email: 'kavita.singh@smarterp.in', role: 'qc', plant: 'Plant-01 — Pune', lastLogin: '2024-04-15', active: true },
  { id: 6, name: 'Deepak Rao', email: 'deepak.rao@smarterp.in', role: 'store', plant: 'Plant-02 — Nashik', lastLogin: '2024-04-14', active: false },
  { id: 7, name: 'Anita Joshi', email: 'anita.joshi@smarterp.in', role: 'purchase', plant: 'Plant-01 — Pune', lastLogin: '2024-04-13', active: true },
  { id: 8, name: 'Ramesh Patil', email: 'ramesh.patil@smarterp.in', role: 'maintenance', plant: 'Plant-02 — Nashik', lastLogin: '2024-04-12', active: true },
];

const ROLES = ['admin', 'manager', 'operator', 'production', 'qc', 'store', 'purchase', 'maintenance', 'engineer'];

const ROLE_COLORS = {
  admin: 'error', manager: 'primary', operator: 'success',
  production: 'info', qc: 'success', store: 'warning',
  purchase: 'secondary', maintenance: 'warning', engineer: 'secondary',
};

const BLANK_FORM = { name: '', email: '', role: 'operator', plant: 'Plant-01 — Pune' };

const UsersPage = () => {
  const theme = useTheme();
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState(BLANK_FORM);
  const dSearch = useDebounce(search, 250);

  const filtered = users.filter((u) => {
    const matchSearch = !dSearch || u.name.toLowerCase().includes(dSearch.toLowerCase()) || u.email.toLowerCase().includes(dSearch.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleOpenAdd = () => { setEditUser(null); setForm(BLANK_FORM); setDialogOpen(true); };
  const handleOpenEdit = (user) => { setEditUser(user); setForm({ name: user.name, email: user.email, role: user.role, plant: user.plant }); setDialogOpen(true); };

  const handleSubmit = () => {
    if (editUser) {
      setUsers((p) => p.map((u) => u.id === editUser.id ? { ...u, ...form } : u));
    } else {
      setUsers((p) => [...p, { id: Date.now(), ...form, lastLogin: '—', active: true }]);
    }
    setDialogOpen(false);
  };

  const handleToggleActive = (id) => {
    setUsers((p) => p.map((u) => u.id === id ? { ...u, active: !u.active } : u));
  };

  const active = users.filter((u) => u.active).length;
  const admins = users.filter((u) => u.role === 'admin').length;

  return (
    <Box>
      <PageHeader
        title="User Management"
        subtitle="Manage ERP users, roles and access control"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'User Management' }]}
        actions={
          <Button variant="contained" startIcon={<AddIcon />} size="small" onClick={handleOpenAdd}>
            Add User
          </Button>
        }
      />

      {/* KPI Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Users', value: users.length, color: 'primary.main', icon: <GroupOutlinedIcon /> },
          { label: 'Active Users', value: active, color: 'success.main', icon: <GroupOutlinedIcon /> },
          { label: 'Inactive', value: users.length - active, color: 'error.main', icon: <GroupOutlinedIcon /> },
          { label: 'Admins', value: admins, color: 'warning.main', icon: <AdminPanelSettingsOutlinedIcon /> },
        ].map((k, i) => (
          <Grid item xs={6} md={3} key={k.label}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Paper sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center', gap: 2 }} elevation={1}>
                <Box sx={{ width: 44, height: 44, borderRadius: '11px', bgcolor: alpha(theme.palette[k.color.split('.')[0]]?.main || theme.palette.primary.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: k.color }}>
                  {k.icon}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={800} sx={{ color: k.color }}>{k.value}</Typography>
                  <Typography variant="caption" color="text.secondary">{k.label}</Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, borderRadius: '12px', border: `1px solid ${theme.palette.divider}`, mb: 2 }} elevation={0}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            size="small" placeholder="Search by name or email..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            sx={{ minWidth: 260 }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} label="Role" onChange={(e) => setRoleFilter(e.target.value)}>
              <MenuItem value="All">All Roles</MenuItem>
              {ROLES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </Select>
          </FormControl>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
            {filtered.length} of {users.length} users
          </Typography>
        </Box>
      </Paper>

      {/* Users Table */}
      <Paper sx={{ borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }} elevation={1}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
              {['User', 'Email', 'Role', 'Plant', 'Last Login', 'Status', 'Actions'].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.75, borderBottom: `2px solid ${theme.palette.divider}` }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((user, idx) => {
              const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
              return (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.04 }}
                  style={{ display: 'table-row' }}
                >
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem', fontWeight: 800, background: user.active ? 'linear-gradient(135deg, #F97316, #EA580C)' : theme.palette.action.disabled }}>
                        {initials}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      color={ROLE_COLORS[user.role] || 'default'}
                      sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">{user.plant}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">{user.lastLogin}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Switch
                        size="small"
                        checked={user.active}
                        onChange={() => handleToggleActive(user.id)}
                        color="success"
                      />
                      <StatusBadge status={user.active ? 'active' : 'inactive'} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => handleOpenEdit(user)} title="Edit user">
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" title="Reset password">
                        <LockResetOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      {/* Add / Edit Dialog */}
      <FormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        title={editUser ? 'Edit User' : 'Add New User'}
        subtitle={editUser ? `Editing ${editUser.name}` : 'Create a new ERP user account'}
        submitLabel={editUser ? 'Save Changes' : 'Create User'}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Full Name" fullWidth size="small"
            value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
          <TextField
            label="Email Address" type="email" fullWidth size="small"
            value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
          <FormControl fullWidth size="small">
            <InputLabel>Role</InputLabel>
            <Select value={form.role} label="Role" onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
              {ROLES.map((r) => (
                <MenuItem key={r} value={r}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label={r} size="small" color={ROLE_COLORS[r] || 'default'} sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700 }} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Assigned Plant</InputLabel>
            <Select value={form.plant} label="Assigned Plant" onChange={(e) => setForm((p) => ({ ...p, plant: e.target.value }))}>
              <MenuItem value="Plant-01 — Pune">Plant-01 — Pune</MenuItem>
              <MenuItem value="Plant-02 — Nashik">Plant-02 — Nashik</MenuItem>
            </Select>
          </FormControl>

          <Divider />

          <Box sx={{ p: 2, borderRadius: '10px', bgcolor: (theme) => alpha(theme.palette.info.main, 0.05), border: '1px solid', borderColor: (theme) => alpha(theme.palette.info.main, 0.2) }}>
            <Typography variant="caption" color="text.secondary">
              {editUser ? 'User will be notified of any role changes via email.' : 'A welcome email with login credentials will be sent to the user.'}
            </Typography>
          </Box>
        </Box>
      </FormDialog>
    </Box>
  );
};

export default UsersPage;
