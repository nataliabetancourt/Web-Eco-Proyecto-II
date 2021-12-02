import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getFirebaseConfig } from './firebase-config';
import { petCard } from './pet_cards';
import { productCard } from './product_cards';
import { isEmpty } from '@firebase/util';

//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const db = getDatabase();
const auth = getAuth();

//Pet elements
const pets = document.getElementById('pets');
const addBtn = document.getElementById('addBtn');
const addPetSection = document.getElementById('addPetSection');
const signOutBtn = document.getElementById('signOutBtn');
const age = document.getElementById('age');
const breed = document.getElementById('grams');
const birth = document.getElementById('units');
const condiciones = document.getElementById('amount');
const closeBtn1 = document.getElementById('closeBtn');

//Product elements
const addBtn2 = document.getElementById('addBtn2');
const addProductSection = document.getElementById('addProductSection');
const closeBtn = document.getElementById('closeBtn');
const nameProduct = document.getElementById('nameProduct');
const grams = document.getElementById('grams');
const units = document.getElementById('units');
const amount = document.getElementById('amount');
const use = document.getElementById('use');
const expiration = document.getElementById('expiration');
const notes = document.getElementById('notes');
const addProBtn = document.getElementById('addProBtn');


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


//Get products from database
function getProducts(user_account){
    const dbRef = ref(db, 'users/' + user_account.uid + '/products');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        showProducts(data);
    });
}

function showProducts(data){
    if (data) {
        productsSection.innerHTML = " ";
        Object.keys(data).forEach((key, index)=> { 
            const card = new productCard(data[key]);
            productsSection.appendChild(card.render()); 
        });
    }
}

//Button functions when adding new product
function newProduct(user_account){
    //Close pop up
    closeBtn.addEventListener("click", function(){ addProductSection.style.display = "none";});

    //Alert user when checking box
    grams.addEventListener("change", function(){
        if (grams.checked) {
            alert("Ingresa los valores en gramos");
            units.disabled = true;
        } else { units.disabled = false; }
    });

    units.addEventListener("change", function(){
        if (units.checked) {
            alert("Ingresa los valores en unidades");
            grams.disabled = true;
        } else {grams.disabled = false; }
    });

    //Add product
    //Add product to database and calculate time based on info
    let days = 0;
    let measurement = " ";
    addProBtn.addEventListener("click", function(e, ev){
        //If user hasn't filled inputs, alert
        if(isEmpty(nameProduct.value) || isEmpty(amount.value || isEmpty(use.value)
            || isEmpty(expiration.value))){
                alert("Llena los campos");

        //If neither boxes are checked, alert
        } if(grams.checked == false && units.checked == false){
            alert("Escoge una medida");
        } else  {    
            //Get amount of days of use by dividing variables
            let daysCalculated = amount.value/use.value;
            days = daysCalculated.toFixed(0);
            console.log(days);

            //Add measurement for info
            if (grams.checked) {measurement = "gramos";} else if (units.checked) {measurement = "unidades";}

            const product = {
                name: nameProduct.value,
                amount: amount.value,
                use: use.value,
                expiration: expiration.value,
                notes: notes.value,
                days: days,
                measurement: measurement
            }

            //Add to database
            //Ref for pets
            const db = getDatabase();
            const newProductRef = push(ref(db, 'users/' + user_account.uid + '/products'));
            product["id"] = newProductRef.key;
            //Add to database
            set(newProductRef, product);

            //Close pop up
            addProductSection.style.display = "none";
        }
    });
}

//If user is signed in, show pets and products
onAuthStateChanged(auth, (user_account)=>{
    //If the user was logged in
    if (user_account){
        //Show pets registered
        getPets(user_account);
        //Pop up that adds products
        newProduct(user_account);
        //Show products
        getProducts(user_account);
    } else {
        window.location.href = "login.html";
}
});

//Register new pet
addBtn.addEventListener("click", (e, event) => {

    window.location.href = "pet-signup.html";

});

//Add products pop up
addBtn2.addEventListener("click", function(e, ev){ 
    
    addProductSection.style = "block";

});



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


