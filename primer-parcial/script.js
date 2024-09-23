const urlBase = "https://utn-lubnan-api-2.herokuapp.com/api/";

class Student {
    constructor(studentId, careerId, firstName, lastName, email, careerName) {
        this.studentId = studentId;
        this.careerId = careerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.careerName = careerName;
    }

}


//Only works for methods DELETE and GET
const apiInteraction = (method, url) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    if (method === "GET") {
        request.responseType = "json";
    }
    return new Promise((resolve, reject) => {
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                resolve(request.response);
            } else {
                reject(request.responseText);
            }
        }

        request.onerror = () => {
            reject("Error: " + request.responseText)
        }

        request.send();
    })
}

const getStudents = async () => {
    return await apiInteraction("GET", `${urlBase}Student`);
}
const getCareers = async () => {
    return await apiInteraction("GET", `${urlBase}Career`);
}


const mergeData = async () => {
    const students = await getStudents();
    const careers = await getCareers();
    const studentsArray = new Array();

    students.forEach(student => {
        if (student.careerId !== null) {
            studentsArray.push(new Student(student.studentId, student.careerId, student.firstName, student.lastName, student.email, careers[student.careerId - 1].name));
        }
    });

    return studentsArray;
}

const renderTable = async () => {
    const data = await mergeData();
    const tbody = document.getElementById("studentsTable").querySelector("tbody");
    const careers = await getCareers();
    tbody.innerHTML = "";

    data.sort((a,b)=>{
        if(a.lastName > b.lastName){
            return 1;
        }else if (a.lastName < b.lastName){
            return -1;
        }else{
            return 0;
        }
    })

    data.forEach(student => {
        if(careers[student.careerId - 1].active === true){        
            let row = document.createElement("tr");
            row.innerHTML = `<td>${student.studentId}</td>
                         <td>${student.careerName}</td>
                         <td>${student.lastName}</td>
                         <td>${student.firstName}</td>
                         <td>${student.email}</td>
                         <td><button onclick="deleteStudent(${student.studentId})">Delete</button></td>`;
            tbody.appendChild(row);
        }
    })
}

const deleteStudent = async (studentId) => {
    await apiInteraction("DELETE", `${urlBase}Student/${studentId}`);
    renderTable();
}

const renderForm = async()=>{

    const careers = await getCareers();
    document.getElementById("studentFirstName").value = "";
    document.getElementById("studentLastName").value = "";
    document.getElementById("studentEmail").value = "";
    const selectCareer = document.getElementById("studentCareer");
    selectCareer.value = "";

    careers.forEach(career=>{
        let option = document.createElement('option');
        option.value = career.careerId;
        option.innerText = career.name;
        selectCareer.appendChild(option);
    })

    
    
}

window.onload = () => {
    renderTable();
    renderForm();
    document.getElementById("addStudentButton").addEventListener('click',/*Aca iria la funcion para realizar el post que incluiria el render form adentro*/renderForm());
}