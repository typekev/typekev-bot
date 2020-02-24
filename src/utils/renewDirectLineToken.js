export default async function renewDirectLineToken(token) {
  // eslint-disable-next-line no-console
  console.log(
    `Renewing Direct Line token using token "${token.substr(0, 3)}...${token.substr(-3)}"`,
  );

  const response = await fetch('https://directline.botframework.com/v3/directline/tokens/refresh', {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (response.status === 200) {
    const json = await response.json();

    if ('error' in json) {
      throw new Error(
        `Direct Line service responded ${JSON.stringify(json.error)} while renewing token`,
      );
    } else {
      return json;
    }
  } else {
    throw new Error(`Direct Line service returned ${response.status} while renewing token`);
  }
}
