// frontend/src/App.jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Use env var or fallback to localhost
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const fetchPreview = async () => {
    if (!url) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setPreview(null);
      } else {
        setPreview(data);
        setHistory((prev) => [data, ...prev]);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
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

      {loading ? (
        <p style={{ marginTop: '1rem' }}>⏳ Generating preview...</p>
      ) : (
        <button onClick={fetchPreview}>Generate Preview</button>
      )}

      {error && <p className="error">{error}</p>}

      {preview && (
        <div className="preview-card">
          {preview.image && <img src={preview.image} alt="preview" />}
          <h2>{preview.title}</h2>
          <p>{preview.description}</p>
          <span>{preview.site}</span>
          <button
            style={{ marginTop: '10px' }}
            onClick={() => navigator.clipboard.writeText(preview.url)}
          >
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
