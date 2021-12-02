import { isEmpty } from '@firebase/util';
import { getDatabase, ref, onValue, set, update, push } from 'firebase/database';

export class productCard {
    constructor(product){
        this.product = product;
    }
}