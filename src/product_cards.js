import { getDatabase, ref, onValue, set, update } from 'firebase/database';

export class productCard {
    constructor(user){
        this.user = user;
    }

    renderAddProduct(){
        //Pop up card with inputs
        let card = document.createElement("div");

        //Cancel add product
        let cancel = document.createElement("button");
        cancel.innerHTML = "X";
        cancel.addEventListener("click", function(e, ev){
            card.style.display = "none";
        });
        
        //Title
        let title = document.createElement("h3");
        title.innerHTML = "Nuevo producto";

        //Name product
        let nameProduct = document.createElement("input");
        nameProduct.placeholder = "Nombre del producto";

        //Quantity product
        let quantityProduct = document.createElement("input");
        quantityProduct.placeholder = "Cantidad del producto";

        //Product usage
        let use = document.createElement("input");
        use.placeholder = "Gasto del producto";

        //Expiration date
        let expiration = document.createElement("date");
        expiration.placeholder = "Fecha de vencimiento";

        //Buy date
        let bought = document.createElement("date");
        bought.placeholder = "Fecha de compra";

        //Notes 
        let notes = document.createElement("input");
        notes.placeholder = "Notas(?)";

        //Add product button
        let addProductBtn = document.createElement("button");
        addProductBtn.innerHTML = "Agregar producto";

        //Add elements to pop up card
        card.appendChild(cancel);
        card.appendChild(title);
        card.appendChild(nameProduct);
        card.appendChild(quantityProduct);
        card.appendChild(use);
        card.appendChild(expiration);
        card.appendChild(bought);
        card.appendChild(notes);
        card.appendChild(addProductBtn);

        return card;
    }
}