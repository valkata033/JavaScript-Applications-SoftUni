import * as api from './api.js';

const endPoints = {
    getAll: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/albums',
    getById: '/data/albums/',
    delete: '/data/albums/',
    edit: '/data/albums/',
    search: '/data/albums?where=',
}

export const GetAll = () => api.get(endPoints.getAll);

export const create = (albumData) => api.post(endPoints.create, albumData);

export const getById = (id) => api.get(endPoints.getById + id);

export const deleteById = (id) => api.del(endPoints.delete + id);

export const editAlbum = (id, data) => api.put(endPoints.edit + id, data);

export const search = (searchText) => {
    const query = encodeURIComponent(`name LIKE "${searchText}"`)
    return api.get(endPoints.search + query);
}