import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import auth, { logout as logoutAction } from "./utils/auth";

function PrivateRoute({ children }) {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to="/login" />;
}

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    auth.logout();
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <DashboardPage onLogout={onLogout} />
        </PrivateRoute>
      } />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}