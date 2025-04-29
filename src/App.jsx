import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Login route */}
      <Route path="/" element={<LoginPage />} />

      {/* Admin layout protected by admin role */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      />

      {/* Employee layout protected by employee role */}
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute allowedRole="employee">
            <EmployeeLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
