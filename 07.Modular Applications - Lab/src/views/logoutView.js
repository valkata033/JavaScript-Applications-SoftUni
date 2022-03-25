import * as authServices from '../services/authService.js';

export const logoutView = (ctx) => {
    authServices.logout()
        .then(res => {
            ctx.page.redirect('/');
        });
}