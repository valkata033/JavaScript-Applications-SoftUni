import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchGames } from '../api/games.js';
import { createSubmitHandler } from '../util.js';

const catalogTemplate = (games, submitHandler) => html`
<section id="catalog-page">
    <h1>Search</h1>

    <form @submit=${submitHandler} class="search-form">
        <input type="text" name="search">
        <input type="submit" value="Search">
    </form>

    ${games.length > 0
        ? games.map(gameTemplate)
        : html`<h3 class="no-articles">No articles yet</h3>`
    }

</section>
`;

const gameTemplate = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${game.imageUrl}>
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game._id}" class="details-button">Details</a>
        </div>

    </div>
`;

export const searchView = async (ctx) => {
    const query = Object.fromEntries([...(new URLSearchParams(ctx.querystring)).entries()])

    const games = await searchGames(query.search);

    ctx.render(catalogTemplate(games, createSubmitHandler(ctx, onSubmit)));
}

function onSubmit(ctx, data, event) {
    ctx.page.redirect('/search?search=' + encodeURIComponent(data.search));
}