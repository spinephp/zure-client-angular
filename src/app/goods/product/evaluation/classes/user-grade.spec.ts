import { TestBed, inject, async } from '@angular/core/testing';
import { UserGrade, UserGradeData } from '../classes/user-grade';

describe('UserGrade', () => {
    let usergradedata: UserGradeData[];
    let usergrade: UserGrade;
    beforeEach(() => {
        usergradedata = [
            {id: '3', userid: 3, gradeid: 3},
            {id: '17', userid: 46, gradeid: 1},
        ];
        usergrade = new UserGrade(usergradedata);
    });

    it('should be create', () => {
      expect(usergrade).toBeTruthy();
    });

    it('find() should return right value', () => {
        const item = usergrade.find(17);
        expect(item.item).toBe(usergradedata[1]);
    });

    it('findByUserId() should return right value', () => {
        const item = usergrade.findByUserId(46);
        expect(item.item).toBe(usergradedata[1]);
    });
});
