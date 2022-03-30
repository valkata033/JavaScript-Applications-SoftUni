import page from '../node_modules/page/page.mjs';

import { renderContent, renderNavigation } from './middlewares/renderMiddleware.js';
import { authMiddleware} from './middlewares/authMiddleware.js';

import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';
import { logoutView } from './views/logoutView.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { serachView } from './views/searchView.js';

page(authMiddleware);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/catalog', catalogView);
page('/create', createView);
page('/search', serachView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();
