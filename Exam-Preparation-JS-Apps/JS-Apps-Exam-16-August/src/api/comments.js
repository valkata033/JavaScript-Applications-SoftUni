import * as api from './api.js';

const endPoints = {
    byGameId: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    post: '/data/comments',
}

export async function getByGameId (gameId) {
    return api.get(endPoints.byGameId(gameId));
}

export async function postComment (comment) {
    return api.post(endPoints.post, comment);
}
