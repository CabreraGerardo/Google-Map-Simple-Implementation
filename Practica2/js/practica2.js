var navegador = document.getElementById("navegador");
var datos = navegador.getElementsByTagName("li");

function obtieneDatos() {
    datos[0].innerHTML = "Nombre del navegador es: "  + navigator.appCodeName;
    datos[1].innerHTML = "La versión del navegador es: " + navigator.appVersion;
    datos[2].innerHTML = "Estatus de internet: " + navigator.onLine;
    datos[3].innerHTML = "Plataforma: " + navigator.platform;
}