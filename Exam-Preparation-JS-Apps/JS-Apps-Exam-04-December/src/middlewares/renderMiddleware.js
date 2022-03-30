import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigationView.js';

const header = document.querySelector('#header-navigation');
const main = document.querySelector('#main-content');

export const renderNavigation = (ctx, next) => {

    render(navigationView(ctx), header);

    next();
}

export const renderContent = (ctx, next) => {

    ctx.render = (templateResult) => {
        render(templateResult, main);
    }

    next();
}


