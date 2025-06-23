const urlService = require('../services/urlService');

const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Validate input
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    // Optional: Basic URL format validation
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(originalUrl)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Call service to create short URL
    const url = await urlService.createShortUrl(originalUrl);

    res.status(201).json({
      originalUrl: url.originalUrl,
      shortUrl: `${req.protocol}://${req.get('host')}/${url.shortId}`,
      shortId: url.shortId
    });
  } catch (error) {
    console.error('Error in shortenUrl:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const originalUrl = await urlService.getOriginalUrl(shortId);

    if (!originalUrl) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(originalUrl);
  } catch (error) {
    console.error('Error in redirectUrl:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl
};
