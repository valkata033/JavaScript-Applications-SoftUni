import { logout } from "../api/userServise.js"

export const logoutView = (ctx) => {
    logout();
    ctx.page.redirect('/');
}