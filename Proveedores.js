//FUNCIONES
function Listar() {
    $.get("Home/listar", function (data) {
        crearLista(["COD_PROVEEDOR", "PROVEEDOR", "DIRECCION", "TELEFONO", "OPERACIONES"], data, "Tabla");
    });
}

function crearLista(arrayColumnas, data, Control) {
    var contenido = '';


    contenido += "<table id='Tablita' class='table table-hover'>";
    contenido += "<thead class='table-dark'>";
    contenido += "<tr>"
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>" + arrayColumnas[i] + "</td>"
    }
    contenido += "</tr>"
    contenido += "</thead>";

    contenido += "<body>";

    var nfilas = data.length;
   

    if (nfilas != 0) { 
        var llaves = Object.keys(data[0]);
        var valorLlaves;

    for (var i = 0; i < nfilas; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            valorLlaves = llaves[j];
            contenido += "<td>" + data[i][valorLlaves] + "</td>";
        }
        var llaveCodigo = llaves[0];
        contenido += "<td> <button id='btnEditar' class='btn btn-primary' onClick='abrirModal(" + data[i][llaveCodigo] + ")' data-bs-toggle='modal' data-bs-target='#staticBackdrop'><i class='bi bi-pencil-square'></i></button>  &nbsp;&nbsp; <button id='btnEliminar' class='btn btn-danger'  onClick='Eliminar(" + data[i][llaveCodigo] + ")'><i class='bi bi-trash'></i></button> </td>";
        contenido += "</tr>";
        }
    }
    contenido += "</body>";
    contenido += "</table>";

    document.getElementById(Control).innerHTML = contenido;

    $("#Tablita").dataTable({
        searching: false
    });
}

function abrirModal(valor) {

    //PARA LIMPIAR ERRORES
    var controles = document.getElementsByClassName("obligatorio");
    for (var i = 0; i < controles.length; i++) {
            controles[i].classList.remove("error");
        }

    if (valor == 0) {
        //NUEVO
        document.getElementById("lblTitulo").innerHTML = "<i class='bi bi - file - earmark - plus'></i> Nuevo Proveedor";
        borrarDatos();
    }
    else {
        //MODIFICAR
        document.getElementById("lblTitulo").innerHTML = "<i class='bi bi - pencil - fill'></i> Editar Proveedor";
        $.get("Home/listarByCodigo/?buscar=" + valor, function (data) {

            document.getElementById("txtCodigo").value = data[0].COD_PROVEEDOR;
            document.getElementById("txtProveedor").value = data[0].PROVEEDOR;
            document.getElementById("txtDireccion").value = data[0].DIRECCION;
            document.getElementById("txtTelefono").value = data[0].TELEFONO;
        });
    }
}

function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    //console.log(controles);
    for (var i = 0; i < controles.length; i++) {
        controles[i].value = "";
    }
}

function datosObligatorio() {
    var exito = true;
    var controles = document.getElementsByClassName("obligatorio");

    for (var i = 0; i < controles.length; i++) {
        if (controles[i].value == "") {
            exito = false;
            controles[i].classList.add('error');
        } else {
            exito = true;
            controles[i].classList.remove("error");
        }
    }
    return exito;
}

function Agregar() {
    if (datosObligatorio()) {
        //GRABA
        var frm = new FormData();
        var codigo = document.getElementById("txtCodigo").value;
        var proveedor = document.getElementById("txtProveedor").value;
        var direccion = document.getElementById("txtDireccion").value;
        var telefono = document.getElementById("txtTelefono").value;

        frm.append("COD_PROVEEDOR", codigo);
        frm.append("PROVEEDOR", proveedor);
        frm.append("DIRECCION", direccion);
        frm.append("TELEFONO", telefono);

        if (confirm("¿Desea Guardar?") == 1) {
            $.ajax({
                type: "POST",
                url: "Home/GuardarDatos",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        Listar();
                        alert("REGISTRADO");
                        document.getElementById("btnSalir").click();
                    } else {
                        alert("ERRORRRRRRRRRRR");
                    }
                }
            });
        }

        

    } else {
        //NO GRABA
    }
}


function Eliminar(valor) {

    var frm = new FormData();
    frm.append("COD_PROVEEDOR", valor);

    if (confirm("¿Desea eliminar Codigo: "+ valor +"?") == 1) {
        $.ajax({
            type: "POST",
            url: "Home/EliminarDatos",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data > 0) {
                    alert("ELIMINADO");
                    Listar();
                    document.getElementById("btnSalir").click();
                } else {
                    alert("ERRORRRRRRRRRRR");
                }
            }
        });
    }
    //Listar();
}



//frm
Listar();


//EVENTOS
var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function () {
    var buscar = document.getElementById("txtBuscar").value;

    $.get("Home/Buscar/?buscar=" + buscar, function (data) {
        crearLista(["COD_PROVEEDOR", "PROVEEDOR", "DIRECCION", "TELEFONO", "OPERACIONES"], data, "Tabla");
    });
}

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
        $.get("Home/listar", function (data) {
            crearLista(["COD_PROVEEDOR", "PROVEEDOR", "DIRECCION", "TELEFONO", "OPERACIONES"], data, "Tabla");
        });

        document.getElementById("txtBuscar").value = '';
}