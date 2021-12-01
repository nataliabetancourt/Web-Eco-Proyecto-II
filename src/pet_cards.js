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

        let age = document.createElement("p");
        age.className = "age";

        let breed = document.createElement("p");
        breed.className = "breed";

        let birth = document.createElement("p");
        birth.className = "birth";

        let condiciones = document.createElement("p");
        condiciones.className = "condiciones";

        let color = document.createElement("p");
        color.className = "color";
        color.innerHTML = "  ";

        let editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = "Editar";

        editBtn.addEventListener("click", (e, event) => {
        
            const db = getDatabase();
            let petRef = ref(db, 'Pets/' + this.pet.id);



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