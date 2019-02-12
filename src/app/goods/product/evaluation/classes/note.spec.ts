import { TestBed, inject, async } from '@angular/core/testing';
import { Note, NoteData, ANote } from '../classes/note';
import { User, UserData } from '../classes/user';
import { Country, CountryData } from '../classes/country';

describe('UserGrade', () => {
    let notedata: NoteData[];
    let userdata: UserData[];
    let countrydata: CountryData[];
    let note: Note;
    let user: User;
    let country: Country;
    beforeEach(() => {
        notedata = [
            {id: '1', proid: 1, userid: 3, title: 'aaaaaaaa', content: 'ffffffffff', images: [], date: '2011-11-06', status: 'W'}
        ];
        userdata = [
            {id: '3', username: 'liuxingming', picture: 'u00000003.png', nick: '', country: '48'}
        ];
        countrydata = [
            {id: '48', names: ['China', '中国； 内地'], code2: 'CHN', emoji: '🇨🇳'}
        ];
        user = new User(userdata);
        country = new Country(countrydata);
        note = new Note(notedata, user, country);
    });

    it('should be create', () => {
      expect(note).toBeTruthy();
    });

    it('find() should return right value', () => {
        const item = note.find(1);
        expect(item.item).toBe(notedata[0]);

        expect(item.value('title')).toBe(notedata[0].title);
    });

    it('getCountry() should be called and return right value', () => {
        spyOn(ANote._user, 'find').and.callThrough();
        spyOn(ANote._country, 'find').and.callThrough();

        const item = ANote.getCountry(3);

        expect(ANote._user.find).toHaveBeenCalled();
        expect(ANote._country.find).toHaveBeenCalled();
        expect(ANote._user.find).toHaveBeenCalledWith(3);
        expect(ANote._country.find).toHaveBeenCalledWith(+userdata[0].country);

        expect(item).toBe(countrydata[0]);
    });
});
