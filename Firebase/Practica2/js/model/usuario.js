class Usuario{
    constructor(id, name, lastName, username){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
    }

    borrar(){
        db.collection("users").doc(this.id).delete();
    }

    agregar(){
        db.collection("users").add(
            {
                Nombre: this.name,
                Apellido: this.lastName,
                Usuario: this.username
            }
        );
    }

    editar(){
        formularioEdicion.nombre.value = this.name;
        formularioEdicion.apellido.value = this.lastName;
        formularioEdicion.usuario.value = this.username;
        formularioEdicion.idEditar.value = this.id;
    }

    actualizar(){
        db.collection("users").doc(this.id).update({
            Nombre: this.name,
            Apellido: this.lastName,
            Usuario: this.username
        });
    }
}