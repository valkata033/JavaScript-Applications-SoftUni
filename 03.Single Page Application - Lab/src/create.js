import { getToken } from "./auth.js";

let createSection = document.querySelector('.create');
let form = createSection.querySelector('form');

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData.get('ingredients').split('\n');
    let steps = formData.get('steps').split('\n');

    let data = {
        name,
        img,
        ingredients,
        steps,
    };

    fetch('http://localhost:3030/data/recipes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': getToken(),
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(recipe => {
            alert('Successful recipe create!')
        });

    form.reset();

});


export function renderCreate(){
    createSection.style.display = 'block';
}

