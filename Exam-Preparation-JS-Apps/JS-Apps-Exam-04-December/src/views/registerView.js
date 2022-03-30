import { html } from '../../node_modules/lit-html/lit-html.js';
import {register} from '../services/userService.js';
import * as utils from '../utils.js';

const registerTempmlate = (submitHandler) => html`
    <section id="registerPage">
        <form @submit=${submitHandler}>
            <fieldset>
                <legend>Register</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                <button type="submit" class="register">Register</button>

                <p class="field">
                    <span>If you already have profile click <a href="#">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export const registerView = async (ctx) => {
    ctx.render(registerTempmlate(utils.createSubmitHandler(ctx, onSubmit)));
}

const onSubmit = async (ctx, data, event) => {
    if(Object.values(data).some(x => x == '')){
        return alert('All field should be filled!');
    }
    
    await register(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/');
}