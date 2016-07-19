import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === undefined || value === null) return value;
    if (!this.supports(value)) return value;
    if (value.length == 0) return value;
    if (value.indexOf('youtu') == -1) {
      // 回傳<a ...>
      //    <a [href]="post?.link" target="_blank">{{ post?.link}}</a>
      let re = new RegExp(
        "^" +
        // protocol identifier
        "(?:(?:https?|ftp)://)" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broacast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
        // host name
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
        // domain name
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
        // TLD identifier
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
        // TLD may end with dot
        "\\.?" +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:[/?#]\\S*)?" +
        "$", "i"
      );
      let url = re.exec(value.toString());
      if (url) {
        let doc = document.createElement('a');
        doc.href = url[0];
        doc.target = "_blank";
        doc.appendChild(document.createTextNode(url[0]));
        value = value.replace(url[0], doc.outerHTML);
      }
      return value;
    } else {
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
  }

  private supports(obj: any): boolean {
    return typeof obj == 'string';
  }
}
