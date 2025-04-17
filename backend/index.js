const express = require('express');
const cors = require('cors');
const ogs = require('open-graph-scraper');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/preview', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const { error, result, response } = await ogs({ url });

    if (error || !result.success) {
      console.error('🔴 Open Graph Scraper Error:', result?.error || response?.statusCode);
      return res.status(500).json({ error: 'Failed to fetch preview data' });
    }

    const previewData = {
      title: result.ogTitle || 'No title found',
      description: result.ogDescription || 'No description found',
      image: result.ogImage?.url || '',
      site: result.ogSiteName || new URL(url).hostname,
      url: result.requestUrl || url,
    };

    res.json(previewData);
  } catch (err) {
    console.error('🔴 Unexpected server error:', err.message);
    res.status(500).json({ error: 'Server error occurred' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
