import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/games.js';
import { commentFormView } from './commentForm.js';
import { commentsView } from './comments.js';

const detailsTemplate = (game, commentSection, commentFormSection, onDelete) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">
           ${game.summary}
        </p>

        <!-- Bonus ( for Guests and Users ) -->
        ${commentSection}

        ${game.isOwner
            ? html`<div class="buttons">
                        <a href="/edit/${game._id}" class="button">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                    </div>`
            : nothing
        }
        
    </div>

    <!-- Bonus -->
    ${commentFormSection}

</section>
`;

export const detailsView = async (ctx) => {
    const gameId = ctx.params.id;

    const [game, commentSection] = await Promise.all([
        getById(gameId),
        commentsView(gameId),
    ]);

    if(ctx.user){
        game.isOwner = ctx.user._id == game._ownerId;
    }

    const commentFormSection = commentFormView(ctx, game.isOwner);

    ctx.render(detailsTemplate(game, commentSection, commentFormSection, onDelete));

    async function onDelete() {
        const result = confirm(`Are you sure you want to delete ${game.title}?`);

        if(result){
            await deleteById(gameId);
            ctx.page.redirect('/');
        }
    }
}