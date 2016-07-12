import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'more'
})
export class MorePipe implements PipeTransform {

  transform(value: any, start: number, end: number = null): any {
    let isLonger = false;
    if (value === undefined || value === null) return value;
    if (!this.supports(value)) return value;
    if (end !== null && value.length > end) isLonger = true;
    value = value.slice(start, end === null ? undefined : end);
    if (isLonger) {
      value += ' ...';
    }
    return value;
  }

  private supports(obj: any): boolean { return typeof obj == 'string'; }
}
