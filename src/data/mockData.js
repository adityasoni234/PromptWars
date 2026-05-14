// ─── Mock Data for MediSync Pro ───

export const DOCTOR_PATIENTS = [
  { id: 1, name: 'Priya Mehta', age: 28, gender: 'Female', blood: 'O+', phone: '+91 98765 43210', condition: 'Hypertension', status: 'stable', lastVisit: '2026-04-01', nextAppt: '2026-04-10', avatar: 'PM', risk: 'low', allergies: ['Penicillin'], weight: '58 kg', height: '162 cm' },
  { id: 2, name: 'Rahul Verma', age: 45, gender: 'Male', blood: 'A+', phone: '+91 91234 56789', condition: 'Diabetes Type 2', status: 'monitoring', lastVisit: '2026-03-28', nextAppt: '2026-04-08', avatar: 'RV', risk: 'medium', allergies: ['Sulfa'], weight: '82 kg', height: '175 cm' },
  { id: 3, name: 'Sunita Patel', age: 62, gender: 'Female', blood: 'B-', phone: '+91 99887 65432', condition: 'Arthritis', status: 'critical', lastVisit: '2026-04-03', nextAppt: '2026-04-05', avatar: 'SP', risk: 'high', allergies: [], weight: '65 kg', height: '155 cm' },
  { id: 4, name: 'Amit Shah', age: 35, gender: 'Male', blood: 'AB+', phone: '+91 88765 43210', condition: 'Asthma', status: 'stable', lastVisit: '2026-03-20', nextAppt: '2026-04-15', avatar: 'AS', risk: 'low', allergies: ['Aspirin'], weight: '70 kg', height: '170 cm' },
  { id: 5, name: 'Kavitha Nair', age: 52, gender: 'Female', blood: 'O-', phone: '+91 77654 32109', condition: 'Thyroid', status: 'monitoring', lastVisit: '2026-03-25', nextAppt: '2026-04-12', avatar: 'KN', risk: 'medium', allergies: ['Ibuprofen'], weight: '72 kg', height: '160 cm' },
  { id: 6, name: 'Dev Malhotra', age: 19, gender: 'Male', blood: 'A-', phone: '+91 66543 21098', condition: 'Anxiety', status: 'stable', lastVisit: '2026-03-30', nextAppt: '2026-04-20', avatar: 'DM', risk: 'low', allergies: [], weight: '65 kg', height: '178 cm' },
];

export const APPOINTMENTS = [
  { id: 1, patientId: 2, patientName: 'Rahul Verma', avatar: 'RV', type: 'Follow-up', date: '2026-04-04', time: '09:00', duration: 30, status: 'confirmed', notes: 'Blood sugar review', mode: 'In-person' },
  { id: 2, patientId: 1, patientName: 'Priya Mehta', avatar: 'PM', type: 'Consultation', date: '2026-04-04', time: '10:30', duration: 45, status: 'confirmed', notes: 'BP monitoring', mode: 'Video' },
  { id: 3, patientId: 3, patientName: 'Sunita Patel', avatar: 'SP', type: 'Emergency', date: '2026-04-04', time: '11:00', duration: 60, status: 'urgent', notes: 'Severe joint pain', mode: 'In-person' },
  { id: 4, patientId: 4, patientName: 'Amit Shah', avatar: 'AS', type: 'Routine Check', date: '2026-04-04', time: '14:00', duration: 30, status: 'confirmed', notes: 'Asthma inhaler refill', mode: 'In-person' },
  { id: 5, patientId: 5, patientName: 'Kavitha Nair', avatar: 'KN', type: 'Lab Review', date: '2026-04-04', time: '15:30', duration: 30, status: 'pending', notes: 'TSH levels review', mode: 'Video' },
  { id: 6, patientId: 6, patientName: 'Dev Malhotra', avatar: 'DM', type: 'Therapy', date: '2026-04-05', time: '09:00', duration: 60, status: 'confirmed', notes: 'Cognitive therapy session', mode: 'Video' },
  { id: 7, patientId: 1, patientName: 'Priya Mehta', avatar: 'PM', type: 'Follow-up', date: '2026-04-10', time: '11:00', duration: 30, status: 'confirmed', notes: 'Routine BP check', mode: 'In-person' },
];

export const DOCTOR_VITALS_CHART = [
  { date: 'Mar 29', sys: 138, dia: 88, pulse: 78 },
  { date: 'Mar 30', sys: 135, dia: 85, pulse: 75 },
  { date: 'Mar 31', sys: 140, dia: 90, pulse: 80 },
  { date: 'Apr 01', sys: 132, dia: 82, pulse: 72 },
  { date: 'Apr 02', sys: 128, dia: 80, pulse: 70 },
  { date: 'Apr 03', sys: 125, dia: 78, pulse: 68 },
  { date: 'Apr 04', sys: 122, dia: 76, pulse: 66 },
];

export const PATIENT_VITALS = {
  heartRate: 72,
  bloodPressure: '122/76',
  temperature: 98.4,
  oxygen: 98,
  glucose: 95,
  weight: 58,
};

export const PATIENT_MEDICATIONS = [
  { id: 1, name: 'Amlodipine', dose: '5mg', frequency: 'Once daily', time: 'Morning', icon: '💊', taken: true, refillDue: '2026-04-15', purpose: 'Blood Pressure', stock: 4, totalPrescribed: 30 },
  { id: 2, name: 'Metformin', dose: '500mg', frequency: 'Twice daily', time: 'Morning & Night', icon: '🔵', taken: false, refillDue: '2026-04-20', purpose: 'Blood Sugar', stock: 15, totalPrescribed: 60 },
  { id: 3, name: 'Vitamin D3', dose: '2000 IU', frequency: 'Once daily', time: 'Afternoon', icon: '🟡', taken: true, refillDue: '2026-05-01', purpose: 'Supplement', stock: 24, totalPrescribed: 30 },
  { id: 4, name: 'Lisinopril', dose: '10mg', frequency: 'Once daily', time: 'Night', icon: '🟢', taken: false, refillDue: '2026-04-18', purpose: 'Heart Health', stock: 2, totalPrescribed: 30 },
];

export const PATIENT_APPOINTMENTS = [
  { id: 1, doctor: 'Dr. Arjun Sharma', spec: 'Cardiologist', date: '2026-04-04', time: '10:30', mode: 'Video', status: 'confirmed', avatar: 'AS' },
  { id: 2, doctor: 'Dr. Arjun Sharma', spec: 'Cardiologist', date: '2026-04-10', time: '11:00', mode: 'In-person', status: 'confirmed', avatar: 'AS' },
  { id: 3, doctor: 'Dr. Preethi R.', spec: 'Dermatologist', date: '2026-04-18', time: '14:00', mode: 'In-person', status: 'pending', avatar: 'PR' },
];

export const PATIENT_HEALTH_TREND = [
  { date: 'Mar 29', bp: 138, glucose: 102, weight: 59 },
  { date: 'Mar 30', bp: 135, glucose: 98, weight: 58.5 },
  { date: 'Mar 31', bp: 130, glucose: 96, weight: 58.5 },
  { date: 'Apr 01', bp: 128, glucose: 95, weight: 58.2 },
  { date: 'Apr 02', bp: 125, glucose: 94, weight: 58 },
  { date: 'Apr 03', bp: 123, glucose: 93, weight: 58 },
  { date: 'Apr 04', bp: 122, glucose: 95, weight: 58 },
];

export const SYMPTOMS_LIST = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Chest Pain', 'Shortness of Breath',
  'Nausea', 'Dizziness', 'Stomach Pain', 'Back Pain', 'Sore Throat', 'Runny Nose',
  'Joint Pain', 'Skin Rash', 'Palpitations', 'Swelling', 'Blurred Vision', 'Anxiety',
];

export const DOCTOR_STATS = {
  totalPatients: 124,
  todayAppointments: 8,
  pendingReports: 5,
  criticalCases: 2,
  satisfactionRate: 97,
  avgConsultTime: 32,
};

export const CHAT_HISTORY = [
  { id: 1, from: 'doctor', text: 'Hello Priya, how are you feeling today?', time: '09:15 AM' },
  { id: 2, from: 'patient', text: 'I\'ve been feeling a bit dizzy in the mornings, doctor.', time: '09:17 AM' },
  { id: 3, from: 'doctor', text: 'That could be related to the new medication. Let\'s discuss this during your appointment. Have you been taking your BP readings regularly?', time: '09:18 AM' },
  { id: 4, from: 'patient', text: 'Yes! This morning it was 120/78. Is that okay?', time: '09:20 AM' },
  { id: 5, from: 'doctor', text: 'That\'s actually great progress! Much better than last week. Keep it up! 👍', time: '09:21 AM' },
];

export const NOTIFICATIONS = [
  { id: 1, type: 'urgent', text: 'Sunita Patel: Critical pain level reported', time: '2 min ago', read: false },
  { id: 2, type: 'appointment', text: 'Appointment with Rahul Verma in 30 minutes', time: '10 min ago', read: false },
  { id: 3, type: 'lab', text: 'Lab results ready for Kavitha Nair', time: '1 hr ago', read: false },
  { id: 4, type: 'message', text: 'New message from Priya Mehta', time: '2 hr ago', read: true },
];

export const PATIENT_SYMPTOM_LOGS = [
  { id: 1, patientId: 1, patientName: 'Priya Mehta', date: '2026-04-03', time: '08:30 AM', symptoms: 'Dizziness, mild nausea', aiDiagnosis: 'Possible side effect of new BP medication. Monitor hydration. Routine doctor checkup recommended.', severity: 'Medium' }
];
