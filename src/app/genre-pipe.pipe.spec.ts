/* tslint:disable:no-unused-variable */

import { GenrePipe } from './genre.pipe';
import { Show } from './models/show';

describe('GenrePipe', () => {
  let pipe = new GenrePipe();

  let s1 = new Show({
    title: 'Action movie',
    genres: ['action', 'thriller']
  });

  let s2 = new Show({
    title: 'Comedy movie',
    genres: ['comedy']
  });

  let shows = [s1, s2];

  it('filters a set of movies by Action genre', () => {
    let filtered = pipe.transform(shows, 'Action')
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('Action movie');
    expect(filtered[0].genres).toContain('action');
  });

  it('applies no filter if a valid one is not passed', () => {
    let filtered = pipe.transform(shows, '');
    expect(filtered.length).toBe(2);
  });
});
