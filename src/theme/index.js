import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { shadows } from './shadows';
import { componentOverrides } from './components';

export const createAppTheme = (mode = 'light') => {
  const colors = palette[mode];

  const base = createTheme({
    palette: {
      mode,
      ...colors,
    },
    typography,
    shadows: shadows(mode),
    shape: { borderRadius: 12 },
    spacing: 8,
  });

  return createTheme(base, {
    components: componentOverrides(colors),
  });
};
