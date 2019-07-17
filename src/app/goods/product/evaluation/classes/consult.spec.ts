import { TestBed, inject, async } from '@angular/core/testing';
import { UserGrade, UserGradeData } from '../classes/user-grade';
import { Consult, ConsultData } from './consult';
import { UserData, User } from './user';
import { GradeData, Grade } from './grade';

describe('Consult', () => {
    let userdata: UserData[];
    let gradedata: GradeData[];
    let consultdata: ConsultData[];
    let usergradedata: UserGradeData[];
    let user: User;
    let grade: Grade;
    let consult: Consult;
    let usergrade: UserGrade;
    beforeEach(() => {
        userdata = [
            {id: '3', username: 'liuxingming', picture: 'u00000003.png', nick: '', country: '48'}
        ];
        gradedata = [
            {id: '1', names: ['register', '注册'], image: ''},
            {id: '2', names: ['bronze', '铜牌'], image: ''},
            {id: '3', names: ['silver', '银牌'], image: ''},
            {id: '4', names: ['gold', '金牌'], image: ''},
            {id: '5', names: ['diamond', '钻石'], image: ''},
              ];
        consultdata = [
            {id: '1', proid: 1, userid: 3, type: 0, content: 'aaaaa', time: '2012-01-24 11:00:07', reply: 'cccccc'
            , replytime: '2012-01-25 11:00:25'}
              ];
        usergradedata = [
            {id: '3', userid: 3, gradeid: 3},
            {id: '17', userid: 46, gradeid: 1},
        ];
        user = new User(userdata);
        usergrade = new UserGrade(usergradedata);
        grade = new Grade(gradedata, usergrade);
        spyOn(usergrade, 'findByAttribute').and.callThrough();
        spyOn(grade, 'find').and.callThrough();
        spyOn(user, 'find').and.callThrough();
        // spyOn(usergrade, 'findByUserId').and.callThrough();
        consult = new Consult(consultdata, grade, usergrade, user);
    });

    it('should be create', () => {
        expect(consult).toBeTruthy();
        expect(consult.data.length).toBe(consultdata.length);
        expect(consult.type).toBe(0);
        consult.type = 1;
        expect(consult.type).toBe(1);
    });

    it('function should have been called', () => {
        expect(usergrade.findByAttribute).toHaveBeenCalled();
        expect(grade.find).toHaveBeenCalled();
        expect(user.find).toHaveBeenCalled();
        expect(usergrade.findByAttribute).toHaveBeenCalledTimes(consultdata.length);
        expect(grade.find).toHaveBeenCalledTimes(consultdata.length);
        expect(user.find).toHaveBeenCalledTimes(consultdata.length);
        expect(usergrade.findByAttribute).toHaveBeenCalledWith('userid', +consultdata[0].userid);
        expect(grade.find).toHaveBeenCalledWith(+usergradedata[0].gradeid);
        expect(user.find).toHaveBeenCalledWith(+consultdata[0].userid);
    });

    it('find() should return right value', () => {
        const item = consult.find(1);
        expect(item.item).toBe(consultdata[0]);
    });

    it('getRecords() should return right value', () => {
        consult.type = 0;
        let item = consult.getRecords();
        expect(item.length).toBe(1);
        expect(item[0]).toBe(consultdata[0]);
        consult.type = 1;
        item = consult.getRecords();
        expect(item.length).toBe(0);
    });

    it('getTypes() should return right value', () => {
        const item = consult.getTypes();
        expect(item.length).toBe(6);
        expect(item[0].amount).toBe(1);
        expect(item[1].amount).toBe(1);
        expect(item[2].amount).toBe(0);
        expect(item[3].amount).toBe(0);
        expect(item[4].amount).toBe(0);
        expect(item[5].amount).toBe(0);

        consult.tabsClick(0);
        expect(consult.typeLength()).toBe(1);
        consult.tabsClick(2);
        expect(consult.typeLength()).toBe(0);
    });
});
