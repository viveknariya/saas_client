import { DateWithoutTPipe } from './date-without-t.pipe';

describe('DateWithoutTPipe', () => {
  it('create an instance', () => {
    const pipe = new DateWithoutTPipe();
    expect(pipe).toBeTruthy();
  });
});
