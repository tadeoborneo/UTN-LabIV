const urlBase = "https://utn-lubnan-api-1.herokuapp.com/api/";
const tbody = document.getElementById("employeeTable").querySelector("tbody");

//Generalized API interaction
const apiInteraction = (method, url, body) => {

    const request = new XMLHttpRequest();
    request.open(method, url);

    if (method === "POST") {
        request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    }
    
    request.responseType = "json";

    return new Promise((resolve, reject) => {

        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                resolve(request.response);
            } else {
                reject("Error: " + request.statusText);
            }
        }

        request.onerror = () => {
            reject("Error: " + request.statusText);
        }

        //If body exists (Method is supposed to be POST or PUT), send it 
        request.send((body) ? JSON.stringify(body) : null);
    })
}

const getEmployees = async () => {
    return await apiInteraction("GET", `${urlBase}Employee`);
}

const getCompanies = async () => {
    return await apiInteraction("GET", `${urlBase}Company`);
}

//Get all the employees with a new attribute "companyName"
const getFullEmployees = async () => {

    let companies = await getCompanies();
    let fullEmployees = await getEmployees();

    let companyMap = new Map();

    companies.forEach(company => {
        companyMap.set(company.companyId, company.name);
    })

    fullEmployees.forEach(employee => {
        if (companyMap.has(employee.companyId)) {
            employee.companyName = companyMap.get(employee.companyId);
        }
    });
    return fullEmployees;
}

//Load employee data on the DOM
const renderEmployeeTable = async () => {

    const employeeData = await getFullEmployees();

    employeeData.forEach(employee => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${employee.employeeId}</td>
                            <td>${employee.firstName}</td>
                            <td>${employee.lastName}</td>
                            <td>${employee.companyId}</td>
                            <td>${employee.companyName}</td>
                            <td><button onclick='deleteEmployee(${employee.employeeId})'>Delete</button></td>`;
        tbody.appendChild(newRow);
    })
}

//Delete selected employee and refresh all data
const deleteEmployee = (employeeId) => {
    apiInteraction("DELETE", `${urlBase}Employee/${employeeId}`);
    tbody.innerHTML = '';
    renderEmployeeTable();
}

//Complete the company options in element "select" on EmployeeDataForm
const loadCompaniesInForm = async () => {
    let companies = await getCompanies();
    let selectEmployeeCompany = document.getElementById("selectEmployeeCompany");
    companies.forEach(company => {
        let option = document.createElement('option');
        option.value = company.companyId;
        option.innerText = company.name;
        selectEmployeeCompany.appendChild(option);
    })

}
const createEmployee = () => {
    let employee = {
        "employeeId":0, 
        "companyId":parseInt(document.getElementById('selectEmployeeCompany').value),
        "firstName":document.getElementById('employeeFirstName').value,
        "lastName":document.getElementById('employeeLastName').value,
        "email":document.getElementById('employeeEmail').value
    };
    return employee;
}

const addEmployee = async(employee) => {
    await apiInteraction("POST", `${urlBase}Employee`, employee);
    tbody.innerHTML = '';
    renderEmployeeTable();
}

window.onload = () => {

    loadCompaniesInForm();
    renderEmployeeTable();

    document.getElementById("refreshTableButton").onclick = () => {
        tbody.innerHTML = '';
        renderEmployeeTable();
    }

    document.getElementById("employeeDataForm").addEventListener("submit",(event)=>{
        event.preventDefault();
        addEmployee(createEmployee());
        document.getElementById("employeeFirstName").value = '';
        document.getElementById("employeeLastName").value = '';
        document.getElementById("employeeEmail").value = '';
        document.getElementById("selectEmployeeCompany").value = '';
    })
}