import {render} from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigation.js';

let header = document.getElementById('header-content');
let main = document.getElementById('content');

export const renderNavigation = (ctx, next) => {
    render(navigationView(ctx), header);
    next();
}

export const renderContent = (ctx, next) => {
    ctx.render = (templeteResult) => {
        render(templeteResult, main);
    }
    next();
}