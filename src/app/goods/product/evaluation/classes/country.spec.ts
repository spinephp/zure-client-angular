import { TestBed, inject, async } from '@angular/core/testing';
import { Country, CountryData } from '../classes/country';

describe('Country', () => {
    let country: Country;
    let countrydata: CountryData[];

    beforeEach(() => {
        countrydata = [
            {id: '48', names: ['China', '中国； 内地'], code2: 'CHN', emoji: '🇨🇳'}
        ];
        country = new Country(countrydata);
    });

    it('should be create', () => {
      expect(country).toBeTruthy();
    });

    it('function should have been called and return right value', () => {
      const item = country.find(48);
      expect(item.item).toBe(countrydata[0]);
      expect(item.value('names')[0]).toBe(countrydata[0].names[0]);

      expect(item.value('name')).not.toBeDefined();
      expect(item.value('')).not.toBeDefined();
      expect(item.value(null)).not.toBeDefined();
      expect(item.value(undefined)).not.toBeDefined();
    });
  });
