//Firebase config
import {getFirebaseConfig} from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, push, set} from 'firebase/database';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { isEmpty } from '@firebase/util';

//Initialize config
const firebaseConf = getFirebaseConfig();
const app = initializeApp(firebaseConf);
const db = getDatabase();
const auth = getAuth();

//Page components
const name = document.getElementById("name");
const age = document.getElementById("age");
const animal = document.getElementById("animal");
const breed = document.getElementById("breed");
const dateBirth = document.getElementById("dateBirth");
const conditions = document.getElementById("conditions");
const signupPetBtn = document.getElementById("signupPetBtn");
const nextBtn = document.getElementById("nextBtn");

function addPet(user_account, pet){
    //Ref for pets
    const newPetRef = push(ref(db, 'users/' + user_account.uid + '/pets'));
    pet["id"] = newPetRef.key;
    //Add to database
    set(newPetRef, pet);
}

onAuthStateChanged(auth, (user_account)=>{
    //Create pets only if user is logged in
    if (user_account){
        //Register button
        signupPetBtn.addEventListener("click", function(e, ev){
            if(isEmpty(name.value) || isEmpty(age.value) || isEmpty(animal.value)){
                alert("Llena los campos obligatorios")
            } else {
                const pet = {
                    name: name.value,
                    age: age.value,
                    animal: animal.value,
                    breed: breed.value,
                    dateBirth: dateBirth.value,
                    conditions: conditions.value
                }

                //Add to database
                addPet(user_account, pet);

                name.value = '';
                age.value = '';
                animal.value = '';
                breed.value = '';
                dateBirth.value = '';
                conditions.value = '';
            }
        });

        //Create other pet
        nextBtn.addEventListener("click", function(e, ev){
            window.location.href = "main.html";
        });

    //Switch to login page
    }else{
        window.location.href = "login.html";
    }
});
