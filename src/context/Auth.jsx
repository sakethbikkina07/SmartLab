import { createContext, useContext, useState } from 'react';
import { http } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const DEMO = {
  superadmin: {
    name: 'Aarav Mehta',
    email: 'super@smartlab.edu',
  },
  admin: {
    name: 'Dr. Kavya Rao',
    email: 'admin@smartlab.edu',
  },
  hod: {
    name: 'Prof. Rohit Sharma',
    email: 'hod@smartlab.edu',
  },
  faculty: {
    name: 'Dr. Ananya Iyer',
    email: 'faculty@smartlab.edu',
  },
  student: {
    name: 'Sneha Reddy',
    email: 'student@smartlab.edu',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sl_user') || 'null');
    } catch {
      return null;
    }
  });

  const login = async (role, customEmail) => {
    const email = customEmail || DEMO[role]?.email;

    // Check local registration requests list to verify approval status
    const reqs = JSON.parse(localStorage.getItem('sl_reg_requests') || '[]');
    const matchingReq = reqs.find((r) => r.email?.toLowerCase() === email?.toLowerCase());

    if (matchingReq && matchingReq.status === 'Pending') {
      const err = new Error('Your registration request is pending approval by the Super Admin. You cannot log in until approved.');
      err.pendingApproval = true;
      throw err;
    }
    if (matchingReq && matchingReq.status === 'Rejected') {
      throw new Error('Your registration request was rejected by the Super Admin.');
    }

    try {
      const res = await http.post('/auth/login', { role, email });
      if (res.data?.token) {
        localStorage.setItem('sl_token', res.data.token);
      }
      const u = res.data?.user || { role, ...(DEMO[role] || { name: 'User', email }) };
      localStorage.setItem('sl_user', JSON.stringify(u));
      setUser(u);
      return u;
    } catch (err) {
      if (err.response?.data?.pendingApproval || err.response?.data?.error?.includes('pending')) {
        const error = new Error(err.response?.data?.error || 'Registration pending approval by Super Admin.');
        error.pendingApproval = true;
        throw error;
      }
      // Demo fallback if backend is offline and not pending
      const u = { role, ...DEMO[role] };
      localStorage.setItem('sl_user', JSON.stringify(u));
      setUser(u);
      return u;
    }
  };

  const register = async (userData) => {
    const role = userData.role || 'student';
    if (role === 'superadmin') {
      throw new Error('Super Admin registration is not allowed.');
    }

    const newRequest = {
      id: Date.now(),
      role,
      name: userData.name,
      email: userData.email,
      college: userData.college || 'Vignan Institute of Tech',
      department: userData.department || 'Computer Science & Engineering',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...userData,
    };

    // Store in pending registration requests in localStorage
    const existingReqs = JSON.parse(localStorage.getItem('sl_reg_requests') || '[]');
    localStorage.setItem('sl_reg_requests', JSON.stringify([newRequest, ...existingReqs]));

    // Background or direct sync to backend
    try {
      const res = await http.post('/auth/register', userData);
      return res.data;
    } catch (err) {
      console.warn('Backend register call returned:', err.message);
      return { success: true, requiresApproval: true, request: newRequest };
    }
  };

  const logout = () => {
    localStorage.removeItem('sl_user');
    localStorage.removeItem('sl_token');
    setUser(null);
    http.post('/auth/logout').catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
