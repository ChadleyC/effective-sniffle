import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  stacked?: boolean;
  className?: string;
}

const Avatar = ({ src, alt = 'Avatar', size = 'md', stacked = false, className = '' }: AvatarProps) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const baseStyles = 'rounded-full overflow-hidden border-2 border-white bg-slate-100 shrink-0';
  const stackedStyles = stacked ? '-ml-2' : '';
  
  const combinedClassName = `${baseStyles} ${sizes[size]} ${stackedStyles} ${className}`;

  return (
    <div className={combinedClassName}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
          {alt.substring(0, 2)}
        </div>
      )}
    </div>
  );
};

export const AvatarGroup = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`flex items-center pl-2 ${className}`}>
      {children}
    </div>
  );
};

export default Avatar;
