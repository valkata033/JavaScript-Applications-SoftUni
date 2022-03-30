import * as utils from '../utils.js';

export const authMiddleware = (ctx, next) => {
    ctx.user = utils.getUserData();
    next();
}
