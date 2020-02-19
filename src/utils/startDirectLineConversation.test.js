import startDirectLineConversation from './startDirectLineConversation';

describe('Tests starting a conversation', () => {
  it('tests fetch response', () => {
    const mockFetchPromise = Promise.resolve({
      status: 200,
      json: () => Promise.resolve({}),
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    startDirectLineConversation();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
