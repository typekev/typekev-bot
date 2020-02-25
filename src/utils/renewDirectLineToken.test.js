import renewDirectLineToken from './renewDirectLineToken';

describe('Tests renewing a directline token', () => {
  it('tests a failed directline token renewal', async () => {
    const response = { status: 500 };
    global.fetch = jest.fn().mockImplementation(() => response);
    const token = 'test token';

    try {
      expect(await renewDirectLineToken(token)).toThrow();
    } catch (error) {
      expect(error).toEqual(
        new Error(`Direct Line service returned ${response.status} while renewing token`),
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://directline.botframework.com/v3/directline/tokens/refresh',
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      );
    }
  });
});
