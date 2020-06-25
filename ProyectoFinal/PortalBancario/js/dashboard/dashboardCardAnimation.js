function setAnimations() {
    var centered = false;

    let index = 1;
    cards.forEach(card => {
        let left = document.getElementById(card.id).offsetWidth * index;   
        document.getElementById(card.id).addEventListener("click", (evt) => {
            if(centered)
            { 
                document.getElementById(card.id).style = `
                    position: relative;
                    left: 0px;
                `;

                cards.forEach(card2 => {
                    if(card.id != card2.id){
                        document.getElementById(card2.id).style = `
                            visibility: visible;
                            opacity: 1;
                        `;
                    }
                });

                document.getElementById('cards').style = `
                    overflow-x: scroll;
                    white-space: nowrap;
                `;

                document.getElementById('data').style = `
                    visibility: hidden';
                    opacity: 0;
                    height: auto;
                `;
            }
            else
            {            
                if(!loadData(card)) return;
                document.getElementById(card.id).style = `
                    position: relative;
                    left: ${(window.innerWidth || document.body.clientWidth) / 2 - left}px;
                `;

                cards.forEach(card2 => {
                    if(card.id != card2.id){
                        document.getElementById(card2.id).style = `
                            visibility: hidden;
                            opacity: 0;
                        `;
                    }
                });

                document.getElementById('cards').style = `
                    overflow-x: hidden;
                    white-space: nowrap;
                `;

                document.getElementById('data').style = `
                    visibility: visible;
                    opacity: 1;
                    height: auto;
                `;

            }
        
            centered = !centered;
        });
        index++;
    });
}

function loadData(card){
    console.log(!card.movimientos)
    if(card.movimientos.length <= 0) {
        alert("No tiene moviemientos registrados en la tarjeta"); 
        return false;
    }

    let lastCharge = 0;
    let lastDeposit = 0;

    card.movimientos.forEach(movimiento => {
        console.log(movimiento.monto)
        if(movimiento.monto > 0 && lastDeposit == 0) lastDeposit = movimiento;
        if(movimiento.monto < 0 && lastCharge == 0) lastCharge = movimiento;
    });

    document.getElementById('saldo').innerHTML = `$${card.saldo}`;
    document.getElementById('cargo').innerHTML = `$${lastCharge.monto * -1}`;
    document.getElementById('abono').innerHTML = `$${lastDeposit.monto}`;

    document.getElementById('fechaCargo').innerHTML = `${lastCharge.fecha}`;
    document.getElementById('fechaAbono').innerHTML = `${lastDeposit.fecha}`;

    if(lastCharge != false)
    {
        chargeMarker.setPosition( new google.maps.LatLng( lastCharge.ubicacion.latitude, lastCharge.ubicacion.longitude ) );
        mapCharge.panTo( new google.maps.LatLng( lastCharge.ubicacion.latitude, lastCharge.ubicacion.longitude ) );

        document.getElementById('lastChargeData').style.visibility = 'visible';
        document.getElementById('lastChargeMap').style.visibility = 'visible';
    }
    else
    {
        document.getElementById('lastChargeData').style.visibility = 'hidden';
        document.getElementById('lastChargeMap').style.visibility = 'hidden';
    }

    if(lastDeposit != false)
    {
        depositMarker.setPosition( new google.maps.LatLng( lastDeposit.ubicacion.latitude, lastDeposit.ubicacion.longitude ) );
        mapDeposit.panTo( new google.maps.LatLng( lastDeposit.ubicacion.latitude, lastDeposit.ubicacion.longitude ) );

        document.getElementById('lastDepositData').style.visibility = 'visible';
        document.getElementById('lastDepositMap').style.visibility = 'visible';
    }
    else
    {
        document.getElementById('lastDepositData').style.visibility = 'hidden';
        document.getElementById('lastDepositMap').style.visibility = 'hidden';
    }

    return true;
}