import React, { useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminApp from './AdminApp';

const AdminShell: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('yegna-admin-auth');
    if (stored === 'true') {
      setIsAuthed(true);
    }
  }, []);

  if (!isAuthed) {
    return <AdminLogin onAuthenticated={() => setIsAuthed(true)} />;
  }

  return <AdminApp />;
};

export default AdminShell;
