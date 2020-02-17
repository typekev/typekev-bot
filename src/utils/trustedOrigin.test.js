import trustedOrigin from './trustedOrigin';

describe('Tests trusted origins', () => {
  it('tests typekev.com', () => {
    expect(trustedOrigin('https://typekev.com')).toBe(true);
  });

  it('tests localhost', () => {
    expect(trustedOrigin('http://localhost')).toBe(true);
  });
});
