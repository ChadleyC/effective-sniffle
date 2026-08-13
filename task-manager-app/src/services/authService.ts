import api from './api';
import type { RegisterDto } from '../types/Auth';

export const login = async (email: string, password: string) => {
    const res = await api.post('/Auth/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    return { token, user };
};

export const register = async (data: RegisterDto) => {
    const res = await api.post('/Auth/register', data);
    const { token, user } = res.data;
    if (token) {
        localStorage.setItem('token', token);
    }
    return { token, user };
};

export const getMe = async () => {
    const res = await api.get('/Auth/me');
    return res.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const authService = {
    login,
    register,
    logout,
    getMe
};