let homeSection = document.querySelector('.home');
let recipeList = homeSection.querySelector('.recipe-list');

export function renderHome(){
    fetch('http://localhost:3030/data/recipes')
        .then(res => res.json())
        .then(recipes => {
            renderRecipes(recipes);
            homeSection.style.display = 'block';   
        });
}

function renderRecipes(recipes){

    let fragment = document.createDocumentFragment();

    recipes.forEach(x => {
        fragment.appendChild(renderRecipe(x));
    });

    recipeList.innerHTML = '';
    recipeList.appendChild(fragment);
}


function renderRecipe(recipe){

    let article = document.createElement('article');
    article.classList.add('preview');

    article.innerHTML = `
    <div class="title">
        <h2>${recipe.name}</h2>                    
    </div>
    <div class="small">
        <img src="${recipe.img}">
    </div>`;

    return article;
}