import { Injectable } from '@angular/core';
import {RequestService} from './commons/service/request.service';
import {SettingsService} from './commons/service/settings.service';
import { of } from 'rxjs';
import { Company, ACompany, CompanyData } from './classes/company';
import { Language, LanguageData } from './classes/language';
import { Menu, MenuData } from './classes/menu';
import { isDefined } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private requestService: RequestService, private cv: SettingsService) {
    cv.setLanguage({});
  }
  heart(): Promise<object> {
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
      const companys = new Company(rs[0] as CompanyData[]);
      const languages = new Language(rs[1] as LanguageData[]);
      const menus = new Menu(rs[2] as MenuData[]);
      return of([companys, languages, menus]).toPromise();
    });
  }

  get(): Promise<object[]>[] {
    const token = this.cv.sessionid;

    const ps = [
      this.requestService.getUrl('Qiye', ['id', 'names', 'addresses', 'tel', 'fax', 'email', 'qq', 'domain', 'introductions', 'icp']),
      this.requestService.getUrl('Language', ['id', 'names']),
      this.requestService.getUrl('Navigation', ['id', 'names', 'command']),
    ];
    return this.requestService._get(ps);
  }

  logon(param) {
    return this.requestService.post('/woo/index.php?cmd=Custom', JSON.stringify(param)).then(rs => {
      return rs;
    });
  }

  logout(param) {
    return this.requestService.post('/woo/index.php?cmd=Logout', JSON.stringify(param)).then(rs => {
      return rs;
    });
  }
  makeRequestParam(formEl, tables: string[], heads, curtabs): any {
  // #opt = $(e.target)
    const key = $(formEl).serializeArray();
    const item = {token: this.cv.sessionid};
    for (const table of tables) {
      item[table] = {} ;
    }
    for (const field of key) {
      const head = field.name.slice(0, 1);
      const ckey = field.name.slice(2);
      const cval = $.trim(field.value);
      if (cval !== '') {
        const i = $.inArray(head, heads);
        if (i > -1) {
          if (isDefined(curtabs) && curtabs[i][ckey] === cval) {
            item[tables[i]][ckey] = cval;
          }
        } else {
          item[field.name] = cval;
        }
      }
    }
    return item;
  }
}
