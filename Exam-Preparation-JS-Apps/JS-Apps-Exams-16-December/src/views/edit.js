import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, update } from '../api/theaterService.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (theater, submitHandler) => html`
<section id="editPage">
    <form @submit=${submitHandler} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" .value=${theater.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${theater.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" .value=${theater.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description"
                placeholder="Description">${theater.description}</textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                .value=${theater.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>
`;

export const editView = async (ctx) => {
    const theaterId = ctx.params.id;
    const theater = await getById(theaterId);
    
    ctx.render(editTemplate(theater, createSubmitHandler(ctx, onSubmit)));
}

const onSubmit = async (ctx, data, event) =>{
    const theaterId = ctx.params.id;
    
    if(Object.values(data).some(x => x == '')){
        return alert('All fields are required!');
    }

    await update(theaterId, {
        title: data.title,
        date: data.date,
        author: data.author,
        description: data.description,
        imageUrl: data.imageUrl,
    });
    event.target.reset();
    ctx.page.redirect('/details/' + theaterId);
}