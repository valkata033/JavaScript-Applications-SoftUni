import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigation.js';

const header = document.getElementById('my-header');
const root = document.getElementById('main-content');

export function renderNavigation(ctx, next) {
    render(navigationView(ctx), header);
    next();
} 

export function renderContent(ctx, next) {
    ctx.render = (templateResult) => {
        render(templateResult, root);
    };
    next();
}