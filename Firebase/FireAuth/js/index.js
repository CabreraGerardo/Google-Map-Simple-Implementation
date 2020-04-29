const listaLoggedOut = document.querySelectorAll(".logged-out");
const listaLoggedIn = document.querySelectorAll(".logged-in");
const datosCuenta = document.querySelector(".datosCuenta");

const setMenu = (user) => {
    if(user){

        db.collection('usuarios').doc(user.uid).get().then( doc => {

            console.log(doc.data());

            if(doc.data() != undefined)
            {
                const html= `
                    <p><b>Nombre: </b> ${doc.data().nombre} </p>
                    <p><b>Emial: </b> ${user.email} </p>
                    <p><b>Teléfono: </b> ${doc.data().telefono} </p>
                    <p><b>Dirección: </b>${doc.data().direccion} </p>
                `;

                datosCuenta.innerHTML = html;
            }
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
            <div class="col-12 col-md-4 mb-3">
                <div class="card">
                    <img class="card-img-top" src="images/${platillo.imagen}" alt="${platillo.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${platillo.nombre}</h5>
                        <p class="card-text"><b>$${platillo.precio}</b></p>
                        <a href="https://www.paypal.me/gerardojcr/${platillo.precio}" target="_blank">
                            <button class="btn btn-primary" style="width: 75%">Comprar</button>
                        </a>
                    </div>
                </div>
            </div>
            `;

            html += columna;
        });

        listaPlatillos.innerHTML = "<div class='col-12'><h1 class='m-4 text-left'>Menú</h1></div>" + html;
    }
    else
    {
        listaPlatillos.innerHTML = '<div class="col-12 mt-5"><p><a href="#" data-toggle="modal" data-target="#ingresarModal">Inicie sesión</a> para ver el catalogo</p><div/>';
    }

};