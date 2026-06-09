import { useEffect, useState } from 'react';

const getStoredUser = () => {
  const stored = window.localStorage.getItem('pq_user');
  return stored ? JSON.parse(stored) : null;
};

export const useAuth = () => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('pq_user', JSON.stringify(user || {}));
  }, [user]);

  const login = (payload) => setUser(payload);
  const logout = () => {
    window.localStorage.removeItem('pq_user');
    setUser(null);
  };

  return { user, loading, login, logout };
};
