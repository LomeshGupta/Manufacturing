import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { bomApi } from '../../api/bom.api';
import { formatDate } from '../../utils/formatters';
import useDebounce from '../../hooks/useDebounce';

const BOMRow = ({ bom }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& td': { borderBottom: open ? 0 : undefined }, '&:hover td': { bgcolor: alpha(theme.palette.text.primary, 0.03) }, cursor: 'pointer' }} onClick={() => setOpen((p) => !p)}>
        <TableCell sx={{ width: 40 }}>
          <IconButton size="small">{open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}</IconButton>
        </TableCell>
        <TableCell><Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary.main">{bom.id}</Typography></TableCell>
        <TableCell><Typography variant="body2" fontWeight={700}>{bom.product}</Typography></TableCell>
        <TableCell><Typography variant="caption" fontFamily="monospace" color="text.secondary">{bom.productId}</Typography></TableCell>
        <TableCell><Chip label={bom.version} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} /></TableCell>
        <TableCell align="right">{bom.components.length}</TableCell>
        <TableCell><Typography variant="body2">{formatDate(bom.lastUpdated)}</Typography></TableCell>
        <TableCell><StatusBadge status={bom.status} /></TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={8} sx={{ p: 0, border: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 2, p: 2, borderRadius: '10px', bgcolor: alpha(theme.palette.primary.main, 0.03), border: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="overline" color="text.secondary" display="block" sx={{ mb: 1 }}>Components ({bom.components.length})</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {['Item Code', 'Description', 'Qty', 'UOM', 'Scrap %'].map((h) => (
                      <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', py: 1 }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bom.components.map((c) => (
                    <TableRow key={c.itemId}>
                      <TableCell><Typography variant="caption" fontFamily="monospace" color="primary.main">{c.itemId}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{c.item}</Typography></TableCell>
                      <TableCell align="right"><Typography variant="body2" fontWeight={600}>{c.qty}</Typography></TableCell>
                      <TableCell>{c.uom}</TableCell>
                      <TableCell>{c.scrap > 0 ? <Chip label={`${c.scrap}%`} size="small" color="warning" sx={{ height: 18, fontSize: '0.6rem' }} /> : '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const BOMListPage = () => {
  const theme = useTheme();
  const [boms, setBoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const dSearch = useDebounce(search, 300);

  useEffect(() => {
    setLoading(true);
    bomApi.getBOMs({ search: dSearch }).then((r) => { setBoms(r.boms); setLoading(false); });
  }, [dSearch]);

  return (
    <Box>
      <PageHeader
        title="Bill of Materials"
        subtitle="Multi-level BOM definitions for all products"
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'BOM' }, { label: 'Bill of Materials' }]}
        actions={<Button variant="contained" startIcon={<AddIcon />} size="small">New BOM</Button>}
      />
      <Box sx={{ mb: 2 }}>
        <TextField size="small" placeholder="Search product or BOM ID..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
          sx={{ minWidth: 280 }} />
      </Box>
      <Paper sx={{ borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }} elevation={1}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 40 }} />
              {['BOM ID', 'Product', 'Item Code', 'Version', 'Components', 'Last Updated', 'Status'].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.75, borderBottom: `2px solid ${theme.palette.divider}` }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={i}><TableCell colSpan={8}><Box sx={{ height: 44, bgcolor: alpha(theme.palette.text.primary, 0.04), borderRadius: 1 }} /></TableCell></TableRow>
            )) : boms.map((bom) => <BOMRow key={bom.id} bom={bom} />)}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default BOMListPage;
