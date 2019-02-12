import { Injectable } from '@angular/core';
import {RequestService} from '../commons/service/request.service';
import {SettingsService} from '../commons/service/settings.service';
import { News } from './classes/news';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private requestService: RequestService,
    private cv: SettingsService,

  ) { }
  setLanguage(language) {
    this.cv.setLanguage(language);
  }

  public updateData() {
    const that = this;
    const data = [];
    return this.get().then(rs => {
      const news = new News(rs);
      return of([news]).toPromise();
    });
  }

  get() {
    function success(data) {
      data.choose = function(i) {
        // $location.path('/ShowNews').search({id: i});
        this.router.navigate(['news'], { queryParams: { id: i } });
      };
      return data;
    }

    function error(err) {
      alert('error occured!\n' + err);
    }
    const token = this.cv.sessionid;

    const url = this.cv.baseUrl + '?cmd=News';
    const param = {
      'filter': JSON.stringify(['id', 'titles', 'contents', 'time']),
      'token': token
    };

    return this.requestService.get(url, param).then(success, error);
  }
}
