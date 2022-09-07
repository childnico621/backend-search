import { Price } from "./Price";

export class BaseItem {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
    constructor(obj: BaseItem) {
        this.id = obj.id
        this.title = obj.title
        this.price = obj.price
        this.picture = obj.picture
        this.condition = obj.condition
        this.free_shipping = obj.free_shipping
    }
}

