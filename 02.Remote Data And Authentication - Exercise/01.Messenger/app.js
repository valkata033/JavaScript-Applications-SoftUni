let url = 'http://localhost:3030/jsonstore/messenger';

let messagesArea = document.getElementById('messages');

function attachEvents() {

    document.getElementById('submit').addEventListener('click', onSubmit);
    document.getElementById('refresh').addEventListener('click', onRefresh);
}

async function onRefresh() {

    let response = await fetch(url);
    let data = await response.json();

    messagesArea.value = Object.values(data).map(({ author, content }) => `${author}: ${content}`).join('\n');

}

async function onSubmit() {

    let author = document.querySelector('input[name="author"]');
    let content = document.querySelector('input[name="content"]');
    
    if(author.value !== '' || content.value !== ''){
        await request(url, {author: author.value, content: content.value});
        author.value = '';
        content.value = '';
    }

}

async function request(url, option) {

    if (option) {
        option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(option),
        };

        let response = await fetch(url, option);

        return response.json();
    }


}

attachEvents()