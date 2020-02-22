import postDirectLineConversation from './postDirectLineConversation';

describe('Tests starting a conversation', () => {
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
});
