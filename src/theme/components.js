export const componentOverrides = (palette) => ({
  MuiCssBaseline: {
    styleOverrides: {
      '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
      html: { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' },
      '::-webkit-scrollbar': { width: '6px', height: '6px' },
      '::-webkit-scrollbar-track': { background: 'transparent' },
      '::-webkit-scrollbar-thumb': {
        background: palette.divider,
        borderRadius: '8px',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '10px',
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
      },
      containedPrimary: {
        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '16px',
        backgroundImage: 'none',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' },
      rounded: { borderRadius: '16px' },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: '8px', fontWeight: 600 },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: { fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: { borderRadius: '10px' },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: { borderRadius: '10px !important' },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: { borderRadius: '10px' },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: { borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500 },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: { borderRadius: '4px', height: '6px' },
    },
  },
});
