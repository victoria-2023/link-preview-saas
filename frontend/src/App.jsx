import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Use environment variable or fallback to localhost (for local testing)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const fetchPreview = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setPreview(null);
      } else {
        setPreview(data);
        setHistory((prev) => [data, ...prev]);
      }
    } catch (err) {
      console.error('🔴 Fetch Error:', err);
      setError('Something went wrong while fetching the preview.');
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🔗 Link Preview Generator</h1>

      <input
        type="text"
        placeholder="Paste your link here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={fetchPreview} disabled={loading}>
        {loading ? '⏳ Generating...' : 'Generate Preview'}
      </button>

      {error && <p className="error">{error}</p>}

      {preview && (
        <div className="preview-card">
          {preview.image && <img src={preview.image} alt="preview" />}
          <h2>{preview.title}</h2>
          <p>{preview.description}</p>
          <span>{preview.site}</span>
          <button onClick={() => navigator.clipboard.writeText(preview.url)}>
            Copy Link
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h3>📜 Previous Previews</h3>
          {history.map((item, index) => (
            <div key={index} className="preview-card" style={{ marginTop: '10px' }}>
              {item.image && <img src={item.image} alt="preview" />}
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span>{item.site}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
