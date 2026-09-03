import React, { useState } from 'react';
import Login from './pages/Login';
import CreatePaper from './pages/CreatePaper';

export default function AppRoutes() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // Logged in user enters CreatePaper dashboard
  return <CreatePaper faculty={user} onLogout={() => setUser(null)} />;
}
