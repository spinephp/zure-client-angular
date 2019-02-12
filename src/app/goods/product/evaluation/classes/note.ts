import { Yrrdb, AItem } from '../../../../commons/provider/yrrdb';
import { User, UserData } from './user';
import { Country, CountryData } from './country';

export interface NoteData {
    id: string;
    proid: number;
    userid: number;
    title: string;
    content: string;
    images: string[];
    date: string;
    status: string;
    countrynames?: string[];
    countryimage?: string;
}

export class ANote extends AItem<NoteData> {
    static _user: User;
    static _country: Country;
    static getCountry(userid: number) {
        const item = ANote._user.find(userid).item;
        return ANote._country.find(+item.country).item;
    }

    constructor(data: NoteData) {
        super(data);
        const country = ANote.getCountry(this.item.userid);
        this.item.countrynames = country.names;
        this.item.countryimage = country.emoji;
    }
}
export class Note extends Yrrdb<ANote, NoteData> {

    constructor(data: NoteData[], _user: User, _country: Country) {
        ANote._user = _user;
        ANote._country = _country;
        super(data, ANote);
    }

    private extends(rec: NoteData) {
    }
}
