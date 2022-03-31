import { getUserData } from "../util.js"

export const addSession = (ctx, next) => {
    ctx.user = getUserData();
    next();
}