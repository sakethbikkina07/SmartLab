import { http } from './api';

// Small key-value store for demo state with background backend synchronization.
export const kv = {
  get: (k, d = null) => {
    try {
      const v = localStorage.getItem('sl_' + k);
      return v == null ? d : JSON.parse(v);
    } catch {
      return d;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem('sl_' + k, JSON.stringify(v));
    } catch {
      // Ignore quota errors
    }
    // Background sync to backend
    http.post(`/state/${k}`, { value: v }).catch(() => {});
  },
};
