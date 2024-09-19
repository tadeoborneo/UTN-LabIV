let loadCompanies = (url) => {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';

        request.onload = () => {
            if (request.status === 200) {
                resolve(request.response)
            } else {
                reject(Error("Error:" + request.statusText));
            }
        }

        request.onerror = () => {
            reject(Error('Network error.'));
        }
        request.send();
    })
}

let body = document.querySelector('body');
loadCompanies("https://utn-lubnan-api-1.herokuapp.com/api/Company")
    .then((response)=>{
        console.log("exito")
        body.append(JSON.stringify(response));
    })
    .catch((reason)=>{
        console.log("fracaso")
        console.log(reason);
    })