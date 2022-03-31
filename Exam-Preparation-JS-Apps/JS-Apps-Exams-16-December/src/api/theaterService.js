import * as api from './api.js';

const endPoints = {
    getAll: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    create: '/data/theaters',
    getById: '/data/theaters/',
    update: '/data/theaters/',
    delete: '/data/theaters/',
    getUserTheaters: '/data/theaters?where=',
}

export const getAll = () => api.get(endPoints.getAll); 

export const getById = (id) => api.get(endPoints.getById + id); 

export const createTheater = (data) => api.post(endPoints.create, data); 

export const update = (id, data) => api.put(endPoints.update + id, data);

export const deleteTheater = (id) => api.del(endPoints.delete + id);

export const getUserTheaters = (userId) => {
    const query = `_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    return api.get(endPoints.getUserTheaters + query);
}