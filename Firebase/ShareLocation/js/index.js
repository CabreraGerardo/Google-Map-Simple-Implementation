if(!localStorage.user){
    $('#ingresarModal').modal('show');
}
else
{
    loadUsers();
}

const formIngresar = document.getElementById('formIngresar');

formIngresar.addEventListener('submit', (e) => {
    e.preventDefault();

    let correo = formIngresar['correo'].value;
    let password = formIngresar['password'].value;

    auth.signInWithEmailAndPassword(correo, password).then( cred => {
        console.log(cred);

        localStorage.user = cred.user.uid;

        $('#ingresarModal').modal('hide');
        formIngresar.reset();
        formIngresar.querySelector('.error').innerHTML = '';

        loadUsers();
    })
    .catch(error => {
        console.log(error);
        formIngresar.querySelector('.error').innerHTML = mensajeError(error.code);
    });
});

const formRegistrar = document.getElementById('formRegistrar');

formRegistrar.addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = formRegistrar['rCorreo'].value;
    const password = formRegistrar['rPassword'].value;

    auth.createUserWithEmailAndPassword(correo, password).then( cred => {
        console.log(cred);
        
        localStorage.user = cred.user.uid;

        return db.collection('usuariosUbicacion').doc(cred.user.uid).set({
            nombre: formRegistrar['rNombre'].value,
        });
    })
    .then(() => {
        $('#registrarModal').modal('hide');
        formRegistrar.reset();
        formRegistrar.querySelector('.error').innerHTML = '';
        loadUsers();
    })
    .catch(error => {
        console.log(error);
        formRegistrar.querySelector('.error').innerHTML = mensajeError(error.code);
    });
});

document.getElementById('btnGoogle').addEventListener("click", (e) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
        var token = result.credential.accessToken;

        var user = result.user;
        
        const html= `
            <div class="row">
                <div class="col-12 text-center">
                    <img class="img-fluid mb-3 rounded" style="max-width: 100px" src="${user.photoURL}">
                </div>
                <div class="col-12 text-center">
                    <p><b> ${user.displayName} </b></p>
                </div>
                <div class="col-12 text-center">
                    <p> ${user.email} </p>
                </div>
            </div>
        `;

        datosCuenta.innerHTML = html;

        $('#ingresarModal').modal('hide');
        formIngresar.reset();
        formIngresar.querySelector('.error').innerHTML = '';
        loadUsers();
    })
    .catch( error => {
        console.log(error);
        formIngresar.querySelector('.error').innerHTML = mensajeError(error.code);
    });
});

document.getElementById('btnFacebook').addEventListener("click", (e) => {
    var provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider).then(result => {
        var token = result.credential.accessToken;

        var user = result.user;
        console.log(user);
        const html= `
            <div class="row">
                <div class="col-12 text-center">
                    <img class="img-fluid mb-3 rounded" style="max-width: 150px" src="${user.photoURL}">
                </div>
                <div class="col-12 text-center">
                    <p><b> ${user.displayName} </b></p>
                </div>
                <div class="col-12 text-center">
                    <p> ${user.email} </p>
                </div>
            </div>
        `;

        datosCuenta.innerHTML = html;

        $('#ingresarModal').modal('hide');
        formIngresar.reset();
        formIngresar.querySelector('.error').innerHTML = '';
        loadUsers();
    })
    .catch( error => {
        console.log(error);
        formIngresar.querySelector('.error').innerHTML = mensajeError(error.code);
    });
});

function mensajeError(code){
    switch(code){
        case 'auth/user-not-found':
            return 'El usuario no existe';
        case 'auth/wrong-password':
            return 'Contraseña incorrecta';
        case 'auth/weak-password':
            return 'Contraseña débil. Al menos 6 caracteres';
        case 'auth/email-already-in-use':
            return 'Este correo ya se ha usado para registrar una cuenta';
        case 'auth/account-exists-with-different-credential':
            return 'El correo relacionado con esta cuenta ya se ha usado para crear una cuenta';
        default:
            return 'Error';
    }
}

const salir = document.getElementById('salir');

salir.addEventListener('click', e => {
    e.preventDefault();

    auth.signOut().then(() => {
        localStorage.removeItem('user');
        alert('Se ha cerrado la sesión');
        location.reload();
    });
});