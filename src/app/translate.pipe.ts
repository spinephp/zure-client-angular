import { Pipe, PipeTransform } from '@angular/core';
import {SettingsService} from './commons/service/settings.service';
import {LocalStorage} from './commons/provider/local-storage';
import { isArray } from 'util';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  public static data;
  constructor(private cv: SettingsService, private ls: LocalStorage) {
    const that = this;
    this.cv.getLanguages().subscribe((value: {}) => {
      TranslatePipe.data = value;
    });
   }
  transform(value: any, args?: any): any {
    const langid = parseInt(args || this.ls.get('languageid'), 10);
    let result: string;
    if (isArray(value)) {
      result = value[langid];
    } else  {
      if (TranslatePipe.data && TranslatePipe.data[value] && langid > 0) {
        result = TranslatePipe.data[value][langid - 1];
      } else {
        result = value || 'null';
      }
    }
    return result;
  }

}
