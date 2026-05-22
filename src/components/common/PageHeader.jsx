import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ title, subtitle, breadcrumbs = [], actions }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
      <Box>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 0.5 }}
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return isLast ? (
                <Typography key={idx} variant="caption" color="text.primary" fontWeight={600}>
                  {crumb.label}
                </Typography>
              ) : (
                <Link
                  key={idx}
                  variant="caption"
                  underline="hover"
                  color="text.secondary"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => crumb.path && navigate(crumb.path)}
                >
                  {crumb.label}
                </Link>
              );
            })}
          </Breadcrumbs>
        )}
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box sx={{ display: 'flex', gap: 1 }}>{actions}</Box>}
    </Box>
  );
};

export default PageHeader;
