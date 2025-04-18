const express = require('express');
const cors = require('cors');
const ogs = require('open-graph-scraper');
require('dotenv').config();

const app = express();

// ✅ Set CORS dynamically based on environment
const allowedOrigins = [
  'https://luminous-fenglisu-c8e58b.netlify.app', // Production frontend
  'http://localhost:5173',                        // Local frontend dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.post('/api/preview', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const { error, result, response } = await ogs({
      url,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', // ✅ Helps bypass anti-bot
      },
    });

    if (error || !result.success) {
      console.error('🔴 Open Graph Error:', result?.error || response?.statusCode || 'Unknown error');
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
    console.error('🔴 Server Error:', err.message);
    res.status(500).json({ error: 'Server error occurred' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
