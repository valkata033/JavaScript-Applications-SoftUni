import { updateAuth } from "./auth.js";

let loginSection = document.querySelector('.login');
let form = loginSection.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');

    fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
    })
        .then(res => res.json())
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            updateAuth();
            alert('Successful login');
        });
    
        form.reset();

});

export function renderLogin(){
    loginSection.style.display = 'block';
}