/*db.collection('usuarios').get().then( (snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderProducto(doc);                    
    });
});*/

db.collection('users').onSnapshot( snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == "added")
        {
            renderUsuario(change.doc);
        }
        else if(change.type == "removed")
        {
            let valorId = document.getElementById(change.doc.id);
            lista.removeChild(valorId);
        }
    });
});