import type { RecordItem } from '../types'

export const initialMockRecords: RecordItem[] = [
  {
    id: 'BOCW-2025-001',
    scheme: 'શિક્ષણ સહાય',
    category: 'Government Orders',
    recordDate: '2025-09-25',
    description:
      '[Demo record] Internal reference copy of a welfare scheme circular for education assistance. For UI demonstration only — not an official government order.',
    uploadedBy: 'PM – Ahmedabad',
    submittedAt: '2025-09-26T10:15:00',
    documents: [
      { id: 'd1', name: 'demo-education-order-summary.pdf', type: 'application/pdf', size: 245760, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-002',
    scheme: 'કુશળ શ્રમિક સહાય યોજના',
    category: 'Food Bills',
    recordDate: '2025-09-25',
    description:
      '[Demo record] Sample food bill documentation linked to a skill development camp. Amounts and vendor names are fictional for prototype testing.',
    uploadedBy: 'PM – Gandhinagar',
    submittedAt: '2025-09-25T14:30:00',
    documents: [
      { id: 'd2', name: 'demo-canteen-bill-sept.pdf', type: 'application/pdf', size: 189440, isSample: true },
      { id: 'd3', name: 'demo-meal-register.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 51200, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-003',
    scheme: 'તબીબી સહાય યોજના',
    category: 'Official Letters & Mails',
    recordDate: '2025-09-18',
    description:
      '[Demo record] Simulated inward mail regarding medical claim follow-up. Content is placeholder text for repository search and filter demos.',
    uploadedBy: 'PM – Vadodara',
    submittedAt: '2025-09-19T09:00:00',
    documents: [
      { id: 'd4', name: 'demo-inward-letter-scan.pdf', type: 'application/pdf', size: 320000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-004',
    scheme: 'નાનાજી દેશમુખ આવાસ યોજના',
    category: 'Meeting Minutes',
    recordDate: '2025-08-30',
    description:
      '[Demo record] Minutes of a district coordination meeting on housing subsidy awareness. Names and resolutions are illustrative only.',
    uploadedBy: 'PM – Ahmedabad',
    submittedAt: '2025-08-31T16:45:00',
    documents: [
      { id: 'd5', name: 'demo-meeting-minutes-aug.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 98304, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-005',
    scheme: 'પ્રધાનમંત્રી જીવન જ્યોત બીમા યોજના',
    category: 'Government Orders',
    recordDate: '2025-08-12',
    description:
      '[Demo record] Reference note on PMJJBY enrollment drive scheduling. Used to test category and date-range filters in the repository view.',
    uploadedBy: 'PM – Gandhinagar',
    submittedAt: '2025-08-13T11:20:00',
    documents: [
      { id: 'd6', name: 'demo-pmjjby-guideline-note.pdf', type: 'application/pdf', size: 410000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-006',
    scheme: 'હાઉસીંગ સબસીડી યોજના',
    category: 'Stall Bills',
    recordDate: '2025-07-22',
    description:
      '[Demo record] Stall rental and setup bills from a welfare awareness melā. Vendor details are fictional demonstration data.',
    uploadedBy: 'PM – Vadodara',
    submittedAt: '2025-07-23T13:10:00',
    documents: [
      { id: 'd7', name: 'demo-stall-invoice-july.pdf', type: 'application/pdf', size: 156000, isSample: true },
      { id: 'd8', name: 'demo-stall-photo.jpg', type: 'image/jpeg', size: 890000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-007',
    scheme: 'અંત્યેષ્ઠી સહાય યોજના',
    category: 'Official Letters & Mails',
    recordDate: '2025-07-05',
    description:
      '[Demo record] Outward acknowledgment letter template stored for mail repository workflow demonstration. Not issued to any beneficiary.',
    uploadedBy: 'PM – Ahmedabad',
    submittedAt: '2025-07-06T10:00:00',
    documents: [
      { id: 'd9', name: 'demo-outward-mail-draft.pdf', type: 'application/pdf', size: 220000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-008',
    scheme: 'વિશિષ્ટ કોચિગ યોજના',
    category: 'Food Bills',
    recordDate: '2025-06-15',
    description:
      '[Demo record] Catering bills for a special coaching batch inauguration event. Figures shown are for UI table layout samples only.',
    uploadedBy: 'PM – Gandhinagar',
    submittedAt: '2025-06-16T15:30:00',
    documents: [
      { id: 'd10', name: 'demo-catering-bill-june.pdf', type: 'application/pdf', size: 198000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-009',
    scheme: 'પ્રસૂતિ સહાય યોજના (પ્રસૂતિ પહેલા)',
    category: 'Meeting Minutes',
    recordDate: '2025-06-01',
    description:
      '[Demo record] Monthly review meeting minutes covering maternity assistance case processing timelines. Demonstration content only.',
    uploadedBy: 'PM – Vadodara',
    submittedAt: '2025-06-02T12:00:00',
    documents: [
      { id: 'd11', name: 'demo-review-minutes-june.pdf', type: 'application/pdf', size: 275000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-010',
    scheme: 'વ્યવસાયિક રોગોમાં સહાય યોજના',
    category: 'Government Orders',
    recordDate: '2025-05-20',
    description:
      '[Demo record] Administrative memo summarizing occupational disease assistance desk procedures. For internal prototype walkthrough.',
    uploadedBy: 'PM – Ahmedabad',
    submittedAt: '2025-05-21T09:45:00',
    documents: [
      { id: 'd12', name: 'demo-occupational-disease-memo.pdf', type: 'application/pdf', size: 302000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-011',
    scheme: 'અકસ્માત મૃત્યુ સહાય યોજના',
    category: 'Stall Bills',
    recordDate: '2025-04-10',
    description:
      '[Demo record] Equipment stall charges for a safety awareness camp. Used to populate multi-document and multi-category filter tests.',
    uploadedBy: 'PM – Gandhinagar',
    submittedAt: '2025-04-11T14:00:00',
    documents: [
      { id: 'd13', name: 'demo-equipment-stall-bill.pdf', type: 'application/pdf', size: 167000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-012',
    scheme: 'પી.એચ.ડી યોજના',
    category: 'Food Bills',
    recordDate: '2025-03-28',
    description:
      '[Demo record] Refreshment bills from a PHD scheme orientation session. All entries marked as demonstration data for the repository UI.',
    uploadedBy: 'PM – Vadodara',
    submittedAt: '2025-03-29T11:30:00',
    documents: [
      { id: 'd14', name: 'demo-refreshment-bill-march.pdf', type: 'application/pdf', size: 143000, isSample: true },
      { id: 'd15', name: 'demo-attendance-sheet.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 45000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-013',
    scheme: 'તબીબી સહાય યોજના(ક્લેમ)',
    category: 'Official Letters & Mails',
    recordDate: '2025-02-14',
    description:
      '[Demo record] Claim status inquiry correspondence sample. Enables GLO officer dashboard “recent records” and mail category views.',
    uploadedBy: 'PM – Ahmedabad',
    submittedAt: '2025-02-15T10:20:00',
    documents: [
      { id: 'd16', name: 'demo-claim-inquiry-mail.pdf', type: 'application/pdf', size: 210000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-014',
    scheme: 'પ્રસુતિ સહાય યોજના અને મુખ્યમંત્રી ભાગ્યલક્ષ્મી બોન્ડ યોજના',
    category: 'Meeting Minutes',
    recordDate: '2025-01-08',
    description:
      '[Demo record] Joint scheme orientation meeting minutes. Gujarati scheme name length tested in tables and detail panels.',
    uploadedBy: 'PM – Gandhinagar',
    submittedAt: '2025-01-09T16:00:00',
    documents: [
      { id: 'd17', name: 'demo-joint-scheme-minutes.pdf', type: 'application/pdf', size: 288000, isSample: true },
    ],
  },
  {
    id: 'BOCW-2025-015',
    scheme: 'શિક્ષણ સહાય',
    category: 'Stall Bills',
    recordDate: '2024-12-20',
    description:
      '[Demo record] Year-end documentation stall rental for education assistance outreach. Oldest sample record for date-range filtering.',
    uploadedBy: 'PM – Vadodara',
    submittedAt: '2024-12-21T09:00:00',
    documents: [
      { id: 'd18', name: 'demo-outreach-stall-dec.pdf', type: 'application/pdf', size: 175000, isSample: true },
    ],
  },
]
