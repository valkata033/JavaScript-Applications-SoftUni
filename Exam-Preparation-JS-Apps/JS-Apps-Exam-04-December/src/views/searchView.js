import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';
import { getUserData } from '../utils.js';
import { albumTemplate } from './templates/albumTemplate.js';

const searchTemplate = (searchHandler, albums, user) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${searchHandler}>Search</button>
    </div>

    <h2>Results:</h2>

    <div class="search-result">

        ${albums.length > 0
            ? albums.map(x => albumTemplate(x, Boolean(user)))
            : html`<p class="no-result">No result.</p>`
        }

    </div>
</section>
`;

export const serachView = (ctx) => {
    const user = getUserData();

    const onSearch = async () => {
        const searchText = document.getElementById('search-input');
        const matches = await albumService.search(searchText.value);

        ctx.render(searchTemplate(onSearch, matches, user));
    }
    
    ctx.render(searchTemplate(onSearch, [], user));
}