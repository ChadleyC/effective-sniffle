import { type ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
import PageLayout from './layout/PageLayout';

interface PageErrorBoundaryProps {
  children: ReactNode;
}

const PageErrorBoundary = ({ children }: PageErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('[PageError]', error, errorInfo);
      }}
      fallback={
        <PageLayout>
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-red-500 text-[32px]">cloud_off</span>
            </div>
            <h1 className="font-h1 text-h1 text-on-surface mb-2">Page Error</h1>
            <p className="text-body-base text-slate-500 mb-8 text-center max-w-lg">
              This page failed to load. You can try again or return to the dashboard.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all"
              >
                Reload Page
              </button>
              <button
                onClick={() => { window.location.href = '/dashboard'; }}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-on-surface font-semibold text-sm hover:bg-slate-50 active:scale-95 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </PageLayout>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default PageErrorBoundary;
