import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/authService';

const TopNavBar = () => {
  const navigate = useNavigate();
  const { user, logout: ctxLogout } = useAuth();

  const handleLogout = () => {
    logout();
    ctxLogout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 z-40 bg-white shadow-sm border-b border-slate-200">
      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          TaskFlow
        </button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" icon="notifications" />
        <Button variant="ghost" size="icon" icon="help" onClick={() => navigate('/settings')} />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="rounded-full transition-opacity hover:opacity-80"
            aria-label="Open profile"
          >
            <Avatar
              alt={user?.username || user?.email || 'User'}
            />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors uppercase tracking-wider"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;