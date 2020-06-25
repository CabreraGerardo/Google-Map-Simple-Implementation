function loadCards(){}

document.getElementById('btnCreditCard').addEventListener('click', async function() {
    console.log(userID)
    await db.collection('usuariosBanco').doc(userID).collection('Tarjetas').doc().set({
        numero: Math.round(Math.random()*1E16),
        expiracion: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
        tipo: 'credito',
        saldo: 0
    });

    alert('Creada')
});

document.getElementById('btnCreditVipCard').addEventListener('click', async function() {
    console.log(userID)
    await db.collection('usuariosBanco').doc(userID).collection('Tarjetas').doc().set({
        numero: Math.round(Math.random()*1E16),
        expiracion: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
        tipo: 'credito vip',
        saldo: 0
    });

    alert('Creada')
});

document.getElementById('btnDebit').addEventListener('click', async function() {
    console.log(cards.find(element => element.tipo == 'debito'))
    await db.collection('usuariosBanco').doc(userID).collection('Tarjetas').doc((cards.find(element => element.tipo == 'debito')).id).collection('Movimientos').doc().set({
        fecha: firebase.firestore.Timestamp.fromDate(new Date()),
        monto: parseFloat(document.getElementById('debitQuantity').value),
        ubicacion: new firebase.firestore.GeoPoint(debitMarker.getPosition().lat(), debitMarker.position.lng())
    });

    await db.collection('usuariosBanco').doc(userID).collection('Tarjetas').doc((cards.find(element => element.tipo == 'debito')).id).update({
        saldo: (cards.find(element => element.tipo == 'debito')).saldo + parseFloat(document.getElementById('debitQuantity').value),
    });
    
    alert('Creado');
});

document.getElementById('btnCredit').addEventListener('click', async function() {
    
    await db.collection('usuariosBanco').doc(userID).collection('Tarjetas').doc((cards.find(element => element.tipo == 'credito')).id).collection('Movimientos').doc().set({
        fecha: firebase.firestore.Timestamp.fromDate(new Date()),
        monto: parseFloat(document.getElementById('creditQuantity').value),
        ubicacion: new firebase.firestore.GeoPoint(creditMarker.getPosition().lat(), creditMarker.position.lng())
    });

    await db.collection('usuariosBanco').doc(userID).collection('Tarjetas').doc((cards.find(element => element.tipo == 'credito')).id).update({
        saldo: (cards.find(element => element.tipo == 'credito')).saldo + parseFloat(document.getElementById('creditQuantity').value),
    });
    
    alert('Creado');
});

document.getElementById('btnCreditVip').addEventListener('click', async function() {
    
    await db.collection('usuariosBanco').doc(userID).collection('Tarjetas').doc((cards.find(element => element.tipo == 'credito vip')).id).collection('Movimientos').doc().set({
        fecha: firebase.firestore.Timestamp.fromDate(new Date()),
        monto: parseFloat(document.getElementById('creditVipQuantity').value),
        ubicacion: new firebase.firestore.GeoPoint(creditVipMarker.getPosition().lat(), creditVipMarker.position.lng())
    });
    
    await db.collection('usuariosBanco').doc(userID).collection('Tarjetas').doc((cards.find(element => element.tipo == 'credito vip')).id).update({
        saldo: (cards.find(element => element.tipo == 'credito vip')).saldo + parseFloat(document.getElementById('creditVipQuantity').value),
    });

    alert('Creado');
});