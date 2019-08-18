import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';

export interface LanguageData {
    id: string;
    names: string[];
}

export class ALanguage extends AItem<LanguageData> {
    constructor(data: LanguageData) {
        super(data);
    }
}

export class Language  extends Yrrdb<ALanguage, LanguageData> {
    constructor(data: LanguageData[]) {
        super(data, ALanguage);
    }
}
