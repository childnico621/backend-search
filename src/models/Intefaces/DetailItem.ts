import { BaseItem } from "./BaseItem"

export class DetailItem extends BaseItem {
    sold_quantity: number;
    description: string;
    constructor(item: BaseItem, sold_quantity: number, description: string) {
        super(item);
        this.sold_quantity=sold_quantity;
        this.description=description
    }
}