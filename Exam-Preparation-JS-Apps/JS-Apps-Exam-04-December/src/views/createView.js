import { html } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';
import { createSubmitHandler } from '../utils.js';

const createTemplate = (submitHandler) => html`
    <section class="createPage">
        <form @submit=${submitHandler}>
            <fieldset>
                <legend>Add Album</legend>

                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" placeholder="Album name">

                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">

                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" placeholder="Price">

                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" placeholder="Release date">

                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" placeholder="Artist">

                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">

                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" placeholder="Description"></textarea>

                    <button class="add-album" type="submit">Add New Album</button>
                </div>
            </fieldset>
        </form>
    </section>
`;

export const createView = async (ctx) => {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

const onSubmit = async (ctx, data, event) => {

    if(Object.values(data).some(x => x == '')){
        return alert('All field should be filled!');
    }

    await albumService.create({
        name: data.name,
        imgUrl: data.imgUrl,
        price: data.price,
        releaseDate: data.releaseDate,
        artist: data.artist,
        genre: data.genre,
        description: data.description,
    });
    event.target.reset();
    ctx.page.redirect('/catalog')
}

