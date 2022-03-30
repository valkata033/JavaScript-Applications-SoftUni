import {logout} from '../services/userService.js';

export const logoutView = (ctx) => {
    logout();
    ctx.page.redirect('/');
}