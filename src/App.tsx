import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Syringe, FileText, CalendarDays,
  Package, LogOut, MapPin
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import CadastroIndigena from './pages/CadastroIndigena';
import RegistrarVacina from './pages/RegistrarVacina';
import Relatorios from './pages/Relatorios';
import CalendarioVacinal from './pages/CalendarioVacinal';
import Estoque from './pages/Estoque';
import CadastrosBase from './pages/CadastrosBase';
import Login from './pages/Login';

type ToastType = { id: number; message: string; type: 'success' | 'error' | 'default' };

function ToastContainer({ toasts, remove }: { toasts: ToastType[]; remove: (id: number) => void }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type === 'success' ? 'toast-success' : t.type === 'error' ? 'toast-error' : ''}`}>
          <span>{t.message}</span>
          <button onClick={() => remove(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, opacity: 0.6, color: 'inherit' }}>×</button>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ onLogout }: { onLogout: () => void }) {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={13} /> },
    { to: '/cadastro', label: 'Cadastro de Indígena', icon: <Users size={13} /> },
    { to: '/cadastros-base', label: 'Cadastros Base', icon: <MapPin size={13} /> },
    { to: '/vacinacao', label: 'Registrar Vacina', icon: <Syringe size={13} /> },
    { to: '/relatorios', label: 'Relatórios', icon: <FileText size={13} /> },
    { to: '/calendario', label: 'Calendário Vacinal', icon: <CalendarDays size={13} /> },
    { to: '/estoque', label: 'Estoque', icon: <Package size={13} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-badge">DSEI-AM</div>
        <div className="sidebar-logo-title">SisVac</div>
        <div className="sidebar-logo-sub">Sistema Vacinal Indígena</div>
      </div>

      <div className="sidebar-section">Principal</div>
      {navItems.slice(0, 4).map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}

      <div className="sidebar-section">Análise</div>
      {navItems.slice(4, 6).map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}

      <div className="sidebar-section">Operações</div>
      {navItems.slice(6).map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">VL</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-user-name">Vivian Lima</div>
            <div className="sidebar-user-role">Coordenadora DSEI-AM</div>
          </div>
          <button
            onClick={onLogout}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555550', padding: 4 }}
            title="Sair"
          >
            <LogOut size={12} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function AppLayout({ showToast, onLogout }: { showToast: (msg: string, type?: ToastType['type']) => void; onLogout: () => void }) {
  return (
    <div className="app-shell">
      <Sidebar onLogout={onLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastro" element={<CadastroIndigena showToast={showToast} />} />
          <Route path="/cadastros-base" element={<CadastrosBase showToast={showToast} />} />
          <Route path="/vacinacao" element={<RegistrarVacina showToast={showToast} />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/calendario" element={<CalendarioVacinal />} />
          <Route path="/estoque" element={<Estoque />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = (message: string, type: ToastType['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const removeToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <BrowserRouter>
      {loggedIn ? (
        <>
          <AppLayout showToast={showToast} onLogout={() => setLoggedIn(false)} />
          <ToastContainer toasts={toasts} remove={removeToast} />
        </>
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </BrowserRouter>
  );
}
