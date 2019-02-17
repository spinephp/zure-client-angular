import { TestBed, inject, async } from '@angular/core/testing';
import { UserGrade, UserGradeData } from '../classes/user-grade';
import { Evaluation, EvaluationData, AEvaluation } from './evaluation';
import { UserData, User } from './user';
import { GradeData, Grade } from './grade';
import { Country, CountryData } from './country';
import { EvalReply, EvalReplyData } from './eval-reply';

describe('evaluation', () => {
    let userdata: UserData[];
    let gradedata: GradeData[];
    let evaluationdata: EvaluationData[];
    let usergradedata: UserGradeData[];
    let countrydata: CountryData[];
    let evalreplydata: EvalReplyData[];
    let user: User;
    let grade: Grade;
    let evaluation: Evaluation;
    let usergrade: UserGrade;
    let country: Country;
    let evalreply: EvalReply;
    beforeEach(() => {
        userdata = [
            {id: '3', username: 'liuxingming', picture: 'u00000003.png', nick: '', country: '48'}
        ];
        gradedata = [
            {id: '1', names: ['register', '注册'], image: 'a'},
            {id: '2', names: ['bronze', '铜牌'], image: 'b'},
            {id: '3', names: ['silver', '银牌'], image: 'c'},
            {id: '4', names: ['gold', '金牌'], image: 'd'},
            {id: '5', names: ['diamond', '钻石'], image: 'e'},
              ];
        evaluationdata = [
            {id: '1', proid: 1, userid: 3, label: 4, useideas: 'fdsafsa', star: 5, date: '2011-10-16', useful: 8, status: 'A', feelid: 0}
        ];
        usergradedata = [
            {id: '3', userid: 3, gradeid: 3},
            {id: '17', userid: 46, gradeid: 1},
        ];
        countrydata = [
            {id: '48', names: ['China', '中国； 内地'], code2: 'CHN', emoji: '🇨🇳'}
        ];
        evalreplydata = [
            {id: '1', evalid: 1, userid: 46, parentid: 0, content: 'fdasfa fdsaf', time: '2014-09-23 21:37:13'}
        ];
        user = new User(userdata);
        usergrade = new UserGrade(usergradedata);
        grade = new Grade(gradedata, usergrade);
        country = new Country(countrydata);
        evalreply = new EvalReply(evalreplydata, user);
        spyOn(usergrade, 'findByUserId').and.callThrough();
        spyOn(grade, 'find').and.callThrough();
        spyOn(user, 'find').and.callThrough();
        // spyOn(usergrade, 'findByUserId').and.callThrough();
        evaluation = new Evaluation(evaluationdata, grade, usergrade, user, country, evalreply);
    });

    it('should be create', () => {
        expect(evaluation).toBeTruthy();
    });

    it('makeRecord() should called right', () => {
        spyOn(Evaluation, '_getLabelIds').and.callThrough();
        spyOn(grade, 'getByUser').and.callThrough();
        // spyOn(AEvaluation.user, 'find').and.callThrough();
        spyOn(country, 'find').and.callThrough();

        const aeval = evaluation.find(1);
        expect(aeval.item['usergradeimage']).not.toBeDefined();
        expect(aeval.item['usergradenames']).not.toBeDefined();
        expect(aeval.item['username']).not.toBeDefined();
        expect(aeval.item['countryimage']).not.toBeDefined();
        expect(aeval.item['countrynames']).not.toBeDefined();

        aeval.makeRecord();

        expect(Evaluation._getLabelIds).toHaveBeenCalled();
        expect(Evaluation._getLabelIds).toHaveBeenCalledTimes(1);
        expect(Evaluation._getLabelIds).toHaveBeenCalledWith(evaluationdata[0].label);

        expect(grade.getByUser).toHaveBeenCalled();
        expect(grade.getByUser).toHaveBeenCalledTimes(1);
        expect(grade.getByUser).toHaveBeenCalledWith(evaluationdata[0].userid);

        expect(user.find).toHaveBeenCalled();
        expect(user.find).toHaveBeenCalledTimes(1);
        expect(user.find).toHaveBeenCalledWith(evaluationdata[0].userid);

        expect(country.find).toHaveBeenCalled();
        expect(country.find).toHaveBeenCalledTimes(1);
        expect(country.find).toHaveBeenCalledWith(+userdata[0].country);

        expect(aeval.item['usergradeimage']).toBe(gradedata[2].image);
        expect(aeval.item['usergradenames']).toBe(gradedata[2].names);
        expect(aeval.item['username']).toBe(userdata[0].username);
        expect(aeval.item['countryimage']).toBe(countrydata[0].emoji);
        expect(aeval.item['countrynames']).toBe(countrydata[0].names);
    });

    it('addReplys() should called right', () => {
        spyOn(evalreply, 'findAllByAttribute').and.callThrough();

        const aeval = evaluation.find(1);
        expect(aeval.item['replyslength']).not.toBeDefined();
        expect(aeval.item['replys']).not.toBeDefined();

        aeval.addReplys();

        expect(evalreply.findAllByAttribute).toHaveBeenCalled();
        expect(evalreply.findAllByAttribute).toHaveBeenCalledTimes(1);
        expect(evalreply.findAllByAttribute).toHaveBeenCalledWith('evalid', +aeval.item['id']);

        // expect(aeval.item['replyslength']).toBe(evalreply.findByAllAttribute.calls.first().returnValue.length);
        // expect(aeval.item['replys']).not.toBeDefined();
    });
    // it('function should have been called', () => {
        // expect(usergrade.findByUserId).toHaveBeenCalled();
        // expect(grade.find).toHaveBeenCalled();
        // expect(user.find).toHaveBeenCalled();
        // expect(usergrade.findByUserId).toHaveBeenCalledTimes(consultdata.length);
        // expect(grade.find).toHaveBeenCalledTimes(consultdata.length);
        // expect(user.find).toHaveBeenCalledTimes(consultdata.length);
        // expect(usergrade.findByUserId).toHaveBeenCalledWith(+consultdata[0].userid);
        // expect(grade.find).toHaveBeenCalledWith(+usergradedata[0].gradeid);
        // expect(user.find).toHaveBeenCalledWith(+consultdata[0].userid);
    // });

    // it('find() should return right value', () => {
    //     const item = evaluation.find(1);
    //     expect(item.item).toBe(consultdata[0]);
    // });

    // it('getRecords() should return right value', () => {
    //     evaluation.type = 0;
    //     let item = evaluation.getRecords();
    //     expect(item.length).toBe(1);
    //     expect(item[0]).toBe(consultdata[0]);
    //     evaluation.type = 1;
    //     item = evaluation.getRecords();
    //     expect(item.length).toBe(0);
    // });

    // it('getTypes() should return right value', () => {
    //     const item = evaluation.getTypes();
    //     expect(item.length).toBe(6);
    //     expect(item[0].amount).toBe(1);
    //     expect(item[1].amount).toBe(1);
    //     expect(item[2].amount).toBe(0);
    //     expect(item[3].amount).toBe(0);
    //     expect(item[4].amount).toBe(0);
    //     expect(item[5].amount).toBe(0);

    //     evaluation.tabsClick(0);
    //     expect(evaluation.typeLength()).toBe(1);
    //     evaluation.tabsClick(2);
    //     expect(evaluation.typeLength()).toBe(0);
    // });
});
