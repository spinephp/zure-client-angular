import { Injectable } from '@angular/core';
import {RequestService} from '../../../commons/service/request.service';
import {SettingsService} from '../../../commons/service/settings.service';
import { findNode } from '@angular/compiler';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private _chemicalId: Subject<number> = new Subject<number>();

  constructor(
    public requestService: RequestService,
    public cv: SettingsService,
  ) {
  }

  public setChemicalId(selectedPointsIfo: number): void {
    this._chemicalId.next(selectedPointsIfo);

  }

  public currentChemicalId(): Observable<number> {
    return this._chemicalId.asObservable();
  }
  setLanguage(language) {
    this.cv.setLanguage(language);
  }
  get() {
    const cid = this.cv.get('chemicalid');
    const ps = [
      this.requestService.getUrl(
        'Chemicalindex',
        ['id', 'sic', 'si3n4', 'sio2', 'si', 'fe2o3', 'cao', 'al2o3'],
        [{'field': 'id', 'operator': 'eq', 'value': cid}]
      ),
      this.requestService.getUrl(
        'Physicoindex',
        ['id', 'names', 'unit', 'operator', 'value', 'environment'],
      ),
    ];
    return this.requestService._get(ps);
  }
}
