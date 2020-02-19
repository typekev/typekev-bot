import trustedOrigin from './trustedOrigin';

describe('Tests trusted origins', () => {
  it('tests localhost', () => {
    expect(trustedOrigin('http://localhost')).toBe(true);
    expect(trustedOrigin('https://localhost')).toBe(true);
  });

  it('tests ngrok.io', () => {
    expect(trustedOrigin('http://test123.ngrok.io')).toBe(true);
    expect(trustedOrigin('https://test123.ngrok.io')).toBe(true);
  });

  it('tests typekev.com', () => {
    expect(trustedOrigin('https://typekev.com')).toBe(true);
  });

  it('tests typekev-bot.azurewebsites.net', () => {
    expect(trustedOrigin('https://typekev-bot.azurewebsites.net')).toBe(true);
  });

  it('tests typekev.netlify.com', () => {
    expect(trustedOrigin('https://typekev.netlify.com')).toBe(true);
  });

  it('tests typekev.netlify.app', () => {
    expect(trustedOrigin('https://typekev.netlify.app')).toBe(true);
  });

  it('should not pass', () => {
    expect(trustedOrigin('https://google.com')).toBe(false);
    expect(trustedOrigin('https://typekev.lu')).toBe(false);
    expect(trustedOrigin('https://netlify.com')).toBe(false);
  });
});
