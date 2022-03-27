import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getByGameId, postComment } from '../api/comments.js';
import { createSubmitHandler } from '../util.js';


const commentFormTemplate = (onSubmit) => html`
<article class="create-comment">
    <label>Add new comment:</label>     
    <form class="form" @submit=${onSubmit}>
        <textarea name="comment" placeholder="Comment....."></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>
`;

export const commentFormView = (ctx, isOwner) => {
    if(ctx.user && !isOwner){
        return commentFormTemplate(createSubmitHandler(ctx, onSubmit));
    }
    else{
        return nothing;
    }
}

const onSubmit = async (ctx,data,event) => {
    const gameId = ctx.params.id;

    await postComment({
        gameId,
        comment: data.comment,
    });

    event.target.reset();
    ctx.page.redirect(`/details/${gameId}`)
}