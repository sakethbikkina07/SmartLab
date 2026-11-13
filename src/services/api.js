import axios from 'axios';
import { DS } from '../data';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

// Attach auth token if present
http.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('sl_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Ignore storage errors
  }
  return config;
});

// Synchronous local-first storage with background backend synchronization
export const load = (k) => {
  try {
    const val = localStorage.getItem('sl_' + k);
    return val ? JSON.parse(val) : DS[k]?.rows || [];
  } catch {
    return DS[k]?.rows || [];
  }
};

export const save = (k, rows) => {
  try {
    localStorage.setItem('sl_' + k, JSON.stringify(rows));
  } catch {
    // Ignore storage quota
  }
};

// Generic CRUD operations with background API sync
export const crud = (k) => ({
  list: () => load(k),
  get: (id) => load(k).find((r) => String(r.id) === String(id)),
  create: (r) => {
    const newItem = { id: Date.now(), ...r };
    const l = [...load(k), newItem];
    save(k, l);
    // Background sync to backend
    http.post(`/resources/${k}`, newItem).catch(() => {});
    return l;
  },
  update: (id, r) => {
    const l = load(k).map((x) => (x.id === id ? { ...x, ...r } : x));
    save(k, l);
    // Background sync to backend
    http.put(`/resources/${k}/${id}`, r).catch(() => {});
    return l;
  },
  remove: (id) => {
    const l = load(k).filter((x) => x.id !== id);
    save(k, l);
    // Background sync to backend
    http.delete(`/resources/${k}/${id}`).catch(() => {});
    return l;
  },
});

// Domain-specific backend endpoints
export const api = {
  // Code execution, sandbox, similarity & review
  code: {
    run: (payload) => http.post('/code/run', payload),
    submit: (payload) => http.post('/code/submit', payload),
    review: (payload) => http.post('/code/review', payload),
    similarity: (payload) => http.post('/code/similarity', payload),
  },

  // AI Assistant and Gemini MCQ Generator
  ai: {
    chat: (message) => http.post('/ai/chat', { message }),
    generateMCQ: (params) => http.post('/ai/generate-mcq', params),
  },

  // Lab Manual Extraction and Task Publishing
  manuals: {
    list: () => http.get('/manuals'),
    upload: (data) => http.post('/manuals/upload', data),
    extract: (data) => http.post('/manuals/extract', data),
    publish: (data) => http.post('/manuals/publish', data),
  },

  // Assessments, Exams & Viva
  assessments: {
    list: () => http.get('/assessments'),
    schedule: (data) => http.post('/assessments/schedule', data),
    submitExam: (data) => http.post('/assessments/submit-exam', data),
    getVivaQuestions: (topic) => http.get('/assessments/viva/questions', { params: { topic } }),
    evaluateViva: (data) => http.post('/assessments/viva/evaluate', data),
  },

  // QR Attendance System
  attendance: {
    createSession: (data) => http.post('/attendance/session', data),
    scanQR: (data) => http.post('/attendance/scan', data),
    listRecords: (sessionId) => http.get('/attendance/records', { params: { sessionId } }),
  },

  // Analytics & Internal Marks Engine
  analytics: {
    getSummary: () => http.get('/analytics/summary'),
    getDepartment: (dept) => http.get('/analytics/department', { params: { department: dept } }),
    calculateInternalMarks: (data) => http.post('/analytics/internal-marks', data),
  },

  // Generic key-value store
  state: {
    get: (key) => http.get(`/state/${key}`),
    set: (key, value) => http.post(`/state/${key}`, { value }),
  },
};

export default api;
