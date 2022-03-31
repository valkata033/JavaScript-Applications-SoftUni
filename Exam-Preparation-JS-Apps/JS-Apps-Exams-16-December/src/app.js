import page from '../node_modules/page/page.mjs';

import { addSession } from './middlewares/auth.js';
import { renderContent, renderNavigation } from './middlewares/render.js';

import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { profileView } from './views/profile.js';
import { registerView } from './views/register.js';

page(addSession);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/profile', profileView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);

page.start();