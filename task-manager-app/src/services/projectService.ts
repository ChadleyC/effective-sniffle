import API from './api';
import type { Project } from '../types/Project';

export const getProjects = async (): Promise<Project[]> => {
    const res = await API.get('/projects');
    return res.data;
};

export const getProject = async (id: number): Promise<Project> => {
    const res = await API.get(`/projects/${id}`);
    return res.data;
};

export const createProject = async (data: Partial<Project>): Promise<Project> => {
    const res = await API.post('/projects', data);
    return res.data;
};

export const updateProject = async (id: number, data: Partial<Project>): Promise<Project> => {
    const res = await API.put(`/projects/${id}`, data);
    return res.data;
};

export const deleteProject = async (id: number): Promise<void> => {
    await API.delete(`/projects/${id}`);
};

export const projectService = {
    getAll: getProjects,
    getById: getProject,
    create: createProject,
    update: updateProject,
    delete: deleteProject
};
