var firebaseConfig = {
    apiKey: "AIzaSyCYebr8sO8pXiFu4JLVrgN1-ojkG5cqQ1E",
    authDomain: "melodic-stone-268000.firebaseapp.com",
    databaseURL: "https://melodic-stone-268000.firebaseio.com",
    projectId: "melodic-stone-268000",
    storageBucket: "melodic-stone-268000.appspot.com",
    messagingSenderId: "71172249194",
    appId: "1:71172249194:web:16acd498ebf251d9699c13"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const usuariosLista = document.querySelector("#lista");
const formulario = document.querySelector("#forma");

/*db.collection('usuarios').get().then( (snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderProducto(doc);                    
    });
});*/

db.collection('usuarios').onSnapshot( snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == "added")
        {
            renderProducto(change.doc);
        }
        else if(change.type == "removed")
        {
            let valorId = document.getElementById(change.doc.id);
            lista.removeChild(valorId);
        }
    });
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection("usuarios").add(
        {
            Nombre: formulario.nombre.value,
            Apellido: formulario.apellido.value,
            Usuario: formulario.usuario.value
        }
    );
});

function renderProducto(doc){
    let li = document.createElement("li");
    let nombre = document.createElement("span");
    let apellido = document.createElement("span");
    let usuario = document.createElement("span");
    let borrar = document.createElement("button");

    borrar.className = "btn btn-danger m-3"
    nombre.className = "mx-2";
    apellido.className = "mx-2";
    usuario.className = "mx-4 font-weight-bold";

    nombre.textContent = doc.data().Nombre;
    apellido.textContent = doc.data().Apellido;
    usuario.textContent = doc.data().Usuario;
    borrar.textContent = "Borrar";

    li.setAttribute("id", doc.id);

    li.appendChild(borrar);
    li.appendChild(nombre);
    li.appendChild(apellido);
    li.appendChild(usuario)

    usuariosLista.appendChild(li);

    borrar.addEventListener("click", (e) => {
        let id = e.target.parentElement.getAttribute("id");
        db.collection("usuarios").doc(id).delete();
    });
}