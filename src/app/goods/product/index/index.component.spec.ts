import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '../../../translate.pipe';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import {APP_BASE_HREF} from '@angular/common';

import { IndexComponent } from './index.component';
import { LIFECYCLE_HOOKS_VALUES } from '@angular/compiler/src/lifecycle_reflector';
import { LocalStorage } from 'src/app/commons/provider/local-storage';
import { ValuesService } from 'src/app/commons/service/values.service';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let valuesService: ValuesService;

  const chemical = [
    {id: '1', sic: 75, si3n4: 20, sio2: 1, si: 0.5, fe2o3: 0.5, cao: 0.2, al2o3: 0.1}
  ];
  const phyical = [
    {id: '1', names: ['Bulk Density', '体积密度'], unit: 'g/cm3', operator: '>', value: 2.62, environment: ''},
    {id: '2', names: ['Apparent porosity', '显气孔率'], unit: '%', operator: '<', value: 16, environment: ''},
    {id: '3', names: ['Pressure resistant intensity', '耐压强度'], unit: 'MPa', operator: '>', value: 150, environment: '20℃'},
    {id: '4', names: ['modulus of repture', '抗折强度'], unit: 'MPa', operator: '>', value: 40, environment: '20℃'},
    {id: '5', names: ['modulus of repture', '抗折强度'], unit: 'MPa', operator: '>', value: 43, environment: '1100℃'},
    {id: '6', names: ['Coefficient of thermal liner expansion', '热膨胀系数'], unit: '×10-6/ ℃', operator: '<', environment: '350℃'},
    {id: '7', names: ['Thermal conductivity', '导热系数'], unit: 'w/m·k', operator: '>', value: 16, environment: '350℃'},
    {id: '8', names: ['Refractoriness', '耐火度'], unit: '℃', operator: '<', value: 1800, environment: ''},
    {id: '9', names: ['Loading softening point', '荷重软化温度'], unit: '℃', operator: '<', value: 1600, environment: '0.2MPa'},
    {id: '10', names: ['Max working temperature', '最高使用温度'], unit: '℃', operator: '<', value: 1550, environment: ''}
];
  const fakeActivatedRoute = {
    snapshot: {params: {id: 1}},
    params: of({id: 1}),
    data: of({data: [ chemical, phyical ]})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      providers: [
        LocalStorage,
        // Router,
        // { provide: Router, useClass: RouterModule},
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      declarations: [ IndexComponent, TranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    valuesService = TestBed.get(ValuesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be return languageid', () => {
    const languageid = 1;
    valuesService.currentLanguageId().subscribe(data => {
      expect(data).toBe(languageid);
    });
    valuesService.setLanguageId(languageid);
  });

  it('should return involid data', () => {
    const activeroute = TestBed.get(ActivatedRoute);
    activeroute.data.subscribe((data) => {
      // console.log(data);
      expect(data.data.length).toBe(2);
      expect(data.data[0]).toEqual(chemical);
      expect(data.data[1]).toEqual(phyical);
    });
    fixture.detectChanges();

  });
});
