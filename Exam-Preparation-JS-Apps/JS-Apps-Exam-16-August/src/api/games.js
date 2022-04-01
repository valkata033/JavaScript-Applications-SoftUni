import * as api from './api.js';

const pageSize = 3;

const endPoints = {
    recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    games: (page) => `/data/games?sortBy=_createdOn%20desc&offset=${(page - 1) * pageSize}&pageSize=${pageSize}`,
    getCount: '/data/games?count',
    create: '/data/games',
    byId: '/data/games/',
    deleteById: '/data/games/',
    update: '/data/games/',
    search: '/data/games?where=',
}

export async function getRecent () {
    return api.get(endPoints.recent);
}

export async function getAll (page) {
    return api.get(endPoints.games(page));
}

export async function searchGames (text) {
    const query = encodeURIComponent(`title LIKE "${text}"`)
    return api.get(endPoints.search + query);
}

export async function getCount () {
    const pages = await api.get(endPoints.getCount);
    return Math.ceil(pages / pageSize); 
}

export async function getById (id) {
    return api.get(endPoints.byId + id);
}

export async function deleteById (id) {
    return api.del(endPoints.deleteById + id);
}

export async function update (id, data) {
    return api.put(endPoints.update + id, data);
}

export async function create (data) {
    return api.post(endPoints.create, data);
}