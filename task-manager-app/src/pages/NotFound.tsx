import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <span className="text-6xl font-black text-primary mb-4 block">404</span>
        <h1 className="font-h1 text-h1 text-on-surface mb-2">Page Not Found</h1>
        <p className="text-body-base text-slate-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-lg border border-slate-200 text-on-surface font-semibold text-sm hover:bg-slate-50 active:scale-95 transition-all"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
