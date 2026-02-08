// import api from './api';

export const projectService = {
    getAll: async () => {
        // return api.get('/projects');
    },
    getById: async (_id: number) => {
        // return api.get(`/projects/${id}`);
    },
    create: async (_data: any) => {
        // return api.post('/projects', data);
    },
    update: async (_id: number, _data: any) => {
        // return api.put(`/projects/${id}`, data);
    },
    delete: async (_id: number) => {
        // return api.delete(`/projects/${id}`);
    }
};
