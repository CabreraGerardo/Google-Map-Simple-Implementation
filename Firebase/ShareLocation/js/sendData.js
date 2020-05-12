function updatePosition(lat, lng){
    db.collection("usuariosUbicacion").doc(localStorage.user).update({
        location: new firebase.firestore.GeoPoint(lat, lng)
    });
}