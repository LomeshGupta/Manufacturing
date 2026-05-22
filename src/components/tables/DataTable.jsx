import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import EmptyState from '../common/EmptyState';

const DataTable = ({
  columns = [],
  rows = [],
  loading = false,
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 25,
  onRowClick = null,
  keyField = 'id',
  elevation = 1,
  stickyHeader = false,
  maxHeight,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSort = (col) => {
    if (orderBy === col) { setOrder((p) => p === 'asc' ? 'desc' : 'asc'); }
    else { setOrderBy(col); setOrder('asc'); }
    setPage(0);
  };

  const sorted = [...rows].sort((a, b) => {
    if (!orderBy) return 0;
    const av = a[orderBy]; const bv = b[orderBy];
    if (av === undefined || bv === undefined) return 0;
    const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return order === 'asc' ? cmp : -cmp;
  });

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={elevation} sx={{ borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }}>
      <Box sx={{ overflowX: 'auto', maxHeight }}>
        <Table stickyHeader={stickyHeader} size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={col.align || 'left'}
                  sx={{
                    fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    whiteSpace: 'nowrap', py: 1.75,
                    bgcolor: theme.palette.background.paper,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    minWidth: col.minWidth,
                    width: col.width,
                  }}
                  sortDirection={orderBy === col.field ? order : false}
                >
                  {col.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === col.field}
                      direction={orderBy === col.field ? order : 'asc'}
                      onClick={() => handleSort(col.field)}
                    >
                      {col.headerName}
                    </TableSortLabel>
                  ) : col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col.field}><Skeleton variant="text" width="80%" /></TableCell>
                    ))}
                  </TableRow>
                ))
              : paginated.length === 0
              ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} sx={{ border: 0, p: 0 }}>
                      <EmptyState title="No records found" compact />
                    </TableCell>
                  </TableRow>
                )
              : paginated.map((row) => (
                  <TableRow
                    key={row[keyField]}
                    hover={Boolean(onRowClick)}
                    onClick={() => onRowClick?.(row)}
                    sx={{
                      cursor: onRowClick ? 'pointer' : 'default',
                      '&:hover td': { bgcolor: alpha(theme.palette.text.primary, 0.03) },
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell key={col.field} align={col.align || 'left'} sx={{ py: 1.5, whiteSpace: col.wrap ? 'normal' : 'nowrap' }}>
                        {col.renderCell ? col.renderCell(row[col.field], row) : row[col.field] ?? '—'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Box>
      {rows.length > rowsPerPageOptions[0] && (
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }}
          rowsPerPageOptions={rowsPerPageOptions}
          sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
        />
      )}
    </Paper>
  );
};

export default DataTable;
