const baseUrl = 'http://localhost:3000/';

const api_interaction = (method, url, body) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.responseType = 'json';

    if (method === "POST") {
        request.setRequestHeader('Content-Type', 'application/json;Charset=UTF-8');
    }

    return new Promise((resolve, reject) => {

        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                resolve(request.response);
            } else {
                reject(request.statusText);
            }
        }

        request.onerror = () => {
            reject("Network error: " + request.statusText);
        }

        request.send((body) ? JSON.stringify(body) : null);
    })
}

const getClients = async()=>{
    return await api_interaction("GET",`${baseUrl}clients`);
}

const renderTable = async()=>{
    const tbody = document.getElementById("clientTable").querySelector('tbody');
    const clientsData = await getClients();    
    tbody.innerHTML = "";

    clientsData.forEach(client => {
        let newTr = document.createElement('tr');

        const idTd = document.createElement('td');
        idTd.innerHTML = client.id;
        newTr.appendChild(idTd);
        
        const fnTd = document.createElement('td');
        fnTd.innerHTML = client.first_name;
        newTr.appendChild(fnTd);

        const lnTd = document.createElement('td');
        lnTd.innerHTML = client.last_name;
        newTr.appendChild(lnTd);

        const emTd = document.createElement('td');
        emTd.innerHTML = client.email;
        newTr.appendChild(emTd);

        const cnTd = document.createElement('td');
        cnTd.innerHTML = client.country;
        newTr.appendChild(cnTd);

        tbody.appendChild(newTr);
    });
}

