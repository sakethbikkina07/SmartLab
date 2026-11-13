import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { NotifProvider } from './context/Notifications';
import { AuthProvider } from './context/Auth';
import './index.css';

// Cursor-follow spotlight for glass surfaces
document.addEventListener('pointermove', (e) => {
  const el = e.target.closest?.('.glass');
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}, { passive: true });

const toastStyle = {
  background: 'rgba(12,18,34,.9)',
  color: '#eaeff5',
  border: '1px solid rgba(255,255,255,.14)',
  backdropFilter: 'blur(16px)',
  borderRadius: '14px',
  fontSize: '13px',
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <NotifProvider>
        <App />
        <Toaster position="top-right" toastOptions={{ style: toastStyle, iconTheme: { primary: '#2dd4bf', secondary: '#04141a' } }} />
      </NotifProvider>
    </AuthProvider>
  </BrowserRouter>
);
