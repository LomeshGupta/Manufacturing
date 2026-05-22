import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRouter from './routes/AppRouter';
import ErrorBoundary from './components/common/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
