import page from '../node_modules/page/page.mjs';

import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { onLogout } from './views/logout.js';
import { registerView } from './views/register.js';

page(addSession);
page(addRender);

page('/', homeView);
page('/catalog', catalogView);
page('/create', createView);
page('/login', loginView);
page('/logout', onLogout);
page('/register', registerView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();
