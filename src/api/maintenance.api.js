import { maintenanceMock } from '../data/mock/maintenance.mock';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (d, ms = 350) => new Promise((r) => setTimeout(() => r(d), ms));

export const maintenanceApi = {
  getMachines: () => USE_MOCK ? delay(maintenanceMock.machines) : null,
  getMachine: (id) => USE_MOCK ? delay(maintenanceMock.machines.find(m => m.id === id)) : null,
  getSchedules: (filters = {}) => {
    if (!USE_MOCK) return null;
    let data = [...maintenanceMock.schedules];
    if (filters.priority && filters.priority !== 'All') data = data.filter(s => s.priority === filters.priority);
    if (filters.status && filters.status !== 'All') data = data.filter(s => s.status === filters.status);
    return delay(data);
  },
  createSchedule: (data) => USE_MOCK ? delay({ id: `MS-${Date.now()}`, status: 'scheduled', ...data }) : null,
  updateSchedule: (id, data) => USE_MOCK ? delay({ id, ...data }) : null,
  completeSchedule: (id) => USE_MOCK ? delay({ success: true, id, status: 'completed' }) : null,
};
