import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/userServise.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (submitHandler) => html`
<section id="loginaPage">
    <form @submit=${submitHandler} class="loginForm">
        <h2>Login</h2>
        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>
        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="#">here</a></span>
        </p>
    </form>
</section>
`;

export const loginView = (ctx) => {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

const onSubmit = async (ctx, data, event) =>{
    if(Object.values(data).some(x => x == '')){
        return alert('All fields are required!');
    }

    await login(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/');
}