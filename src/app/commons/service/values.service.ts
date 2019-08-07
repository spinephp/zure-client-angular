import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { LoginerData } from 'src/app/classes/loginer';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private xlanguageId: Subject<number> = new Subject<number>();
  private xqiye: Subject<any> = new Subject<any>();
  private xLoginer: Subject<LoginerData> = new Subject<LoginerData>();

  constructor() { }

    public setLanguageId(selectedPointsIfo: number): void {
    this.xlanguageId.next(selectedPointsIfo);

  }

  public currentLanguageId(): Observable<number> {
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

  }

  public currentLoginer(): Observable<LoginerData> {
      return this.xLoginer.asObservable();
  }

}
