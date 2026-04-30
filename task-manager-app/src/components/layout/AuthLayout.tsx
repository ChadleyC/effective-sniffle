import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <span className="text-2xl font-bold text-primary mb-4 block">TaskFlow</span>
          <h1 className="font-h1 text-h1 text-on-surface mb-2">{title}</h1>
          <p className="text-body-base text-slate-500">{subtitle}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
