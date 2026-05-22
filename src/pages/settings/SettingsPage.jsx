import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PageHeader from '../../components/common/PageHeader';
import { useThemeMode } from '../../context/ThemeContext';

const SECTIONS = [
  { id: 'company', label: 'Company', icon: <BusinessOutlinedIcon /> },
  { id: 'plant', label: 'Plant & Warehouse', icon: <FactoryOutlinedIcon /> },
  { id: 'notifications', label: 'Notifications', icon: <NotificationsOutlinedIcon /> },
  { id: 'appearance', label: 'Appearance', icon: <PaletteOutlinedIcon /> },
  { id: 'security', label: 'Security', icon: <SecurityOutlinedIcon /> },
];

const SettingsPage = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const [section, setSection] = useState('company');
  const [saved, setSaved] = useState(false);
  const [company, setCompany] = useState({ name: 'Bharat Auto Parts Ltd.', gstin: '27AABCB1234A1ZX', address: 'Plot 42, MIDC, Pune - 411018', email: 'erp@bharatauto.in', phone: '020-27123456' });
  const [notifs, setNotifs] = useState({ lowStock: true, machineDown: true, poApproval: true, qcFail: true, email: false });
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <Box>
      <PageHeader title="Settings" subtitle="System-wide configuration for your ERP"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Settings' }]} />
      {saved && <Alert severity="success" icon={<CheckCircleOutlineIcon />} sx={{ mb: 2.5, borderRadius: '12px' }}>Settings saved successfully.</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }} elevation={1}>
            <List disablePadding sx={{ p: 1 }}>
              {SECTIONS.map((s) => (
                <ListItemButton key={s.id} selected={section === s.id} onClick={() => setSection(s.id)}
                  sx={{ borderRadius: '10px', mb: 0.5, '&.Mui-selected': { bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', '& .MuiListItemIcon-root': { color: 'primary.main' } } }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{s.icon}</ListItemIcon>
                  <ListItemText primary={s.label} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.875rem' }} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
            {section === 'company' && (
              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>Company Information</Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2.5}>
                  {[['Company Name','name'],['GSTIN','gstin'],['Email','email'],['Phone','phone']].map(([label, field]) => (
                    <Grid item xs={12} sm={6} key={field}>
                      <TextField fullWidth size="small" label={label} value={company[field]} onChange={(e) => setCompany((p) => ({ ...p, [field]: e.target.value }))} />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <TextField fullWidth size="small" label="Registered Address" multiline rows={2} value={company.address} onChange={(e) => setCompany((p) => ({ ...p, address: e.target.value }))} />
                  </Grid>
                </Grid>
              </Box>
            )}
            {section === 'plant' && (
              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>Plant & Warehouse Config</Typography>
                <Divider sx={{ mb: 3 }} />
                {[{ label: 'Plant-01 — Pune', detail: 'MIDC Industrial Area, Pune - 411018' }, { label: 'Plant-02 — Nashik', detail: 'Sinnar MIDC, Nashik - 422103' }].map((p) => (
                  <Box key={p.label} sx={{ p: 2, mb: 1.5, borderRadius: '12px', border: `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box><Typography variant="subtitle2" fontWeight={700}>{p.label}</Typography><Typography variant="caption" color="text.secondary">{p.detail}</Typography></Box>
                    <Button size="small" variant="outlined">Configure</Button>
                  </Box>
                ))}
                <Button variant="outlined" startIcon={<FactoryOutlinedIcon />} sx={{ mt: 1 }}>Add Plant</Button>
              </Box>
            )}
            {section === 'notifications' && (
              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>Notification Preferences</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[{ key: 'lowStock', label: 'Low Stock Alerts', desc: 'Items below reorder level' }, { key: 'machineDown', label: 'Machine Downtime', desc: 'Immediate alert on machine stop' }, { key: 'poApproval', label: 'PO Approval Required', desc: 'Pending purchase order approvals' }, { key: 'qcFail', label: 'QC Failures', desc: 'Inspection failures and rejections' }, { key: 'email', label: 'Email Notifications', desc: 'Also send alerts via email' }].map((n) => (
                    <Box key={n.key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: '10px', border: `1px solid ${theme.palette.divider}` }}>
                      <Box><Typography variant="body2" fontWeight={600}>{n.label}</Typography><Typography variant="caption" color="text.secondary">{n.desc}</Typography></Box>
                      <Switch size="small" checked={notifs[n.key]} onChange={(e) => setNotifs((p) => ({ ...p, [n.key]: e.target.checked }))} color="primary" />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {section === 'appearance' && (
              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>Appearance</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: '10px', border: `1px solid ${theme.palette.divider}` }}>
                  <Box><Typography variant="body2" fontWeight={600}>Dark Mode</Typography><Typography variant="caption" color="text.secondary">Currently: {mode} mode</Typography></Box>
                  <Switch size="small" checked={mode === 'dark'} onChange={toggleTheme} color="primary" />
                </Box>
              </Box>
            )}
            {section === 'security' && (
              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>Security Settings</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[{ label: 'Session Timeout', detail: '30 minutes of inactivity' }, { label: 'Password Policy', detail: 'Minimum 8 chars, mixed case required' }, { label: 'Two-Factor Auth', detail: 'Disabled' }, { label: 'Audit Logs', detail: 'All user actions are logged' }].map((s) => (
                    <Box key={s.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: '10px', border: `1px solid ${theme.palette.divider}` }}>
                      <Box><Typography variant="body2" fontWeight={600}>{s.label}</Typography><Typography variant="caption" color="text.secondary">{s.detail}</Typography></Box>
                      <Button size="small" variant="outlined">Configure</Button>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            <Box sx={{ mt: 3, pt: 2.5, borderTop: `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleSave}>Save Changes</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
