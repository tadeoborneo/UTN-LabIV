let getApi = (url) => {
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


let combineCompanyAndEmployee = async () => {
    let apiPromise = await Promise.all([
        getApi("https://utn-lubnan-api-1.herokuapp.com/api/Company"),
        getApi("https://utn-lubnan-api-1.herokuapp.com/api/Employee")
    ])
        .then((response) => {
            console.log("Cargado con exito");
            let companies = response[0];
            let employees = response[1];

            employees.forEach(employee => {
                console.log(employee, companies.find(company => company.companyId === employee.companyId));
            });


        })
        .catch((reason) => {
            console.log("Cargado fallido");
        })
}

combineCompanyAndEmployee();

let postEmployee = (url, employeeData) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        request.onload = () => {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(Error('Error al enviar datos: ' + request.statusText));
            }
        }

        request.onerror = () => {
            reject(Error('Network error'));
        }

        request.send(JSON.stringify(employeeData));
    })

}

let newEmployee = {
    "CompanyId": 8,
    "FirstName": "Tadeo",
    "LastName": "Doe",
    "Email": "john@doe.com"
}

let addEmployee = async()=>{
    let postApi = await postEmployee("https://utn-lubnan-api-1.herokuapp.com/api/Employee",newEmployee)
        .then((response)=>{
            console.log(response);
        })
        .catch((reason)=>{
            console.log(reason);
        })
}

let deleteApi = (url) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('DELETE', url);

        request.onload = () => {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(Error('Error al eliminar: ' + request.statusText));
            }
        }

        request.onerror = () => {
            reject(Error('Network error'));
        }

        request.send();
    })
}

let deleteEmployee = async()=>{
    let deletePromise = await deleteApi("https://utn-lubnan-api-1.herokuapp.com/api/Employee/11")
        .then((response)=>{
            console.log(response);
        })
        .catch((reason)=>{
            console.log(reason);
        })
}

