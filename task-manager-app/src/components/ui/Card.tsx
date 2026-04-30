import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className = '', hover = false, ...props }: CardProps) => {
  const baseStyles = 'bg-white rounded-xl border border-slate-200 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]';
  const hoverStyles = hover ? 'hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] transition-shadow cursor-pointer' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
