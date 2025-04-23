const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

// خواندن کلیدها از env
const API_KEYS = process.env.VT_API_KEYS?.split(',') || [];
let currentIndex = 0;

function getNextKey() {
    const key = API_KEYS[currentIndex];
    currentIndex = (currentIndex + 1) % API_KEYS.length;
    return key;
}

function getHeaders() {
    return {
        'x-apikey': getNextKey()
    };
}

// اسکن فایل از طریق بافر (مناسب برای فرم‌دیتای فایل)
async function handleFileScanFromBuffer(buffer, originalname) {
    const form = new FormData();
    form.append('file', buffer, originalname);

    const res = await axios.post('https://www.virustotal.com/api/v3/files', form, {
        headers: {
            ...getHeaders(),
            ...form.getHeaders()
        }
    });

    return res.data;
}

// اسکن URL
async function handleUrlScan(urlToScan) {
    const data = `url=${encodeURIComponent(urlToScan)}`;
    const res = await axios.post('https://www.virustotal.com/api/v3/urls', data, {
        headers: {
            ...getHeaders(),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const scanId = res.data.data.id;

    const report = await axios.get(`https://www.virustotal.com/api/v3/urls/${scanId}`, {
        headers: getHeaders()
    });

    return report.data;
}

// اطلاعات دامنه
async function getDomainInfo(domain) {
    const res = await axios.get(`https://www.virustotal.com/api/v3/domains/${domain}`, {
        headers: getHeaders()
    });
    return res.data;
}

// اطلاعات IP
async function getIPInfo(ip) {
    const res = await axios.get(`https://www.virustotal.com/api/v3/ip_addresses/${ip}`, {
        headers: getHeaders()
    });
    return res.data;
}

// گزارش فایل با هش (SHA256)
async function getFileReportByHash(hash) {
    const res = await axios.get(`https://www.virustotal.com/api/v3/files/${hash}`, {
        headers: getHeaders()
    });
    return res.data;
}

// خروجی
module.exports = {
    handleFileScan: handleFileScanFromBuffer, // alias
    handleFileScanFromBuffer,
    handleUrlScan,
    getDomainInfo,
    getIPInfo,
    getFileReportByHash
};
