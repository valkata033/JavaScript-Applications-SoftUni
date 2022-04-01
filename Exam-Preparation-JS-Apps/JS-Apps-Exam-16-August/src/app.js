import page from '../node_modules/page/page.mjs';

import { renderContent, renderNavigation } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { onLogout } from './views/logout.js';
import { registerView } from './views/register.js';
import { searchView } from './views/search.js';

page(addSession);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/catalog', catalogView);
page('/create', createView);
page('/search', searchView);
page('/login', loginView);
page('/logout', onLogout);
page('/register', registerView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();
