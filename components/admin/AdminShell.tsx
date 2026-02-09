import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminApp from './AdminApp';

const AdminShell: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  if (!isAuthed) {
    return <AdminLogin onAuthenticated={() => setIsAuthed(true)} />;
  }

  return <AdminApp onLogout={() => setIsAuthed(false)} />;
};

export default AdminShell;
