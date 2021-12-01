import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';

import { petCard } from './pet_cards';

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const db = getDatabase();
const auth = getAuth();

const pets = document.getElementById('pets');
const addBtn = document.getElementById('addBtn');
const addBtn2 = document.getElementById('addBtn2');

function getPets(user_account) {
    const dbRef = ref(db, 'users/' + user_account.uid + '/pets');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        actPets(data);
    });
}

//If user is signed in, show pets and products
onAuthStateChanged(auth, (user_account)=>{
    //If the user was logged in
    if (user_account){
        getPets(user_account);
    } else {
        window.location.href = "login.html";
    }
});

function actPets(data) {
    if (data) {
        pets.innerHTML = " ";
        Object.keys(data).forEach((key, index)=> { 
            const card = new petCard(data[key])
            pets.appendChild(card.render()); 
        });
    }
}

