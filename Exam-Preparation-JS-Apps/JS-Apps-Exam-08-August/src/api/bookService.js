import * as api from './api.js';

const endPoints = {
    postBook: '/data/books',
    getAllBooks: '/data/books?sortBy=_createdOn%20desc',
    getBookById: '/data/books/',
    update: '/data/books/',
    delete: '/data/books/',
    getMyBooks: '/data/books?where=',
}

export const postBook = (data) => api.post(endPoints.postBook, data);

export const getAllBooks = () => api.get(endPoints.getAllBooks);

export const getBookById = (id) => api.get(endPoints.getBookById + id);

export const update = (id, data) => api.put(endPoints.update + id, data);

export const deleteBook = (id) => api.del(endPoints.delete + id);

export const getAllMyBooks = (userId) => {
    const query = `_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    return api.get(endPoints.getMyBooks + query);
}