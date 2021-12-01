import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';

import { petCard } from './pet_cards';

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

const pets = document.getElementById('pets');
const addBtn = document.getElementById('addBtn');
const addBtn2 = document.getElementById('addBtn2');

function getPets() {

    const db = getDatabase();
    const dbRef = ref(db, 'pets/');

    onValue(dbRef, (snapshot) => {

        const data = snapshot.val();
        actPets(data);

    });

}

function actPets(data) {

    if (data) {
        
        pets.innerHTML = " ";
       
        Object.keys(data).forEach((key, index)=> {
            
            const card = new petCard(data[key])

            pets.appendChild(card.render());
           
        });

    }

}

getPets();

