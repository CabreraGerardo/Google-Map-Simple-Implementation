function loadCards(){
    let saldoTotal = 0;

    cards.forEach(card => {
        let month = card.expiracion.getMonth() + 1;
        let year = card.expiracion.getFullYear();
        cardsHTML.push(`
            <div id="${card.id}" class="credit-card">
                <div class="card_front card_part">
                    <img class="card_square" src="https://image.ibb.co/cZeFjx/little_square.png">
                    <img class="card_front-logo card_logo mt-1" src="https://www.pngkey.com/png/full/228-2286829_visa-logo-mastercard-and-visa-card.png">
                    <p class="card_number">${card.numero.toString().replace(/\d{4}(?=.)/g, '$& ')}</p>
                    <div class="card_space-75">
                        <p class="card_info">${card.tipo}</p>
                    </div>
                    <div class="card_space-25">
                        <span class="card_label">Expira</span>
                        <p class="card_info">${month}/${year}</p>
                    </div>
                </div>
            </div>
        `);

        document.getElementById('cardOptions').innerHTML += cardsHTML[cardsHTML.length - 1];
        
        document.getElementById(card.id).addEventListener('click', function() {
            document.getElementById('cardDropdown').innerHTML = cardsHTML[cardsHTML.length - 1];
            loadMovements(card.movimientos);
        });

        saldoTotal += card.saldo;
        console.log(card);

        loadMovements(card.movimientos);
    });
    
    document.getElementById('cardDropdown').innerHTML += cardsHTML[cardsHTML.length - 1];
}

function loadMovements(movimientos){
    document.getElementById('movimientos').innerHTML = '';
    
    movimientos.forEach(movimiento => {
        let date = movimiento.fecha;

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        document.getElementById('movimientos').innerHTML += `
            <option value="${movimiento.ubicacion.latitude},${movimiento.ubicacion.longitude},${movimiento.monto}"><strong>${movimiento.monto}</strong> (${day}/${month}/${year})</option>
        `;
    });

    document.getElementById('movimientos').addEventListener('change', function() {
        var coords = document.getElementById('movimientos').value.split(",");

        var icono = {
            url: coords[2] > 0 ? 'https://cdn4.iconfinder.com/data/icons/colorful-design-basic-icons-1/550/investment_money_green-512.png' : 'https://cdn4.iconfinder.com/data/icons/colorful-design-basic-icons-1/550/investment_money_red-512.png',
            scaledSize: new google.maps.Size(50,50),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(0,0)
        }

        if(movementsMarker){
            movementsMarker.setPosition({
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1])
            });
            movementsMap.panTo({
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1])
            });
        }
        else
        {
            movementsMarker = new google.maps.Marker(
            {
                position: {
                    lat: parseFloat(coords[0]),
                    lng: parseFloat(coords[1])
                }, 
                map: movementsMap
            });
            
            movementsMap.panTo({
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1])
            });
        }
        movementsMarker.setIcon(icono);
        
    });
}
