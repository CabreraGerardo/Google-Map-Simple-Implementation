function updatePosition(lat, lng){
    if(localStorage.user != '' || localStorage.user != null || localStorage.user != undefined)
    {
        db.collection("usuariosUbicacion").doc(localStorage.user).update({
            location: new firebase.firestore.GeoPoint(lat, lng)
        });
    }
}