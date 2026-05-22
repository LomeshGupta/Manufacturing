import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useApp } from '../../../context/AppContext';

const PlantSelector = () => {
  const theme = useTheme();
  const [anchor, setAnchor] = useState(null);
  const { selectedCompany, selectedPlant, companies, plants, changeCompany, setSelectedPlant } = useApp();

  return (
    <>
      <Button
        size="small"
        onClick={(e) => setAnchor(e.currentTarget)}
        startIcon={<FactoryOutlinedIcon sx={{ fontSize: '0.9rem !important' }} />}
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '0.9rem !important' }} />}
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          color: theme.palette.primary.main,
          fontWeight: 600,
          fontSize: '0.75rem',
          borderRadius: '8px',
          px: 1.5,
          py: 0.75,
          '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.14) },
        }}
      >
        {selectedPlant?.name || 'Select Plant'}
      </Button>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        PaperProps={{ sx: { width: 240, borderRadius: '12px', mt: 1 } }}
      >
        {companies.map((company) => (
          <Box key={company.id}>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                onClick={() => changeCompany(company)}
              >
                {company.name}
              </Typography>
            </Box>
            {(plants || [])
              .filter(() => selectedCompany.id === company.id)
              .map((plant) => (
                <MenuItem
                  key={plant.id}
                  selected={selectedPlant?.id === plant.id}
                  onClick={() => { setSelectedPlant(plant); setAnchor(null); }}
                  sx={{ fontSize: '0.875rem', pl: 3, borderRadius: '8px', mx: 1 }}
                >
                  {plant.name}
                </MenuItem>
              ))}
            <Divider sx={{ my: 0.5 }} />
          </Box>
        ))}
      </Menu>
    </>
  );
};

export default PlantSelector;
