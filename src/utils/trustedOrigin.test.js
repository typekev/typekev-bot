import trustedOrigin from './trustedOrigin';

describe('Tests trusted origins', () => {
  it('tests typekev.com', () => {
    expect(trustedOrigin('https://typekev.com')).toBe(true);
  });

  it('tests typekev.netlify.app', () => {
    expect(trustedOrigin('https://typekev.netlify.app')).toBe(true);
  });

  it('tests localhost', () => {
    expect(trustedOrigin('http://localhost')).toBe(true);
  });
});
