import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';

@Pipe({
  name: 'newline'
})
export class NewlinePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizationService) { }

  transform(value: any, args?: any): any {
    if (!value) return value;
    return this.sanitizer.bypassSecurityTrustHtml(value.replace(/(?:\r\n|\r|\n)/g, '<br />'));
  }

}
