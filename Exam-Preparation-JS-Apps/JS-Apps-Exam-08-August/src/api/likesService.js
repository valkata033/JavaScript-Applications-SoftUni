import * as api from './api.js';

const endPoints = {
    postLike: '/data/likes',
    getLikes: '/data/likes?where=',
    hasOwnLike: '/data/likes?where=',
}

export const postLike = (bookId) => api.post(endPoints.postLike, bookId);

export const getAllLikesForBook = (bookId) => {
    const query = `bookId%3D%22${bookId}%22&distinct=_ownerId&count`;
    return api.get(endPoints.getLikes + query);
}

export const hasLiked = async (bookId, user) => {
    if(!user){
        return false; 
    }else{
        const userId = user._id;
        const query = `bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
        const likes = await api.get(endPoints.hasOwnLike + query);
        return likes > 0;
    }

}