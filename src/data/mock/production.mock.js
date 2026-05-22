export const productionMock = {
  boms: [
    {
      id: 'BOM-001', product: 'Gearbox Housing A1', productId: 'FG-2001', version: 'v2.1',
      uom: 'pcs', yield: 1, status: 'active', lastUpdated: '2024-03-10',
      components: [
        { itemId: 'RM-1008', item: 'Cast Iron Blank 200mm', qty: 1, uom: 'pcs', scrap: 2 },
        { itemId: 'RM-1001', item: 'Steel Rod 40mm', qty: 0.8, uom: 'kg', scrap: 5 },
        { itemId: 'RM-1004', item: 'Bearing 6204 ZZ', qty: 2, uom: 'pcs', scrap: 0 },
        { itemId: 'RM-1006', item: 'M8 Hex Bolt', qty: 8, uom: 'pcs', scrap: 0 },
        { itemId: 'RM-1007', item: 'O-Ring 25mm', qty: 2, uom: 'pcs', scrap: 5 },
      ],
    },
    {
      id: 'BOM-002', product: 'Drive Shaft 32mm', productId: 'FG-2002', version: 'v1.4',
      uom: 'pcs', yield: 1, status: 'active', lastUpdated: '2024-02-22',
      components: [
        { itemId: 'RM-1001', item: 'Steel Rod 40mm', qty: 1.2, uom: 'kg', scrap: 3 },
        { itemId: 'RM-1006', item: 'M8 Hex Bolt', qty: 4, uom: 'pcs', scrap: 0 },
      ],
    },
    {
      id: 'BOM-003', product: 'Brake Disc Type-B', productId: 'FG-2003', version: 'v1.0',
      uom: 'pcs', yield: 1, status: 'active', lastUpdated: '2024-01-15',
      components: [
        { itemId: 'RM-1008', item: 'Cast Iron Blank 200mm', qty: 1, uom: 'pcs', scrap: 4 },
        { itemId: 'RM-1001', item: 'Steel Rod 40mm', qty: 0.5, uom: 'kg', scrap: 2 },
      ],
    },
    {
      id: 'BOM-004', product: 'Bracket Assembly X4', productId: 'FG-2004', version: 'v3.2',
      uom: 'pcs', yield: 1, status: 'draft', lastUpdated: '2024-04-01',
      components: [
        { itemId: 'RM-1003', item: 'MS Flat Bar 50x6mm', qty: 0.4, uom: 'mtr', scrap: 5 },
        { itemId: 'RM-1006', item: 'M8 Hex Bolt', qty: 6, uom: 'pcs', scrap: 0 },
      ],
    },
  ],

  productionOrders: [
    { id: 'MO-2024-1123', product: 'Gearbox Housing A1', productId: 'FG-2001', bom: 'BOM-001', qty: 500, completedQty: 500, rejectedQty: 8, status: 'completed', workcenter: 'CNC-01', startDate: '2024-04-15', endDate: '2024-04-18', plannedHours: 40, actualHours: 42 },
    { id: 'MO-2024-1122', product: 'Drive Shaft 32mm', productId: 'FG-2002', bom: 'BOM-002', qty: 200, completedQty: 148, rejectedQty: 3, status: 'in-progress', workcenter: 'CNC-02', startDate: '2024-04-17', endDate: '2024-04-20', plannedHours: 28, actualHours: 18 },
    { id: 'MO-2024-1121', product: 'Brake Disc Type-B', productId: 'FG-2003', bom: 'BOM-003', qty: 350, completedQty: 210, rejectedQty: 5, status: 'in-progress', workcenter: 'CNC-01', startDate: '2024-04-16', endDate: '2024-04-21', plannedHours: 35, actualHours: 22 },
    { id: 'MO-2024-1120', product: 'Bracket Assembly X4', productId: 'FG-2004', bom: 'BOM-004', qty: 750, completedQty: 0, rejectedQty: 0, status: 'pending', workcenter: 'PRESS-01', startDate: '2024-04-20', endDate: '2024-04-24', plannedHours: 20, actualHours: 0 },
    { id: 'MO-2024-1119', product: 'Frame Weld Set W2', productId: 'FG-2005', bom: 'BOM-005', qty: 100, completedQty: 68, rejectedQty: 2, status: 'in-progress', workcenter: 'WELD-01', startDate: '2024-04-17', endDate: '2024-04-21', plannedHours: 24, actualHours: 16 },
    { id: 'MO-2024-1118', product: 'Spindle Assembly S7', productId: 'FG-2006', bom: 'BOM-006', qty: 60, completedQty: 60, rejectedQty: 1, status: 'completed', workcenter: 'LATHE-01', startDate: '2024-04-14', endDate: '2024-04-17', plannedHours: 18, actualHours: 17 },
  ],

  workcenters: [
    { id: 'CNC-01', name: 'CNC Machine #1', type: 'CNC Machining', capacity: 8, utilization: 82, status: 'running', operator: 'Raj Kumar', currentJob: 'MO-2024-1121' },
    { id: 'CNC-02', name: 'CNC Machine #2', type: 'CNC Machining', capacity: 8, utilization: 76, status: 'running', operator: 'Priya Singh', currentJob: 'MO-2024-1122' },
    { id: 'CNC-03', name: 'CNC Machine #3', type: 'CNC Machining', capacity: 8, utilization: 0, status: 'stopped', operator: null, currentJob: null, issue: 'Spindle bearing failure' },
    { id: 'LATHE-01', name: 'Lathe #1', type: 'Turning', capacity: 8, utilization: 91, status: 'running', operator: 'Amit Verma', currentJob: 'MO-2024-1118' },
    { id: 'LATHE-02', name: 'Lathe #2', type: 'Turning', capacity: 8, utilization: 0, status: 'idle', operator: null, currentJob: null },
    { id: 'WELD-01', name: 'Welding Station #1', type: 'Welding', capacity: 8, utilization: 88, status: 'running', operator: 'Suresh Nair', currentJob: 'MO-2024-1119' },
    { id: 'PRESS-01', name: 'Press #1', type: 'Pressing', capacity: 8, utilization: 0, status: 'idle', operator: null, currentJob: null },
  ],

  mrpSuggestions: [
    { id: 'MRP-001', itemId: 'RM-1001', item: 'Steel Rod 40mm', currentStock: 1240, requiredQty: 2400, suggestedPOQty: 2000, vendor: 'Tata Steel Ltd.', leadDays: 7, urgency: 'medium' },
    { id: 'MRP-002', itemId: 'RM-1002', item: 'Aluminium Sheet 3mm', currentStock: 80, requiredQty: 500, suggestedPOQty: 500, vendor: 'Bharat Forge', leadDays: 5, urgency: 'high' },
    { id: 'MRP-003', itemId: 'RM-1004', item: 'Bearing 6204 ZZ', currentStock: 45, requiredQty: 200, suggestedPOQty: 300, vendor: 'Sundaram Fasteners', leadDays: 3, urgency: 'critical' },
    { id: 'MRP-004', itemId: 'RM-1008', item: 'Cast Iron Blank', currentStock: 310, requiredQty: 850, suggestedPOQty: 400, vendor: 'Tata Steel Ltd.', leadDays: 10, urgency: 'medium' },
  ],
};
