import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const getStoredUser = () => {
  const stored = window.localStorage.getItem('pq_user');
  return stored ? JSON.parse(stored) : null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('pq_user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('pq_user');
    }
  }, [user]);

  const login = (payload) => setUser(payload);
  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
