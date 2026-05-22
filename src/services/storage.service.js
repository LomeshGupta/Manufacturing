const PREFIX = 'erp_';

export const storage = {
  get: (key) => {
    try {
      const raw = localStorage.getItem(`${PREFIX}${key}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write failed:', e);
    }
  },
  remove: (key) => localStorage.removeItem(`${PREFIX}${key}`),
  clear: () => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};
