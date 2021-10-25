/* tslint:disable:no-unused-variable */

import { StripHTMLtagsPipe } from './strip-htmltags.pipe';

describe('StripHTMLtagsPipe', () => {
  let pipe = new StripHTMLtagsPipe();


  it('removes the html tag', () => {
    expect(pipe.transform('<p>Tag text</p>')).toBe('Tag text');
  });

  it('leaves text without HTML tags unchanged and stuff', () => {
    expect(pipe.transform('Normal text')).toBe('Normal text');
  });
});
