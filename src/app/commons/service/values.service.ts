import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private _languageId: Subject<any> = new Subject<any>();
  private _qiye: Subject<any> = new Subject<any>();

  constructor() { }

    public setLanguageId(selectedPointsIfo: any): void {
    this._languageId.next(selectedPointsIfo);

  }

  public currentLanguageId(): Observable<any> {
      return this._languageId.asObservable();
  }
    public setQiye(selectedPointsIfo: any): void {
    this._qiye.next(selectedPointsIfo);

  }

  public currentQiye(): Observable<any> {
      return this._qiye.asObservable();
  }

}
