import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';

export interface CurrencyData {
    id: string;
    names: string[];
    abbreviation: string;
    symbol: string;
    exchangerate: number;
}

export class ACurrency extends AItem<CurrencyData> {
    constructor(data: CurrencyData) {
        super(data);
    }
}

export class Currency  extends Yrrdb<ACurrency, CurrencyData> {
    constructor(data: CurrencyData[]) {
        super(data, ACurrency);
    }
}
