// import api from './api';
// import type { LoginDto, RegisterDto } from '../types/Auth'; // Assuming definition

export const authService = {
    login: async (_data: any) => {
        // return api.post('/auth/login', data);
    },
    register: async (_data: any) => {
        // return api.post('/auth/register', data);
    },
    logout: () => {
        // localStorage.removeItem('token');
    }
};
