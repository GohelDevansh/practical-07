

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateDonorProfile from "./pages/CreateDonorProfile";
import CreateRequest from "./pages/CreateRequest";
import MatchedDonors from "./pages/MatchedDonors";
import RequestHistory from "./pages/RequestHistory";
import { AuthProvider } from "./context/AuthContext";
import RequestDetails from "./pages/RequestDetails";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/donor"
            element={
              <ProtectedRoute allowedRole="donor">
                <DonorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hospital"
            element={
              <ProtectedRoute allowedRole="hospital">
                <HospitalDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-donor"
            element={
              <ProtectedRoute allowedRole="donor">
                <CreateDonorProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-request"
            element={
              <ProtectedRoute allowedRole="hospital">
                <CreateRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/matched-donors"
            element={
              <ProtectedRoute allowedRole="hospital">
                <MatchedDonors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute allowedRole="hospital">
                <RequestHistory />
              </ProtectedRoute>
            }
          /> 
          {/* <Route
  path="/request/:id"
  element={
    <ProtectedRoute allowedRole="hospital">
      <RequestDetails />
    </ProtectedRoute>
  }
/> */}        <Route
  path="/request/:id"
  element={
    <ProtectedRoute>
      <RequestDetails />
    </ProtectedRoute>
  }
/>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;