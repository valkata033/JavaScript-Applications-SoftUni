import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, getCount } from '../api/games.js';

const catalogTemplate = (games, page, pages, hasUser) => html`
<section id="catalog-page">
    <h1>All Games</h1>

    ${games.length > 0
        ? games.map(gameTemplate.bind(null, hasUser))
        : html`<h3 class="no-articles">No articles yet</h3>`
    }

    <div class="levels center-pages">
        Page ${page} of ${pages}
        ${page > 1 ? html`<a href="/catalog?page=${page - 1}">&lt; Prev</a>` : nothing }
        ${page < pages ? html`<a href="/catalog?page=${page + 1}">Next &gt;</a>` : nothing }
    </div>

</section>
`;

const gameTemplate = (hasUser, game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${game.imageUrl}>
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            ${hasUser ? html`<a href="/details/${game._id}" class="details-button">Details</a>` : nothing }
        </div>

    </div>
`;

export const catalogView = async (ctx) => {
    const query = Object.fromEntries([...(new URLSearchParams(ctx.querystring)).entries()])
    const page = Number(query.page || 1);
    const hasUser = Boolean(ctx.user);

    const [games, pages] = await Promise.all([
        getAll(page),
        getCount(),
    ]);
    ctx.render(catalogTemplate(games, page, pages, hasUser));
}