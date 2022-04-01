import page from '../node_modules/page/page.mjs';

import { renderNavigation, renderContent } from './middlewares/render.js';
import { addSession } from './middlewares/addSession.js';

import { homeView } from './views/home.js';
import { myBooksView } from './views/myBooks.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { registerView } from './views/register.js';

page(addSession);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/catalog', myBooksView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);

page.start();