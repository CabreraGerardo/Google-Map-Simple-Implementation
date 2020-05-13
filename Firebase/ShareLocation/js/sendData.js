function updatePosition(lat, lng){
    console.log(localStorage.user);
    if(localStorage.user)
    {
        db.collection("usuariosUbicacion").doc(localStorage.user).update({
            location: new firebase.firestore.GeoPoint(lat, lng)
        });
    }
}