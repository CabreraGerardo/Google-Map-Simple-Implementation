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