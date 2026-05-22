import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authApi } from '../api/auth.api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'erp_token';
const REFRESH_KEY = 'erp_refresh_token';
const USER_KEY = 'erp_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Hydrate user from token on mount (simulates session persistence)
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !user) {
      authApi.getMe().then(setUser).catch(() => clearSession());
    }
  }, []);

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const persistSession = (userData, token, refreshToken) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
    setUser(userData);
  };

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const { user: userData, token, refreshToken } = await authApi.login({ email, password });
      persistSession(userData, token, refreshToken);
      return { success: true, user: userData };
    } catch (err) {
      const msg = err?.message || 'Login failed. Please try again.';
      setAuthError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authApi.logout();
    } catch {
      // silent — clear session regardless
    } finally {
      clearSession();
      setLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email) => {
    setLoading(true);
    setAuthError(null);
    try {
      await authApi.forgotPassword({ email });
      return { success: true };
    } catch (err) {
      const msg = err?.message || 'Failed to send reset link.';
      setAuthError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      await authApi.resetPassword({ token, password });
      return { success: true };
    } catch (err) {
      const msg = err?.message || 'Password reset failed.';
      setAuthError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const hasPermission = useCallback(
    (permission) => {
      if (!user) return false;
      if (user.permissions?.includes('*')) return true;
      return user.permissions?.includes(permission) ?? false;
    },
    [user]
  );

  const hasRole = useCallback(
    (roles = []) => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  const clearAuthError = useCallback(() => setAuthError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        isAuthenticated: Boolean(user),
        login,
        logout,
        forgotPassword,
        resetPassword,
        hasPermission,
        hasRole,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
