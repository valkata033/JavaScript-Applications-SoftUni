import { updateAuth } from "./auth.js";
import { router } from "./router.js";

updateAuth();
router('/');

let navigationElement = document.querySelector('.navigation');
navigationElement.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.tagName == 'A'){
        let url = new URL(e.target.href);

        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        router(url.pathname);
    }

});