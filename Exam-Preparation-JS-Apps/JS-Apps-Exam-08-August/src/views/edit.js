import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { getBookById, update } from '../api/bookService.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (book, submitHandler) => html`
<section id="edit-page" class="edit">
    <form @submit=${submitHandler} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value=${book.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description">${book.description}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${book.type}>
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>
`;

export const editView = async (ctx) => {
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    
    ctx.render(editTemplate(book, createSubmitHandler(ctx, onSubmit)));
}

const onSubmit = async (ctx, data, event) => {
    const bookId = ctx.params.id;

    if(Object.values(data).some(x => x == '')){
        return alert('All fields are required!');
    }

    await update(bookId, {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        type: data.type,
    });
    event.target.reset();
    ctx.page.redirect('/details/' + bookId);
}