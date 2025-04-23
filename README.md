# VirusTotal API Wrapper  
**By [Ehsan Fazli](https://github.com/tsshack)**

A lightweight Node.js wrapper for [VirusTotal](https://virustotal.com) with:
- Multi-API key rotation  
- Full support for all core VT features  
- Memory-based file handling (no disk write)  
- Fully compatible with Vercel

---

## ⚙️ Setup

### 1. Clone & Install
```bash
git clone https://github.com/tsshack/vir.git
cd virustotal-api-wrapper
npm install
```

### 2. Configure API Keys
Create a `.env` file:
```env
VT_API_KEYS=your_key_1,your_key_2,your_key_3
```

---

## 🚀 API Endpoints

All responses are wrapped like this:
```json
{
  "author": "ehsan fazli",
  "success": true,
  "result": { ... }
}
```

### 🔍 File Scan
- `POST /scan/file`
- `multipart/form-data`  
- **Body:** `file`

---

### 🌐 URL Scan
- `POST /scan/url`  
  - JSON Body: `{ "url": "http://example.com" }`
- `GET /scan/url?url=http://example.com`

---

### 🌍 Domain Info
- `POST /info/domain`  
  - Body: `{ "domain": "example.com" }`
- `GET /info/domain?domain=example.com`

---

### 🌐 IP Info
- `POST /info/ip`  
  - Body: `{ "ip": "8.8.8.8" }`
- `GET /info/ip?ip=8.8.8.8`

---

### 🧬 File Report by Hash
- `POST /report/hash`  
  - Body: `{ "hash": "HASH_VALUE" }`
- `GET /report/hash?hash=HASH_VALUE`

---

## ✅ Features

- Auto-rotating API keys
- Direct file upload from memory (buffer)
- Friendly for serverless platforms like **Vercel**
- Neat JSON response with author credit

---

## 📁 Project Structure

```
.
├── index.js
├── vt.js
├── withAuthor.js
├── package.json
├── vercel.json
└── .env.example
```

---

## 🧑‍💻 Author

**Ehsan Fazli**  
Telegram : [@abj0o](t.me/abj0o)  
Email: `ehsanfazlinejad@gmail.com`

---

## 🪪 License
MIT © Ehsan Fazli
