function loadCards(){
    let saldoTotal = 0;
    
    cards.forEach(card => {
        let month = card.expiracion.getMonth() + 1;
        let year = card.expiracion.getFullYear();

        let cardColor = "";
        if(card.tipo == 'credito'){
            cardColor = `style="background-image: url('https://image.ibb.co/bVnMrc/g3095.png'), linear-gradient(0deg, rgba(125,138,152,1) 30%, rgba(31,171,200,1) 100%);"`;
        }
        else if(card.tipo == 'credito vip'){
            cardColor = `style="background-image: url('https://image.ibb.co/bVnMrc/g3095.png'), linear-gradient(0deg, rgba(125,138,152,1) 30%, rgba(204,116,244,1) 100%);"`;
        }

        cardsHTML.push(`
            <div id="${card.id}" class="credit-card">
                <div class="card_front card_part" ${cardColor}>
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

        document.getElementById('cards').innerHTML += cardsHTML[cardsHTML.length - 1];
    
        saldoTotal += card.saldo;
        console.log(card);
    });

    document.getElementById('saldoTotal').innerHTML = `$${saldoTotal.toFixed(2)}`;
    setAnimations();
}

