import postDirectLineConversation from './postDirectLineConversation';
import * as renewDirectLineToken from './renewDirectLineToken';
import * as startDirectLineConversation from './startDirectLineConversation';

describe('Tests starting a conversation', () => {
  it('tests postDirectLineConversation with token', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({ status: 200 }));
    const jsonObj = JSON.stringify({ token: 'token' });
    renewDirectLineToken.default = jest.fn().mockImplementation(() => jsonObj);

    const origin = 'https://typekev.com';
    const header = jest.fn().mockImplementation(param => param === 'origin' && origin);
    const req = { header, body: jsonObj };
    const send = jest.fn();
    const res = { send };
    const response = await postDirectLineConversation(req, res);
    expect(header).toHaveBeenCalledTimes(1);
    expect(header).toHaveBeenCalledWith('origin');
    expect(send).toHaveBeenCalledTimes(1);
    expect(renewDirectLineToken.default).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(jsonObj, {
      'Access-Control-Allow-Origin': '*',
    });
    expect(response).toBe(origin);
  });

  it('tests postDirectLineConversation without token', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({ status: 200 }));
    const jsonObj = JSON.stringify({});
    startDirectLineConversation.default = jest.fn().mockImplementation(() => jsonObj);

    const origin = 'https://typekev.com';
    const header = jest.fn().mockImplementation(param => param === 'origin' && origin);
    const req = { header, body: jsonObj };
    const send = jest.fn();
    const res = { send };
    const response = await postDirectLineConversation(req, res);
    expect(header).toHaveBeenCalledTimes(1);
    expect(header).toHaveBeenCalledWith('origin');
    expect(send).toHaveBeenCalledTimes(1);
    expect(startDirectLineConversation.default).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(jsonObj, {
      'Access-Control-Allow-Origin': '*',
    });
    expect(response).toBe(origin);
  });

  it('tests postDirectLineConversation with a bad origin', async () => {
    const header = jest.fn().mockImplementation(param => param === 'origin' && 'http://google.com');
    const req = { header };
    const send = jest.fn();
    const res = { send };
    const response = await postDirectLineConversation(req, res);
    expect(header).toHaveBeenCalledTimes(1);
    expect(header).toHaveBeenCalledWith('origin');
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(403, 'not trusted origin');
    expect(response).toBe(undefined);
  });

  it('tests postDirectLineConversation with throw', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({ status: 200 }));
    const jsonObj = JSON.stringify({ token: 'token' });
    renewDirectLineToken.default = jest.fn().mockImplementation(() => {
      throw new Error('test error');
    });

    const origin = 'https://typekev.com';
    const header = jest.fn().mockImplementation(param => param === 'origin' && origin);
    const req = { header, body: jsonObj };
    const send = jest.fn();
    const res = { send };
    const response = await postDirectLineConversation(req, res);
    expect(header).toHaveBeenCalledTimes(1);
    expect(header).toHaveBeenCalledWith('origin');
    expect(send).toHaveBeenCalledTimes(1);
    expect(renewDirectLineToken.default).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(500, 'test error', {
      'Access-Control-Allow-Origin': '*',
    });
    expect(response).toBe(origin);
  });
});
