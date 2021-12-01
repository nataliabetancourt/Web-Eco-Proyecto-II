import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getFirebaseConfig } from './firebase-config';
import { petCard } from './pet_cards';
import { productCard } from './product_cards';

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const db = getDatabase();
const auth = getAuth();

const pets = document.getElementById('pets');
const addBtn = document.getElementById('addBtn');
const addBtn2 = document.getElementById('addBtn2');
const signOutBtn = document.getElementById('signOutBtn');
const addProductSection = document.getElementById('addProductSection');

function getPets(user_account) {

    const dbRef = ref(db, 'users/' + user_account.uid + '/pets');

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


//If user is signed in, show pets and products
onAuthStateChanged(auth, (user_account)=>{
    //If the user was logged in
    if (user_account){
        //Show pets registered
        getPets(user_account);

        //Add products
        addProductSection.innerHTML = " ";
        addBtn2.addEventListener("click", function(e, ev){
            const addProduct = new productCard(user_account);
            addProductSection.appendChild(addProduct.renderAddProduct());
        });

    } else {
        window.location.href = "login.html";
    }
});

addBtn.addEventListener("click", addPet);

function signOut(e, ev){
    auth.signOut()
    .then(()=> {
        window.location.href = "login.html"
    })
    .catch((error) => {
        console.log(error.message);
    });
}

signOutBtn.addEventListener("click", signOut);


