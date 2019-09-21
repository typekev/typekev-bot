const { DIRECT_LINE_URL = 'https://directline.botframework.com/' } = process.env;

export default async function startDirectLineConversation() {
  const { DIRECT_LINE_SECRET } = process.env;

  const cres = await fetch(`${DIRECT_LINE_URL}v3/directline/conversations`, {
    headers: {
      authorization: `Bearer ${DIRECT_LINE_SECRET}`,
    },
    method: 'POST',
  });

  if (cres.status === 200 || cres.status === 201) {
    const json = await cres.json();
    
    if ('error' in json) {
      throw new Error(
        `Direct Line service responded ${JSON.stringify(json.error)} while generating new token`,
      );
    } else {
      return { ...json };
    }
  } else {
    throw new Error(`Direct Line service returned ${cres.status} while generating new token`);
  }
}
