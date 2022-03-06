function attachEvents() {

    let postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    let commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const dropdownPostsMenu = document.getElementById('posts');

    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    let loadPostsBtn = document.getElementById('btnLoadPosts');
    loadPostsBtn.addEventListener('click', onLoadPosts);

    let viewPostsBtn = document.getElementById('btnViewPost');
    viewPostsBtn.addEventListener('click', onViewPosts);

    async function onViewPosts() {

        postComments.innerHTML = '';

        let response = await fetch(postsUrl);
        let responseData = await response.json();

        postTitle.textContent = responseData[dropdownPostsMenu.value].title.toUpperCase();
        postBody.textContent = responseData[dropdownPostsMenu.value].body;

        let commentsResponse = await fetch(commentsUrl);
        let commentsResponseData = await commentsResponse.json();

        let asArr = Object.entries(commentsResponseData);
        asArr = asArr.filter(([, value]) => value.postId === dropdownPostsMenu.value);

        for (const [key, value] of asArr) {
            let liElement = document.createElement('li');
            liElement.id = key;
            liElement.textContent = value.text;
            postComments.appendChild(liElement);
        }

    }

    async function onLoadPosts() {

        let response = await fetch(postsUrl);
        let responseData = await response.json();

        for (const key in responseData) {
            let optionElement = document.createElement('option');
            optionElement.textContent = responseData[key].title;
            optionElement.value = key;
            dropdownPostsMenu.appendChild(optionElement);
        }
    }

}

attachEvents();