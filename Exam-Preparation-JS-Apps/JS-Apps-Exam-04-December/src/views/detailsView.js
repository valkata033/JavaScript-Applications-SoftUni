import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';

const detailsTemplate = (album, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: ${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>${album.description}</p>
            </div>
            ${album.isOwner
                ? html`
                <div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                </div>`
                : nothing
            }
        </div>
    </div>
</section>
`;

export const detailsView = async (ctx) => {
    const albumId = ctx.params.id;
    const album = await albumService.getById(albumId);

    if(ctx.user){
        album.isOwner = ctx.user._id == album._ownerId;
    }

    ctx.render(detailsTemplate(album, onDelete));

    async function onDelete() {
        const result = confirm(`Are you sure you want to delete ${album.name}?`);

        if(result){
            await albumService.deleteById(albumId);
            ctx.page.redirect('/catalog');
        }
    }
}