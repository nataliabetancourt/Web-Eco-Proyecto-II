import { getDatabase, ref, onValue, set, push, update } from 'firebase/database';

export class petCard{

    constructor(pet, user_account){

        this.pet = pet;
        this.user_account = user_account;

    }

    render(){

        let card = document.createElement("div");
        card.className = "cards";

        let petName = document.createElement("h3");
        petName.className = "petName";
        petName.innerHTML= this.pet.name;

        //Pop up with the 
        petName.addEventListener("click", (e, event) => {

            let infoCard = document.createElement("div");
            infoCard.className = "infoCard";

            let pet = document.createElement("h3");
            pet.className = "pet";
            pet.innerHTML= "Nombre:" + this.pet.name;

            let age = document.createElement("p");
            age.className = "age";
            age.innerHTML= "Edad:" + this.pet.age;
    
            let breed = document.createElement("p");
            breed.className = "breed";
            breed.innerHTML= "Raza:" + this.pet.breed;
    
            let animal = document.createElement("p");
            animal.className = "animal";
            animal.innerHTML= "Animal:" + this.pet.animal;
    
            let birth = document.createElement("p");
            birth.className = "birth";
            birth.innerHTML= "Cumpleaños: " + this.pet.dateBirth;
    
            let conditions = document.createElement("p");
            conditions.className = "conditions";
            conditions.innerHTML= "Condiciones:" + this.pet.conditions;
    
            let closePBtn = document.createElement("button");
            closePBtn.className = "closePBtn";
            closePBtn.innerHTML = " X ";

            closePBtn.addEventListener("click", (e, event) => {

                infoCard.style.display = "none"
                
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
            petName1.placeholder= "Nombre: " + this.pet.name;

            let age1 = document.createElement("input");
            age1.className = "age1";
            age1.placeholder= "Edad: " + this.pet.age;
    
            let breed1 = document.createElement("input");
            breed1.className = "breed1";
            breed1.placeholder= "Raza: " + this.pet.breed;
    
            let animal1 = document.createElement("input");
            animal1.className = "animal1";
            animal1.placeholder= "Animal: " + this.pet.animal;
    
            let birth1 = document.createElement("input");
            birth1.className = "birth1";
            birth1.placeholder= "Cumpleaños: " + this.pet.dateBirth;
    
            let conditions1 = document.createElement("input");
            conditions1.className = "conditions1";
            conditions1.placeholder= "Condiciones: " + this.pet.conditions;
    
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
                const petRef = ref(db, 'users/' + this.user_account.uid + '/pets/' + this.pet.id);

                update(petRef, {"name": petName1.value});
                update(petRef, {"age": age1.value});
                update(petRef, {"breed": breed1.value});
                update(petRef, {"animal": animal1.value});
                update(petRef, {"birth": birth1.value});
                update(petRef, {"conditions": conditions1.value});
                
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

