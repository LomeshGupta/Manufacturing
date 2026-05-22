import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PageHeader from '../../components/common/PageHeader';
import { bomApi } from '../../api/bom.api';

const BOMS = [
  { id: 'BOM-001', product: 'Gearbox Housing A1' },
  { id: 'BOM-002', product: 'Drive Shaft 32mm' },
  { id: 'BOM-003', product: 'Brake Disc Type-B' },
  { id: 'BOM-004', product: 'Bracket Assembly X4' },
];

const BOMExplosionPage = () => {
  const theme = useTheme();
  const [selectedBOM, setSelectedBOM] = useState('BOM-001');
  const [qty, setQty] = useState(100);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExplode = async () => {
    setLoading(true);
    const res = await bomApi.explodeBOM(selectedBOM, qty);
    setResult(res);
    setLoading(false);
  };

  return (
    <Box>
      <PageHeader
        title="BOM Explosion"
        subtitle="Calculate required materials for any production quantity"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'BOM' }, { label: 'BOM Explosion' }]}
      />

      <Paper sx={{ p: 3, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, mb: 3 }} elevation={1}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Explosion Parameters</Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth size="small">
              <InputLabel>Select BOM</InputLabel>
              <Select value={selectedBOM} label="Select BOM" onChange={(e) => { setSelectedBOM(e.target.value); setResult(null); }}>
                {BOMS.map((b) => <MenuItem key={b.id} value={b.id}>{b.id} — {b.product}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth size="small" label="Production Qty" type="number" value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} inputProps={{ min: 1 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth onClick={handleExplode} disabled={loading}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <PlayArrowOutlinedIcon />}
              sx={{ py: 1 }}>
              {loading ? 'Calculating...' : 'Explode BOM'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {result && (
        <>
          <Alert severity="info" sx={{ mb: 2, borderRadius: '10px' }}>
            <strong>{result.bom.product}</strong> — {result.qty} units · {result.lines.length} components
          </Alert>
          <Paper sx={{ borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }} elevation={1}>
            <Box sx={{ p: 2.5, borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AccountTreeOutlinedIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>Material Requirements</Typography>
                <Typography variant="caption" color="text.secondary">For {result.qty} units of {result.bom.product}</Typography>
              </Box>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Item Code', 'Component', 'Base Qty/Unit', 'UOM', 'Required Qty', 'Scrap Qty', 'Total Required', 'Scrap %'].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.04em', py: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {result.lines.map((line, i) => (
                  <TableRow key={i} sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover td': { bgcolor: alpha(theme.palette.text.primary, 0.03) } }}>
                    <TableCell><Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{line.itemId}</Typography></TableCell>
                    <TableCell><Typography variant="body2" fontWeight={600}>{line.item}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2">{line.qty}</Typography></TableCell>
                    <TableCell>{line.uom}</TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={700} color="primary.main">{line.requiredQty.toFixed(2)}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" color="warning.main">{line.scrapQty.toFixed(2)}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={800}>{line.totalQty.toFixed(2)}</Typography></TableCell>
                    <TableCell>{line.scrap > 0 ? <Chip label={`${line.scrap}%`} size="small" color="warning" sx={{ height: 18, fontSize: '0.6rem' }} /> : '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default BOMExplosionPage;
