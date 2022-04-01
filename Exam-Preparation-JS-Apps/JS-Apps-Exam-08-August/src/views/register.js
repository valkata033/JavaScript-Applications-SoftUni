import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/userService.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (submitHandler) => html`
<section id="register-page" class="register">
    <form @submit=${submitHandler} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
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
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

export const registerView = (ctx) => {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
} 

const onSubmit = async (ctx, data, event) => {
    if(Object.values(data).some(x => x == '')){
        return alert('All fields are required!');
    }

    await register(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/');
}

