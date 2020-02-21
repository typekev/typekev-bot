import startDirectLineConversation from './startDirectLineConversation';

global.process.env = Object.assign(process.env, {
  DIRECT_LINE_URL: 'https://directline.botframework.com/',
  DIRECT_LINE_SECRET: 'DIRECT_LINE_SECRET',
});

describe('Tests starting a conversation', () => {
  it('tests fetch success response', async () => {
    const mockFetchPromise = Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ status: 200 }),
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const { DIRECT_LINE_URL, DIRECT_LINE_SECRET } = process.env;
    const response = await startDirectLineConversation();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${DIRECT_LINE_URL}v3/directline/conversations`, {
      headers: { authorization: `Bearer ${DIRECT_LINE_SECRET}` },
      method: 'POST',
    });
    expect(response.status).toBe(200);
  });
});
