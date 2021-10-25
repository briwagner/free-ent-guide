import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe'
})
export class DurationPipePipe implements PipeTransform {

  transform(value: string): string {
    var time = '';
    let h = value.match(/\d+(?=H)/)
    let m = value.match(/\d+(?=M)/);
    if (h.length) {
      // Trim zero padding.
      time += +h[0]
      time += ':'
    }

    if (m.length) {
      time += m[0]
    }
    return time
  }

}
