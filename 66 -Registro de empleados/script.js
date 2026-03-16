let empleados = [];

function Empleado(legajo, nombre, apellido, nacimiento, cargo){
    this.legajo = legajo;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nacimiento = nacimiento;
    this.cargo = cargo;
}

function agregarEmpleado(){
 document.getElementById("txtLegajo").value;
 document.getElementById("txtNombre").value;
 document.getElementById("txtApellido").value;
 document.getElementById("txtNacimiento").value;
 document.getElementById("txtCargo").value;

    let empleado = new Empleado(legajo, nombre, apellido, nacimiento, cargo);

    empleados.push(empleado);
    alert("Empleado ha sido agregado");
    limpiarCampos();
}

function limpiarCampos(){
    document.getElementById("txtLegajo").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtNacimiento").value = "";
    document.getElementById("txtCargo").value = "";
}

function mostrarEmpleado(){
    let listado = "";
    for(let empleado of empleados){
        listado += "-------------------------\n";
        listado += "LEGAJO: " + empleado.legajo + "\n";
        listado += "NOMBRE: " + empleado.nombre + "\n";
        listado += "APELLIDO: " + empleado.apellido + "\n";
        listado += "NACIMIENTO: " + empleado.nacimiento + "\n";
        listado += "CARGO: " + empleado.cargo + "\n\n";
    }
    alert(listado);
}