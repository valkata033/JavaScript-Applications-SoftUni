import { logout } from '../api/userService.js';

export const logoutView = (ctx) => {
    logout();
    ctx.page.redirect('/');
} 

