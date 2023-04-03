import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedOut(true);
  }

  if (loggedOut) {
    navigate(`/login`);
  }

  return (
    <div>
      <h1>Are you sure you want to log out?</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Logout;