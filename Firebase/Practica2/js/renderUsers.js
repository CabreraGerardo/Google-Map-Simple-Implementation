function renderUsuario(doc){

    var usuario = new Usuario(doc.id, doc.data().Nombre, doc.data().Apellido, doc.data().Usuario);

    let div = document.createElement("div");
    let divNombre = document.createElement("div");
    let divApellido = document.createElement("div");
    let divUsuario = document.createElement("div");
    let divBotones = document.createElement("div");

    let nombre = document.createElement("span");
    let apellido = document.createElement("span");
    let nombreUsuario = document.createElement("span");

    let borrar = document.createElement("button");
    let editar = document.createElement("button");

    let editIcon = document.createElement("i");
    let deleteIcon = document.createElement("i");

    editIcon.className = "fas fa-edit";
    deleteIcon.className = "fas fa-trash";

    div.className = "row";
    divNombre.className = "col-4 col-md-3 my-2";
    divApellido.className = "col-4 col-md-3 my-2";
    divUsuario.className = "col-4 col-md-2 my-2";
    divBotones.className = "col-12 col-md-4 pl-5 d-flex justify-content-end";

    divNombre.id = "divNombre";
    divApellido.id = "divApellido";
    divUsuario.id = "divUsuario";

    nombre.className = "nombre mx-sm-2";
    apellido.className = "apellido mx-sm-2";
    nombreUsuario.className = "nombreUsuario mx-sm-4 font-weight-bold";

    editar.className = "btn btn-info m-1";
    borrar.className = "btn btn-danger m-1";

    nombre.textContent = usuario.name;
    apellido.textContent = usuario.lastName;
    nombreUsuario.textContent = usuario.username;

    borrar.style = "width: 100%;"
    editar.style = "width: 100%;"

    div.setAttribute("id", usuario.id);

    editar.appendChild(editIcon);
    borrar.appendChild(deleteIcon);

    divNombre.appendChild(nombre);
    divApellido.appendChild(apellido);
    divUsuario.appendChild(nombreUsuario);

    divBotones.appendChild(editar);
    divBotones.appendChild(borrar);

    div.appendChild(divNombre);
    div.appendChild(divApellido);
    div.appendChild(divUsuario);
    div.appendChild(divBotones);

    usuariosLista.appendChild(div);

    borrar.addEventListener("click", (e) => {
        let id = e.target.parentElement.getAttribute("id");
        usuario.borrar();
    });

    editar.addEventListener("click", (e) => {
        $("#editUser").modal('toggle');
        db.collection('usuarios').doc(usuario.id).get().then( (doc) => {
            if (doc.exists) {
                usuario.name = doc.data().Nombre;
                usuario.lastName = doc.data().Apellido;
                usuario.username = doc.data().Usuario;
                
                usuario.editar();                
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        });
    });
}