import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteTheater, getById } from '../api/theaterService.js';

const detailsTemplate = (theater, user, onDelete) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theater.title}</h1>
            <div>
                <img src=${theater.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theater.description}</p>
            <h4>Date: ${theater.date}</h4>
            <h4>Author: ${theater.author}</h4>
            <div class="buttons">
                ${user && theater.isOwner
                    ? html`<a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                            <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`
                    : nothing
                }
                
                ${user
                    ? html`<a class="btn-like" href="/likes">Like</a>`
                    : nothing
                }
                
            </div>
            <p class="likes">Likes: 0</p>
        </div>
    </div>
</section>
`;

export const detailsView = async (ctx) => {
    const theaterId = ctx.params.id;
    const theater = await getById(theaterId);

    if(ctx.user){
        theater.isOwner = ctx.user._id == theater._ownerId;
    }

    ctx.render(detailsTemplate(theater, ctx.user, onDelete));

    async function onDelete(){
        const result = confirm(`Are you sure you want to delete ${theater.title}`);
        
        if(result){
            await deleteTheater(theaterId);
            ctx.page.redirect('/profile');
        }
    }
}