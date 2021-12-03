import { getDatabase, ref, onValue, set, push, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeApp } from 'firebase/app';

import { getFirebaseConfig } from './firebase-config';

export class petCard{

    constructor(pet){

        this.pet = pet;

    }

    render(){

        let card = document.createElement("div");
        card.className = "cards";

        let petName = document.createElement("h3");
        petName.className = "petName";
        petName.innerHTML= this.pet.name;

        //Pop up with the 
        petName.addEventListener("click", (e, event) => {

            console.log("card")

            let infoCard = document.createElement("div");
            infoCard.className = "infoCard";

            let pet = document.createElement("h3");
            pet.className = "pet";
            pet.innerHTML= this.pet.name;

            let age = document.createElement("p");
            age.className = "age";
            age.innerHTML= this.pet.age;
    
            let breed = document.createElement("p");
            breed.className = "breed";
            breed.innerHTML= this.pet.breed;
    
            let animal = document.createElement("p");
            animal.className = "animal";
            animal.innerHTML= this.pet.animal;
    
            let birth = document.createElement("p");
            birth.className = "birth";
            birth.innerHTML= this.pet.dateBirth;
    
            let conditions = document.createElement("p");
            conditions.className = "conditions";
            conditions.innerHTML= this.pet.conditions;
    
            let closePBtn = document.createElement("button");
            closePBtn.className = "closePBtn";
            closePBtn.innerHTML = " X ";

            closePBtn.addEventListener("click", (e, event) => {

                infoCard.style.display = "none"
                console.log("card1")
                
            });
    
            infoCard.appendChild(pet);
            infoCard.appendChild(age);
            infoCard.appendChild(breed);
            infoCard.appendChild(conditions);
            infoCard.appendChild(animal);
            infoCard.appendChild(birth);
            infoCard.appendChild(closePBtn);

            card.appendChild(infoCard);

            });

        

        
        let editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = " Editar";

        editBtn.addEventListener("click", (e, event) => {

            let editCard = document.createElement("div");
            editCard.className = "editCard";

            let petName1 = document.createElement("input");
            petName1.className = "petName1";
            petName1.placeholder= this.pet.name;

            let age1 = document.createElement("input");
            age1.className = "age1";
            age1.placeholder= this.pet.age;
    
            let breed1 = document.createElement("input");
            breed1.className = "breed1";
            breed1.placeholder= this.pet.breed;
    
            let animal1 = document.createElement("input");
            animal1.className = "animal1";
            animal1.placeholder= this.pet.animal;
    
            let birth1 = document.createElement("input");
            birth1.className = "birth1";
            birth1.placeholder= this.pet.dateBirth;
    
            let conditions1 = document.createElement("input");
            conditions1.className = "conditions1";
            conditions1.placeholder= this.pet.conditions;
    
            let closePBtn1 = document.createElement("button");
            closePBtn1.className = "closePBtn1";
            closePBtn1.innerHTML = " X ";

            closePBtn1.addEventListener("click", (e, event) => {

                editCard.style.display = "none"
                console.log("card1")
                
            });

            let saveBtn = document.createElement("button");
            saveBtn.className = "saveBtn";
            saveBtn.innerHTML = "Guardar";

            saveBtn.addEventListener("click", (e, event) => {

                const db = getDatabase();
                const petRef = ref(db, "users/" + this.user_account.uid + "/pets/" + this.pet.id);

                const updatePet = {

                    id:this.pet.id,
                    petName: this.pet.name,
                    
                }

                update(petRef, {"pets": updatePet});
                
            });

             card.appendChild(editCard);
             editCard.appendChild(petName1);
             editCard.appendChild(age1);
             editCard.appendChild(breed1);
             editCard.appendChild(birth1);
             editCard.appendChild(conditions1);
             editCard.appendChild(closePBtn1);
             editCard.appendChild(saveBtn);
            
        });

        card.appendChild(editBtn);
        card.appendChild(petName);

        return card;

    }
}

