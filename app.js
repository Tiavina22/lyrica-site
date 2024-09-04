const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const countFile = path.join(__dirname, 'download_count.txt');

if (!fs.existsSync(countFile)) {
    fs.writeFileSync(countFile, '0');
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/downloads', (req, res) => {
    console.log('GET /api/downloads requested');
    const count = fs.readFileSync(countFile, 'utf8');
    res.json({ count: parseInt(count, 10) });
});

app.post('/api/downloads', (req, res) => {
    console.log('POST /api/downloads requested');
    let count = parseInt(fs.readFileSync(countFile, 'utf8'), 10);
    count++;
    fs.writeFileSync(countFile, count.toString());
    res.json({ count });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
