import trustedOrigin from './trustedOrigin';

describe('Tests trusted origins', () => {
  it('tests that typekev.com works', () => {
    expect(trustedOrigin('https://typekev.com')).toBe(true);
  });
});
