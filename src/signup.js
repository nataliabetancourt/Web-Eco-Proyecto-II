//Firebase config
import {getFirebaseConfig} from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, set} from 'firebase/database';
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { isEmpty } from '@firebase/util';

//Initialize config
const firebaseConf = getFirebaseConfig();
const app = initializeApp(firebaseConf);
const db = getDatabase();
const auth = getAuth();

//Page components
const email = document.getElementById("email");
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const username = document.getElementById("username");
const password = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginQuestion = document.getElementById("loginQuestion");

//Control signup
let isSignup = false;

//Button functions
function goLogin(e, ev){
    window.location.href = "login.html";
}

function signup(e, ev) {
    isSignup = true;

    //If inputs are empty, tell user to fill in form
    if(isEmpty(email.value) || isEmpty(name.value) || isEmpty(lastname.value) || 
        isEmpty(username.value || isEmpty(password.value))){
            alert("Llena todos los campos");
    } else {
        //Create user account
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .catch((error) => {
            alert(error.message);
        });
    }  
}

signupBtn.addEventListener("click", signup);
loginQuestion.addEventListener("click", goLogin);

function createUser(user_account){
    const user = {
        id: user_account.uid,
        email:  email.value,
        name: name.value,
        lastname: lastname.value,
        username: username.value,
        password: password.value
    }

    const userRef = ref(db, "users/" + user.id);
    set(userRef, user).then(() => {
        console.log("guardó");
        window.location.href = "pet-signup.html";
    });
}

//When logged in
onAuthStateChanged(auth, (user_account)=>{
    //If the user was logged in
    if (user_account){
        //If new, add user to database
        if (isSignup){
            createUser(user_account);
        }else{
            window.location.href = "pet-signup.html";
        }
    }
});

