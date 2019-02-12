import { Yrrdb, AItem } from '../../../../commons/provider/yrrdb';
import { ThrowStmt } from '@angular/compiler';

export interface CountryData {
    id: string;
    names: string[];
    code2: string;
    emoji: string;
}

export class ACountry extends AItem<CountryData> {
    constructor(data: CountryData) {
        super(data);
    }
}
export class Country extends Yrrdb<ACountry, CountryData> {

    constructor(data: CountryData[]) {
        super(data, ACountry);
    }
}
