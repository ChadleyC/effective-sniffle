import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: string;
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-white shadow-sm hover:opacity-90',
    secondary: 'bg-white border border-outline-variant text-on-surface hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-50',
    outline: 'border border-primary text-primary hover:bg-blue-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-label-sm rounded-lg',
    md: 'px-4 py-2.5 text-body-sm rounded-lg',
    lg: 'px-6 py-3 text-body-base rounded-xl',
    icon: 'p-2 rounded-full',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {icon && <span className="material-symbols-outlined text-[20px]">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
