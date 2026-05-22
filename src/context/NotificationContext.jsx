import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'warning', title: 'Material Shortage', message: 'Steel rods below reorder level at Plant-01', time: '5m ago', read: false },
  { id: 2, type: 'error', title: 'Machine Downtime', message: 'CNC Machine #3 halted — maintenance required', time: '22m ago', read: false },
  { id: 3, type: 'info', title: 'PO Approved', message: 'PO-2024-0892 approved by Finance', time: '1h ago', read: false },
  { id: 4, type: 'success', title: 'Production Order Complete', message: 'MO-2024-1123 completed — 500 units', time: '2h ago', read: true },
  { id: 5, type: 'warning', title: 'QC Failure', message: 'Batch #B-4421 rejected — 12 units', time: '3h ago', read: true },
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead, markRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
