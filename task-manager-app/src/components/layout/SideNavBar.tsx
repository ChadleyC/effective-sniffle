import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../ui/Button';

const SideNavBar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'Projects', path: '/projects', icon: 'assignment' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-white border-r border-slate-200 flex flex-col z-50 pt-16">
      <div className="px-6 py-6 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
          </div>
          <div>
            <h2 className="text-slate-900 text-lg font-black tracking-tight leading-none">Workspace</h2>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-0.5">Corporate Team</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 py-4 font-inter text-sm font-medium">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-6 py-3 transition-all border-l-4 ${
                  isActive 
                    ? 'text-primary border-primary bg-blue-50/50' 
                    : 'text-slate-600 border-transparent hover:bg-slate-50'
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
        <div className="mt-8 px-6">
          <Button variant="primary" className="w-full" icon="add">
            Create Task
          </Button>
        </div>
      </nav>
      <div className="p-6 border-t border-slate-100">
        <NavLink to="/support" className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">contact_support</span>
          <span>Support</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default SideNavBar;
