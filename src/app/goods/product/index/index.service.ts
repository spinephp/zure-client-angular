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
    private requestService: RequestService,
    private cv: SettingsService,
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
    const success = [
      function (data) {
        return data;
      },

      function (data) {
        return data;
      },

      function (data) {
        return data;
      }
    ];
    function error(err) {
      alert('error occured!\n' + err);
    }
    const token = this.cv.sessionid;
    const cid = this.cv.get('chemicalid');
    const ps = [
      {'? cmd=Chemicalindex':
          {
            'filter': JSON.stringify(['id', 'sic', 'si3n4', 'sio2', 'si', 'fe2o3', 'cao', 'al2o3']),
            'cond': JSON.stringify([{'field': 'id', 'operator': 'eq', 'value': cid}]),
            'token': token
          }
      },
      {'?cmd=Physicoindex':
          {
            'filter': JSON.stringify(['id', 'names', 'unit', 'operator', 'value', 'environment']),
            //'cond': JSON.stringify([{'field': 'id', 'operator': 'eq', 'value': pid}]),
            'token': token
          }
      }
    ];

    const promises = [];
    for(let i in ps) {
      for(var k in ps[i]) {
        promises.push(this.requestService.get(this.cv.baseUrl + k, ps[i][k]).then(success[i], error));
      }
    }
    return promises;
  }
}