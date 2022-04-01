import {render} from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigation.js';

const header = document.getElementById('site-header');
const main = document.getElementById('site-content');

export const renderNavigation = (ctx, next) => {
    render(navigationView(ctx), header);
    next();
}

export const renderContent = (ctx, next) => {
    ctx.render = (templateResult) => {
        render(templateResult, main);
    };
    next();
}