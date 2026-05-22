import axiosInstance from './axiosInstance';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

const MOCK_USERS = [
  {
    id: 1,
    name: 'Arjun Sharma',
    email: 'admin@smarterp.in',
    password: 'admin123',
    role: 'admin',
    avatar: null,
    company: 'Bharat Auto Parts Ltd.',
    plant: 'Plant-01 — Pune',
    permissions: ['*'],
  },
  {
    id: 2,
    name: 'Priya Mehta',
    email: 'manager@smarterp.in',
    password: 'manager123',
    role: 'manager',
    avatar: null,
    company: 'Bharat Auto Parts Ltd.',
    plant: 'Plant-01 — Pune',
    permissions: ['dashboard', 'inventory', 'production', 'qc', 'reports'],
  },
  {
    id: 3,
    name: 'Ravi Kumar',
    email: 'operator@smarterp.in',
    password: 'operator123',
    role: 'operator',
    avatar: null,
    company: 'Bharat Auto Parts Ltd.',
    plant: 'Plant-02 — Nashik',
    permissions: ['dashboard', 'shop-floor'],
  },
];

const mockDelay = (data, ms = 400) =>
  new Promise((res) => setTimeout(() => res(data), ms));

const mockReject = (message, ms = 400) =>
  new Promise((_, rej) => setTimeout(() => rej({ message }), ms));

export const authApi = {
  login: async ({ email, password }) => {
    if (USE_MOCK) {
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        const { password: _p, ...safeUser } = user;
        return mockDelay({
          user: safeUser,
          token: `mock-jwt-${safeUser.role}-${Date.now()}`,
          refreshToken: `mock-refresh-${Date.now()}`,
        });
      }
      return mockReject('Invalid email or password.');
    }
    const res = await axiosInstance.post('/auth/login', { email, password });
    return res.data;
  },

  logout: async () => {
    if (USE_MOCK) return mockDelay({ success: true });
    const res = await axiosInstance.post('/auth/logout');
    return res.data;
  },

  refreshToken: async (refreshToken) => {
    if (USE_MOCK)
      return mockDelay({ token: `mock-jwt-refreshed-${Date.now()}` });
    const res = await axiosInstance.post('/auth/refresh', { refreshToken });
    return res.data;
  },

  forgotPassword: async ({ email }) => {
    if (USE_MOCK) {
      const exists = MOCK_USERS.some((u) => u.email === email);
      if (exists) return mockDelay({ success: true });
      return mockReject('No account found with that email address.');
    }
    const res = await axiosInstance.post('/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async ({ token, password }) => {
    if (USE_MOCK) return mockDelay({ success: true });
    const res = await axiosInstance.post('/auth/reset-password', { token, password });
    return res.data;
  },

  getMe: async () => {
    if (USE_MOCK) {
      const raw = localStorage.getItem('erp_user');
      if (raw) return mockDelay(JSON.parse(raw));
      return mockReject('Unauthenticated');
    }
    const res = await axiosInstance.get('/auth/me');
    return res.data;
  },

  getMockUsers: () =>
    MOCK_USERS.map(({ password: _p, ...u }) => u),
};
