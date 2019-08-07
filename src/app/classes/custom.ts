import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';

export interface CustomData {
    id?: string;
    userid?: string;
}

export class ACustom extends AItem<CustomData> {
    constructor(data: CustomData) {
        super(data);
    }
}

export class Custom  extends Yrrdb<ACustom, CustomData> {
    constructor(data: CustomData[]) {
        super(data, ACustom);
    }
}
