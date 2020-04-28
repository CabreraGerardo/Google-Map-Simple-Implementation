// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCYebr8sO8pXiFu4JLVrgN1-ojkG5cqQ1E",
    authDomain: "melodic-stone-268000.firebaseapp.com",
    databaseURL: "https://melodic-stone-268000.firebaseio.com",
    projectId: "melodic-stone-268000",
    storageBucket: "melodic-stone-268000.appspot.com",
    messagingSenderId: "71172249194",
    appId: "1:71172249194:web:b70944801ce1be13699c13"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

const formIngresar = document.getElementById('formIngresar');

formIngresar.addEventListener('submit', (e) => {
    e.preventDefault;

    let correo = formIngresar['correo'].value;
    let password = formIngresar['password'].value;

    auth.signInWithEmailAndPassword(correo, password).then( cred => {
        console.log(cred);

        $('#ingresarModal').modal('hide');
        formIngresar.reset();
        formIngresar.querySelector('.error').innerHTML = '';
    })
    .catch(error => {
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
        default:
            return 'Error';
    }
}

const salir = document.getElementById('salir');

salir.addEventListener('click', e => {
    e.preventDefault;

    auth.signOut().then(() => {
        alert('Se ha cerrado la sesión');
    });
})