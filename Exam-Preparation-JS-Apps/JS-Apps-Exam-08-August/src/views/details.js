import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteBook, getBookById } from '../api/bookService.js';
import {  getAllLikesForBook, postLike, hasLiked } from '../api/likesService.js';

const detailsTemplate = (book, onDelete, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${book.isOwner
                ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` 
                : nothing
            }

            ${book.canLike
                ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
                : nothing
            }

            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${book.likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;

export const detailsView = async (ctx) => {
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);

    const getBookLikes = await getAllLikesForBook(bookId);
    const hasLike = await hasLiked(bookId, ctx.userId);

    book.likes = getBookLikes;

    if(ctx.user){
        book.hasUser = true;
        book.isOwner = ctx.user._id == book._ownerId;
        book.canLike = !book.isOwner && !hasLike;
    }

    ctx.render(detailsTemplate(book, onDelete, onLike));
    
    async function onLike() {
        await postLike({bookId});
        ctx.page.redirect(`/details/${bookId}`);
    }

    async function onDelete() {
        const result = confirm(`Are you sure you want to delete ${book.title}`)
        if(result){
            await deleteBook(bookId);
            ctx.page.redirect('/');
        }
    }

} 

