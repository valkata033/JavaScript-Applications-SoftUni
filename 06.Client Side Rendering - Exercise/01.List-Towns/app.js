import {html, render} from '../node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', onLoadTowns);

const listTemplate = (data) => html`
<ul>
    ${data.map(towns => html`<li>${towns}</li>`)}
</ul>
`;

function onLoadTowns(e){
    e.preventDefault();

    if(document.getElementById('towns').value !== ''){
        let root = document.getElementById('root');
        let towns = document.getElementById('towns').value.split(', ');
    
        let result = listTemplate(towns);
        render(result, root);
        
        document.getElementById('towns').value = '';
    }
}