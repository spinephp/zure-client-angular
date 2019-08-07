import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const units = [
      {'"': ['inch', '英寸']},
      {mm: ['millimeter', '毫米']}
    ];
    for (const item of units) {
      if (item[value]) {
        return item[value][+args || 0];
      }
    }
    return value;
  }

}
