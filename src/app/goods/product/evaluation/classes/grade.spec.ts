import { TestBed, inject, async } from '@angular/core/testing';
import { UserGrade } from '../classes/user-grade';
import { Grade, GradeData } from '../classes/grade';

describe('Grade', () => {
    let usergrade: UserGrade;
    let grade: Grade;
    let gradedata: GradeData[];
    beforeEach(() => {
      const usergradedata = [{id: '1', userid: 1, gradeid: 2}];
      gradedata = [
        {id: '1', names: ['register', '注册'], image: ''},
        {id: '2', names: ['bronze', '铜牌'], image: ''},
        {id: '3', names: ['silver', '银牌'], image: ''},
        {id: '4', names: ['gold', '金牌'], image: ''},
        {id: '5', names: ['diamond', '钻石'], image: ''},
      ];
      usergrade = new UserGrade(usergradedata);
      grade = new Grade(gradedata, usergrade);
    });

    it('should be create', () => {
      expect(grade).toBeTruthy();
      expect(grade.data.length).toBe(gradedata.length);
    });

    it('function should have been called and return right value', () => {
      spyOn(grade, 'find').and.callThrough();
      spyOn(usergrade, 'findByUserId').and.callThrough();

      const item = grade.getByUser(1);
      expect(usergrade.findByUserId).toHaveBeenCalled();
      expect(usergrade.findByUserId).toHaveBeenCalledWith(1);

      expect(grade.find).toHaveBeenCalled();
      expect(grade.find).toHaveBeenCalledWith(2);

      expect(item.item).toBe(gradedata[1]);
      expect(item.value('id')).toBe(gradedata[1].id);
    });
  });
