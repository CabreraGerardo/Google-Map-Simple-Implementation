const listaLoggedOut = document.querySelectorAll(".logged-out");
const listaLoggedIn = document.querySelectorAll(".logged-in");
const datosCuenta = document.querySelector(".datosCuenta");

const setMenu = (user) => {
    if(user){

        db.collection('usuarios').doc(user.uid).get().then( doc => {
            const html= `
                <p><b>Nombre: </b> ${doc.data().nombre} </p>
                <p><b>Emial: </b> ${user.email} </p>
                <p><b>Teléfono: </b> ${doc.data().telefono} </p>
                <p><b>Dirección: </b>${doc.data().direccion} </p>
            `;

            datosCuenta.innerHTML = html;
        });

        listaLoggedIn.forEach(item => item.style.display = 'block');
        listaLoggedOut.forEach(item => item.style.display = 'none');
    }
    else
    {
        listaLoggedIn.forEach(item => item.style.display = 'none');
        listaLoggedOut.forEach(item => item.style.display = 'block');
    }
};

const listaPlatillos = document.getElementById('listaDePlatillos');

const obtienePlatillos = (data) => {

    if(data.length){

        let html = '';

        data.forEach(doc => {
            const platillo = doc.data();
            
            const columna = `
            <div class="col-12 col-md-4">
                <img class="img-fluid" src="images/${platillo.imagen}" alt="${platillo.nombre}">
                <p class="my-1">${platillo.nombre}</p>
                <p><b>$${platillo.precio}</b></p>
                <a href="https://www.paypal.me/gerardojcr/${platillo.precio}" target="_blank">
                    <button class="btn btn-primary mb-3" style="width: 75%">Comprar</button>
                </a>
            </div>
            `;

            html += columna;
        });

        listaPlatillos.innerHTML = html;
    }
    else
    {
        listaPlatillos.innerHTML = '<p>Inicie sesión para ver el catalogo</p>';
    }

};