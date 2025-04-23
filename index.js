const express = require('express');
const withAuthor = require('./withAuthor');
const multer = require('multer');
const {
    handleFileScan,
    handleUrlScan,
    getDomainInfo,
    getIPInfo,
    getFileReportByHash
} = require('./vt');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(withAuthor);
app.use(express.json());

app.post('/scan/file', upload.single('file'), async (req, res) => {
    try {
        const result = await handleFileScanFromBuffer(req.file.buffer, req.file.originalname);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// URL scan - POST و GET
app.post('/scan/url', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'url is required' });
    try {
        const result = await handleUrlScan(url);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/scan/url', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'url is required' });
    try {
        const result = await handleUrlScan(url);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Domain info - POST و GET
app.post('/info/domain', async (req, res) => {
    const { domain } = req.body;
    if (!domain) return res.status(400).json({ error: 'domain is required' });
    try {
        const result = await getDomainInfo(domain);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/info/domain', async (req, res) => {
    const { domain } = req.query;
    if (!domain) return res.status(400).json({ error: 'domain is required' });
    try {
        const result = await getDomainInfo(domain);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// IP info - POST و GET
app.post('/info/ip', async (req, res) => {
    const { ip } = req.body;
    if (!ip) return res.status(400).json({ error: 'ip is required' });
    try {
        const result = await getIPInfo(ip);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/info/ip', async (req, res) => {
    const { ip } = req.query;
    if (!ip) return res.status(400).json({ error: 'ip is required' });
    try {
        const result = await getIPInfo(ip);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// File hash report - POST و GET
app.post('/report/hash', async (req, res) => {
    const { hash } = req.body;
    if (!hash) return res.status(400).json({ error: 'hash is required' });
    try {
        const result = await getFileReportByHash(hash);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/report/hash', async (req, res) => {
    const { hash } = req.query;
    if (!hash) return res.status(400).json({ error: 'hash is required' });
    try {
        const result = await getFileReportByHash(hash);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`VT API running on port ${PORT}`));
