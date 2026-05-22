export const qcMock = {
  inspections: [
    { id: 'QC-2024-0441', date: '2024-04-18', ref: 'GRN-2024-0421', type: 'incoming', item: 'Steel Rod 40mm', itemId: 'RM-1001', batch: 'B-4421', qty: 500, passed: 498, rejected: 2, inspector: 'Kavita S.', status: 'passed' },
    { id: 'QC-2024-0440', date: '2024-04-18', ref: 'MO-2024-1123', type: 'in-process', item: 'Gearbox Housing A1', itemId: 'FG-2001', batch: 'B-4420', qty: 100, passed: 97, rejected: 3, inspector: 'Rajesh P.', status: 'passed' },
    { id: 'QC-2024-0439', date: '2024-04-17', ref: 'GRN-2024-0417', type: 'incoming', item: 'Bearing 6204 ZZ', itemId: 'RM-1004', batch: 'B-4419', qty: 200, passed: 188, rejected: 12, inspector: 'Kavita S.', status: 'failed' },
    { id: 'QC-2024-0438', date: '2024-04-17', ref: 'MO-2024-1122', type: 'final', item: 'Drive Shaft 32mm', itemId: 'FG-2002', batch: 'B-4418', qty: 50, passed: 50, rejected: 0, inspector: 'Rajesh P.', status: 'passed' },
    { id: 'QC-2024-0437', date: '2024-04-16', ref: 'MO-2024-1121', type: 'in-process', item: 'Brake Disc Type-B', itemId: 'FG-2003', batch: 'B-4417', qty: 80, passed: 75, rejected: 5, inspector: 'Anand M.', status: 'passed' },
    { id: 'QC-2024-0436', date: '2024-04-16', ref: 'GRN-2024-0416', type: 'incoming', item: 'O-Ring 25mm NBR', itemId: 'RM-1007', batch: 'B-4416', qty: 1000, passed: 990, rejected: 10, inspector: 'Kavita S.', status: 'passed' },
  ],
  rejections: [
    { id: 'REJ-2024-0088', date: '2024-04-18', qcRef: 'QC-2024-0441', item: 'Steel Rod 40mm', batch: 'B-4421', qty: 2, reason: 'Dimensional deviation > 0.2mm', action: 'Return to vendor', status: 'pending' },
    { id: 'REJ-2024-0087', date: '2024-04-17', qcRef: 'QC-2024-0439', item: 'Bearing 6204 ZZ', batch: 'B-4419', qty: 12, reason: 'Surface corrosion', action: 'Scrap', status: 'approved' },
    { id: 'REJ-2024-0086', date: '2024-04-16', qcRef: 'QC-2024-0437', item: 'Brake Disc Type-B', batch: 'B-4417', qty: 5, reason: 'Surface finish below spec', action: 'Rework', status: 'in-progress' },
  ],
  checkpoints: [
    { id: 'CP-001', name: 'Incoming Inspection', module: 'GRN', active: true },
    { id: 'CP-002', name: 'In-Process Inspection', module: 'Production', active: true },
    { id: 'CP-003', name: 'Final Inspection', module: 'Production', active: true },
    { id: 'CP-004', name: 'Outgoing Inspection', module: 'Dispatch', active: false },
  ],
};
