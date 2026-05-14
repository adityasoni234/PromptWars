import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorLayout from './pages/doctor/DoctorLayout';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorAnalytics from './pages/doctor/DoctorAnalytics';
import DoctorMessages from './pages/doctor/DoctorMessages';
import DoctorStaff from './pages/doctor/DoctorStaff';
import PatientLayout from './pages/patient/PatientLayout';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientMedications from './pages/patient/PatientMedications';
import PatientSymptoms from './pages/patient/PatientSymptoms';
import PatientSOS from './pages/patient/PatientSOS';
import PatientChatbot from './pages/patient/PatientChatbot';
import PatientDocuments from './pages/patient/PatientDocuments';
import PatientDoctors from './pages/patient/PatientDoctors';

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="loading-spinner" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === 'doctor' ? '/doctor' : '/patient'} replace />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'doctor' ? '/doctor' : '/patient'} replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={user.role === 'doctor' ? '/doctor' : '/patient'} replace /> : <Register />} />

      {/* Doctor Routes */}
      <Route path="/doctor" element={<ProtectedRoute role="doctor"><DoctorLayout /></ProtectedRoute>}>
        <Route index element={<DoctorDashboard />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="analytics" element={<DoctorAnalytics />} />
        <Route path="messages" element={<DoctorMessages />} />
        <Route path="staff" element={<DoctorStaff />} />
      </Route>

      {/* Patient Routes */}
      <Route path="/patient" element={<ProtectedRoute role="patient"><PatientLayout /></ProtectedRoute>}>
        <Route index element={<PatientDashboard />} />
        <Route path="doctors" element={<PatientDoctors />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="medications" element={<PatientMedications />} />
        <Route path="symptoms" element={<PatientSymptoms />} />
        <Route path="chat" element={<PatientChatbot />} />
        <Route path="documents" element={<PatientDocuments />} />
        <Route path="sos" element={<PatientSOS />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
