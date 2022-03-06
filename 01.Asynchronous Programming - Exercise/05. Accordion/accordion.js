async function solution() {
    
    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    let response = await fetch(url);
    let responseData = await response.json();

    let mainElement = document.getElementById('main');

    responseData.forEach(async (article) => {

        let urlWithId = `http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`;
        let secondResponse = await fetch(urlWithId);
        let secondResponseData = await secondResponse.json();

        const accordionDivElement = document.createElement('div');
        accordionDivElement.classList.add('accordion');

        const headDivElement = document.createElement('div');
        headDivElement.classList.add('head');
        accordionDivElement.appendChild(headDivElement);

        const spanTitleElement = document.createElement('span');
        spanTitleElement.textContent = secondResponseData.title;
        headDivElement.appendChild(spanTitleElement);

        const buttonElement = document.createElement('button');
        buttonElement.classList.add('button');
        buttonElement.id = secondResponseData._id;
        buttonElement.textContent = `More`;
        buttonElement.addEventListener('click', showHideContent);
        headDivElement.appendChild(buttonElement);

        const extraDivElement = document.createElement('div');
        extraDivElement.classList.add('extra');
        accordionDivElement.appendChild(extraDivElement);

        const pElement = document.createElement('p');
        pElement.textContent = secondResponseData.content;
        extraDivElement.appendChild(pElement);

        mainElement.appendChild(accordionDivElement);

        function showHideContent(ev) {

            switch(ev.target.textContent){
                case 'More':
                    ev.target.textContent = 'Less';
                    ev.target.parentNode.nextSibling.style.display = 'block';
                    break;

                case 'Less':
                    ev.target.textContent = 'More';
                    ev.target.parentNode.nextSibling.style.display = 'none';
                    break;
            }
        }

    });

}

solution();