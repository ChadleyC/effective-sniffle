import React from 'react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

const TopNavBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 z-40 bg-white shadow-sm border-b border-slate-200">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold text-primary">TaskFlow</span>
        <div className="hidden md:flex items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary w-64 text-body-sm"
              placeholder="Search tasks..." 
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" icon="notifications" />
        <Button variant="ghost" size="icon" icon="help" />
        <Avatar 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqofQJ7FUjVmEfSrYNfikdZOHDNgCHVd4AmFJHV6uIkelpOvmDUob3Es9TcnD_BEAZfFK55DBzXmfaEMQIXhciOusQ9uXMA0Cnj_FeYFJ6ij83j3NyFGM7ADUMaZDUWhFyJee434wAcCS7THObw49GHLC-ajj6djA3QWqV_Ht1LxugBZAHbYKf7F5JwYgXpxIArdNt5eDQLfhxOhxd20N4-OcOIpOPL-HPAWxlFD-gieXX08XRNTvvHlyA04gXIcorqzxcuoaqYOg" 
          alt="User"
        />
      </div>
    </header>
  );
};

export default TopNavBar;
