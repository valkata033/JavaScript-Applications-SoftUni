import { html } from '../../node_modules/lit-html/lit-html.js';
import * as authServices from '../services/authService.js';

const loginTemplate = (loginHandler) => html`

    <div class="login-page">
        <h1>Login page</h1>

        <form @submit=${loginHandler}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Loggin</button>
        </form>
    </div>
`;

export const loginView = (ctx) => {

    const loginHandler = (e) => {
        e.preventDefault();
        let {email, password} = Object.fromEntries(new FormData(e.currentTarget));

        authServices.login(email, password)
            .then(user => {
                ctx.page.redirect('/');
                alert(`${user.username} is logged in`);
            });
    };

    ctx.render(loginTemplate(loginHandler));
};

