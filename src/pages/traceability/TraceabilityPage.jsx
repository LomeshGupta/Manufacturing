import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import PageHeader from '../../components/common/PageHeader';

const MOCK_TRACE = {
  'B-4420': {
    batch: 'B-4420', item: 'Gearbox Housing A1', itemId: 'FG-2001',
    status: 'In Stock (WH-02/A-01)', qty: 124,
    timeline: [
      { step: 'Raw Material Receipt', ref: 'GRN-2024-0419', date: '2024-04-12', detail: 'Cast Iron Blank 200mm — 130 pcs from Tata Steel', icon: 'receipt', color: 'info' },
      { step: 'BOM Explosion', ref: 'BOM-001 v2.1', date: '2024-04-14', detail: '5 components consumed — Steel Rod, Bearings, Bolts, O-Rings', icon: 'bom', color: 'secondary' },
      { step: 'Production Started', ref: 'MO-2024-1123', date: '2024-04-15', detail: 'Work Center CNC-01 — Operator: Raj Kumar', icon: 'production', color: 'warning' },
      { step: 'QC Inspection', ref: 'QC-2024-0440', date: '2024-04-18', detail: '497/500 passed — 3 rejected (Dimensional deviation)', icon: 'qc', color: 'success' },
      { step: 'Stocked to Warehouse', ref: 'WH-02/A-01', date: '2024-04-18', detail: '124 units stored in WH-02 Finished Goods', icon: 'warehouse', color: 'primary' },
    ],
  },
};

const ICON_MAP = {
  receipt: <InventoryOutlinedIcon sx={{ fontSize: '1rem' }} />,
  bom: <QrCodeScannerOutlinedIcon sx={{ fontSize: '1rem' }} />,
  production: <PrecisionManufacturingOutlinedIcon sx={{ fontSize: '1rem' }} />,
  qc: <VerifiedOutlinedIcon sx={{ fontSize: '1rem' }} />,
  warehouse: <LocalShippingOutlinedIcon sx={{ fontSize: '1rem' }} />,
};

const TraceabilityPage = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);
    await new Promise((r) => setTimeout(r, 800));
    const data = MOCK_TRACE[query.trim().toUpperCase()] || MOCK_TRACE['B-4420'];
    if (data) { setResult(data); } else { setNotFound(true); }
    setLoading(false);
  };

  return (
    <Box>
      <PageHeader
        title="Traceability"
        subtitle="Batch and serial number genealogy — from raw material to delivery"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Traceability' }]}
      />

      <Paper sx={{ p: 3, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, mb: 3 }} elevation={1}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>Batch / Serial Trace Lookup</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          Enter a batch number, serial number, production order, or GRN reference
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small" placeholder="e.g. B-4420, MO-2024-1123, GRN-2024-0419..."
            value={query} onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            sx={{ flex: 1, minWidth: 280 }}
          />
          <Button variant="contained" onClick={handleSearch} disabled={loading || !query.trim()}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}>
            {loading ? 'Tracing...' : 'Trace'}
          </Button>
        </Box>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
          Demo: try <strong>B-4420</strong>
        </Typography>
      </Paper>

      {notFound && <Alert severity="warning" sx={{ borderRadius: '10px', mb: 2 }}>No traceability record found for "{query}".</Alert>}

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, height: '100%' }} elevation={1}>
                  <Typography variant="overline" color="text.secondary">Batch Details</Typography>
                  <Divider sx={{ my: 1.5 }} />
                  {[
                    { label: 'Batch No.', value: result.batch },
                    { label: 'Item', value: result.item },
                    { label: 'Item Code', value: result.itemId },
                    { label: 'Qty', value: `${result.qty} pcs` },
                    { label: 'Status', value: result.status },
                  ].map((r) => (
                    <Box key={r.label} sx={{ display: 'flex', py: 1, borderBottom: `1px solid ${theme.palette.divider}`, '&:last-child': { borderBottom: 0 } }}>
                      <Typography variant="caption" color="text.secondary" sx={{ width: 90, flexShrink: 0 }}>{r.label}</Typography>
                      <Typography variant="caption" fontWeight={600}>{r.value}</Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>

              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, borderRadius: '16px', border: `1px solid ${theme.palette.divider}` }} elevation={1}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>Lot Genealogy Timeline</Typography>
                  <Box sx={{ position: 'relative' }}>
                    {result.timeline.map((t, i) => {
                      const color = theme.palette[t.color]?.main || theme.palette.primary.main;
                      return (
                        <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                          <Box sx={{ display: 'flex', gap: 2, mb: i < result.timeline.length - 1 ? 0 : 0, position: 'relative' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                              <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: alpha(color, 0.12), border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, zIndex: 1 }}>
                                {ICON_MAP[t.icon]}
                              </Box>
                              {i < result.timeline.length - 1 && (
                                <Box sx={{ width: 2, flex: 1, bgcolor: theme.palette.divider, my: 0.5, minHeight: 20 }} />
                              )}
                            </Box>
                            <Box sx={{ pb: i < result.timeline.length - 1 ? 2.5 : 0, flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
                                <Typography variant="subtitle2" fontWeight={700}>{t.step}</Typography>
                                <Typography variant="caption" color="text.disabled">{t.date}</Typography>
                              </Box>
                              <Chip label={t.ref} size="small" sx={{ height: 18, fontSize: '0.65rem', fontFamily: 'monospace', bgcolor: alpha(color, 0.08), color, fontWeight: 700, mb: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">{t.detail}</Typography>
                            </Box>
                          </Box>
                        </motion.div>
                      );
                    })}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default TraceabilityPage;
