import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';

export interface PersonData {
    id?: string;
    username?: string;
    picture?: string;
    nick?: string;
}

export class APerson extends AItem<PersonData> {
    constructor(data: PersonData) {
        super(data);
    }
}

export class Person  extends Yrrdb<APerson, PersonData> {
    constructor(data: PersonData[]) {
        super(data, APerson);
    }
}
