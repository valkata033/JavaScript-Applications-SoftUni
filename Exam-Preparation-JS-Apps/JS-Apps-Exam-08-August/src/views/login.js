import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/userService.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (submitHandler) => html`
<section id="login-page" class="login">
    <form @submit=${submitHandler} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>
`;

export const loginView = (ctx) => {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
} 

const onSubmit = async (ctx, data, event) => {
    if(Object.values(data).some(x => x == '')){
        return alert('All fields are required!');
    }

    await login(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/')
}
