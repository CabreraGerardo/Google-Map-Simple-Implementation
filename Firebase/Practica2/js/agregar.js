
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    var usuario = new Usuario(null, formulario.nombre.value, formulario.apellido.value, formulario.usuario.value);

    db.collection("users").add(
        {
            Nombre: usuario.name,
            Apellido: usuario.lastName,
            Usuario: usuario.username
        }
    );
});
