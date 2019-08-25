import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { LoginerData } from 'src/app/classes/loginer';
import { isDefined } from '@angular/compiler/src/util';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private xlanguageId: Subject<number> = new Subject<number>();
  private xqiye: Subject<any> = new Subject<any>();
  private xLoginer: Subject<LoginerData> = new Subject<LoginerData>();
  private currentLanguageIdData: number;
  private currentLoginerData: LoginerData;
  constructor() {
    this.setLoginer(undefined);
  }

  public setLanguageId(selectedPointsIfo: number): void {
    this.xlanguageId.next(selectedPointsIfo);
    this.currentLanguageIdData = selectedPointsIfo;
  }

  public currentLanguageId(): Observable<number> {
    if (isDefined(this.currentLanguageIdData)) {
      setTimeout(() => {
        this.xlanguageId.next();
      }
      , 30);
    }
    return this.xlanguageId.asObservable();
  }

  public setQiye(selectedPointsIfo: any): void {
    this.xqiye.next(selectedPointsIfo);

  }

  public currentQiye(): Observable<any> {
      return this.xqiye.asObservable();
  }

  public setLoginer(selectedPointsIfo: LoginerData): void {
    this.xLoginer.next(selectedPointsIfo);
    this.currentLoginerData = selectedPointsIfo;
  }

  public currentLoginer(): Observable<LoginerData> {
    setTimeout(() => {
      this.xLoginer.next(this.currentLoginerData); }
    , 30);
    return this.xLoginer.asObservable();
  }

}
