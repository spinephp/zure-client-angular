import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { TranslatePipe } from '../../../translate.pipe';
import { LocalStorage } from '../../../commons/provider/local-storage';
import { HttpModule, Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { Directive, ElementRef, HostListener, Input, NO_ERRORS_SCHEMA } from '@angular/core';

import { EvaluationComponent } from './evaluation.component';
import { ProductComponent } from '../product.component';
import { GoodsComponent } from '../../goods.component';
import { EvaluationModule } from './evaluation.module';
import { EvaluationService } from './evaluation.service';
import { Evaluation } from './classes/evaluation';
import { Grade } from './classes/grade';
import { UserGrade } from './classes/user-grade';
import { EvalReply } from './classes/eval-reply';
import { Consult } from './classes/consult';
import { Country } from './classes/country';
import { Label, ALabel } from './classes/label';
import { Note } from './classes/note';
import { User } from './classes/user';
import { of } from 'rxjs';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import {APP_BASE_HREF} from '@angular/common';
import { ValuesService } from 'src/app/commons/service/values.service';

describe('EvaluationComponent', () => {
  let component: EvaluationComponent;
  let fixture: ComponentFixture<EvaluationComponent>;
  let evalService: EvaluationService;
  let valuesService: ValuesService;
  let ls: LocalStorage;
  let element;
  let de;
  // let evaluation;
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
    {id: '48', names: ['China', '中国； 内地'], code2: 'CHN', emoji: '🇨🇳'}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        // EvaluationComponent,
      ],
      imports: [
        EvaluationModule,
        AppModule,
        HttpModule
      ],
      providers: [
        TranslatePipe,
        LocalStorage,
        ProductComponent,
        GoodsComponent,
        EvaluationService,
        // {provide: EvaluationService, useClass: SpyEvaluationService},
        // {provide: Evaluation, useClass: SpyEvaluationService},
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      schemas: [ NO_ERRORS_SCHEMA ] // 路由至新页面时，忽略组件没加载错误
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(EvaluationComponent);
      const productcomponect = TestBed.get(ProductComponent);
      productcomponect.languageid = 1;
      evalService = TestBed.get(EvaluationService);
      valuesService = TestBed.get(ValuesService);
      ls = TestBed.get(LocalStorage);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      de = fixture.debugElement;
      fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    const qq = ls.get('qq');
    expect(qq).toMatch('[1-9][0-9]{4,14}');
  });

  it('should be return languageid', () => {
    const languageid = 1;
    valuesService.currentLanguageId().subscribe(data => {
      expect(data).toBe(languageid);
    });
    valuesService.setLanguageId(languageid);
  });

  it('should be return service datas', () => {
      spyOn(evalService, 'updateData').and.callFake(() => {
      const data = [];
      const labels = new Label(labeldata); // 产品标签
      const usergrades = new UserGrade(usergradedata); // 用户级别
      const grades = new Grade(gradedata, usergrades); // 会员级别
      const labelkinds = evalService.getLabelKinds(evaluationdata, labeldata);
      const users = new User(userdata);
      const countrys = new Country(countrydata);
      const evalreplys = new EvalReply(evalreplydata, users); // 评价回复
      const notes = new Note(notedata, users, countrys); // 使用心得
      const evaluations = new Evaluation(
        evaluationdata,
        grades,
        usergrades,
        users,
        countrys,
        evalreplys); // 产品评价
      evalService.setEvaluation(evaluations.setTypes());
      const consults = new Consult(
        consultdata,
        grades,
        usergrades,
        users);
      data.push(evaluations);
      data.push(labels);
      data.push(notes);
      data.push(consults);
      data.push(labelkinds);
      evalService.setData(data);
    });
    spyOn(evalService, 'getLabelKinds').and.returnValue([undefined, 0, 0, 1, 0, 0, 0, 0, 0]);
    evalService.currentData().subscribe((rs) => {
      expect(rs.length).toEqual(5);
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
      evalService.updateData(1);
    });
  });

  // xit('templated should be rendered', fakeAsync(() => {
  //   spyOn(evalService, 'updateData').and.callFake(() => {
  //     evalService.setData(evalDatas);
  //   });
  //   spyOn(component, 'replys').and.returnValue(evalDatas[5]);
  //   evalService.updateData(1);
  //   fixture.detectChanges();
  //   tick();
  //   const doc = de.queryAll(By.css('h4'));
  //   console.log(doc);
  //   expect(doc.length).toEqual(1);
  // }));
});
