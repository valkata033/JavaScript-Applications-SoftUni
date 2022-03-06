async function getInfo() {
    
    let divElement = document.getElementById('stopName');
    let ulElement = document.getElementById('buses');
    let inputElement = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputElement}`;
    

    try{
        ulElement.innerHTML = '';
        let res = await fetch(url);
        
        if(res.status !== 200){
            throw new Error('Stop ID not found!');
        }
        
        let data = await res.json();

        divElement.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            let liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            ulElement.appendChild(liElement);
        });

    }catch(err){
        divElement.textContent = 'Error';
    }

    

}