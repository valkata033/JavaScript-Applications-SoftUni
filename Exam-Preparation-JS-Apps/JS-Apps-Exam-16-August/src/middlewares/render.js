import { render, html } from '../../node_modules/lit-html/lit-html.js';

const loggedIn = html`
<div id="user">
    <a href="/create">Create Game</a>
    <a href="/logout">Logout</a>
</div>
`;

const guest = html`
<div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
`;

const navigationTemplate = (user) => html`
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/catalog">All games</a>

    ${user
        ? loggedIn
        : guest
    }

</nav>
`;

export const nagigationView = (ctx) => {
    ctx.render(navigationTemplate(ctx.user));
}

const main = document.getElementById('my-header');
const root = document.getElementById('main-content');

function ctxRender(content) {
    render(content, root);
} 

export function addRender(ctx, next) {
    render(navigationTemplate(ctx.user), main);

    ctx.render = ctxRender;
    next();
}