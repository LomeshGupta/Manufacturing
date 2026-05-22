export const procurementMock = {
  purchaseOrders: [
    { id: 'PO-2024-0892', vendor: 'Tata Steel Ltd.', vendorId: 'V-001', date: '2024-04-15', expectedDate: '2024-04-22', items: 3, totalValue: 248000, status: 'approved', plant: 'Plant-01' },
    { id: 'PO-2024-0891', vendor: 'Sundaram Fasteners', vendorId: 'V-003', date: '2024-04-14', expectedDate: '2024-04-20', items: 5, totalValue: 42500, status: 'sent', plant: 'Plant-01' },
    { id: 'PO-2024-0890', vendor: 'Bharat Forge', vendorId: 'V-002', date: '2024-04-13', expectedDate: '2024-04-19', items: 2, totalValue: 186000, status: 'partially-received', plant: 'Plant-02' },
    { id: 'PO-2024-0889', vendor: 'Minda Industries', vendorId: 'V-004', date: '2024-04-12', expectedDate: '2024-04-18', items: 4, totalValue: 74200, status: 'received', plant: 'Plant-01' },
    { id: 'PO-2024-0888', vendor: 'Lumax Auto', vendorId: 'V-005', date: '2024-04-11', expectedDate: '2024-04-17', items: 2, totalValue: 31800, status: 'received', plant: 'Plant-01' },
    { id: 'PO-2024-0887', vendor: 'Tata Steel Ltd.', vendorId: 'V-001', date: '2024-04-10', expectedDate: '2024-04-16', items: 1, totalValue: 95000, status: 'cancelled', plant: 'Plant-02' },
    { id: 'PO-2024-0886', vendor: 'Sundaram Fasteners', vendorId: 'V-003', date: '2024-04-09', expectedDate: '2024-04-15', items: 6, totalValue: 28600, status: 'received', plant: 'Plant-01' },
    { id: 'PO-2024-0885', vendor: 'Bharat Forge', vendorId: 'V-002', date: '2024-04-08', expectedDate: '2024-04-14', items: 3, totalValue: 312000, status: 'draft', plant: 'Plant-01' },
  ],

  poLineItems: {
    'PO-2024-0892': [
      { itemId: 'RM-1001', item: 'Steel Rod 40mm', qty: 2000, uom: 'kg', unitPrice: 85, total: 170000, receivedQty: 0 },
      { itemId: 'RM-1003', item: 'MS Flat Bar 50x6mm', qty: 500, uom: 'mtr', unitPrice: 62, total: 31000, receivedQty: 0 },
      { itemId: 'RM-1008', item: 'Cast Iron Blank', qty: 90, uom: 'pcs', unitPrice: 520, total: 46800, receivedQty: 0 },
    ],
  },

  grns: [
    { id: 'GRN-2024-0421', date: '2024-04-18', po: 'PO-2024-0889', vendor: 'Minda Industries', items: 3, totalValue: 74200, status: 'qc-pending', receivedBy: 'Suresh R.' },
    { id: 'GRN-2024-0420', date: '2024-04-17', po: 'PO-2024-0888', vendor: 'Lumax Auto', items: 2, totalValue: 31800, status: 'qc-passed', receivedBy: 'Ravi K.' },
    { id: 'GRN-2024-0419', date: '2024-04-16', po: 'PO-2024-0887', vendor: 'Tata Steel Ltd.', items: 4, totalValue: 95000, status: 'stocked', receivedBy: 'Suresh R.' },
    { id: 'GRN-2024-0418', date: '2024-04-15', po: 'PO-2024-0886', vendor: 'Sundaram Fasteners', items: 6, totalValue: 28600, status: 'stocked', receivedBy: 'Deepak R.' },
    { id: 'GRN-2024-0417', date: '2024-04-14', po: 'PO-2024-0890', vendor: 'Bharat Forge', items: 1, totalValue: 93000, status: 'qc-failed', receivedBy: 'Priya M.' },
  ],

  vendorBills: [
    { id: 'BILL-2024-0312', vendor: 'Tata Steel Ltd.', grn: 'GRN-2024-0419', date: '2024-04-16', dueDate: '2024-05-16', amount: 95000, status: 'pending', paymentTerms: 'Net 30' },
    { id: 'BILL-2024-0311', vendor: 'Sundaram Fasteners', grn: 'GRN-2024-0418', date: '2024-04-15', dueDate: '2024-04-29', amount: 28600, status: 'paid', paymentTerms: 'Net 14' },
    { id: 'BILL-2024-0310', vendor: 'Lumax Auto', grn: 'GRN-2024-0420', date: '2024-04-17', dueDate: '2024-05-01', amount: 31800, status: 'pending', paymentTerms: 'Net 14' },
    { id: 'BILL-2024-0309', vendor: 'Bharat Forge', grn: 'GRN-2024-0417', date: '2024-04-14', dueDate: '2024-05-14', amount: 93000, status: 'disputed', paymentTerms: 'Net 30' },
  ],

  vendors: [
    { id: 'V-001', name: 'Tata Steel Ltd.', gstin: '27AAACT2727Q1ZW', contact: 'Nikhil Shah', phone: '9820012345', city: 'Mumbai', rating: 4.7, totalOrders: 24, status: 'active' },
    { id: 'V-002', name: 'Bharat Forge', gstin: '27AABCB1234A1ZX', contact: 'Anand Mehta', phone: '9876543210', city: 'Pune', rating: 4.3, totalOrders: 18, status: 'active' },
    { id: 'V-003', name: 'Sundaram Fasteners', gstin: '33AAACS9999B1ZY', contact: 'Priya Rajan', phone: '9444012345', city: 'Chennai', rating: 4.5, totalOrders: 32, status: 'active' },
    { id: 'V-004', name: 'Minda Industries', gstin: '07AAACD7777C1ZZ', contact: 'Rohit Kapoor', phone: '9811234567', city: 'Delhi', rating: 3.8, totalOrders: 11, status: 'active' },
    { id: 'V-005', name: 'Lumax Auto', gstin: '07AAACL6666D1ZW', contact: 'Sanjay Batra', phone: '9801234567', city: 'Gurgaon', rating: 4.1, totalOrders: 9, status: 'active' },
  ],
};
