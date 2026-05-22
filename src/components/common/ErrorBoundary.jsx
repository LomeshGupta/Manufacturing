import { Component } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('[ErrorBoundary]', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, info: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            p: 3,
          }}
        >
          <Paper
            sx={{
              p: { xs: 4, sm: 5 },
              textAlign: 'center',
              maxWidth: 500,
              borderRadius: '24px',
              border: '1px solid',
              borderColor: 'divider',
            }}
            elevation={2}
          >
            <Box
              sx={{
                width: 72, height: 72, borderRadius: '18px',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mx: 'auto', mb: 3,
              }}
            >
              <BugReportOutlinedIcon sx={{ fontSize: '2rem', color: 'error.main' }} />
            </Box>

            <Typography variant="h5" fontWeight={700} gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              An unexpected error occurred in this part of the application.
            </Typography>

            {this.state.error && (
              <Box
                sx={{
                  my: 2, p: 2, borderRadius: '10px',
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.05),
                  border: '1px solid',
                  borderColor: (theme) => alpha(theme.palette.error.main, 0.15),
                  textAlign: 'left',
                }}
              >
                <Typography variant="caption" color="error.main" fontFamily="monospace" display="block">
                  {this.state.error.message}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mt: 3 }}>
              <Button variant="outlined" startIcon={<RefreshOutlinedIcon />} onClick={this.handleReset}>
                Try Again
              </Button>
              <Button variant="contained" startIcon={<HomeOutlinedIcon />} onClick={() => (window.location.href = '/dashboard')}>
                Go Home
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
