# 🔗 Link Preview Generator

This is a simple yet powerful SaaS application that generates **Open Graph previews** for any valid URL. Paste in a link and instantly get the title, description, image, and site name — just like how social media platforms show link cards!

### 🌐 Live Demo

👉 [https://luminous-fenglisu-c8e58b.netlify.app](https://luminous-fenglisu-c8e58b.netlify.app)

---

## ✨ Features

- 📄 Fetches Open Graph metadata (title, description, image, site)
- 🖼️ Displays a preview card for any URL
- ⏳ Keeps history of previously generated previews
- 🔗 Built with **React (Vite)** + **Express.js** + **open-graph-scraper**
- 📦 Deployed on **Netlify (frontend)** and **Render (backend)**

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express.js
- **Open Graph Parser:** [open-graph-scraper](https://www.npmjs.com/package/open-graph-scraper)
- **Hosting:** Netlify + Render

---

## ⚙️ How It Works

1. Paste a valid URL (e.g., `https://vercel.com`)
2. The backend uses `open-graph-scraper` to fetch metadata
3. The frontend displays a visual preview card
4. The link is added to your preview history (in-memory)

---

## 🧪 Notes

- Some websites **block bots** or don't provide OG metadata (like `google.com`, `openai.com`).
- You can test with OG-friendly URLs like:
  - https://bbc.com
  - https://vercel.com
  - https://dev.to

---

## 🚀 Getting Started Locally

```bash
# Clone this repo
git clone https://github.com/victoria-2023/link-preview-saas.git
cd link-preview-saas

# Install backend dependencies
cd backend
pnpm install
pnpm start
