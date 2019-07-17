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
        // spyOn(usergrade, 'findByUserId').and.callThrough();
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
        // spyOn([evalreplydata[0]], 'reverse').and.callThrough();
        // spyOn([evalreplydata[0]], 'slice').and.callThrough();
        spyOn(evalreply.data[0], 'extends').and.callThrough();

        const aeval = evaluation.find(1);
        expect(aeval.item['replyslength']).not.toBeDefined();
        expect(aeval.item['replys']).not.toBeDefined();

        aeval.addReplys();

        expect(evalreply.findAllByAttribute).toHaveBeenCalled();
        expect(evalreply.findAllByAttribute).toHaveBeenCalledTimes(1);
        expect(evalreply.findAllByAttribute).toHaveBeenCalledWith('evalid', +aeval.item['id']);

        expect(evalreply.data[0].extends).toHaveBeenCalled();
        // expect([evalreplydata[0]].reverse).toHaveBeenCalled();
        // expect([evalreplydata[0]].reverse).toHaveBeenCalledTimes(1);

        // expect([evalreplydata[0]].slice).toHaveBeenCalled();
        // expect([evalreplydata[0]].slice).toHaveBeenCalledTimes(1);
        // expect([evalreplydata[0]].slice).toHaveBeenCalledWith(0, 1);


        expect(aeval.item['replyslength']).toBe(1);
        expect(aeval.item['replys'][0].item).toBe(evalreplydata[0]);
    });

    it('static _getLabelIds() should called right', () => {
        expect(Evaluation._getLabelIds(0)).toEqual([]);
        expect(Evaluation._getLabelIds(null)).toEqual([]);
        expect(Evaluation._getLabelIds(undefined)).toEqual([]);
        expect(Evaluation._getLabelIds(1)).toEqual([1]);
        expect(Evaluation._getLabelIds(2)).toEqual([2]);
        expect(Evaluation._getLabelIds(3)).toEqual([1, 2]);
        expect(Evaluation._getLabelIds(7)).toEqual([1, 2, 3]);
        expect(Evaluation._getLabelIds(15)).toEqual([1, 2, 3, 4]);
        expect(Evaluation._getLabelIds(255)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('getRecords() should called right', () => {
        const aeval = evaluation.find(1);
        spyOn(aeval, 'addReplys').and.callThrough();
        spyOn(aeval, 'makeRecord').and.callThrough();

        expect(aeval.item['replyslength']).not.toBeDefined();
        expect(aeval.item['replys']).not.toBeDefined();

        expect(evaluation.getRecords()).toEqual([evaluationdata[0]]);

        expect(aeval.addReplys).toHaveBeenCalled();
        expect(aeval.addReplys).toHaveBeenCalledTimes(1);

        expect(aeval.makeRecord).toHaveBeenCalled();
        expect(aeval.makeRecord).toHaveBeenCalledTimes(1);


        expect(aeval.item['replyslength']).toBe(1);
        expect(aeval.item['replys'][0].item).toBe(evalreplydata[0]);
    });

    it('find() should be return right value', () => {
        expect(evaluation.find).toBeDefined();
        expect(evaluation.find(+'')).toBeNull();
        expect(evaluation.find(null)).toBeNull();
        expect(evaluation.find(undefined)).toBeNull();
        expect(evaluation.find(0)).toBeNull();
        expect(evaluation.find(1).item).toBe(evaluation.getRecords()[0]);
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

    it('should return right value', () => {
        const types = [
            {names: ['All evaluation', '所有评价'], amount: 100},
            {names: ['Good', '好评'], amount: 0},
            {names: ['Medium', '中评'], amount: 0},
            {names: ['Poor', '差评'], amount: 0}
        ];

        expect(evaluation.datalength()).toBe(1);
        expect(evaluation.pageCount()).toBe(1);
        expect(evaluation.getTypes()).toEqual(types);
        expect(evaluation.setTypes()).toEqual({stars: [[ , , , , , ], [], []], records: 1});

        expect(evaluation.rate(null)).toBe(null);
        expect(evaluation.rate(undefined)).toBe(null);
        expect(evaluation.rate(0)).toBe(null);
        expect(evaluation.rate(1)).toBe(100);
        expect(evaluation.rate(2)).toBe(0);
        expect(evaluation.rate(3)).toBe(0);
        expect(evaluation.rate(4)).toBe(null);
        expect(evaluation.rate(5)).toBe(null);

    });

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
