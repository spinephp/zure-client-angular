import { TestBed, inject, async } from '@angular/core/testing';
import {RequestService} from '../../../commons/service/request.service';
import {SettingsService} from '../../../commons/service/settings.service';
import { HttpModule } from '@angular/http';
import { LocalStorage } from '../../../commons/provider/local-storage';
import { IndexService } from './index.service';
import { of } from 'rxjs';

describe('IndexService', () => {
  let service: IndexService;

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
  beforeEach(() => TestBed.configureTestingModule({
    imports: [  HttpModule ],
    providers: [ RequestService, SettingsService, LocalStorage ]
  }));
  beforeEach(inject([IndexService], s => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return available data', async(() => {
    const requestservice = TestBed.get(RequestService);
    spyOn(service.cv, 'get').and.returnValue('1');
    spyOn(requestservice, '_get').and.callFake(() => {
      return [of(chemical).toPromise(), of(phyical).toPromise()];
    });
    Promise.all(service.get()).then(rs => {
      // console.log(rs);
      expect(requestservice._get).toHaveBeenCalled();
      expect(requestservice._get).toHaveBeenCalledTimes(1);

      expect(rs.length).toEqual(2);
      expect(rs[0].length).toBe(chemical.length);
      expect(rs[1].length).toBe(phyical.length);
      expect(rs[0]).toBe(chemical);
      expect(rs[1]).toBe(phyical);
   });
   expect(service.cv.get).toHaveBeenCalled();
   expect(service.cv.get).toHaveBeenCalledWith('chemicalid');
   // expect(service.requestService.get).toHaveBeenCalled();
  }));
});
