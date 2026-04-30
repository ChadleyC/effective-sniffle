import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
}

const InputField = ({
  label,
  icon,
  error,
  containerClassName = '',
  className = '',
  ...props
}: InputFieldProps) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-label-sm font-medium text-slate-500 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            {icon}
          </span>
        )}
        <input
          className={`
            w-full py-2.5 rounded-lg border border-slate-200 bg-white
            focus:ring-2 focus:ring-primary focus:border-primary
            text-body-sm transition-all
            ${icon ? 'pl-10 pr-4' : 'px-4'}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] font-bold text-red-600 mt-1 ml-1 uppercase tracking-wide">{error}</p>}
    </div>
  );
};

export default InputField;
