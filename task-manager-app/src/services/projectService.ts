// import api from './api';

export const getProjects = async () => {
    // return api.get('/projects');
    return [];
};

export const projectService = {
    getAll: getProjects,
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
