import { html, render } from '../node_modules/lit-html/lit-html.js';

let url = 'http://localhost:3030/jsonstore/advanced/table';

let tableTemplate = (data) => html`
${data.map(el => html`
   <tr>
      <td>${el.firstName} ${el.lastName}</td>
      <td>${el.email}</td>
      <td>${el.course}</td>
   </tr>`)}
`;

async function getInfo() {
   let response = await fetch(url);
   return await response.json();
}

let data = Object.values(await getInfo());
let tbody = document.querySelector('tbody');
update(data);

function update(data) {
   let result = tableTemplate(data);
   render(result, tbody);
}

document.querySelector('#searchBtn').addEventListener('click', onClick);

function onClick() {
   let search = document.getElementById('searchField').value;
   
   if(document.getElementById('searchField').value !== ''){
      
      tbody.querySelectorAll('tr').forEach(tr => {
         tr.querySelectorAll('td').forEach(td => {
            td.classList.remove('select');

            if(td.textContent.includes(search)){   
               td.classList.add('select');
            }
         });
      });
   }
      
   document.getElementById('searchField').value = '';
}
