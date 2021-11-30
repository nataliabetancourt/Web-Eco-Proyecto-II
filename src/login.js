import {getFirebaseConfig} from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';

const firebaseConf = getFirebaseConfig();
const app = initializeApp(firebaseConf);
const auth = getAuth();

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

function login (e, ev){

    signInWithEmailAndPassword(auth, email.value, password.value).then((user_credential) => {

        window.location.href = "main.html";

    }).catch((error) => {

        console.log(error.message);

    });
}

loginBtn.addEventListener("click", login);


onAuthStateChanged(auth, (user_account)=>{
    if (user_account){
        window.location.href = "main.html"
    }
});
