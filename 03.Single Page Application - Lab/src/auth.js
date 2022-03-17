let guest = document.getElementById('guest');
let user = document.getElementById('user');

export function updateAuth(){
    
    let serializedUser = localStorage.getItem('user');
    
    if(serializedUser){
        user.style.display = 'inline';
        guest.style.display = 'none';
    }
    else{
        user.style.display = 'none';
        guest.style.display = 'inline';
    }
}

export function getToken(){
    let serializedUser = localStorage.getItem('user');

    if(serializedUser){
        let user = JSON.parse(serializedUser);

        return user.accessToken;
    }
}

export function logout(){
    localStorage.removeItem('user');
}