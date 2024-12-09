const validApiKey = 'your_api_key_here';

const verifyApiKey = (req, res, next) => {
  const apiKey = req.query.api_key;
  if (apiKey !== validApiKey) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  next();
};

module.exports = verifyApiKey;
