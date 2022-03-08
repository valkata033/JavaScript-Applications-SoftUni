function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/phonebook';
    let ul = document.getElementById('phonebook');

    let person = document.getElementById('person');
    let phone = document.getElementById('phone');

    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', onLoad);
    createBtn.addEventListener('click', onCreate);

    async function onLoad() {
        ul.innerHTML = '';

        let response = await fetch(url);
        let data = await response.json();

        Object.values(data).forEach(({ person, phone, _id }) => {

            let li = document.createElement('li');
            let deleteBtn = document.createElement('button');

            li.textContent = `${person}: ${phone}`;
            li.setAttribute('id', _id);
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('id', 'DeleteBtn');

            li.appendChild(deleteBtn);
            ul.appendChild(li);

            deleteBtn.addEventListener('click', onDelete);   

        });
    }

    async function onDelete(e){

        let id = e.target.parentNode.id;
        e.target.parentNode.remove();

        let response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

    }

    async function onCreate() {

        if (person.value !== '' && phone.value !== '') {

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({person: person.value, phone: phone.value}),
            });

            loadBtn.click();
            
            person.value = '';
            phone.value = '';
        }
    }

}

attachEvents();