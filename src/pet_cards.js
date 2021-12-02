import { getDatabase, ref, onValue, set, update } from 'firebase/database';

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

        let birth = document.createElement("p");
        birth.className = "birth";
        birth.innerHTML= this.pet.dateBirth;

        let condiciones = document.createElement("p");
        condiciones.className = "condiciones";
        condiciones.innerHTML= this.pet.conditions;

        let color = document.createElement("p");
        color.className = "color";
        color.innerHTML = "  ";

        let editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = "Editar";

        editBtn.addEventListener("click", (e, event) => {
        
            

        });


        card.appendChild(petName);
        card.appendChild(age);
        card.appendChild(breed);
        card.appendChild(birth);
        card.appendChild(color);
        card.appendChild(editBtn);

        return card;

    }
}

