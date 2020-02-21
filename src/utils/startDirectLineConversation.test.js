import startDirectLineConversation from './startDirectLineConversation';

global.process.env = Object.assign(process.env, {
  DIRECT_LINE_URL: 'https://directline.botframework.com/',
  DIRECT_LINE_SECRET: 'DIRECT_LINE_SECRET',
});

const { DIRECT_LINE_URL, DIRECT_LINE_SECRET } = process.env;

const mockFetchPromise = (status = 200, rest) =>
  Promise.resolve({
    status,
    json: () => Promise.resolve({ status, ...rest }),
  });
describe('Tests starting a conversation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tests startDirectLineConversation with successful response', async () => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise(200));
    const response = await startDirectLineConversation();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${DIRECT_LINE_URL}v3/directline/conversations`, {
      headers: { authorization: `Bearer ${DIRECT_LINE_SECRET}` },
      method: 'POST',
    });
    expect(response.status).toBe(200);
  });
  it('tests startDirectLineConversation with error response', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => mockFetchPromise(200, { error: 'test error' }));

    try {
      expect(await startDirectLineConversation()).toThrow();
    } catch (error) {
      expect(error).toEqual(
        new Error('Direct Line service responded "test error" while generating new token'),
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(`${DIRECT_LINE_URL}v3/directline/conversations`, {
        headers: { authorization: `Bearer ${DIRECT_LINE_SECRET}` },
        method: 'POST',
      });
    }
  });

  it('tests startDirectLineConversation with error response', async () => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise(500));
    try {
      expect(await startDirectLineConversation()).toThrow();
    } catch (error) {
      expect(error).toEqual(
        new Error('Direct Line service returned 500 while generating new token'),
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(`${DIRECT_LINE_URL}v3/directline/conversations`, {
        headers: { authorization: `Bearer ${DIRECT_LINE_SECRET}` },
        method: 'POST',
      });
    }
  });
});
