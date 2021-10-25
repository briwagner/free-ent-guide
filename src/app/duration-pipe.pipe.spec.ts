import { DurationPipePipe } from './duration-pipe.pipe';

describe('DurationPipePipe', () => {
  const pipe = new DurationPipePipe();

  it('returns a duration string as a hour:minute string', () => {
    expect(pipe.transform('PT04H32M')).toBe('4:32');
    expect(pipe.transform('PT14H02M')).toBe('14:02');
    expect(pipe.transform('PT00H45M')).toBe('0:45');
    expect(pipe.transform('PT03H00M')).toBe('3:00');
  });
});
