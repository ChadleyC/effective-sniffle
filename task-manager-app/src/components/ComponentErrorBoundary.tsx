import { type ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ComponentErrorBoundaryProps {
  children: ReactNode;
  name?: string;
}

const ComponentErrorBoundary = ({ children, name }: ComponentErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      onError={(error) => {
        console.error(`[ComponentError${name ? `: ${name}` : ''}]`, error);
      }}
      fallback={
        <div className="flex flex-col items-center justify-center py-8 px-4 rounded-xl border border-red-100 bg-red-50/50">
          <span className="material-symbols-outlined text-red-400 text-[24px] mb-2">warning</span>
          <p className="text-body-sm text-red-700 font-medium mb-1">
            {name ? `${name} failed to load` : 'Component error'}
          </p>
          <p className="text-[11px] text-red-400 mb-3">Try refreshing the section.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wider transition-colors"
          >
            Reload
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default ComponentErrorBoundary;
