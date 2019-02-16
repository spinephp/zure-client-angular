import { Injectable } from '@angular/core';
import {RequestService} from './commons/service/request.service';
import {SettingsService} from './commons/service/settings.service';
import { of } from 'rxjs';
import { Company, ACompany, CompanyData } from './classes/company';
import { Language, LanguageData } from './classes/language';
import { Menu, MenuData } from './classes/menu';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private requestService: RequestService, private cv: SettingsService) {
    cv.setLanguage({});
  }
  heart(): Promise<Object> {
    return this.requestService.get(this.cv.baseUrl + '?cmd=IsLogin', undefined)
    .then(res => {
      return res;
    }, res => {
      return res;
    });
  }

  public updateData() {
    const that = this;
    const data = [];
    return Promise.all(this.get()).then(rs => {
      const companys = new Company(<CompanyData[]>rs[0]);
      const languages = new Language(<LanguageData[]>rs[1]);
      const menus = new Menu(<MenuData[]>rs[2]);
      return of([companys, languages, menus]).toPromise();
    });
  }

  get(): Promise<Object[]>[] {
    const token = this.cv.sessionid;

    const ps = [
      this.requestService.getUrl('Qiye', ['id', 'names', 'addresses', 'tel', 'fax', 'email', 'qq', 'domain', 'introductions', 'icp']),
      this.requestService.getUrl('Language', ['id', 'name_en']),
      this.requestService.getUrl('Navigation', ['id', 'names', 'command']),
    ];
    return this.requestService._get(ps);
  }
}
