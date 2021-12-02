import { isEmpty } from '@firebase/util';
import { getDatabase, ref, onValue, set, update, push } from 'firebase/database';

export class productCard {
    constructor(){
    }
    
    renderAddProduct(userID){
        //Pop up card with inputs
        let card = document.createElement("div");
        card.className = "cardProduct";

        //Cancel add product
        let cancel = document.createElement("button");
        cancel.innerHTML = "X";
        cancel.className = "closeBtn";
        cancel.style = "float:right";        
        cancel.addEventListener("click", function(e, ev){
            card.style.display = "none";
        });
        
        //Title
        let title = document.createElement("h3");
        title.innerHTML = "Nuevo producto";
        title.className = "addProTitle";

        //Name product
        let nameProduct = document.createElement("input");
        nameProduct.placeholder = "Nombre del producto*";
        nameProduct.className = "addProInput";

        //Choose measurement (checkbox)
        let checkbox = document.createElement("div");
        checkbox.className = "checkbox";

        let grams = document.createElement("input");
        grams.type = "checkbox";
        grams.id = "grams";
        let gramsLabel = document.createElement("label");
        gramsLabel.htmlFor = "grams";
        gramsLabel.appendChild(document.createTextNode('Gramos'));

        let units = document.createElement("input");
        units.type = "checkbox";
        units.id = "units";
        units.className = "boxes";
        let unitsLabel = document.createElement("label");
        unitsLabel.htmlFor = "units";
        unitsLabel.appendChild(document.createTextNode('Unidades'));

        checkbox.appendChild(grams);
        checkbox.appendChild(gramsLabel);
        checkbox.appendChild(units);
        checkbox.appendChild(unitsLabel);

        //Alert user of value to put in input when checking box
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

        //Quantity product
        let quantityProduct = document.createElement("input");
        quantityProduct.type = "number";
        quantityProduct.placeholder = "Cantidad del producto*";
        quantityProduct.className = "addProInput";

        //Product usage
        let use = document.createElement("input");
        use.type = "number";
        use.placeholder = "Gasto del producto*";
        use.className = "addProInput";

        //Expiration date
        let expiration = document.createElement("input");
        expiration.onfocus = "(this.type='date')";
        expiration.placeholder = "Fecha de vencimiento*";
        expiration.className = "addProInput";

        //Notes 
        let notes = document.createElement("input");
        notes.placeholder = "Notas(?)";
        notes.className = "addProInput";
        notes.id = "noteInput";

        //Add product button
        let addProductBtn = document.createElement("button");
        addProductBtn.innerHTML = "Agregar producto";
        addProductBtn.className = "addProductBtn"; 

        //Add product to database and calculate time based on info
        let days = 0;
        let measurement = " ";
        addProductBtn.addEventListener("click", function(e, ev){
            //If user hasn't filled inputs, alert
            if(isEmpty(nameProduct.value) || isEmpty(quantityProduct.value || isEmpty(use.value)
                || isEmpty(expiration.value))){
                    alert("Llena los campos");

            //If neither boxes are checked, alert
            } if(grams.checked == false && units.checked == false){
                alert("Escoge una medida");
            } else  {    
                //Get amount of days of use by dividing variables
                let daysCalculated = quantityProduct.value/use.value;
                days = daysCalculated.toFixed(0);
                console.log(days);

                //Add measurement for info
                if (grams.checked) {measurement = "gramos";} else if (units.checked) {measurement = "unidades";}

                const product = {
                    name: nameProduct.value,
                    amount: quantityProduct.value,
                    use: use.value,
                    expiration: expiration.value,
                    notes: notes.value,
                    days: days,
                    measurement: measurement
                }

                //Add to database
                //Ref for pets
                const db = getDatabase();
                const newProductRef = push(ref(db, 'users/' + userID + '/products'));
                product["id"] = newProductRef.key;
                //Add to database
                set(newProductRef, product);
            }
        });

        //Add elements to pop up card
        card.appendChild(cancel);
        card.appendChild(title);
        card.appendChild(nameProduct);
        card.appendChild(checkbox);
        card.appendChild(quantityProduct);
        card.appendChild(use);
        card.appendChild(expiration);
        card.appendChild(notes);
        card.appendChild(addProductBtn);

        return card;
    }
}