import React, { useState } from 'react';
import Login from './pages/Login.jsx';
import CreatePaper from './pages/CreatePaper.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import SuperAdminPortal from './pages/SuperAdminPortal.jsx';
import { ROLES } from './config/rbacRules.js';

export default function AppRoutes() {
  const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <Login onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  // Developer Super Cockpit
  if (currentUser.role === ROLES.DEVELOPER) {
    return <SuperAdminPortal user={currentUser} onLogout={() => setCurrentUser(null)} />;
  }

  // Principal / Director / VP Management Dashboard
  if ([ROLES.DIRECTOR, ROLES.PRINCIPAL, ROLES.VICE_PRINCIPAL].includes(currentUser.role)) {
    return <AdminDashboard user={currentUser} onLogout={() => setCurrentUser(null)} />;
  }

  // Standard Subject Teacher Paper Generator
  return <CreatePaper faculty={currentUser} onLogout={() => setCurrentUser(null)} />;
}
