import { TestBed, inject, async } from '@angular/core/testing';
import { Kind, KindData } from './kind';

describe('Label', () => {
    let kind: Kind;
    let kinddata: KindData[];
    const nullArray = [].toString();

    beforeEach(() => {
        kinddata = [
            {id: '1', parentid: 0, names: ['Si3N4 bonded SiC Products', '氮化硅结合碳化硅制品'], introductions: [], picture: '1_4.png'},
            {id: '2', parentid: 0, names: ['Oxide bonded SiC Products', '氧化物结合碳化硅制品'], introductions: [], picture: '1_4.png'},
            {id: '3', parentid: 0, names: ['SiC Castables', '碳化硅浇注料'], introductions: ['SiC Castables', '碳化硅浇注料'], picture: '1_4.png'},
            {
                id: '4',
                parentid: 1,
                names: ['Slab', '棚板'],
                introductions: [
                    'Silicon nitride combined with silicon carbide plate is widely used in daily-use ceramics',
                    '氮化硅结合碳化硅棚板广泛应用于日用陶瓷业、卫生陶瓷业'
                ],
                picture: '1_4.png'
            },
            {
                id: '5',
                parentid: 1,
                names: ['brick', '砖'],
                introductions: [
                    'Is mainly made of silicon nitride combined with silicon carbide products',
                    '以氮化硅为主要结合相的碳化硅制品。一般含碳化硅70%～75%'],
                    picture: '1_5.png'
                },
            {id: '6', parentid: 1, names: ['other', '其它'], introductions: ['other', '包括氮化硅结合碳化硅'], picture: '1_4.png'},
        ];
        kind = new Kind(kinddata);
    });

    it('should be create', () => {
      expect(kind).toBeTruthy();
      expect(kind.data.length).toBe(kinddata.length);
    });

    it('function should have been called and return right value', () => {
        const akind = kind.find(3);
        expect(akind.item).toBe(kinddata[2]);
    });

    it('findByAttribute() should have been called and return right value', () => {
        const akind = kind.findByAttribute('parentid', 1);
        expect(akind.item).toBe(kinddata[3]);
        const akind1 = kind.findByAttribute('names', ['brick', '砖']);
        expect(akind1.item).toBe(kinddata[4]);
        const akind2 = kind.findByAttribute('introductions', ['other', '包括氮化硅结合碳化硅']);
        expect(akind2.item).toBe(kinddata[5]);
    });

    it('parentNames() should have been called and return right value', () => {
        const names = kind.parentNames(1);
        expect(names.toString()).toBe(kinddata[0].names.toString());

        expect(kind.parentNames(undefined).toString()).toBe(nullArray);
        expect(kind.parentNames(null).toString()).toBe(nullArray);
        expect(kind.parentNames('').toString()).toBe(nullArray);
        expect(kind.parentNames(-1).toString()).toEqual(['Root Node', '根结点'].toString());
      });

    it('names() should have been called and return right value', () => {
        const names = kind.names(1);
        expect(names.toString()).toBe(['Si3N4 bonded SiC ', '氮化硅结合碳化硅'].toString());

        expect(kind.names(undefined)).toBeNull();
        expect(kind.names(null)).toBeNull();
        expect(kind.names('')).toBeNull();
        expect(kind.names(-1)).toBeNull();
      });

    it('longNames() should have been called and return right value', () => {
        const names = kind.longNames(6);
        expect(names.toString()).toBe(['Si3N4 bonded SiC other', '氮化硅结合碳化硅其它'].toString());

        expect(kind.longNames(undefined)).toBeNull();
        expect(kind.longNames(null)).toBeNull();
        expect(kind.longNames('')).toBeNull();
        expect(kind.longNames(-1)).toBeNull();
      });

    it('shortNames() should have been called and return right value', () => {
        const names = kind.shortNames(6);
        expect(names.toString()).toBe(['other', '其它'].toString());

        expect(kind.shortNames(undefined)).toBeNull();
        expect(kind.shortNames(null)).toBeNull();
        expect(kind.shortNames('')).toBeNull();
        expect(kind.shortNames(-1)).toBeNull();
      });
});
