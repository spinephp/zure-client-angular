import { TestBed, inject, async } from '@angular/core/testing';
import {RequestService} from '../../../commons/service/request.service';
import {SettingsService} from '../../../commons/service/settings.service';
import { HttpModule } from '@angular/http';
import { LocalStorage } from '../../../commons/provider/local-storage';
import { EvaluationService } from './evaluation.service';
import { UserGrade } from './classes/user-grade';
import { Grade, GradeData } from './classes/grade';
import { of } from 'rxjs';
import { Evaluation } from './classes/evaluation';

describe('EvaluationService', () => {
  const labeldata = [
    {id: '1', names: ['Good quality', '质量好']},
    {id: '2', names: ['Good Appearance', '外观好']},
    {id: '3', names: ['High intensity', '强度高']},
    {id: '4', names: ['Long Life', '寿命长']},
    {id: '5', names: ['Packaging good', '包装好']},
    {id: '6', names: ['Cost-effective', '性价比高']},
    {id: '7', names: ['Good color', '颜色好']},
    {id: '8', names: ['High-density', '密度高']},
  ];
  const gradedata = [
    {id: '1', names: ['register', '注册'], image: ''},
    {id: '2', names: ['bronze', '铜牌'], image: ''},
    {id: '3', names: ['silver', '银牌'], image: ''},
    {id: '4', names: ['gold', '金牌'], image: ''},
    {id: '5', names: ['diamond', '钻石'], image: ''},
  ];
  const notedata = [
    {id: '1', proid: 1, userid: 3, title: 'aaaaaaaa', content: 'ffffffffff', images: [], date: '2011-11-06', status: 'W'}
  ];
  const evaluationdata = [
    {id: '1', proid: 1, userid: 3, label: 4, useideas: 'fdsafsa', star: 5, date: '2011-10-16', useful: 8, status: 'A', feelid: 0}
  ];
  const consultdata = [
    {id: '1', proid: 1, userid: 3, type: 0, content: 'aaaaa', time: '2012-01-24 11:00:07', reply: 'cccccc'
    , replytime: '2012-01-25 11:00:25'}
  ];

  const evalreplydata = [
    {id: '1', evalid: 1, userid: 46, parentid: 0, content: 'fdasfa fdsaf', time: '2014-09-23 21:37:13'}
  ];
  const usergradedata = [
    {id: '3', userid: 3, gradeid: 3},
    {id: '17', userid: 46, gradeid: 1},
];

  const userdata = [
    {id: '3', username: 'liuxingming', picture: 'u00000003.png', nick: '', country: '48'}
  ];

  const countrydata = [
    {id: '48', names: ['China', '中国； 内地'], code3: 'CHN', emoji: '🇨🇳'}
  ];

  let service: EvaluationService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [  HttpModule ],
    providers: [ RequestService, SettingsService, LocalStorage ]
  }));
  beforeEach(inject([EvaluationService], s => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setData() and currentData() peer should worded', async(() => {
    const data = [{id: '4'}];
    service.currentData().subscribe(rs => {
      expect(rs).toBe(data);
    });
    service.setData(data);
  }));

  it('setEvaluation() and currentEvaluation() peer should worded', async(() => {
    const data = [{id: '4'}];
    service.currentEvaluation().subscribe(rs => {
      expect(rs).toBe(data);
    });
    service.setEvaluation(data);
  }));

  it('getLabelKinds() should return available data', async(() => {
    const result = service.getLabelKinds(evaluationdata, labeldata);
    expect(result).toEqual([undefined, 0, 0, 1, 0, 0, 0, 0, 0]);
    expect(service.getLabelKinds([{label: -1}], labeldata)).toEqual([undefined, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(service.getLabelKinds([{label: 0}], labeldata)).toEqual([undefined, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(service.getLabelKinds([{label: 4}, {label: 6}], labeldata)).toEqual([undefined, 0, 1, 2, 0, 0, 0, 0, 0]);
  }));

  xit('_get() should return available data', async(() => {
    const sRequest = TestBed.get(RequestService);
    const sSetting = TestBed.get(SettingsService);
    const ps = [
      {'? cmd=Country':
          {
            'filter': JSON.stringify(['id', 'names', 'code3', 'emoji']),
          }
      }
    ];
    spyOn(sRequest, '_get').and.returnValue(
      of(countrydata).toPromise()
    );
    Promise.all(sRequest._get(ps)).then(rs => {
      const key = Object.keys(ps[0])[0];
      expect(sRequest.get).toHaveBeenCalled();
      expect(sRequest.get).toHaveBeenCalledTimes(1);
      expect(sRequest.get).toHaveBeenCalledWith(sSetting.baseUrl + key, ps[0][key]);
      expect(rs[0]).toBe(countrydata);
    });
  }));

  it('get() should return available data', async(() => {
    const sRequest = TestBed.get(RequestService);
    const sSetting = TestBed.get(SettingsService);
      const datas = [
      labeldata,
      gradedata,
      evaluationdata,
      notedata,
      consultdata
    ];
    spyOn(sRequest, '_get').and.returnValue([
      of(labeldata).toPromise(),
      of(gradedata).toPromise(),
      of(evaluationdata).toPromise(),
      of(notedata).toPromise(),
      of(consultdata).toPromise()
    ]);
    // spyOn(service.requestService, 'get');
    Promise.all(service.get(1)).then(rs => {
      expect(sRequest._get).toHaveBeenCalled();
      expect(sRequest._get).toHaveBeenCalledTimes(1);

      expect(rs.length).toEqual(5);

      expect((rs[0] as Object[]).length).toEqual(labeldata.length);
      for (const i of Object.keys(rs[0])) {
        expect(rs[0][i]['id']).toBe(labeldata[i].id);
        expect(rs[0][i]['names']).toBe(labeldata[i].names);
      }

      expect((rs[1] as Object[]).length).toEqual(gradedata.length);

      expect(rs.length).toEqual(datas.length);
      for (const k of Object.keys(rs)) {
        for (const i of Object.keys(rs[k])) {
          for (const j of Object.keys(rs[k][i])) {
            expect(rs[k][i][j]).toBe(datas[k][i][j]);
          }
        }
      }
    });
  }));

  it('getSecond() should return available data', async(() => {
    const sRequest = TestBed.get(RequestService);
    const sSetting = TestBed.get(SettingsService);
    const datas = [
      evalreplydata,
      usergradedata
    ];
    spyOn(sRequest, '_get').and.returnValue([
      of(evalreplydata).toPromise(),
      of(usergradedata).toPromise()
    ]);
    Promise.all(service.getSecond(gradedata, evaluationdata)).then(rs => {
      expect(sRequest._get).toHaveBeenCalled();
      expect(sRequest._get).toHaveBeenCalledTimes(1);

      expect(rs.length).toEqual(datas.length);
      for (const k of Object.keys(rs)) {
        for (const i of Object.keys(rs[k])) {
          for (const j of Object.keys(rs[k][i])) {
            expect(rs[k][i][j]).toBe(datas[k][i][j]);
          }
        }
      }
    });
  }));

  it('getThird() should return available data', async(() => {
    const sRequest = TestBed.get(RequestService);
    const sSetting = TestBed.get(SettingsService);
    const datas = [
      userdata
    ];
    spyOn(sRequest, '_get').and.returnValue([
      of(userdata).toPromise()
    ]);
    Promise.all(service.getThird(gradedata, evalreplydata)).then(rs => {
      expect(sRequest._get).toHaveBeenCalled();
      expect(sRequest._get).toHaveBeenCalledTimes(1);

      expect(rs.length).toEqual(datas.length);
      for (const k of Object.keys(rs)) {
        for (const i of Object.keys(rs[k])) {
          for (const j of Object.keys(rs[k][i])) {
            expect(rs[k][i][j]).toBe(datas[k][i][j]);
          }
        }
      }
    });
  }));

  it('getForth() should return available data', async(() => {
    const sRequest = TestBed.get(RequestService);
    const sSetting = TestBed.get(SettingsService);
    const datas = [
      countrydata
    ];
    spyOn(sRequest, '_get').and.returnValue([
      of(countrydata).toPromise()
    ]);

    Promise.all(service.getForth(userdata)).then(rs => {
      expect(sRequest._get).toHaveBeenCalled();
      expect(sRequest._get).toHaveBeenCalledTimes(1);

      expect(rs.length).toEqual(datas.length);
      for (const k of Object.keys(rs)) {
        for (const i of Object.keys(rs[k])) {
          for (const j of Object.keys(rs[k][i])) {
            expect(rs[k][i][j]).toBe(datas[k][i][j]);
          }
        }
      }
    });
  }));

  it('updateData() should return available data', async(() => {
    spyOn(service, 'get').and.returnValue([
      of(labeldata).toPromise(),
      of(gradedata).toPromise(),
      of(evaluationdata).toPromise(),
      of(notedata).toPromise(),
      of(consultdata).toPromise()
    ]);
    spyOn(service, 'getSecond').and.returnValue([
      evalreplydata,
      usergradedata
    ]);
    spyOn(service, 'getThird').and.returnValue([
      of(userdata).toPromise()
    ]);
    spyOn(service, 'getForth').and.returnValue([
      of(countrydata).toPromise()
    ]);
    spyOn(service, 'setEvaluation');
    spyOn(service, 'getLabelKinds').and.callThrough();
    service.currentData().subscribe((rs: any) => {
      // console.log(rs);
      expect(service.get).toHaveBeenCalled();
      expect(service.get).toHaveBeenCalledTimes(1);
      expect(service.get).toHaveBeenCalledWith(1);

      expect(service.getSecond).toHaveBeenCalled();
      expect(service.getSecond).toHaveBeenCalledTimes(1);
      expect(service.getSecond).toHaveBeenCalledWith(evaluationdata, consultdata);

      expect(service.getThird).toHaveBeenCalled();
      expect(service.getThird).toHaveBeenCalledTimes(1);
      expect(service.getThird).toHaveBeenCalledWith(evaluationdata, evalreplydata);

      expect(service.getForth).toHaveBeenCalled();
      expect(service.getForth).toHaveBeenCalledTimes(1);
      expect(service.getForth).toHaveBeenCalledWith(userdata);

      expect(service.getLabelKinds).toHaveBeenCalled();
      expect(service.getLabelKinds).toHaveBeenCalledTimes(1);
      expect(service.getLabelKinds).toHaveBeenCalledWith(evaluationdata, labeldata);

      expect(service.setEvaluation).toHaveBeenCalled();
      expect(service.setEvaluation).toHaveBeenCalledTimes(1);

      expect(rs.length).toBe(5);
      console.log(rs);
      // Evaluation
      expect(rs[0].types.length).toBe(4);
      expect(rs[0].types[0].amount).toEqual(rs[0].types[1].amount + rs[0].types[2].amount + rs[0].types[3].amount);
      expect(rs[0]._pages.length).toBe(4);
      expect(rs[0]._pages[0].data.length).toBe(evaluationdata.length);
      for (const i of Object.keys(rs[0]._pages[0].data)) {
        const aeval = rs[0]._pages[0].data[i];
        expect(aeval.item).toBe(evaluationdata[i]);
      }

      // Label
      expect(rs[1].data.length).toBe(labeldata.length);
      for (const i of Object.keys(rs[1].data)) {
        const alabel = rs[1].data[i];
        expect(alabel.item).toBe(labeldata[i]);
      }

      // Note
      expect(rs[2].data.length).toBe(notedata.length);
      for (const i of Object.keys(rs[2].data)) {
        const anote = rs[2].data[i];
        expect(anote.item).toBe(notedata[i]);
      }

      // Consult
      expect(rs[3].data.length).toBe(consultdata.length);
      for (const i of Object.keys(rs[3].data)) {
        const aconsult = rs[3].data[i];
        expect(aconsult.item).toBe(consultdata[i]);
      }

      // LabelKinds
      expect(rs[4].length).toBe(labeldata.length + 1);
      expect(rs[4][0]).not.toBeDefined();
      for (let i = 1; i < rs[4].length; i++) {
        expect(rs[4][i]).toBeGreaterThanOrEqual(0);
      }
    });
    service.updateData(1);
  }));
});
