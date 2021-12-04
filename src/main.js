import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set, update, remove } from 'firebase/database';
import { getFirebaseConfig } from './firebase-config';
import { petCard } from './pet_cards';
import { isEmpty } from '@firebase/util';
import { productCard } from './product_cards';

//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const db = getDatabase();
const auth = getAuth();


//Product elements
const productsSection = document.getElementById('productsSection');
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

//Get pets from database
function getPets(user_account) {
    const dbRef = ref(db, 'users/' + user_account.uid + '/pets');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        actPets(data);
    });
}

//Show pets from database
function actPets(data) {
    if (data) {
        pets.innerHTML = " ";
        Object.keys(data).forEach((key, index)=> { 
            const card = new petCard(data[key]);
            pets.appendChild(card.render()); 
        });
    }
}

//Get products from database
function getProducts(user_account){
    const dbRef = ref(db, 'users/' + user_account.uid + '/products');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        showProducts(data, user_account);
        //calculateDays(data, user_account);
    });
}

//Show products in database
function showProducts(data, user_account){
    if (data) {
        productsSection.innerHTML = " ";
        Object.keys(data).forEach((key, index)=> { 
            const card = new productCard(data[key], user_account);
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

            //Add measurement for info
            if (grams.checked) {measurement = "gramos";} else if (units.checked) {measurement = "unidades";}
            //Date to know how many days have passed later on
            let date = new Date();
            let dateFormat = date.toLocaleDateString("en-US");

            const product = {
                name: nameProduct.value,
                amount: amount.value,
                use: use.value,
                days: days,
                measurement: measurement,
                date: dateFormat,
                dateBtnClick: " ",
                button: false
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
            addBtn2.style = "block";
        }
    });
}

//Change number of days of products based on days passed since added
function calculateDays(data, user_account){
    if (data) {
        Object.keys(data).forEach((key, index)=> { 
            //Todays date and time
            let today = new Date();
            //Change time
            let changeTime = new Date();
            changeTime.setHours(14, 26);

            //Product date
            let proDate = new Date(data[key].date);

            //Calculate time difference of dates
            let timeDiff = today.getTime() - proDate.getTime();
            //Calculate number of days between dates and n. days for product
            let daysCal = timeDiff/(1000*3600*24);
            let daysPassed = daysCal.toFixed(0);

            //Update number of remaining days at 12:00 am
            if (today.getTime() === changeTime.getTime()) {
                const productRef = ref(db, 'users/' + user_account.uid + '/products/' + key);
                let daysPro = data[key].days;
                console.log(daysPro - daysPassed);
                //update(productRef, {"days": daysPro - daysPassed});
            }
        });
    }
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

//Sign out function
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

