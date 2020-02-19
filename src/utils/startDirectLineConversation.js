const { DIRECT_LINE_URL = 'https://directline.botframework.com/' } = process.env;

export default async function startDirectLineConversation() {
  const { DIRECT_LINE_SECRET } = process.env;

  const response = await fetch(`${DIRECT_LINE_URL}v3/directline/conversations`, {
    headers: {
      authorization: `Bearer ${DIRECT_LINE_SECRET}`,
    },
    method: 'POST',
  });

  if (response.status === 200 || response.status === 201) {
    const json = await response.json();

    if ('error' in json) {
      throw new Error(
        `Direct Line service responded ${JSON.stringify(json.error)} while generating new token`,
      );
    }
    return json;
  }
  throw new Error(`Direct Line service returned ${response.status} while generating new token`);
}
