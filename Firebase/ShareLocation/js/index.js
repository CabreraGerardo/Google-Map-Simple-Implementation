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
        setPos();
        loadUsers();
        document.getElementById('userData').innerHTML = `
        <div class="col-12 mb-3">
            <h3><b>Tu cuenta:</b></h3>
        </div>
        <div class="col-3">
            <img class="img-fluid" style="max-height: 350px;" src="${cred.user.photoURL ? cred.user.photoURL : "./assets/user-placeholder.png"}">
        </div>
        <div class="col-9 d-flex align-items-center mb-2">
            <h4>${cred.user.displayName}</h4>
        </div>
    `;
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
            photoURL: cred.user.photoURL ? cred.user.photoURL : null
        });
    })
    .then(() => {
        $('#registrarModal').modal('hide');
        formRegistrar.reset();
        formRegistrar.querySelector('.error').innerHTML = '';
        setPos();
        loadUsers();
        document.getElementById('userData').innerHTML = `
            <div class="col-12 mb-3">
                <h3><b>Tu cuenta:</b></h3>
            </div>
            <div class="col-3">
                <img class="img-fluid" style="max-height: 350px;" src="${cred.user.photoURL ? cred.user.photoURL : "./assets/user-placeholder.png"}">
            </div>
            <div class="col-9 d-flex align-items-center mb-2">
                <h4>${cred.user.displayName}</h4>
            </div>
        `;
    })
    .catch(error => {
        console.log(error);
        formRegistrar.querySelector('.error').innerHTML = mensajeError(error.code);
    });
});

document.getElementById('btnGoogle').addEventListener("click", (e) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {

        localStorage.user = result.user.uid;

        db.collection('usuariosUbicacion').doc(result.user.uid).set({
            nombre: result.user.displayName,
            photoURL: result.user.photoURL ? result.user.photoURL : null
        });

        $('#ingresarModal').modal('hide');
        formIngresar.reset();
        formIngresar.querySelector('.error').innerHTML = '';
        setPos();
        loadUsers();
        document.getElementById('userData').innerHTML = `
            <div class="col-12 mb-3">
                <h3><b>Tu cuenta:</b></h3>
            </div>
            <div class="col-3">
                <img class="img-fluid" style="max-height: 350px;" src="${result.user.photoURL ? result.user.photoURL : "./assets/user-placeholder.png"}">
            </div>
            <div class="col-9 d-flex align-items-center mb-2">
                <h4>${result.user.displayName}</h4>
            </div>
        `;
    })
    .catch( error => {
        console.log(error);
        formIngresar.querySelector('.error').innerHTML = mensajeError(error.code);
    });
});

document.getElementById('btnFacebook').addEventListener("click", (e) => {
    var provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider).then(result => {

        localStorage.user = result.user.uid;

        db.collection('usuariosUbicacion').doc(result.user.uid).set({
            nombre: result.user.displayName,
            photoURL: result.user.photoURL ? result.user.photoURL : null
        });

        $('#ingresarModal').modal('hide');
        formIngresar.reset();
        formIngresar.querySelector('.error').innerHTML = '';
        setPos();
        loadUsers();
        document.getElementById('userData').innerHTML = `
            <div class="col-12 mb-3">
                <h3><b>Tu cuenta:</b></h3>
            </div>
            <div class="col-3">
                <img class="img-fluid" style="max-height: 350px;" src="${result.user.photoURL ? result.user.photoURL : "./assets/user-placeholder.png"}">
            </div>
            <div class="col-9 d-flex align-items-center mb-2">
                <h4>${result.user.displayName}</h4>
            </div>
        `;
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
