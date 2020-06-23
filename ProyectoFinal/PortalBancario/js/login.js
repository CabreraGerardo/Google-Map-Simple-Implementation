const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let correo = loginForm['email'].value;
    let password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(correo, password).then( cred => {
        console.log(cred);

        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';

        window.location.href = 'index.html';
    })
    .catch(error => {
        console.log(error);
        loginForm.querySelector('.error').innerHTML = mensajeError(error.code);
    });
});


const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = signupForm['email'].value;
    const password = signupForm['password'].value;

    auth.createUserWithEmailAndPassword(correo, password).then( async cred => {
        console.log(cred);

        await db.collection('usuariosBanco').doc(cred.user.uid).set({
            nombre: signupForm['name'].value,
            apellido: signupForm['lastname'].value,
            correo: signupForm['email'].value,
            telefono: signupForm['phoneNumber'].value,
            direccion: signupForm['address'].value
        });

        await db.collection('usuariosBanco').doc(cred.user.uid).collection('Tarjetas').doc().set({
            numero: Math.round(Math.random()*1E16),
            expiracion: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
            tipo: 'debito'
        });
    })
    .then(() => {
        $('#registrarModal').modal('hide');
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';

        window.location.href = 'index.html';
    })
    .catch(error => {
        console.log(error);
        signupForm.querySelector('.error').innerHTML = mensajeError(error.code);
    });
});


document.getElementById('btnGoogle').addEventListener("click", (e) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
        var token = result.credential.accessToken;

        var user = result.user;

        $('#ingresarModal').modal('hide');
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    })
    .catch( error => {
        console.log(error);
        loginForm.querySelector('.error').innerHTML = mensajeError(error.code);
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
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    })
    .catch( error => {
        console.log(error);
        loginForm.querySelector('.error').innerHTML = mensajeError(error.code);
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