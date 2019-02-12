import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';

export interface ProductData {
    id: string;
    classid: number;
    size: string;
    length: number;
    width: number;
    think: number;
    unitlen: string;
    unitwid: string;
    unitthi: string;
    picture: string;
    unit: string;
    sharp: string;
    weight: number;
    price: number;
    returnnow: number;
    amount: number;
    cansale: boolean;
    physicoindex: number;
    chemicalindex: number;
}

export class AProduct extends AItem<ProductData> {
    constructor(data: ProductData) {
        super(data);
    }
}

export class Product  extends Yrrdb<AProduct, ProductData> {
    constructor(data: ProductData[]) {
        super(data, AProduct);
    }
}
