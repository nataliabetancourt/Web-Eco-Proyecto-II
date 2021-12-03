import { getDatabase, ref, onValue, set, push, update } from 'firebase/database';

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

        let color = document.createElement("p");
        color.className = "color";
        color.innerHTML = "  ";

        let editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = "Editar";


        editBtn.addEventListener("click", (e, event) => {
        
            const db = getDatabase();
            const petRef = push(ref(db, 'users/' + user_account.uid + '/pets'));
            
            const pets = {

                petName: this.pet.name,
                age: this.pet.age,
                breed: this.pet.breed,
                animal: this.pet.animal,
                birth: this.pet.birth,
                conditions: this.pet.conditions,
               
            }

            set(petRef, pets);
        
        });
    

        card.appendChild(petName);
        card.appendChild(age);
        card.appendChild(breed);
        card.appendChild(conditions);
        card.appendChild(animal);
        card.appendChild(birth);
        card.appendChild(color);
        card.appendChild(editBtn);

        return card;

    }
}

