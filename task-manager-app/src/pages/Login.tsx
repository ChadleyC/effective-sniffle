import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { login } from '../services/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Log in to your account to continue managing your tasks."
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <InputField
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          icon="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && <p className="text-xs font-bold text-red-600 uppercase text-center">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>

        <p className="text-center text-body-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
