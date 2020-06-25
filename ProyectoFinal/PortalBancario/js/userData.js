let cards = [];
let cardsHTML = [];
let name = document.getElementById('username');
let pic = document.getElementById('profilePicture');
let userID;

auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        console.log(user);
        userID = user.uid;
        db.collection('usuariosBanco').doc(user.uid).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setUserData(doc.data(), user.uid, user.photoURL);
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

function setUserData(user, id, photoURL){
    name.innerHTML = user.nombre;
    pic.src = photoURL ? photoURL : 'https://www.waspcom.com/wp-content/uploads/2014/10/user-placeholder-circle-1-300x300.png';

    getCards(id);
}

function getCards(id){
    db.collection('usuariosBanco').doc(id).collection('Tarjetas').get().then( querySnapshot => {
        var bar = new Promise((resolve, reject) => {
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
                    if(querySnapshot.docs.length == cards.length) resolve();
                })
            });
        });

        bar.then(() => {
            loadCards();
        })
        
    });
}