// import api from './api';
// import type { LoginDto, RegisterDto } from '../types/Auth'; 

export const login = async (_email: string, _password: string) => {
    // return api.post('/auth/login', { email, password });
    return { data: { token: 'mock-token' } };
};

export const register = async (_data: any) => {
    // return api.post('/auth/register', data);
};

export const logout = () => {
    // localStorage.removeItem('token');
};

export const authService = {
    login,
    register,
    logout
};
