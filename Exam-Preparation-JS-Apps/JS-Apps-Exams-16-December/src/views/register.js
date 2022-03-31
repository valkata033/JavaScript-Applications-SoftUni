import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/userServise.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (submitHandler) => html`
<section id="registerPage">
    <form @submit=${submitHandler} class="registerForm">
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="#">here</a></span>
        </p>
    </form>
</section>
`;

export const registerView = (ctx) => {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

const onSubmit = async (ctx, data, event) =>{
    if(Object.values(data).some(x => x == '')){
        return alert('All fields are required!');
    }

    await register(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/');
}