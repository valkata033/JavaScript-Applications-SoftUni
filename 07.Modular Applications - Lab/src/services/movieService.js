let baseUrl = 'http://localhost:3030/data/movies';

export const GetAll = (search) => {
    let queryString = '';

    if(search){
        queryString = '?where=' + encodeURIComponent(`title LIKE "${search}"`);
    }

    return fetch(baseUrl + queryString).then(res => res.json());
};

export const getOne = (movieId) => fetch(`${baseUrl}/${movieId}`).then(res => res.json()); 

