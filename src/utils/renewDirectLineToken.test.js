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

  it('tests a directline token renewal response with error in json', async () => {
    const jsonRes = { error: 'test error' };
    const json = jest.fn().mockImplementation(() => jsonRes);
    const response = { status: 200, json };
    global.fetch = jest.fn().mockImplementation(() => response);
    const token = 'test token';

    try {
      expect(await renewDirectLineToken(token)).toThrow();
    } catch (error) {
      expect(error).toEqual(
        new Error(
          `Direct Line service responded ${JSON.stringify(jsonRes.error)} while renewing token`,
        ),
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
      expect(json).toHaveBeenCalledTimes(1);
    }
  });

  it('tests a successful directline token renewal', async () => {
    const jsonRes = { conversationId: 'abc123' };
    const json = jest.fn().mockImplementation(() => jsonRes);
    const response = { status: 200, json };
    global.fetch = jest.fn().mockImplementation(() => response);
    const token = 'test token';

    expect(await renewDirectLineToken(token)).toEqual(jsonRes);
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
    expect(json).toHaveBeenCalledTimes(1);
  });
});
