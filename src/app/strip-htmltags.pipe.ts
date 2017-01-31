import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHTMLtags'
})
export class StripHTMLtagsPipe implements PipeTransform {

  transform(value: any): any {
    return value ? String(value).replace(/<[^>]+>/gm, '') : '';
  }

}
