import { html, render } from '../node_modules/lit-html/lit-html.js';

let url = 'http://localhost:3030/jsonstore/advanced/dropdown';

let selectTemplate = (data) => html`
    <select id="menu">
        ${data.map(el => html`<option value = ${el._id}>${el.text || el.input} </option>`)}
    </select>
`;

async function GetOptions() {
    let res = await fetch(url);
    return await res.json();
}

let options = Object.values(await GetOptions());
let main = document.querySelector('div');
Update(options);

function Update(options) {
    let result = selectTemplate(options);
    render(result, main);
}

document.querySelector('form').addEventListener('submit', addItem);

async function addItem(e) {
    e.preventDefault();

    
    if (document.getElementById('itemText').value !== '') {
        
        let input = document.getElementById('itemText').value;

        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
        });

        options.push(await response.json());
        Update(options);

        document.getElementById('itemText').value = '';
    }
}