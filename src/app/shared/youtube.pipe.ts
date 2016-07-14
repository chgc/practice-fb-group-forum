import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === undefined || value === null) return value;
    if (!this.supports(value)) return value;    
    if (value.indexOf('youtu') == -1) return value;
    let youtubeId = '';
    let doc = document.createElement('a');
    doc.href = value.toString();
    if (value.indexOf('youtube') >= 0) {      
      youtubeId = doc.search.substring(doc.search.indexOf('=') + 1);
    }
    else if (value.indexOf('youtu') >= 0) {
      youtubeId = doc.pathname.substring(1);
    }
    
    return `<div><iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe></div>`
  }

  private supports(obj: any): boolean {
    return typeof obj == 'string';
  }
}
