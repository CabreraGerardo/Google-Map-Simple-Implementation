formularioEdicion.addEventListener('submit', (e) => {
    e.preventDefault();

    var usuario = new Usuario(formularioEdicion.idEditar.value, formularioEdicion.nombre.value, formularioEdicion.apellido.value, formularioEdicion.usuario.value);

    usuario.actualizar();

    formularioEdicion.idEditar.value = "";
    formularioEdicion.nombre.value = "";
    formularioEdicion.apellido.value = "";
    formularioEdicion.usuario.value = "";

    var id = document.getElementById(usuario.id);

    id.querySelector("#divNombre").querySelector('.nombre').textContent = usuario.name;
    id.querySelector("#divApellido").querySelector('.apellido').textContent = usuario.lastName;
    id.querySelector("#divUsuario").querySelector('.nombreUsuario').textContent = usuario.username;

    $("#editUser").modal('toggle');
});