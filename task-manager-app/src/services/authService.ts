import api from './api';
import type { RegisterDto } from '../types/Auth';

export const login = async (email: string, password: string) => {
    const res = await api.post('/Auth/login', { email, password });
    const { token } = res.data;
    localStorage.setItem('token', token);
    return res.data;
};

export const register = async (_data: RegisterDto) => {
    const { email, password } = _data;
    return api.post('/Auth/register', { email, password });
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const authService = {
    login,
    register,
    logout
};