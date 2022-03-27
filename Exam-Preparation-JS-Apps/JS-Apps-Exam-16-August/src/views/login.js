import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (submitHandler) => html`
<section id="login-page" class="auth">
    <form id="login" @submit=${submitHandler}>
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export const loginView = async (ctx) => {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

const onSubmit = async (ctx, data, event) => {
    await login(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/');
}