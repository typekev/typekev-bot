import trustedOrigin from './trustedOrigins';
import startDirectLineConversation from './startDirectLineConversation';
import renewDirectLineToken from './renewDirectLineToken';

const postDirectLineConversation = async (req, res) => {
  const origin = req.header('origin');

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  const { token } = JSON.parse(req.body);

  try {
    if (token) {
      res.send(await renewDirectLineToken(token), {
        'Access-Control-Allow-Origin': '*',
      });
    } else {
      res.send(await startDirectLineConversation(), {
        'Access-Control-Allow-Origin': '*',
      });
    }
  } catch (err) {
    res.send(500, err.message, { 'Access-Control-Allow-Origin': '*' });
  }

  if (token) {
    // eslint-disable-next-line no-console
    console.log(`Refreshing Direct Line token for ${origin}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Requesting Direct Line token for ${origin}`);
  }
  return origin;
};

export default postDirectLineConversation;
