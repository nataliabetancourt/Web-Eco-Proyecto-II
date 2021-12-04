import { getDatabase, ref, update, remove } from 'firebase/database';

export class productCard {
    constructor(product, user_account){
        this.product = product;
        this.user_account = user_account;
        this.todayDate = new Date();
    }

    render(){
        //Card where information is
        let card = document.createElement("div");
        card.className = "infoProCard";

        //Product name
        let name = document.createElement("p");
        name.className = "productName";
        name.innerHTML = this.product.name;

        //Refresh button for days
        let refresh = document.createElement("button");
        refresh.className = "refresh";
        if (this.checkDates() == false) {
            refresh.addEventListener("click", (e, ev)=>{
            this.calculateDays();
            });
        } else {
            refresh.style.display = "none";
        }
        
        //Amount
        let amount = document.createElement("p");
        amount.className = "productInfo";
        amount.innerHTML = this.product.amount + " " + this.product.measurement;

        //Date registered
        let date = document.createElement("p");
        date.className = "productInfo";
        date.innerHTML = this.product.date;

        //Days indicator
        let daysInd = document.createElement("p");
        daysInd.className = "productInd";
        daysInd.innerHTML = "Días restantes:";

        //Days 
        let days = document.createElement("h2");
        days.className = "days";
        days.innerHTML = this.product.days;

        card.appendChild(name);
        card.appendChild(refresh);  
        card.appendChild(amount);
        card.appendChild(date);
        card.appendChild(daysInd);
        card.appendChild(days);

        return card;
    }

    checkDates(){
        //Todays date and time
        let today = new Date();
        let todayFormat = today.toLocaleDateString("en-US");
        if (todayFormat === this.product.dateBtnClick) {
            return true;
        }
        return false;
    }

    calculateDays(){
        //Todays date and time
        let today = new Date();
        let todayFormat = today.toLocaleDateString("en-US");
        //Product date
        let proDate = new Date(this.product.date);

        //Calculate time difference of dates
        let timeDiff = today.getTime() - proDate.getTime();
        //Calculate number of days between dates and n. days for product
        let daysCal = timeDiff/(1000*3600*24);
        let daysPassed = daysCal.toFixed(0);

        //Calculate amount left
        let amountLeft = this.product.amount - (this.product.use*daysPassed);

        const db = getDatabase();
        const productRef = ref(db, 'users/' + this.user_account.uid + '/products/' + this.product.id);

        //Condition to delete when no days are left
         if (this.product.days < 0 || this.product.days === 0) {
            //const productRef = ref(db, 'users/' + this.user_account.uid + '/products/' + this.product);
            remove(productRef);
        } else {
            let daysPro = this.product.days;
            update(productRef, {"days": daysPro - daysPassed}); 
            update(productRef, {"amount": amountLeft}); 
            update(productRef, {"button": false});
            update(productRef, {"dateBtnClick": todayFormat});
        }
    }
}