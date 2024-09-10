const alphabeticValidationPattern = new RegExp("^[A-Z]+$", "i");
function validateForm() {
    return validateFormName() && validateFormSurname() && validateFormPassword() && validateFormEmail();
}

function validateFormEmail(){
    let emailElement = document.getElementById("email");
    let emailValue = emailElement.value;

    if(!emailValue){
        showError(emailElement.id,"El campo no puede estar vacio")
        return false;
    }else if(!/^[^\s@]+@(gmail\.com|outlook\.com|icloud\.com)$/i.test(emailValue)){
        showError(emailElement.id,"El campo tiene que tener un formato de email valido");
        return false;
    }
    else{
        showError(emailElement.id, "")
        return true;
    }
}
function validateFormPassword() {
    let passwordElement = document.getElementById("password");
    let passwordValue = passwordElement.value;

    if (!passwordValue) {
        showError(passwordElement.id, "El campo no puede estar vacio");
        return false
    } else if (passwordValue.length < 9 || passwordValue.length > 20) {
        showError(passwordElement.id, "La contrasenia debe tener entre 9 y 20 caracteres")
        return false;
    } else if (!/[a-z]/.test(passwordValue) || !/[A-Z]/.test(passwordValue) || !/[0-9]/.test(passwordValue)) {
        showError(passwordElement.id, "La contrasenia debe tener al menos 1 mayuscula, 1 minuscula y 1 numero")
        return false;
    } else {
        showError(passwordElement.id, "")
        return true;
    }
}
function validateFormName() {
    let nameElement = document.forms["createAccountForm"]["name"];
    let nameValue = nameElement.value;

    if (nameValue === "") {
        showError(nameElement.id, "El campo no puede estar vacio")
        return false;
    } else if (nameValue.length > 20) {
        showError(nameElement.id, "El campo no puede contener mas de 20 letras")
        return false;
    } else if (!alphabeticValidationPattern.test(nameValue)) {
        showError(nameElement.id, "Solo se permiten letras");
        return false;
    } else {
        showError(nameElement.id, "")
        return true;
    }
}

function validateFormSurname() {
    let surnameElement = document.getElementById("surname");
    let surnameValue = surnameElement.value;
    if (surnameValue === "") {
        showError(surnameElement.id, "El campo no puede estar vacio");
        return false;
    } else if (surnameValue.length > 20) {
        showError(surnameElement.id, "El campo no puede contener mas de 20 letras")
        return false;
    } else if (!alphabeticValidationPattern.test(surnameValue)) {
        showError(surnameElement.id, "Solo se permiten letras");
        return false;
    }
    else {
        showError(surnameElement.id, "");
        return true;
    }
}

document.getElementById("createAccountForm").onsubmit = function (event) {
    if (!validateForm()) {
        event.preventDefault();
    }
}

function showError(elementId, message) {
    document.getElementById(elementId + "Error").innerHTML = message;
}

