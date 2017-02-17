import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genrePipe'
})
export class GenrePipe implements PipeTransform {

  transform(array, genre): any {
    if (genre == undefined || genre == '') {
      return array;
    }
    if (array != undefined) {
      return array.filter(show => show.genres.map(g => g.toLowerCase())
                                             .indexOf(genre.toLowerCase()) == 1);
    }
  }

}
