import { render404 } from './404.js';
import { renderCreate } from './create.js';
import { renderHome } from './home.js';
import { renderLogin } from './login.js';
import { renderLogout } from './logout.js';
import { renderRegister } from './register.js';

let routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/create': renderCreate,
    '/logout': renderLogout,
}

export function router(path){

    document.querySelectorAll('.main-content section').forEach(x => x.style.display = 'none');

    let renderer = routes[path] || render404;
    renderer();
}