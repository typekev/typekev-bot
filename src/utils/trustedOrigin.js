const trustedOrigin = origin =>
  /^https?:\/\/localhost([/:]|$)/.test(origin) ||
  /^https?:\/\/webchat([/:]|$)/.test(origin) ||
  /^https?:\/\/[\d\w]+\.ngrok\.io([/:]|$)/.test(origin) ||
  /^https:\/\/typekev-bot\.azurewebsites\.net/.test(origin) ||
  /^https:\/\/typekev\.netlify\.app/.test(origin) ||
  /^https:\/\/typekev\.com/.test(origin);

export default trustedOrigin;
