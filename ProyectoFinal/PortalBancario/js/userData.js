let cards = [];
let cardsHTML = [];
let name = document.getElementById('username');
let pic = document.getElementById('profilePicture');

auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        db.collection('usuariosBanco').doc(user.uid).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setUserData(doc.data(), user.uid);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } else {
      // No user is signed in.
    }
});

function setUserData(user, id){
    name.innerHTML = user.nombre;
    

    getCards(id);
}

function getCards(id){
    db.collection('usuariosBanco').doc(id).collection('Tarjetas').get().then( querySnapshot => {
        querySnapshot.docs.forEach(doc => {    
            let movimientos = [];
            db.collection('usuariosBanco').doc(id).collection('Tarjetas').doc(doc.id).collection('Movimientos').orderBy("fecha", "desc").get().then( snapshot => {
                snapshot.docs.forEach(movimiento => {
                    movimientos.push({
                        monto: movimiento.data().monto,
                        fecha: movimiento.data().fecha.toDate(),
                        ubicacion: movimiento.data().ubicacion
                    });
                });
                
                cards.push({
                    id: doc.id,
                    numero: doc.data().numero,
                    tipo: doc.data().tipo,
                    expiracion: doc.data().expiracion.toDate(),
                    saldo: doc.data().saldo,
                    movimientos: movimientos
                });

                loadCards();
            })

        });
    });
}