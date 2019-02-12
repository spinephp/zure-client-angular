import { TestBed, inject, async } from '@angular/core/testing';
import {RequestService} from '../../../commons/service/request.service';
import {SettingsService} from '../../../commons/service/settings.service';
import { HttpModule } from '@angular/http';
import { LocalStorage } from '../../../commons/provider/local-storage';
import { IndexService } from './index.service';

describe('IndexService', () => {
  let service: IndexService;
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
    spyOn(service.cv, 'get').and.returnValue('1');
    // spyOn(service.requestService, 'get');
    Promise.all(service.get()).then(rs => {
      // console.log(rs);
      expect(rs.length).toEqual(2);
      expect(rs[0].length).toBeGreaterThan(0);
      expect(rs[1].length).toBeGreaterThan(0);

      for (const chemical of rs[0]) {
        for (const field of ['id', 'sic', 'si3n4', 'sio2', 'si', 'fe2o3', 'cao', 'al2o3']) {
          expect(chemical[field]).toBeDefined();
        }
      }
      for (const phyical of rs[1]) {
        for (const field of ['id', 'names', 'unit', 'operator', 'value', 'environment']) {
          expect(phyical[field]).toBeDefined();
        }
      }
   });
   expect(service.cv.get).toHaveBeenCalled();
   expect(service.cv.get).toHaveBeenCalledWith('chemicalid');
   // expect(service.requestService.get).toHaveBeenCalled();
  }));
});
