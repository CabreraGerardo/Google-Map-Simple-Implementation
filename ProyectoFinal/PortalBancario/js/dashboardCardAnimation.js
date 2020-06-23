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