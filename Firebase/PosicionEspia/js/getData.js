function listenPosition(marker){
    db.collection('posicionEspia').onSnapshot( snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == "modified" || change.type == "added")
            {
                moverPosicion(marker, change.doc.data())
            }
        });
    });
}