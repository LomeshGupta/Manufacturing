import { qcMock } from '../data/mock/qc.mock';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (d, ms = 350) => new Promise((r) => setTimeout(() => r(d), ms));

export const qcApi = {
  getInspections: (filters = {}) => {
    if (!USE_MOCK) return null;
    let data = [...qcMock.inspections];
    if (filters.status && filters.status !== 'All') data = data.filter(i => i.status === filters.status);
    if (filters.type && filters.type !== 'All') data = data.filter(i => i.type === filters.type);
    if (filters.search) { const s = filters.search.toLowerCase(); data = data.filter(i => i.item.toLowerCase().includes(s) || i.id.toLowerCase().includes(s) || i.batch.toLowerCase().includes(s)); }
    return delay({ inspections: data, total: data.length });
  },
  getRejections: () => USE_MOCK ? delay(qcMock.rejections) : null,
  getCheckpoints: () => USE_MOCK ? delay(qcMock.checkpoints) : null,
  createInspection: (data) => USE_MOCK ? delay({ id: `QC-${Date.now()}`, ...data }) : null,
  updateRejection: (id, data) => USE_MOCK ? delay({ id, ...data }) : null,
  getSummary: () => {
    if (!USE_MOCK) return null;
    const insp = qcMock.inspections;
    return delay({
      total: insp.length,
      passed: insp.filter(i => i.status === 'passed').length,
      failed: insp.filter(i => i.status === 'failed').length,
      totalQty: insp.reduce((a, i) => a + i.qty, 0),
      totalPassed: insp.reduce((a, i) => a + i.passed, 0),
      totalRejected: insp.reduce((a, i) => a + i.rejected, 0),
    });
  },
};
