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
      return array.filter(function(show) {
        // console.log(show.genres.map(g => g.toLowerCase()).indexOf(genre));
        if (show.genres) {
          return show.genres.map(g => g.toLowerCase())
                    .indexOf(genre.toLowerCase()) > -1;
        } else {
          return show;
        }
      });
    }
  }

}
