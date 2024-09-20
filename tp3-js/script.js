const table = document.getElementsByClassName("myTable")[0];

function insertRow() {
    let nuevaFila = table.insertRow(-1);

    let celda1 = nuevaFila.insertCell(0);
    let celda2 = nuevaFila.insertCell(1);

    celda1.innerHTML = "Nueva columna";
    celda2.innerHTML = "Nueva columna";
}

function deleteRow() {  
    if (table.rows.length > 1) {
        table.deleteRow(-1);
    } else {
        alert(
            "La tabla no tiene filas"
        );
    }
}