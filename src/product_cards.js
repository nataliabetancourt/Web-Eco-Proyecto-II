import { getDatabase, ref, onValue, set, update, push } from 'firebase/database';

export class productCard {
    constructor(product){
        this.product = product;
    }

    render(){
        //Card where information is
        let card = document.createElement("div");
        card.className = "infoProCard";

        //Product name
        let name = document.createElement("p");
        name.className = "productName";
        name.innerHTML = this.product.name;

        //Amount
        let amount = document.createElement("p");
        amount.className = "productInfo";
        amount.innerHTML = this.product.amount + " " + this.product.measurement;

        //Expiration
        let expiration = document.createElement("p");
        expiration.className = "productInfo";
        expiration.innerHTML = this.product.expiration;

        //Days indicator
        let daysInd = document.createElement("p");
        daysInd.className = "productInd";
        daysInd.innerHTML = "Días restantes:";

        //Days 
        let days = document.createElement("h2");
        days.className = "days";
        days.innerHTML = this.product.days;

        card.appendChild(name);
        card.appendChild(amount);
        card.appendChild(expiration);
        card.appendChild(daysInd);
        card.appendChild(days);

        return card;
    }
}