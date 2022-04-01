import * as util from '../util.js';

export const addSession = (ctx, next) => {
    ctx.user = util.getUserData();
    next();
} 